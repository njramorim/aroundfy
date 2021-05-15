import { httpClient } from "../lib";

const processResponseData = (response) => response.data || {};

export const getCurrentTrack = async (data) => {
  return await httpClient
    .get("/api/spotify/getCurrentTrack", data)
    .then(processResponseData)
    .catch((error) => {
      console.log("error: ", error);
      return;
    });
};
