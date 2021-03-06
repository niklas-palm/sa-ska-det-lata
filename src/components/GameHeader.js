import React from "react";
import { Add, Remove } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { setScore } from "../redux/actions";

import "../styling/gameHeader.scss";

const Header = () => {
  const { score, currentSongIndex } = useSelector((state) => state.gameReducer);
  const dispatch = useDispatch();

  return (
    <div className="HeaderContainer">
      <div className="ScoreTile">
        <div
          className="ControlTile"
          onClick={() =>
            dispatch(setScore({ ...score, green: score.green - 1 }))
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
            dispatch(setScore({ ...score, green: score.green + 1 }))
          }
        >
          <Add className="ControlIcon" />
        </div>
      </div>
      <h2>Song #{currentSongIndex + 1}</h2>
      <div className="ScoreTile">
        <div
          className="ControlTile"
          onClick={() => dispatch(setScore({ ...score, red: score.red - 1 }))}
        >
          <Remove className="ControlIcon" />
        </div>
        <div className="Score" style={{ backgroundColor: "palevioletred" }}>
          {score.red}
        </div>
        <div
          className="ControlTile"
          onClick={() => dispatch(setScore({ ...score, red: score.red + 1 }))}
        >
          <Add className="ControlIcon" />
        </div>
      </div>
    </div>
  );
};

export default Header;
