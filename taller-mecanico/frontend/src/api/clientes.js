export async function obtenerClientes() {
  const response = await fetch('http://localhost:8080/backend/api/clientes');
  if (!response.ok) throw new Error('Error al obtener clientes');
  return await response.json();
}
