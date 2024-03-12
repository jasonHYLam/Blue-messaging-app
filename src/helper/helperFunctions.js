export async function fetchData(backendURL, method, data) {

  const response = await fetch(`${ import.meta.env.VITE_BACKEND_URL }/${ backendURL }`, {
    method: method,
    mode: "cors",
    credentials: "include",
    body: data
  })

  return response
}