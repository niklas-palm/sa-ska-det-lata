import React from "react";

import "./styling/app.scss";

function App() {
  const song = {
    "it's": {
      clicked: false,
    },
    the: {
      clicked: false,
    },
    most: {
      clicked: false,
    },
    wonderful: {
      clicked: false,
    },
    time: {
      clicked: false,
    },
  };

  const renderGameTiles = () => {
    return Object.keys(song).map((word) => {
      return (
        <div key={word} className="GameTile">
          {word}
        </div>
      );
    });
  };

  return (
    <div className="AppContainer">
      <div className="GameContainer">{renderGameTiles()}</div>
    </div>
  );
}

export default App;
