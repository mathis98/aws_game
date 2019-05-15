import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route } from "react-router";

import { StartPage } from "./pages/StartPage";
import { GamePage } from "./pages/GamePage";
import { LevelsPage } from "./pages/LevelsPage";
import { InstructionsPage } from "./pages/InstructionsPage";
import {BrowserRouter} from "react-router-dom";

console.log(process.env.HMM1);
console.log(process.env.HMM2);
console.log(process.env.PUBLIC_URL);
console.log(process.env.AWS_DEFAULT_REGION);
console.log("hmm");

// the routes
ReactDOM.render(
  <BrowserRouter basename={"/" + process.env.PUBLIC_URL}>
    <Route path="/" exact component={StartPage} />
    <Route path="/game" exact component={GamePage} />
    <Route path="/levels" exact component={LevelsPage} />
    <Route path="/instruction" exact component={InstructionsPage} />
  </BrowserRouter>,
  document.getElementById("app")
);
