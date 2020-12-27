// Some utils logic

export const validateInputs = (gameDetails, songs, songTemplate) => {
  if (gameDetails.name.length < 2 || gameDetails.name.length > 30) {
    return "Game name either too short or too long";
  } else if (!gameDetails.description || gameDetails.description.length > 100) {
    return "Game details either too short or too long";
  }

  for (let songIndex = 0; songIndex < Object.keys(songs).length; songIndex++) {
    for (
      let templateIndex = 0;
      templateIndex < Object.keys(songTemplate).length;
      templateIndex++
    ) {
      let song = Object.keys(songs)[songIndex];
      let key = Object.keys(songTemplate)[templateIndex];

      if (!songs[song]) {
        continue;
      }

      if (!(songs[song][key].length > 0)) {
        return `${key} cannot be empty in song number ${song}`;
      }
      if (!(songs[song][key].length < 50)) {
        return `${key} is too long in song number ${song}`;
      }
    }
  }

  return null;
};
