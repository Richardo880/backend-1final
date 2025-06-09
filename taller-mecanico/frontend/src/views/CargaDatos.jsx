import React, { useState } from 'react';

const CargaDatos = () => {
  const [mensaje, setMensaje] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const cargarDatos = async () => {
    setMensaje('Cargando datos...');
    setIsLoading(true);

    try {
      // Crear cliente
      const clienteResp = await fetch('http://localhost:8080/backend/api/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: 'Juan Pérez',
          telefono: '0981123456',
          direccion: 'Av. Central 123',
          ruc: '1234567-8',
          tipo: 'REGULAR'
        })
      });

      if (!clienteResp.ok) throw new Error('Error creando cliente');

      let cliente;
      try {
        cliente = await clienteResp.json(); // solo si el backend devuelve JSON
      } catch {
        // fallback en caso de no haber contenido
        setMensaje('⚠ Cliente creado, pero no se pudo leer el ID. Creá el vehículo manualmente.');
        return;
      }

      // Crear vehículo
      const vehiculoResp = await fetch('http://localhost:8080/backend/api/vehiculos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          marca: 'Toyota',
          modelo: 'Hilux',
          chapa: 'ABC123',
          anho: 2020,
          tipo: 'CAMIONETA',
          cliente: { id: cliente.id }
        })
      });

      if (!vehiculoResp.ok) throw new Error('Error creando vehículo');

      // Crear mecánico
      const mecanicoResp = await fetch('http://localhost:8080/backend/api/mecanicos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: 'Carlos Méndez',
          direccion: 'Calle Taller 123',
          telefono: '0989123456',
          fechaIngreso: '2022-05-01',
          especialidad: 'Mecánica general'
        })
      });

      if (!mecanicoResp.ok) throw new Error('Error creando mecánico');

      // Crear repuesto
      const repuestoResp = await fetch('http://localhost:8080/backend/api/repuestos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          codigo: 'RPT123',
          nombre: 'Filtro de aceite'
        })
      });

      if (!repuestoResp.ok) throw new Error('Error creando repuesto');

      setMensaje('✅ Datos cargados con éxito.');
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al cargar datos: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold text-center mb-6">Carga de Datos de Prueba</h2>
        
        <div className="space-y-6">
          <div className="bg-base-200 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Datos que se cargarán:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Cliente: Juan Pérez</li>
              <li>Vehículo: Toyota Hilux (ABC123)</li>
              <li>Mecánico: Carlos Méndez</li>
              <li>Repuesto: Filtro de aceite (RPT123)</li>
            </ul>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={cargarDatos} 
              className={`btn btn-primary btn-lg ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Cargando...' : 'Cargar Datos de Prueba'}
            </button>
          </div>
          
          {mensaje && (
            <div className={`alert ${
              mensaje.includes('✅') ? 'alert-success' : 
              mensaje.includes('⚠') ? 'alert-warning' : 
              mensaje.includes('❌') ? 'alert-error' : 
              'alert-info'
            } mt-4`}>
              <div>
                <span>{mensaje}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CargaDatos;
