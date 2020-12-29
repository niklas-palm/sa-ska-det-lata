import {
  SET_GAME,
  WORD_CLICK,
  SET_SCORE,
  INCREMENT_SONG_INDEX,
} from "../actionTypes";

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

      return {
        ...state,
        gameDescription: game.gameDescription,
        gameName: game.gameName,
        currentSongIndex: 0,
        songList,
      };

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
      return {
        ...state,
        score: action.payload.score,
      };

    case INCREMENT_SONG_INDEX:
      return {
        ...state,
        currentSongIndex: state.currentSongIndex + 1,
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

    return { artist, songName, question, answer, lyricsList };
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
