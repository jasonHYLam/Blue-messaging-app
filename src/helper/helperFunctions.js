export function fetchData(backendURL, method, data) {

  fetch(`${ import.meta.env.VITE_BACKEND_URL }/${ backendURL }`, {
    method: method,
    mode: "cors",
    credentials: "include",
    body: data
  })

}