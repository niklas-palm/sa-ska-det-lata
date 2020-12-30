import {
  SET_GAME,
  FINISH_GAME,
  WORD_CLICK,
  SET_SCORE,
  INCREMENT_SONG_INDEX,
  DECREMENT_SONG_INDEX,
  REVEAL_ARTIST,
  LOAD_OLD_GAME,
} from "./actionTypes";

export const setGame = (game) => ({
  type: SET_GAME,
  payload: {
    game,
  },
});

export const finishGame = () => ({
  type: FINISH_GAME,
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

export const decrementSongIndex = () => ({
  type: DECREMENT_SONG_INDEX,
});

export const revealArtist = () => ({
  type: REVEAL_ARTIST,
});

export const loadOldGame = (prevGame) => ({
  type: LOAD_OLD_GAME,
  payload: prevGame,
});
