import { baseApi } from "../../api/baseApi";

export const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    insertAcademicDepartment: builder.mutation({
      query: (payload) => {
        return {
          url: "/academic-department",
          method: "POST",
          body: payload,
        };
      },
    }),
    getAcademicDepartment: builder.query({
      query: () => {
        return {
          url: "/academic-department",
          method: "GET",
        };
      },
    }),
    getSingleAcademicDepartment: builder.query({
      query: (id) => {
        return {
          url: `/academic-department/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useInsertAcademicDepartmentMutation,
  useGetAcademicDepartmentQuery,
  useGetSingleAcademicDepartmentQuery,
} = academicManagementApi;
