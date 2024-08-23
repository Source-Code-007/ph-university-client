import { TQueryParam } from "../../../types/index.type";
import { TStudent } from "../../../types/student.types";
import { baseApi } from "../../api/baseApi";

export const studentApi = baseApi.injectEndpoints({
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
  }),
});

export const {
  useInsertStudentMutation,
  useGetAllStudentQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;
