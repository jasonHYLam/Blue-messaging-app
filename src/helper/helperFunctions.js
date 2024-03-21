export async function fetchData(backendURL, method, data) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/${backendURL}`,
    {
      method: method,
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: data,
    },
  );

  return response;
}

export async function fetchDataWithImageUpload(backendURL, method, data) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/${backendURL}`,
    {
      method: method,
      mode: "cors",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Credentials": true,
      },
      body: data,
    },
  );

  return response;
}
