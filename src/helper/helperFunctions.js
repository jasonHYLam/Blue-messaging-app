export async function fetchData(backendURL, method, data) {
  console.log("checking backend URL");
  console.log(`${import.meta.env.VITE_BACKEND_DOMAIN}`);
  const response = await fetch(
    // Domain has trailing /, so no need to include / between domain and backend URL.
    `${import.meta.env.VITE_BACKEND_DOMAIN}${backendURL}`,
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

export function checkIsMobileView() {
  return window.screen.width < 400;
}
