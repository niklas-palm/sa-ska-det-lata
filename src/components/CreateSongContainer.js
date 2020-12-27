import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const CreateSongContainer = ({ song, songs, updateSongs, deleteSong }) => {
  return (
    <div key={song} className="CreateSongContainer">
      Song {song}
      <TextField
        value={songs[song].artist}
        onChange={(e) => updateSongs(song, "artist", e.target.value)}
        className="TextInput"
        label="Artist"
      />
      <TextField
        value={songs[song].songName}
        onChange={(e) => updateSongs(song, "songName", e.target.value)}
        className="TextInput"
        label="Song name"
      />
      <TextField
        value={songs[song].lyrics}
        onChange={(e) => updateSongs(song, "lyrics", e.target.value)}
        className="TextInput"
        label="Lyrics"
      />
      <TextField
        value={songs[song].question}
        onChange={(e) => updateSongs(song, "question", e.target.value)}
        className="TextInput"
        label="Question"
      />
      <TextField
        value={songs[song].answer}
        onChange={(e) => updateSongs(song, "answer", e.target.value)}
        className="TextInput"
        label="Answer"
      />
      <Button
        style={{ marginTop: "2em" }}
        onClick={() => deleteSong(song)}
        variant="contained"
        color="secondary"
      >
        Remove song
      </Button>
    </div>
  );
};

export default CreateSongContainer;
