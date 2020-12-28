// Some utils logic

import axios from "axios";
import { Auth } from "aws-amplify";

export const validateInputs = (gameDetails, songs, songTemplate) => {
  if (gameDetails.name.length < 2 || gameDetails.name.length > 30) {
    return "Game name either too short or too long";
  } else if (!gameDetails.description || gameDetails.description.length > 100) {
    return "Game details either too short or too long";
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
        continue;
      }

      if (!(songs[song][key].length > 0)) {
        return `${key} cannot be empty in song number ${song}`;
      }
      if (!(songs[song][key].length < 50)) {
        return `${key} is too long in song number ${song}`;
      }
    }
  }

  return null;
};

export const postCreateGame = async (payload) => {
  const userData = (await Auth.currentSession()).getIdToken();
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
  const userData = (await Auth.currentSession()).getIdToken();
  const { jwtToken } = userData;
  const userEmail = userData.payload.email;
  console.log(userEmail);
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
