import { adminRouter } from "../api/routers/admin";
import { router } from "../trpc";
import { graphRouter } from "./graph";

export const appRouter = router({
  graph: graphRouter,
  admin: adminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
