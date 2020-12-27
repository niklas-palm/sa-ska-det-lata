import React from "react";
import { useHistory } from "react-router-dom";

const GamesListItem = ({ game }) => {
  const history = useHistory();

  const handleClick = () => {
    console.log(game);
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
