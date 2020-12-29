import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";

import Header from "../components/Header";
import CreateSongContainer from "../components/CreateSongContainer";

import { validateInputs, postCreateGame } from "../utils/utils";

import "../styling/createGame.scss";

const songTemplate = {
  artist: "",
  songName: "",
  lyrics: "",
  question: "",
  answer: "",
};

const gameDetailsTemplate = {
  makePublic: true,
  name: "",
  description: "",
};

const CreateGame = () => {
  const [songs, setSongs] = useState({ 1: songTemplate });
  const [gameDetails, setGameDetails] = useState(gameDetailsTemplate);
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const addSong = () => {
    let newNum = Object.keys(songs).length + 1;
    setSongs((prev) => ({ ...prev, [newNum]: songTemplate }));
  };

  const updateGameDetails = (field, value) => {
    setErrorText("");
    setGameDetails((prev) => ({ ...prev, [field]: value }));
  };

  const updateSongs = (song, field, value) => {
    setErrorText("");
    setSongs((prev) => ({
      ...prev,
      [song]: { ...prev[song], [field]: value },
    }));
  };

  const deleteSong = (id) => {
    setSongs((prev) => ({ ...prev, [id]: null }));
  };

  const saveGame = async () => {
    let error = validateInputs(gameDetails, songs, songTemplate);

    if (!error) {
      try {
        setLoading(true);
        await postCreateGame({ gameDetails, songs });
        setLoading(false);
        history.push("/");
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
      setErrorText(error);
    }
  };

  const renderSongInput = () => {
    return Object.keys(songs).map((song) => {
      return songs[song] ? (
        <CreateSongContainer
          key={song}
          song={song}
          songs={songs}
          updateSongs={updateSongs}
          deleteSong={deleteSong}
        />
      ) : null;
    });
  };

  return (
    <div className="CreateGameContainer">
      <Header />
      <div className="CreateGameContent">
        <TextField
          value={gameDetails.name}
          onChange={(e) => updateGameDetails("name", e.target.value)}
          className="TextInput"
          label="Name of game"
        />
        <TextField
          value={gameDetails.description}
          onChange={(e) => updateGameDetails("description", e.target.value)}
          className="TextInput"
          label="Description"
        />
        <div style={{ margin: "0.5em" }}>
          Allow others to use your game?
          <Switch
            checked={gameDetails.makePublic}
            onChange={() =>
              setGameDetails((prev) => ({
                ...prev,
                makePublic: !prev.makePublic,
              }))
            }
            color="primary"
          />
        </div>

        {renderSongInput()}

        <Button onClick={() => addSong()} variant="contained" color="primary">
          Add song
        </Button>

        {loading ? (
          <CircularProgress style={{ marginTop: "4em" }} />
        ) : (
          <Button
            style={{ marginTop: "4em" }}
            onClick={() => saveGame()}
            variant="contained"
            color="primary"
          >
            Save Game
          </Button>
        )}

        <p style={{ color: "red" }}>{errorText}</p>
      </div>
      {/* <Link to="/Header">Home</Link> */}
    </div>
  );
};

export default CreateGame;
