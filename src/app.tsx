import * as React from "react";
import * as ReactDOM from "react-dom";
import {Route, Switch} from "react-router";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose } from 'redux';
import preventWrongLevel from './middleware/levels';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import { loadState, saveState } from './localStorage';

import Header from 'components/Header';

import StartPage from "pages/StartPage";
import GamePageManager from "components/GamePageManager";
import LevelsPage from "pages/LevelsPage";
import ErrorPage from "pages/ErrorPage";
import { receiveInitialData } from "./actions";

require('./global.css');

const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(preventWrongLevel),
    ((window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()) || compose),
);

const persistedState = loadState().then(data => store.dispatch(receiveInitialData(data)));

store.subscribe(() => {
  saveState(store.getState())
})

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={"/" + (process.env.BRANCH_NAME === "master" ? "" : (process.env.CI_COMMIT_SHA || ""))}>
      <Header />
      <Switch>
        <Route path="/" exact component={StartPage} />
        <Route path="/levels" exact component={LevelsPage} />
        <Route path="/levels/:levelId" exact component={GamePageManager} />

          {/* Catch all unknown routes and show error page */}
          <Route component={ErrorPage} />
        </Switch>
      </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);
