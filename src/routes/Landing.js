import React from "react";
import { Link, useHistory } from "react-router-dom";

import Header from "../components/Header";

import "../styling/landing.scss";

const Landing = () => {
  const history = useHistory();

  const navigateTo = (path) => {
    history.push(path);
  };

  return (
    <div className="LandingContainer">
      <Header />
      <div className="LandingContent">
        <div
          onClick={() => navigateTo("/CreateGame")}
          className="LandingButton"
        >
          Create new game
        </div>
        <div onClick={() => navigateTo("/MyGames")} className="LandingButton">
          Play a game
        </div>
        <div
          onClick={() => navigateTo("/Instructions")}
          className="LandingButton"
        >
          How to play?
        </div>
        {/* <Link to="/CreateGame">Create Game</Link>
        <Link to="/MyGames">MyGames</Link>
        <Link to="/Instructions">How to play</Link> */}
      </div>
    </div>
  );
};

export default Landing;
