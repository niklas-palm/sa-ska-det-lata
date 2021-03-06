// Some utils logic

import axios from "axios";
import { Auth } from "aws-amplify";

export const validateInputs = (gameDetails, songs, songTemplate) => {
  if (
    gameDetails.name.trim().length < 2 ||
    gameDetails.name.trim().length > 30
  ) {
    return "Game name either too short or too long";
  } else if (
    !gameDetails.description.trim() ||
    gameDetails.description.trim().length > 100
  ) {
    return "Game description either too short or too long";
  }

  for (let songIndex = 0; songIndex < Object.keys(songs).length; songIndex++) {
    for (
      let templateIndex = 0;
      templateIndex < Object.keys(songTemplate).length;
      templateIndex++
    ) {
      let song = Object.keys(songs)[songIndex];
      let key = Object.keys(songTemplate)[templateIndex];

      if (!(songs[song].lyrics.trim().split(" ").length == 5)) {
        return `Lyrics has to be 5 words in song number ${song}`;
      }

      if (!songs[song]) {
        // Deleted song
        continue;
      }

      if (!(songs[song][key].trim().length > 0)) {
        return `${key} cannot be empty in song number ${song}`;
      }
      if (!(songs[song][key].trim().length < 50)) {
        return `${key} is too long in song number ${song}`;
      }
    }
  }

  return null;
};

const getUserData = async () => {
  return (await Auth.currentSession()).getIdToken();
};

export const postCreateGame = async (payload) => {
  const userData = await getUserData();
  const { jwtToken } = userData;
  const userEmail = userData.payload.email;

  let body = {
    userEmail,
    ...payload,
  };

  const res = await axios.post(
    "https://0drkk6kc76.execute-api.eu-north-1.amazonaws.com/Prod/CreateGame",
    body,
    {
      headers: {
        Authorization: jwtToken,
      },
    }
  );

  return res;
};

export const getMyGames = async () => {
  const userData = await getUserData();
  const { jwtToken } = userData;
  const userEmail = userData.payload.email;

  let body = {
    userEmail,
  };

  const res = await axios.post(
    "https://0drkk6kc76.execute-api.eu-north-1.amazonaws.com/Prod/MyGames",
    body,
    {
      headers: {
        Authorization: jwtToken,
      },
    }
  );

  return res;
};

// Cache utils

const cacheName = "ssdl";

export const getCache = () => {
  let cache = window.localStorage.getItem(cacheName);
  if (cache) {
    return JSON.parse(cache);
  }
  return null;
};

export const writeToCache = (obj) => {
  window.localStorage.setItem(cacheName, JSON.stringify(obj));
  return;
};

export const clearCache = () => {
  window.localStorage.removeItem(cacheName);
};
