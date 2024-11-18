import { procedure, router } from "~/server/trpc";

import { updateHeroAvatars } from "../../actions";

export const adminRouter = router({
  updateHeroAvatars: procedure
    .mutation(async () => {
      await updateHeroAvatars();
      return { success: true };
    }),
}); 