import { baseAPI } from "./baseAPI";
import { IUser } from "../features/userSlice";

export const uploadFileAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<IUser, Partial<IUser>>({
      query: (file) => ({
        url: "/v1/publicSafety/uploadFile",
        method: "POST",
        body: file,
      }),
    }),
  }),
});

export const { useUploadFileMutation } = uploadFileAPI;