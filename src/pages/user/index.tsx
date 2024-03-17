/**
 * Copyright (c) Hand-Future @2023. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { skipToken } from "@reduxjs/toolkit/query";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useState } from "react";
import { HeroProfileReadMode } from "~/components/specs/user/HeroProfileReadMode";
import { Switch } from "~/components/ui/switch";
import { useAdmin, useSelf } from "~/hooks/use-user";

import RootLayout from "../../components/layouts/RootLayout";
import { trpc } from "../../lib/trpc";
import { hero2userWithId } from "../../lib/user";
import { useListWorksQuery } from "../../store/states/api/workApi";

export const UserPage = () => {
  const router = useRouter();
  const email = router.query.email as string | undefined;
  const id = router.query.id as string | undefined;

  const query = { email: email, id: id };
  const isEmpty = !query.email && !query.id;
  console.log({ id, email, isEmpty });
  // const { currentData: user = null } = useGetUserQuery(isEmpty ? skipToken : query)
  const { data: hero } = trpc.graph.getHero.useQuery(
    { heroId: id! },
    { enabled: !!id },
  );
  const user = hero ? hero2userWithId(hero) : null;

  const { currentData: works = [] } = useListWorksQuery(hero?.id ?? skipToken);

  const [editMode, setEditMode] = useState<boolean>(false);

  const isAdmin = useAdmin();
  const isSelf = useSelf(hero?.id);
  const editable = isAdmin || isSelf;

  return (
    <RootLayout>
      {!user ? (
        "User Not Exists!"
      ) : (
        //     editMode ? (
        //   <HeroProfileEditMode user={user} works={works} />
        // ) :
        <HeroProfileReadMode user={user} works={works} />
      )}

      {editable && (
        <div
          className={
            "absolute top-2 right-2 z-auto inline-flex items-center gap-2"
          }
        >
          <span
            className={clsx(
              "text-gray-500",
              !editMode && "text-gray-700 font-bold",
            )}
          >
            访客模式
          </span>
          <Switch checked={editMode} onClick={() => setEditMode(!editMode)} />
          <span
            className={clsx(
              "text-gray-500",
              editMode && "text-gray-700 font-bold",
            )}
          >
            编辑模式
          </span>
        </div>
      )}
    </RootLayout>
  );
};

export default UserPage;
