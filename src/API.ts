import axios from "axios";

import {
  backgroundPicture,
  alternateBackgroundPicture,
  API_URL,
  API_KEY,
  backgroundPictureSize,
  posterSize,
} from "./config";

const defaultConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

interface ApiSettings {
  fetchBacgroundImages: (searchQuery: string, page: number) => Promise<any>;
  fetchBacgroundImage: (movieID: number) => Promise<any>;
}

const apiSettings: ApiSettings = {
  fetchBacgroundImages: async (
    searchQuery: string,
    page: number
  ): Promise<any> => {
    const endpoint = searchQuery
      ? `${searchBaseURL}${searchQuery}&page=${page}`
      : `${popularBaseURL}&page=${page}`;
    return await axios(endpoint);
  },

  fetchBacgroundImage: async (movieID: number): Promise<any> => {
    const endpoint = `${API_URL}movie/${movieID}?api_key=${API_KEY}`;
    return await axios(endpoint);
  },


  },

  authenticate: async (
    requestToken: string,
    username: string,
    password: string
  ): Promise<any> => {
    const bodyData = {
      username,
      password,
      request_Token: requestToken,
    };
    // First authenticate the requestToken
    const data = await axios(loginURL, {
      ...defaultConfig,
      body: JSON.stringify(bodyData),
    });

    // Then get the sessionID with the requestToken
    if (data.success) {
      const sessionID = await axios(sessionID_URL, {
        ...defaultConfig,
        body: JSON.stringify({ request_token: requestToken }),
      });
      return sessionID;
    }
  },

  rateMovie: async (
    sessionID: string,
    movieID: number,
    value: number
  ): Promise<any> => {
    const endpoint = `${API_URL}movie/${movieID}/rating?api_key=${API_KEY}&session_id=${sessionID}`;

    const rating = await axios(endpoint, {
      ...defaultConfig,
      body: JSON.stringify({ value }),
    });
    return rating;
  },
};

export default apiSettings;
