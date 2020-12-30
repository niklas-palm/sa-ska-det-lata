import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setGame } from "../redux/actions";

const GamesListItem = ({ game }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setGame(game));
    history.push("/Game");
  };

  return (
    <div onClick={handleClick} className="GamesListItem">
      <div className="GameTitle">{game.gameName}</div>
      <div className="GameDescription">{game.gameDescription}</div>
    </div>
  );
};

export default GamesListItem;
