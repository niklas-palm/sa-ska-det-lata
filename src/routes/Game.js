import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";

import Header from "../components/GameHeader";
import Modal from "../components/Modal";
import {
  wordClick,
  incrementSongIndex,
  decrementSongIndex,
  revealArtist,
} from "../redux/actions";

import "../styling/app.scss";

const Game = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const game = useSelector((state) => state.gameReducer);
  const [showModal, setShowModal] = useState(false);
  // const [revealArtist, setRevealArtist] = useState(false);

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
        <div className="GameFooter">
          <div
            onClick={() => dispatch(decrementSongIndex())}
            className="GameFooterIcon"
          >
            <ArrowBackIcon fontSize="large" />
          </div>
          <div
            onClick={() => dispatch(incrementSongIndex())}
            className="GameFooterIcon"
          >
            <ArrowForwardIcon fontSize="large" />
          </div>
        </div>
      );
    }
  };

  const renderQuestion = () => {
    return (
      <div className="QuestionContainer">
        <div
          style={{ alignItems: "flex-end" }}
          className="QuestionsContainerItem"
        >
          <Button
            onClick={() => setShowModal(true)}
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#EC7E1D" }}
          >
            Show Question
          </Button>
        </div>
        <div
          style={{ alignItems: "flex-start" }}
          className="QuestionsContainerItem"
        >
          {game.songList[game.currentSongIndex].revealArtist ? (
            <div>
              <h4 style={{ marginBottom: "0", fontWeight: "600" }}>
                {game.songList[game.currentSongIndex].artist}
              </h4>
              <p style={{ marginTop: "0.2em" }}>
                {game.songList[game.currentSongIndex].songName}
              </p>{" "}
            </div>
          ) : (
            <Button
              // onClick={() => setRevealArtist(true)}
              onClick={() => dispatch(revealArtist())}
              variant="contained"
              color="primary"
              style={{ backgroundColor: "forestgreen" }}
            >
              Reveal artist
            </Button>
          )}
        </div>
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
        {activeGame() && renderQuestion()}
        {activeGame() && renderNextOrFinshedButton()}
      </div>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          song={game.songList[game.currentSongIndex]}
        />
      )}
    </div>
  );
};

export default Game;
