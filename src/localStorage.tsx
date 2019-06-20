const url = "https://g8t2iybhtf.execute-api.eu-central-1.amazonaws.com/dev/score";

export const loadState = () => {
  // try {
  //   const serializedState = localStorage.getItem('state');
  //   if (serializedState == null) return undefined;
  //   return JSON.parse(serializedState);
  // } catch (e) {
  //   return undefined;
  // }

  let data = {};
  fetch(url).then((resp) => {
    resp.json().then(json => {
      data = JSON.parse(json.data);
      console.log("data", data);
    });
  });

  return data;
};

export const saveState = (state: any) => {
  // console.log("state", state);
  //
  // try {
  //   const serializedState = JSON.stringify(state);
  //   localStorage.setItem('state', serializedState);
  // } catch (e) {
  //   // ignore dem errors
  // }

  fetch(url, {method: "POST", body: JSON.stringify({data: state})}).then(resp => {
    resp.json().then(json => {
      console.log(json);
    });
  });
};
