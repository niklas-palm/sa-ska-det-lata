import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Amplify from "aws-amplify";
import {
  AmplifyAuthenticator,
  // AmplifySignOut, use as component to add signout capabilties.
  AmplifySignUp,
  AmplifySignIn,
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";

import awsconfig from "./aws-exports";

import Landing from "./routes/Landing";
import Game from "./routes/Game";
import CreateGame from "./routes/CreateGame";
import MyGames from "./routes/MyGames";

import "./styling/app.scss";

Amplify.configure(awsconfig);

const App = () => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();
  // console.log(user);

  useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <Router>
      <Switch>
        <Route path="/CreateGame">
          <CreateGame />
        </Route>
        <Route path="/MyGames">
          <MyGames />
        </Route>
        <Route path="/Game">
          <Game />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  ) : (
    <AmplifyAuthenticator>
      <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        formFields={[{ type: "email" }, { type: "password" }]}
      />
      <AmplifySignIn slot="sign-in" usernameAlias="email" />
    </AmplifyAuthenticator>
  );
};

export default App;
