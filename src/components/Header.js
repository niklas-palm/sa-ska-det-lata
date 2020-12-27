import React, { useState } from "react";
import { Add, Remove } from "@material-ui/icons";

import "../styling/header.scss";

const Header = () => {
  const [score, setScore] = useState({ green: 0, red: 0 });

  return (
    <div className="HeaderContainer">
      <div className="ScoreTile">
        <div
          className="ControlTile"
          onClick={() =>
            setScore((prev) => ({ ...prev, green: prev.green - 1 }))
          }
        >
          <Remove className="ControlIcon" />
        </div>
        <div className="Score" style={{ backgroundColor: "limegreen" }}>
          {score.green}
        </div>
        <div
          className="ControlTile"
          onClick={() =>
            setScore((prev) => ({ ...prev, green: prev.green + 1 }))
          }
        >
          <Add className="ControlIcon" />
        </div>
      </div>
      <h2>Så ska det låta!</h2>
      <div className="ScoreTile">
        <div
          className="ControlTile"
          onClick={() => setScore((prev) => ({ ...prev, red: prev.red - 1 }))}
        >
          <Remove className="ControlIcon" />
        </div>
        <div className="Score" style={{ backgroundColor: "palevioletred" }}>
          {score.red}
        </div>
        <div
          className="ControlTile"
          onClick={() => setScore((prev) => ({ ...prev, red: prev.red + 1 }))}
        >
          <Add className="ControlIcon" />
        </div>
      </div>
    </div>
  );
};

export default Header;
