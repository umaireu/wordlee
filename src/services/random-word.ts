import { httpClient } from "./api";
import { API_ENDPOINTS } from "./constants";

export const RandomWord = async (len = 5): Promise<string[]> => {
  const resp = await httpClient.get(
    `${API_ENDPOINTS.GET_RANDOM_WORD}?length=${len}`
  );
  return resp.data;
};
