import { baseApi } from "../../api/baseApi";

export const bloodBankApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    toggleBloodDonor: builder.mutation({
      query: (id: string) => {
        return {
          url: `/students/toggle-blood-donor/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["student"],
    }),
  }),
});

export const { useToggleBloodDonorMutation } = bloodBankApi;
