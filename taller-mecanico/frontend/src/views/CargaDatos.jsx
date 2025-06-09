import React, { useState } from 'react';

const CargaDatos = () => {
  const [mensaje, setMensaje] = useState('');

  const cargarDatos = async () => {
    setMensaje('Cargando datos...');

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
    }
  };

  return (
    <div className="consulta-container">
      <h2>Carga de Datos de Prueba</h2>
      <button onClick={cargarDatos}>Cargar Datos</button>
      <p>{mensaje}</p>
    </div>
  );
};

export default CargaDatos;
