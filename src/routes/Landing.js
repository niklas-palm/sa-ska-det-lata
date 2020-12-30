import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Header from "../components/Header";

import { getCache } from "../utils/utils";

import { loadOldGame } from "../redux/actions";

import "../styling/landing.scss";

const Landing = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentGame = useSelector((state) => state.gameReducer);

  useEffect(() => {
    let res = getCache();
    if (res) {
      dispatch(loadOldGame(res));
    }
  }, []);

  const navigateTo = (path) => {
    history.push(path);
  };

  return (
    <div className="LandingContainer">
      <Header />
      <div className="LandingContent">
        {currentGame.gameName ? (
          <div
            onClick={() => navigateTo("/Game")}
            className="LandingButton"
            style={{ backgroundColor: "powderblue" }}
          >
            {`Continue ${currentGame.gameName} game`}
          </div>
        ) : null}
        {currentGame.gameName ? (
          <div
            style={{
              borderBottom: "solid 1px green",
              width: "70%",
              margin: "0.5em 0",
            }}
          ></div>
        ) : null}

        <div
          onClick={() => navigateTo("/CreateGame")}
          className="LandingButton"
        >
          Create new game
        </div>
        <div onClick={() => navigateTo("/MyGames")} className="LandingButton">
          Start new game
        </div>
        <div
          onClick={() => navigateTo("/Instructions")}
          className="LandingButton"
        >
          How to play?
        </div>
      </div>
    </div>
  );
};

export default Landing;
