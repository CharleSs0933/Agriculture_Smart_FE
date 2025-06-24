import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiAI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_AI_URL}`,
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  reducerPath: "apiAI",
  tagTypes: [""],
  endpoints: (build) => ({
    analyzeImage: build.mutation<AIAnalysis, FormData>({
      query: (formData) => ({
        url: "/predict",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useAnalyzeImageMutation } = apiAI;
