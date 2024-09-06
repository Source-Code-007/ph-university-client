import { TQueryParam } from "../../../types/index.type";
import { baseApi } from "../../api/baseApi";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    insertCourse: builder.mutation({
      query: (payload) => {
        return {
          url: "/course",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["course"],
    }),
    getAllCourse: builder.query({
      query: (filter) => {
        const params = new URLSearchParams();
        filter.forEach((item: TQueryParam) => {
          params.append(item.name, item.value as string);
        });
        return {
          url: "/course",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["course"],
    }),
    getSingleCourse: builder.query({
      query: (id) => {
        return {
          url: `/course/${id}`,
          method: "GET",
        };
      },
    }),
    deleteCourse: builder.mutation({
      query: (id) => {
        return {
          url: `/course/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["course"],
    }),
    updateCourse: builder.mutation({
      query: (payload) => {
        return {
          url: `/course/${payload?._id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["course"],
    }),
  }),
});

export const {
  useInsertCourseMutation,
  useGetAllCourseQuery,
  useGetSingleCourseQuery,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} = courseApi;
