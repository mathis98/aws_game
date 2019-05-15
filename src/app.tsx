import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from 'history';

import { StartPage } from "./pages/StartPage";
import { GamePage } from "./pages/GamePage";
import { LevelsPage } from "./pages/LevelsPage";
import { InstructionsPage } from "./pages/InstructionsPage";
import { ErrorPage } from "./pages/ErrorPage";

// the history required for the Router element
const history = createBrowserHistory();

// the routes
ReactDOM.render(
  <Router history={history}>

    {/* switch will only render the first match */}
    <Switch>
      <Route path="/" exact component={StartPage} />
      <Route path="/game" exact component={GamePage} />
      <Route path="/levels" exact component={LevelsPage} />
      <Route path="/instruction" exact component={InstructionsPage} />

      {/* Catch all unknown routes and show error page */}
      <Route component={ErrorPage} />
    </Switch>
  </Router>,
  document.getElementById("app")
);
