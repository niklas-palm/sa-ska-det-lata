import {
  SET_GAME,
  WORD_CLICK,
  SET_SCORE,
  INCREMENT_SONG_INDEX,
  DECREMENT_SONG_INDEX,
  REVEAL_ARTIST,
  LOAD_OLD_GAME,
  FINISH_GAME,
} from "../actionTypes";

import { writeToCache, clearCache } from "../../utils/utils";

const initialState = {
  score: {
    green: 0,
    red: 0,
  },
  currentSongIndex: 0,
  gameDescription: null,
  gameName: null,
  songList: [],
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GAME:
      const { game } = action.payload;
      const songList = genSongObjectList(game.songList);

      if (!state.score) {
        state.score = initialState.score;
      }
      let newState = {
        ...state,
        gameDescription: game.gameDescription,
        gameName: game.gameName,
        currentSongIndex: 0,
        songList,
      };

      writeToCache(newState);

      return newState;

    case FINISH_GAME:
      clearCache();
      return initialState;

    case WORD_CLICK:
      const { index, word } = action.payload;

      // Flip the specific word in the lyrics' "clicked" property
      state.songList[state.currentSongIndex].lyricsList[index][
        word
      ].clicked = !state.songList[state.currentSongIndex].lyricsList[index][
        word
      ].clicked;

      return {
        ...state,
      };

    case SET_SCORE:
      let newStateWithScore = {
        ...state,
        score: action.payload.score,
      };

      writeToCache(newStateWithScore);

      return newStateWithScore;

    case INCREMENT_SONG_INDEX:
      if (state.currentSongIndex < state.songList.length - 1) {
        let newState = {
          ...state,
          currentSongIndex: state.currentSongIndex + 1,
        };
        writeToCache(newState);
        return newState;
      }
      return {
        ...state,
      };

    case DECREMENT_SONG_INDEX:
      if (state.currentSongIndex > 0) {
        let newState = {
          ...state,
          currentSongIndex: state.currentSongIndex - 1,
        };
        writeToCache(newState);

        return newState;
      }
      return {
        ...state,
      };

    case REVEAL_ARTIST:
      state.songList[state.currentSongIndex].revealArtist = true;
      return {
        ...state,
      };

    case LOAD_OLD_GAME:
      return {
        ...action.payload,
      };

    default:
      return state;
  }
};

const genSongObjectList = (songList) => {
  return songList.map((song) => {
    const { artist, songName, question, answer, lyrics } = song;

    const redIndexes = getRedIndexes();

    const lyricsList = lyrics.split(" ").map((word, index) => {
      let lyricsInfo = {
        clicked: false,
        red: false,
      };

      if (redIndexes.includes(index)) {
        lyricsInfo.red = true;
      }

      return { [word]: lyricsInfo };
    });

    return {
      artist,
      songName,
      question,
      answer,
      lyricsList,
      revealArtist: false,
    };
  });
};

const getRedIndexes = () => {
  let first = Math.floor(Math.random() * 5);
  let second;
  while (!second || second === first) {
    second = Math.floor(Math.random() * 5);
  }

  return [first, second];
};

export default gameReducer;
