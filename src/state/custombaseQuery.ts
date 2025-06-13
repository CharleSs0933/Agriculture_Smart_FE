import { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

const customBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: Record<string, unknown>
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
    prepareHeaders: async (headers) => {
      return headers;
    },
    credentials: "include",
  });

  try {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh-token",
          method: "POST",
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        result = await baseQuery(args, api, extraOptions);
      } else {
        toast.error("Session expired. Please log in again.");
      }
    }

    if (result.error) {
      const errorData = result.error.data as { message?: string } | undefined;
      const errorMessage =
        errorData?.message ||
        result.error.status.toString() ||
        "An error occurred";
      toast.error(`Error: ${errorMessage}`);
    }

    const isMutationRequest =
      (args as FetchArgs).method && (args as FetchArgs).method !== "GET";

    if (isMutationRequest && result.data) {
      const successMessage = (result.data as { message?: string })?.message;
      if (successMessage) toast.success(successMessage);
    }

    // if (result.data) {
    //   return {
    //     ...result,
    //     data: (result.data as { data?: unknown })?.data
    //   };
    // } else if (
    //   result.error?.status === 204 ||
    //   result.meta?.response?.status === 204
    // ) {
    //   return { data: null };
    // }

    return result;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return { error: { status: "FETCH_ERROR", error: errorMessage } };
  }
};

export default customBaseQuery;
