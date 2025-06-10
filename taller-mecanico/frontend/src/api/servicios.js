export const registrarServicio = async (datos) => {
  const resp = await fetch('http://localhost:8080/backend/api/servicios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });

  const contentType = resp.headers.get("content-type");
  let errorMessage;

  if (contentType && contentType.includes("application/json")) {
    const json = await resp.json();
    if (!resp.ok) {
      errorMessage = json.error || `Error HTTP ${resp.status}`;
    }
  } else {
    const text = await resp.text();
    if (!resp.ok) {
      errorMessage = text || `Error HTTP ${resp.status}`;
    }
  }

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  return resp.ok;
};
