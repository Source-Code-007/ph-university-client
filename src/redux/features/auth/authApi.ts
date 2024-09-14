import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: userInfo,
          credentials: "include",
        };
      },
    }),
    changePassword: builder.mutation({
      query: (payload) => {
        return {
          url: "/auth/change-password",
          method: "PATCH",
          body: payload,
        };
      },
    }),
    forgetPassword: builder.mutation({
      query: (payload) => {
        return {
          url: "/auth/forget-password",
          method: "POST",
          body: payload,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (payload) => {
        const resetToken = payload.token;
        delete payload.token;
        return {
          url: "/auth/reset-password",
          method: "POST",
          body: payload,
          headers: {
            Authorization: `Bearer ${resetToken}`,
          },
        };
      },
    }),
  }),
});

export const {
  useSigninMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = authApi;
