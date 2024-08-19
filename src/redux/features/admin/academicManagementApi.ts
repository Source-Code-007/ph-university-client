import { TParams } from "../../../types/index.type";
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
    getAllAcademicDepartment: builder.query({
      query: (filter) => {
        const params = new URLSearchParams();
        filter.forEach((item: TParams) => {
          params.append(item.name, item.value);
        });
        return {
          url: "/academic-department",
          method: "GET",
          params: params,
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
    updateAcademicDepartment: builder.mutation({
      query: (payload) => {
        return {
          url: `/academic-department/${payload?._id}`,
          method: "PATCH",
          body: payload,
        };
      },
    }),
    deleteAcademicDepartment: builder.mutation({
      query: (id) => {
        return {
          url: `/academic-department/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useInsertAcademicDepartmentMutation,
  useGetAllAcademicDepartmentQuery,
  useGetSingleAcademicDepartmentQuery,
  useUpdateAcademicDepartmentMutation,
  useDeleteAcademicDepartmentMutation,
} = academicManagementApi;
