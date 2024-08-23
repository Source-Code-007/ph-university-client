import { TQueryParam } from "../../../types/index.type";
import { baseApi } from "../../api/baseApi";

export const batchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    insertBatch: builder.mutation({
      query: (payload) => {
        return {
          url: "/batch",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["batch"],
    }),
    getAllBatch: builder.query({
      query: (filter) => {
        const params = new URLSearchParams();
        filter.forEach((item: TQueryParam) => {
          params.append(item.name, item.value as string);
        });
        return {
          url: "/batch",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["batch"],
    }),
    getSingleBatch: builder.query({
      query: (id) => {
        return {
          url: `/batch/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useInsertBatchMutation,
  useGetAllBatchQuery,
  useGetSingleBatchQuery,
} = batchApi;
