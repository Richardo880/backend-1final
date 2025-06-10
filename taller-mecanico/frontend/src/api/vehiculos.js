export async function obtenerVehiculos(clienteId) {
  if (!clienteId) {
    console.warn("⚠️ Se intentó obtener vehículos sin ID de cliente");
    return [];
  }

  console.log("🔍 Obteniendo vehículos para cliente:", clienteId);
  
  const response = await fetch('http://localhost:8080/backend/api/vehiculos?clienteId=' + clienteId);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error("❌ Error al obtener vehículos:", errorText);
    throw new Error('Error al obtener vehículos: ' + errorText);
  }

  const vehiculos = await response.json();
  console.log("✅ Vehículos obtenidos:", vehiculos);
  
  return vehiculos;
}
