const apiUrl = "https://g8t2iybhtf.execute-api.eu-central-1.amazonaws.com/dev/score";

export async function getStateFromBackend(username: string) {
  const resp = await fetch(apiUrl + "?user=" + username);
  return (await resp.json()).data;
}

export function saveStateToBackend(state: any) {
  fetch(apiUrl, {method: "POST", body: JSON.stringify({data: state})})
    .then(resp => resp.json())
    .then(json => {
        console.log(json);
      },
    );
}
