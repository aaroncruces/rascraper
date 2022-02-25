import { apiCallsExamples } from "../../mockExampleObjects/apiCalls_ObjectExamples";

export const getObjectFromApi = async (sourceURL: string): Promise<object> =>
  apiCallsExamples.find((example) => example.url == sourceURL)
    ?.objectReturned || {};
