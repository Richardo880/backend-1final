export async function obtenerRepuestos() {
  const response = await fetch('http://localhost:8080/backend/api/repuestos');
  if (!response.ok) throw new Error('Error al obtener repuestos');
  return await response.json();
}
