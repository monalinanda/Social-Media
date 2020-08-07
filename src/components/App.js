import React, { useState, useEffect } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import ChattingApp from "./ChattingApp";
import Homepage from "./Homepage";
import Login from "./Login/Login";
import Register from "./Register";
import CircularProgress from "@material-ui/core/CircularProgress";
import firebase from "../firebase";

function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    firebase.isInitialized().then((val) => {
      setFirebaseInitialized(val);
    });
  }, []);

  return firebaseInitialized !== false ? (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Register} />
          <Route exact path="/chatting" component={ChattingApp} />
        </Switch>
      </HashRouter>
    </div>
  ) : (
    <div id="loader">
      <CircularProgress disableShrink />
    </div>
  );
}

export default App;
