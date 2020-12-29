import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";

import Header from "../components/GameHeader";
import { wordClick, incrementSongIndex } from "../redux/actions";

import "../styling/app.scss";

const Game = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const game = useSelector((state) => state.gameReducer);

  useEffect(() => {
    if (!activeGame()) {
      history.push("/");
    }
  }, [history]);

  const activeGame = () => {
    return !!game.gameName;
  };

  const renderGameTiles = () => {
    return game.songList[game.currentSongIndex].lyricsList.map(
      (wordObject, index) => {
        let word = Object.keys(wordObject)[0];
        return (
          <div
            onClick={() => dispatch(wordClick(word, index))}
            key={index}
            className="GameTile"
            style={{
              backgroundColor:
                wordObject[word].clicked && wordObject[word].red
                  ? "red"
                  : "#1ca9f0",
            }}
          >
            {wordObject[word].clicked ? word : index + 1}
          </div>
        );
      }
    );
  };

  const renderNextOrFinshedButton = () => {
    if (game.currentSongIndex === game.songList.length - 1) {
      return <p>FINISHED!</p>;
    } else {
      return (
        <Button
          onClick={() => dispatch(incrementSongIndex())}
          variant="contained"
          color="primary"
        >
          next song
        </Button>
      );
    }
  };

  const renderQuestion = () => {
    return (
      <div>
        <h3>Question:</h3>
        <p>{game.songList[game.currentSongIndex].question}</p>
        <h3>Answer:</h3>
        <p>{game.songList[game.currentSongIndex].answer}</p>
      </div>
    );
  };

  return (
    <div className="AppContainer">
      <div className="GameWrapper">
        <Header />
        <div className="GameContainer">
          <div className="TilesContainer">
            {activeGame() && renderGameTiles()}
          </div>
        </div>
        <div>Current song index: {game.currentSongIndex}</div>
        {activeGame() && renderQuestion()}
        {activeGame() && renderNextOrFinshedButton()}
      </div>
    </div>
  );
};

export default Game;
