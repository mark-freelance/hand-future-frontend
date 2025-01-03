/**
 * Copyright (c) Hand-Future @2023. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Work } from "@prisma/client";
import _ from "lodash";
import React from "react";
import { toast } from "react-toastify";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import { BILIBILI_VIDEO_URL_PLACEHOLDER } from "../../../config/system";
import { SourcePlatform } from "../../../schema/work";
import { getBvidFromUrl } from "../../shared/BilibiliVideo";

export const AddBilibiliWork = ({
  data,
  setData,
}: {
  data: Work;
  setData: (data: Work) => void;
}): JSX.Element => (
  <>
    <div className="inline-flex w-full items-center gap-2">
      <Label htmlFor="title" className={"w-16"}>
        链接
      </Label>
      <Input
        name={"title"}
        id="title"
        placeholder={BILIBILI_VIDEO_URL_PLACEHOLDER}
        defaultValue={data.source.url}
        onChange={(event) =>
          setData(_.merge({}, data, { source: { url: event.target.value } }))
        }
      />

      <Button
        type={"button"}
        className={"shrink-0"}
        onClick={async () => {
          if (!data.source.url) return toast.error("URL is required");
          const bvid = getBvidFromUrl(data.source.url);
          if (!bvid) return toast.error("URL is invalid!");
          // todo: craw bilibili basic info to construct a unified data structure
          setData({
            ...data,
            ...{
              cover: "",
              source: {
                platform: SourcePlatform.bilibiliVideo,
                url: data.source.url,
              },
              content: "", // todo: fetch more in wechat article to fill the content field
              description: "",
              title: "",
            },
          });
        }}
      >
        解析
      </Button>
    </div>
  </>
);
