const apiUrl = "https://api.slsgame.janbe.eu/score";

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
