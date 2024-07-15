import { baseApi } from "../../api/baseApi";

export const academicDepartmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicDepartment: builder.query({
      query: () => {
        return {
          url: "/academic-department",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAcademicDepartmentQuery } = academicDepartmentApi;
