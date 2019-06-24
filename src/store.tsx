import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducers";
import preventWrongLevel from "./middleware/levels";
import { loadState, saveState } from "./localStorage";
import { receiveInitialData } from "./actions";

const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(preventWrongLevel),
    ((window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()) || compose),
);
loadInitialScore();

store.subscribe(() => {
  saveState(store.getState())
});

function loadInitialScore() {
  loadState(store.getState()).then(data => store.dispatch(receiveInitialData(data)));
}

export default store;
