import React from "react";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";

const CreateSongContainer = ({ song, songs, updateSongs, deleteSong }) => {
  return (
    <div key={song} className="CreateSongContainer">
      <div className="CreateSongContainerHeader">
        <p>Song {song}</p>
        <div
          className="CreateSongContainerDelete"
          onClick={() => deleteSong(song)}
        >
          <CloseIcon />
        </div>
      </div>

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
    </div>
  );
};

export default CreateSongContainer;
