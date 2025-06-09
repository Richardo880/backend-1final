export async function obtenerMecanicos() {
  const response = await fetch('http://localhost:8080/backend/api/mecanicos');
  if (!response.ok) throw new Error('Error al obtener mecánicos');
  return await response.json();
}
