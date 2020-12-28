import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import Header from "../components/Header";
import GamesListItem from "../components/GamesListItem";

import { getMyGames } from "../utils/utils";

import "../styling/myGames.scss";

const MyGames = () => {
  const [loading, setLoading] = useState(true);
  const [myGames, setMyGames] = useState(null);

  useEffect(() => {
    const fetchMyGames = async () => {
      const res = await getMyGames();
      console.log(res);
      setMyGames(res.data);
      setLoading(false);
    };
    fetchMyGames();
  }, []);

  const renderMyGames = () => {
    if (loading) {
      return <CircularProgress />;
    }

    if (!myGames.length > 0) {
      return <p> You haven't created any games</p>;
    }

    return myGames.map((game) => {
      return <GamesListItem key={game.sk} game={game} />;
    });
  };

  return (
    <div className="MyGamesContainer">
      <Header />
      <div className="MyGamesContent">
        <div className="GamesListContainer">{renderMyGames()}</div>
      </div>
    </div>
  );
};

export default MyGames;
