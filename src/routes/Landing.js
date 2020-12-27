import React from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";

import "../styling/landing.scss";

const Landing = () => {
  return (
    <div className="LandingContainer">
      <Header />
      <div className="LandingContent">
        <Link to="/CreateGame">Create Game</Link>
        <Link to="/MyGames">MyGames</Link>
        <Link to="/Instructions">How to play</Link>
      </div>
    </div>
  );
};

export default Landing;
