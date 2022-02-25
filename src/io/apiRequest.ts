//intermediary between axios/fetch and the consumer

import axios from "axios";

//this makes it mockable and independent of the response type (be json, xml or other)
//for now, supporting screenscraper and json. later other scraping servers and formats
export const getObjectFromApi = async (sourceURL: string): Promise<object> => {
  try {
    const response = await axios.get(sourceURL);
    if (response?.data) return response.data;
  } catch (error) {
    // console.error("error");
  }
  return {};
};
