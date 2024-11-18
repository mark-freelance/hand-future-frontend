import type { IHeroDetail } from "../../../schema/hero";
import type { IGraphData } from "../../../schema/panel_3dgraph";

import { baseApi } from "./baseApi";

export const TAG_HERO = "hero";

export const heroApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [TAG_HERO],
  })
  .injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
      listHeroes: build.query<IHeroDetail[], void>({
        query: () => `/hero/`,
        providesTags: [TAG_HERO],
      }),

      getGraphData: build.query<IGraphData, void>({
        query: () => `/hero/graph_data`,
        providesTags: [TAG_HERO],
      }),

      initHeroes: build.mutation<void, void>({
        query: () => ({
          url: `/hero/init_from_notion`,
          method: "POST",
        }),
        invalidatesTags: [TAG_HERO],
      }),
    }),
  });

export const {
  useGetGraphDataQuery,
} = heroApi;
