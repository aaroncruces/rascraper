import { apiCallsExamples } from "./apiRequestHelpers/apiCalls_ObjectExamples";

export const getObjectFromApi = async (sourceURL: string): Promise<object> =>
  apiCallsExamples.find((example) => example.url == sourceURL)
    ?.objectReturned || {};
