import { baseAPI } from "./baseAPI";
import { ISubMenus } from "../features/subMenusSlice";

export const subMenusAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchSubMenus: builder.query<ISubMenus[], void>({
      query: () => ({
        url: "/publicSafety/subMenus",
        method: "GET",
      }),
      transformResponse: (response: { data: ISubMenus[] }) => response.data,
    }),
    fetchSubMenuById: builder.query<ISubMenus, string>({
      query: (id) => ({
        url: `/publicSafety/subMenus/${id}`,
        method: "GET",
      }),
    }),
    createSubMenu: builder.mutation<ISubMenus, Partial<ISubMenus>>({
      query: (subMenu) => ({
        url: "/publicSafety/subMenus",
        method: "POST",
        body: subMenu,
      }),
    }),
    updateSubMenu: builder.mutation<
      ISubMenus,
      { id: number; icon: string; name: string; path: string; menuId: number }
    >({
      query: ({ id, icon, name, path, menuId }) => ({
        url: `/publicSafety/subMenus/${id}`,
        method: "PUT",
        body: { icon, name, path, menuId },
      }),
    }),
    deleteSubMenu: builder.mutation<void, string>({
      query: (id) => ({
        url: `/publicSafety/subMenus/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchSubMenusQuery,
  useFetchSubMenuByIdQuery,
  useCreateSubMenuMutation,
  useUpdateSubMenuMutation,
  useDeleteSubMenuMutation,
} = subMenusAPI;
