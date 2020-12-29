import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setGame } from "../redux/actions";

const GamesListItem = ({ game }) => {
  const history = useHistory();
  const currentGame = useSelector((state) => state.gameReducer);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (currentGame.gameName === game.gameName) {
      history.push("/Game");
    } else {
      dispatch(setGame(game));
      history.push("/Game");
    }
  };

  return (
    <div onClick={handleClick} className="GamesListItem">
      <div className="GameTitle">{game.gameName}</div>
      <div className="GameDescription">{game.gameDescription}</div>
    </div>
  );
};

export default GamesListItem;
