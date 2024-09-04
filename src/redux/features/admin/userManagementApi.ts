import { TAdmin } from "../../../types/admin.types";
import { TFaculty } from "../../../types/faculty.types";
import { TQueryParam } from "../../../types/index.type";
import { TStudent } from "../../../types/student.types";
import { baseApi } from "../../api/baseApi";

export const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    insertStudent: builder.mutation({
      query: (payload) => {
        return {
          url: "/users/create-student",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["student"],
    }),

    getAllStudent: builder.query({
      query: (filter) => {
        const params = new URLSearchParams();
        filter.forEach((item: TQueryParam) => {
          params.append(item.name, item.value as string);
        });

        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["student"],
    }),

    updateStudent: builder.mutation({
      query: (payload: Partial<TStudent>) => {
        return {
          url: `/students/${payload?._id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["student"],
    }),

    deleteStudent: builder.mutation({
      query: (id) => {
        return {
          url: `/students/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["student"],
    }),

    insertFaculty: builder.mutation({
      query: (payload) => {
        return {
          url: "/users/create-faculty",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["faculty"],
    }),
    getAllFaculty: builder.query({
      query: (filter) => {
        const params = new URLSearchParams();
        filter.forEach((item: TQueryParam) => {
          params.append(item.name, item.value as string);
        });

        return {
          url: "/faculties",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["faculty"],
    }),
    updateFaculty: builder.mutation({
      query: (payload: Partial<TFaculty>) => {
        return {
          url: `/faculties/${payload?._id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["faculty"],
    }),
    deleteFaculty: builder.mutation({
      query: (id) => {
        return {
          url: `/faculties/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["faculty"],
    }),
    insertAdmin: builder.mutation({
      query: (payload) => {
        return {
          url: "/users/create-admin",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["admin"],
    }),
    getAllAdmin: builder.query({
      query: (filter) => {
        const params = new URLSearchParams();
        filter.forEach((item: TQueryParam) => {
          params.append(item.name, item.value as string);
        });

        return {
          url: "/admins",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["admin"],
    }),
    updateAdmin: builder.mutation({
      query: (payload: Partial<TAdmin>) => {
        return {
          url: `/admins/${payload?._id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["admin"],
    }),
    deleteAdmin: builder.mutation({
      query: (id) => {
        return {
          url: `/admins/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["admin"],
    }),
  }),
});

export const {
  useInsertStudentMutation,
  useGetAllStudentQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useInsertFacultyMutation,
  useGetAllFacultyQuery,
  useUpdateFacultyMutation,
  useDeleteFacultyMutation,
  useInsertAdminMutation,
  useGetAllAdminQuery,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = userManagementApi;
