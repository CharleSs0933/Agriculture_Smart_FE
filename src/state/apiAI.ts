import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiAI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://8f4a-171-243-49-150.ngrok-free.app",
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
