import { baseAPI } from "./baseAPI";
import { IMenu } from "../features/menuSlice";

export const menuAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchMenus: builder.query<IMenu[], void>({
      query: () => ({
        url: "/v1/publicSafety/menus",
        method: "GET",
      }),
      transformResponse: (response: { data: IMenu[] }) => response.data,
    }),
    fetchMenuById: builder.query<IMenu, string>({
      query: (id) => ({
        url: `/v1/publicSafety/menu/${id}`,
        method: "GET",
      }),
    }),
    createMenu: builder.mutation<IMenu, Partial<IMenu>>({
      query: (menu) => ({
        url: "/v1/publicSafety/menu",
        method: "POST",
        body: menu,
      }),
    }),
    updateMenu: builder.mutation<
      IMenu,
      { id: number; name: string; icon: string; path: string }
    >({
      query: ({ id, name, icon, path }) => ({
        url: `/v1/publicSafety/menu/${id}`,
        method: "PUT",
        body: { name, icon, path },
      }),
    }),
    deleteMenu: builder.mutation<void, string>({
      query: (id) => ({
        url: `/v1/publicSafety/menu/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchMenusQuery,
  useFetchMenuByIdQuery,
  useCreateMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation,
} = menuAPI;
