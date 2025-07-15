import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiAI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_AI_URL}`,
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  reducerPath: "apiAI",
  endpoints: (build) => ({
    analyzeImage: build.mutation<AnalysisResult, FormData>({
      query: (formData) => ({
        url: "/diagnose",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useAnalyzeImageMutation } = apiAI;
