import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Landing from "./routes/Landing";
import Game from "./routes/Game";
import CreateGame from "./routes/Game";

import "./styling/app.scss";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/CreateGame">
          <CreateGame />
        </Route>
        <Route path="/Game">
          <Game />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
