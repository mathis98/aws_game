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
  // This is a really quick and dirty solution
  // It might break the savegame under some specific conditions:
  // If
  // - the lambda takes more than 300 ms, which is the case like 2% of the time
  // - a reoccurring user logs back in
  // - and the post function finishes sooner than the post, which is around 50% of the time
  //
  // So if it happens to you... well sorry, but amazon took too long
  setTimeout(() => {
    saveSavegame((store.getState() as StateType));
  }, 300);
});

loadInitialSavegame();

export default store;
