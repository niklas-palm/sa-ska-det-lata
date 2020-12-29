import {
  SET_GAME,
  WORD_CLICK,
  SET_SCORE,
  INCREMENT_SONG_INDEX,
} from "./actionTypes";

export const setGame = (game) => ({
  type: SET_GAME,
  payload: {
    game,
  },
});

export const wordClick = (word, index) => ({
  type: WORD_CLICK,
  payload: { word, index },
});

export const setScore = (score) => ({
  type: SET_SCORE,
  payload: { score },
});

export const incrementSongIndex = () => ({
  type: INCREMENT_SONG_INDEX,
});