export async function obtenerVehiculos(clienteId) {
  const response = await fetch('http://localhost:8080/backend/api/vehiculos?clienteId=' + clienteId);
  if (!response.ok) throw new Error('Error al obtener vehículos');
  return await response.json();
}
