import React from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";

import "../styling/myGames.scss";

const MyGames = () => {
  return (
    <div className="MyGamesContainer">
      <Header />
      <div className="MyGamesContent">My Games</div>
    </div>
  );
};

export default MyGames;
