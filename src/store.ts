import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducers";
import preventWrongLevel from "./middleware/levels";
import { receiveInitialData, setUsername } from "./actions";
import { getSavegame, saveSavegame } from "./Storage/Savegame";
import { ScoreState } from "./reducers/score";
import { loadUsername } from "./Storage/LocalStorage";

export interface StateType {
  username: string;
  score: ScoreState;
}

const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(preventWrongLevel),
    ((window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()) || compose),
);

store.dispatch(setUsername(loadUsername() || ''));

const loadInitialSavegame = () => {
  getSavegame((store.getState() as StateType).username).then(data => store.dispatch(receiveInitialData(data)));
};

store.subscribe(() => {
  saveSavegame((store.getState() as StateType))
});

loadInitialSavegame();

export default store;
