"use client";

import { useHotkeys } from "@mantine/hooks";
/**
 * Copyright (c) Hand-Future @2023. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect, useRef, useState, useCallback } from "react";
import type {
  ForceGraphMethods,
  GraphData,
  NodeObject,
} from "react-force-graph-3d";
import ForceGraph3D from "react-force-graph-3d";
import { useIdleTimer } from "react-idle-timer";
import { Matrix4, Sprite, SpriteMaterial, TextureLoader, Vector3 } from "three";

import {
  useBooleanOption,
  useColorOption,
  useNumberOption,
  useSelectOption,
} from "~/hooks/use-3dgraph";
import { normalizeImageUri } from "~/lib/image";

import useWindowDimensions from "../../../hooks/use-window";
import type {
  DagMode,
  ForceEngine,
  NumDimension,
} from "../../../schema/panel_3dgraph";
import {
  DagModes,
  ForceEngines,
  NumDimensions,
} from "../../../schema/panel_3dgraph";
import { Section } from "../../shared/Section";

export const Graph = ({ data }: { data: GraphData }): JSX.Element => {
  console.log("graph data: ", data);

  const fgRef = useRef<ForceGraphMethods>();
  const router = useRouter();

  const { width, height } = useWindowDimensions();

  const [backgroundColor, backgroundColor_] = useColorOption("backgroundColor");

  const [showNavInfo, showNavInfo_] = useBooleanOption("showNavInfo", false);
  const [enableNodeDrag, enableNodeDrag_] = useBooleanOption(
    "enableNodeDrag",
    true,
  );
  const [enableNavigationControls, enableNavigationControls_] =
    useBooleanOption("enableNavigationControls", true);
  const [enablePointerInteraction, enablePointerInteraction_] =
    useBooleanOption("enablePointerInteraction", true);

  const [nodeOpacity, nodeOpacity_] = useNumberOption("nodeOpacity");
  const [nodeResolution, nodeResolution_] = useNumberOption("nodeResolution");
  const [nodeRelSize, nodeRelSize_] = useNumberOption("nodeRelSize");
  const [dagLevelDistance, dagLevelDistance_] =
    useNumberOption("dagLevelDistance");
  const [d3AlphaMin, d3AlphaMin_] = useNumberOption("d3AlphaMin");
  const [d3AlphaDecay, d3AlphaDecay_] = useNumberOption("d3AlphaDecay");
  const [d3VelocityDecay, d3VelocityDecay_] =
    useNumberOption("d3VelocityDecay");
  const [warmupTicks, warmupTicks_] = useNumberOption("warmupTicks");
  const [cooldownTicks, cooldownTicks_] = useNumberOption("cooldownTicks");
  const [cooldownTime, cooldownTime_] = useNumberOption("cooldownTime");
  const [linkHoverPrecision, linkHoverPrecision_] =
    useNumberOption("linkHoverPrecision");

  const [numDimensions, numDimensions_] = useSelectOption<NumDimension>(
    "numDimensions",
    3,
    NumDimensions,
  );
  const [dagMode, dagMode_] = useSelectOption<DagMode>(
    "dagMode",
    "td",
    DagModes,
  );
  const [forceEngine, forceEngine_] = useSelectOption<ForceEngine>(
    "ForceEngine",
    "d3",
    ForceEngines,
  );

  const [cameraRotationFPS, cameraRotationFPS_] = useNumberOption(
    "cameraRotationFPS",
    24,
  );
  const [cameraRotationDegree, cameraRotationDegree_] = useNumberOption(
    "cameraRotationDegree",
    0.1,
  );
  const [cameraFocusDistance, cameraFocusDistance_] = useNumberOption(
    "cameraFocusDistance",
    200,
  );
  const [cameraFocusDuration, cameraFocusDuration_] = useNumberOption(
    "cameraFocusDuration",
    2000,
  );
  const [refreshSeconds, refreshSeconds_] = useNumberOption(
    "refreshSeconds",
    60,
  );

  const rotationRef = useRef<ReturnType<typeof setInterval>>();

  let lastClickTime: Date, lastClickId: string;

  /**
   * 每隔一段空闲时间就重置布局（馆长要求）
   */
  useIdleTimer({
    onIdle: () => {
      console.log("idle!");
      router.replace(router.asPath);
      // router.reload() // it's too slow (full refresh)
    },
    timeout: (refreshSeconds || 1) * 1000,
    throttle: 500,
  });

  const clearRotate = () => {
    if (rotationRef.current) clearInterval(rotationRef.current);
  };
  const setRotate = useCallback(() => {
    rotationRef.current = setInterval(
      () => {
        const rotationMatrix = new Matrix4().makeRotationY(
          (Math.PI / 360) * (cameraRotationDegree || 0.1),
        );
        // ref: https://stackoverflow.com/a/37374618/9422455
        fgRef.current?.camera().position.applyMatrix4(rotationMatrix);
      },
      Math.ceil(1000 / (cameraRotationFPS || 24)),
    );
  }, [cameraRotationFPS, cameraRotationDegree]);

  /**
   * 让相机始终旋转（提��用户体验）
   */
  useEffect(() => {
    clearRotate();
    setRotate();
  }, [setRotate]);

  const onNodeClick = (node: NodeObject) => {
    if (!fgRef.current) return;

    console.log("clicked node: ", node);
    clearRotate();
    // 等相机动画完成之后再旋转
    setTimeout(setRotate, cameraFocusDuration);

    const curPos = fgRef.current.camera().position;
    const objPos = new Vector3(node.x, node.y, node.z);
    const targetPos = curPos
      .sub(objPos)
      .normalize()
      .multiplyScalar(cameraFocusDistance || 200)
      .add(objPos);
    const distanceToTargetPos = objPos.distanceTo(targetPos);

    console.log({
      targetDistance: cameraFocusDistance,
      curPos,
      objPos,
      targetPos,
      distanceToTargetPos,
    });

    // Aim at node from outside it
    fgRef.current.cameraPosition(
      targetPos, // new position
      objPos, // lookAt ({ x, y, z })
      cameraFocusDuration, // ms transition duration
    );

    // 双击跳转到对应主页
    const id = node.id as string;
    if (lastClickId === id && +new Date() - +lastClickTime < 1000) {
      window.open(`/user?id=${id}`, "_blank");
    }
    lastClickId = id;
    lastClickTime = new Date();
  };

  const nodeThreeObject = (node: NodeObject) => {
    // @ts-expect-error Three.js type definitions don't match the actual implementation
    const imgPath = normalizeImageUri(node.avatar)!;

    const imgTexture = new TextureLoader().load(imgPath);
    const material = new SpriteMaterial({ map: imgTexture, depthWrite: false });
    const img = new Sprite(material);
    img.scale.set(24, 24, 1);
    return img;
  };

  const [enableControl, setEnableControl] = useState(false);
  useHotkeys([
    [
      "mod+shift+D",
      () => {
        console.log("toggle dev panel");
        setEnableControl(!enableControl);
      },
    ],
  ]);

  return (
    <div tabIndex={0} role="button" className="w-full h-full flex">
      <div className={clsx(enableControl || "hidden")}>
        <Section title="Customized" />
        {refreshSeconds_}
        {cameraRotationFPS_}
        {cameraRotationDegree_}
        {cameraFocusDistance_}
        {cameraFocusDuration_}

        <Section title="Container Layout" />
        {backgroundColor_}
        {showNavInfo_}

        <Section title="Node Styling" />
        {nodeRelSize_}
        {nodeOpacity_}
        {nodeResolution_}

        <Section title="Link Styling" />

        <Section title="Force Engine" />
        {forceEngine_}
        {dagLevelDistance_}
        {numDimensions_}
        {dagMode_}
        {d3AlphaMin_}
        {d3AlphaDecay_}
        {d3VelocityDecay_}
        {warmupTicks_}
        {cooldownTicks_}
        {cooldownTime_}

        <Section title="Interaction" />
        {linkHoverPrecision_}
        {enableNodeDrag_}
        {enableNavigationControls_}
        {enablePointerInteraction_}
      </div>

      <ForceGraph3D
        ref={fgRef}
        // data
        graphData={data}
        // width & height, 用于确保屏幕高宽正好满足
        width={width - (enableControl ? 256 : 0)}
        height={height - 64}
        // layout
        backgroundColor={backgroundColor}
        showNavInfo={showNavInfo}
        // node
        nodeRelSize={nodeRelSize}
        nodeOpacity={nodeOpacity || 0}
        nodeResolution={nodeResolution || 0}
        nodeLabel="name"
        nodeThreeObject={nodeThreeObject}
        // link
        linkWidth={1}
        linkHoverPrecision={linkHoverPrecision}
        // force engine
        forceEngine={forceEngine}
        dagLevelDistance={dagLevelDistance || 0}
        numDimensions={numDimensions}
        dagMode={dagMode}
        d3AlphaMin={d3AlphaMin}
        d3AlphaDecay={d3AlphaDecay}
        d3VelocityDecay={d3VelocityDecay}
        warmupTicks={warmupTicks}
        cooldownTicks={cooldownTicks}
        cooldownTime={cooldownTime}
        // interaction
        enableNodeDrag={enableNodeDrag}
        enableNavigationControls={enableNavigationControls}
        enablePointerInteraction={enablePointerInteraction}
        onNodeClick={onNodeClick}
      />
    </div>
  );
};

export default Graph;
