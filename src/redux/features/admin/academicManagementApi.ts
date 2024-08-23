import { TQueryParam } from "../../../types/index.type";
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
      invalidatesTags: ["academicDepartment"],
    }),
    insertAcademicFaculty: builder.mutation({
      query: (payload) => {
        return {
          url: "/academic-faculty",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["academicFaculty"],
    }),
    getAllAcademicDepartment: builder.query({
      query: (filter) => {
        const params = new URLSearchParams();
        filter.forEach((item: TQueryParam) => {
          params.append(item.name, item.value as string);
        });
        return {
          url: "/academic-department",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["academicDepartment"],
    }),
    getAllAcademicFaculty: builder.query({
      query: (filter) => {
        const params = new URLSearchParams();
        filter.forEach((item: TQueryParam) => {
          params.append(item.name, item.value as string);
        });
        return {
          url: "/academic-faculty",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["academicFaculty"],
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
      invalidatesTags: ["academicDepartment"],
    }),
    deleteAcademicDepartment: builder.mutation({
      query: (id) => {
        return {
          url: `/academic-department/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["academicDepartment"],
    }),
    getSingleAcademicFaculty: builder.query({
      query: (id) => {
        return {
          url: `/academic-faculty/${id}`,
          method: "GET",
        };
      },
    }),
    updateAcademicFaculty: builder.mutation({
      query: (payload) => {
        return {
          url: `/academic-faculty/${payload?._id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["academicFaculty"],
    }),
    deleteAcademicFaculty: builder.mutation({
      query: (id) => {
        return {
          url: `/academic-faculty/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["academicFaculty"],
    }),
  }),
});

export const {
  useInsertAcademicDepartmentMutation,
  useInsertAcademicFacultyMutation,
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicFacultyQuery,
  useGetSingleAcademicDepartmentQuery,
  useUpdateAcademicDepartmentMutation,
  useDeleteAcademicDepartmentMutation,
  useGetSingleAcademicFacultyQuery,
  useUpdateAcademicFacultyMutation,
  useDeleteAcademicFacultyMutation,
} = academicManagementApi;
