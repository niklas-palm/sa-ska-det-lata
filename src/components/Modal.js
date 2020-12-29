import React, { useState } from "react";
import Button from "@material-ui/core/Button";

import "../styling/modal.scss";

const Modal = ({ setShowModal, song }) => {
  const [revealAnswer, setRevelAnswer] = useState(false);
  return (
    <div
      onClick={() => revealAnswer && setShowModal(false)}
      className="ModalContainer"
    >
      <div className="Modal">
        <h3>Q:</h3>
        <p>{song.question}</p>
        {revealAnswer ? (
          <p style={{ color: "forestgreen" }}>{song.answer}</p>
        ) : (
          <Button
            onClick={() => setRevelAnswer(true)}
            variant="contained"
            color="primary"
            style={{ backgroundColor: "royalblue" }}
          >
            Reveal answer
          </Button>
        )}
      </div>
    </div>
  );
};

export default Modal;
