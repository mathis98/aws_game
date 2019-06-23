import { LEVELS } from "levels/levels";

const url = "https://g8t2iybhtf.execute-api.eu-central-1.amazonaws.com/dev/score";

/**
 * Function that loads the serialized state from localStorage
 * @return the deserialized state on success or undefined on error
 */
export const loadState = async () => {
  // try {
  //   // load the serialized state from localStorage
  //   const serializedState = localStorage.getItem('state');
  //   // if no such thing return undefined
  //   if (serializedState == null) return undefined;
  //   // deserialize the state
  //   const state = JSON.parse(serializedState);
  //
  //   /**
  //    * if new levels where added since last play
  //    * add points 0 and 0 stars in levels array
  //    */
  //   if(state.score.score.length < LEVELS.length) {
  //     let temp = new Array(LEVELS.length - state.score.score.length)
  //       .fill({points: 0, stars: 0});
  //     state.score.score.append(temp);
  //   }
  //   return state;
  // } catch (e) {
  //   return undefined;
  // }

  const resp = await fetch(url);
  const json = JSON.parse((await resp.json()).data);

  return json;
};


/**
 * Function that saves a serialized representation of the state into localStorage
 * @param state The state to be saved
 * Errors could be logged but are rather ignored for brevity
 */
export const saveState = (state: any) => {
  // try {
  //   // serialize the state
  //   const serializedState = JSON.stringify(state);
  //   // save it in localStorage
  //   localStorage.setItem('state', serializedState);
  // } catch (e) {
  //   // ignore dem errors
  // }

  fetch(url, {method: "POST", body: JSON.stringify({data: state})})
    .then(resp => resp.json())
    .then(json => {
        console.log(json);
      },
    );
};
