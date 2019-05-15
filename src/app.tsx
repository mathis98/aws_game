import * as React from "react";
import * as ReactDOM from "react-dom";
import {Route, Switch} from "react-router";

import { StartPage } from "./pages/StartPage";
import { GamePage } from "./pages/GamePage";
import { LevelsPage } from "./pages/LevelsPage";
import { InstructionsPage } from "./pages/InstructionsPage";
import { BrowserRouter } from "react-router-dom";
import { ErrorPage } from "./pages/ErrorPage";

// the routes
ReactDOM.render(
  <BrowserRouter basename={"/" + (process.env.BRANCH_NAME === "master" ? "" : (process.env.CI_COMMIT_SHA || ""))}>
    <Switch>
      <Route path="/" exact component={StartPage} />
      <Route path="/game" exact component={GamePage} />
      <Route path="/levels" exact component={LevelsPage} />
      <Route path="/instruction" exact component={InstructionsPage} />

      /* Catch all unknown routes and show error page */}
      <Route component={ErrorPage} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("app")
);
