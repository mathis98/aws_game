import * as React from "react";
import * as ReactDOM from "react-dom";
import {Route, Switch} from "react-router";
import { BrowserRouter } from "react-router-dom";

import Header from 'components/Header';

import StartPage from "pages/StartPage";
import GamePageManager from "components/GamePageManager";
import LevelsPage from "pages/LevelsPage";
import ErrorPage from "pages/ErrorPage";

require('./global.css');

// the routes
ReactDOM.render(
  <BrowserRouter basename={"/" + (process.env.BRANCH_NAME === "master" ? "" : (process.env.CI_COMMIT_SHA || ""))}>
    <Header />
    <Switch>
      <Route path="/" exact component={StartPage} />
      <Route path="/levels" exact component={LevelsPage} />
      <Route path="/levels/:levelId" exact component={GamePageManager} />

      {/* Catch all unknown routes and show error page */}
      <Route component={ErrorPage} />
    </Switch>
  </BrowserRouter>,document.getElementById("app")
);
