import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route } from "react-router";
import { createBrowserHistory } from 'history';

import { StartPage } from "./pages/StartPage";
import { GamePage } from "./pages/GamePage";
import { LevelsPage } from "./pages/LevelsPage";
import { InstructionsPage } from "./pages/InstructionsPage";

// the history required for the Router element
const history = createBrowserHistory();

// the routes
ReactDOM.render(
  <Router history={history}>
    <Route path="/" exact component={StartPage} />
    <Route path="/game" exact component={GamePage} />
    <Route path="/levels" exact component={LevelsPage} />
    <Route path="/instruction" exact component={InstructionsPage} />
  </Router>,
  document.getElementById("app")
);
