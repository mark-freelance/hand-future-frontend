import { normalizeImageUri } from "../../../lib/image";
import type { IUserWithEmail, IUserWithId } from "../../../schema/user";

import { baseApi } from "./baseApi";

export const TAG_USER = "user";

const userHelper = {
  providesTags: (result: IUserWithId | null | undefined): { type: 'user'; id: string }[] => [
    { type: 'user' as const, id: result?.id ?? 'LIST' }
  ],
  transformResponse: (response: IUserWithId | null) => {
    if (!response) return null;
    ['avatar', 'cover'].forEach(field => {
      const value = response[field as keyof IUserWithId];
      if (value && typeof value === 'string') {
        (response as any)[field] = normalizeImageUri(value);
      }
    });
    return response;
  },
};

export const userApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [TAG_USER],
  })
  .injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
      getUser: build.query<IUserWithId | null, { id?: string; email?: string }>(
        {
          query: (arg) => ({
            url: `/user/`,
            params: arg,
          }),
          ...userHelper,
        },
      ),

      updateUser: build.mutation<void, IUserWithId>({
        query: (data) => {
          console.log("updateUser", { data });
          return {
            url: `/user/update`,
            body: data,
            method: "PATCH",
          };
        },
        invalidatesTags: (result, error, arg, meta) => [
          { type: TAG_USER, id: arg.id },
        ],
      }),

      updateUserViaEmail: build.mutation<void, IUserWithEmail>({
        query: (data) => {
          console.log("updateUser", { data });
          return {
            url: `/user/update_via_email`,
            body: data,
            method: "PATCH",
          };
        },
      }),
    }),
  });

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateUserViaEmailMutation,
} = userApi;
