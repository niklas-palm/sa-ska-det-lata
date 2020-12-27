import React, { useState } from "react";

import Header from "../components/Header";

import "../styling/app.scss";

const Game = () => {
  const [song, setSong] = useState({
    "it's": {
      clicked: false,
      red: false,
    },
    the: {
      clicked: false,
      red: true,
    },
    most: {
      clicked: false,
      red: false,
    },
    wonderful: {
      clicked: false,
      red: false,
    },
    time: {
      clicked: false,
      red: false,
    },
  });

  const renderGameTiles = () => {
    return Object.keys(song).map((word, index) => {
      return (
        <div
          onClick={() => onClick(word)}
          key={word}
          className="GameTile"
          style={{
            backgroundColor:
              song[word].clicked && song[word].red ? "red" : "#1ca9f0",
          }}
        >
          {song[word].clicked ? word : index + 1}
        </div>
      );
    });
  };

  const onClick = (word) => {
    console.log(word);
    setSong((prev) => ({
      ...prev,
      [word]: {
        ...song[word],
        clicked: !song[word].clicked,
      },
    }));
  };

  return (
    <div className="AppContainer">
      <div className="GameWrapper">
        <Header />
        <div className="GameContainer">
          <div className="TilesContainer">{renderGameTiles()}</div>
        </div>
      </div>
    </div>
  );
};

export default Game;
