import { IconLoaderQuarter } from "@tabler/icons-react";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { trpc } from "~/lib/trpc";

export const UpdateHeroAvatars = () => {
  const {
    mutate: updateAvatars,
    isPending: isLoading,
    isSuccess,
    isError,
  } = trpc.admin.updateHeroAvatars.useMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("头像更新成功");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("头像更新失败");
    }
  }, [isError]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>更新大咖头像</CardTitle>
        <CardDescription>
          将所有大咖的远��头像下载到本地存储，以提高访问速度
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Button
          disabled={isLoading}
          onClick={() => {
            updateAvatars();
          }}
        >
          {isLoading ? (
            <IconLoaderQuarter className={"animate-spin"} />
          ) : (
            "开始更新"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}; 