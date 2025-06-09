export const registrarServicio = async (datos) => {
  const resp = await fetch('http://localhost:8080/backend/api/servicios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });

  if (!resp.ok) {
    const errorText = await resp.text();
    throw new Error(`HTTP ${resp.status}: ${errorText}`);
  }

  // Solo intentar parsear JSON si hay contenido
  const contentType = resp.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await resp.json();
  }

  return null; // O resp.text() si esperás texto plano
};
