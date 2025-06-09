import React, { useState, useEffect } from 'react';
import { obtenerClientes } from '../api/clientes';

const ConsultaHistorico = () => {
  const [clientes, setClientes] = useState([]);
  const [clienteId, setClienteId] = useState('');
  const [fechaDesde, setFechaDesde] = useState('');
  const [servicios, setServicios] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  useEffect(() => {
    obtenerClientes().then(setClientes);
  }, []);

  const buscarServicios = async () => {
    let url = 'http://localhost:8080/backend/api/servicios/filtro';
    const params = [];

    if (clienteId) params.push(`clienteId=${clienteId}`);
    if (fechaDesde) params.push(`fechaDesde=${fechaDesde}`);
    if (params.length > 0) url += '?' + params.join('&');

    const response = await fetch(url);
    if (!response.ok) {
      alert('Error al obtener servicios');
      return;
    }

    const data = await response.json();
    setServicios(data);
    setServicioSeleccionado(null);
  };

  const seleccionarServicio = async (id) => {
    const response = await fetch(`http://localhost:8080/backend/api/servicios/${id}`);
    if (!response.ok) {
      alert('Error al obtener detalles del servicio');
      return;
    }
    const data = await response.json();
    setServicioSeleccionado(data);
  };

  return (
    <div>
      <h2>Consulta de Servicios</h2>

      <label>Cliente:</label>
      <select value={clienteId} onChange={e => setClienteId(e.target.value)}>
        <option value="">Todos</option>
        {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
      </select>

      <label>Fecha desde:</label>
      <input type="date" value={fechaDesde} onChange={e => setFechaDesde(e.target.value)} />

      <button onClick={buscarServicios}>Buscar</button>

      <h3>Resultados</h3>
      <ul>
        {servicios.map(s => (
          <li key={s.id}>
            <button onClick={() => seleccionarServicio(s.id)}>
              {s.fecha} - {s.descripcionGeneral} - ${s.costoTotal}
            </button>
          </li>
        ))}
      </ul>

      {servicioSeleccionado && (
        <div>
          <h3>Detalles del servicio</h3>
          <p><strong>Fecha:</strong> {servicioSeleccionado.fecha}</p>
          <p><strong>Kilometraje:</strong> {servicioSeleccionado.kilometraje}</p>
          <p><strong>Descripción:</strong> {servicioSeleccionado.descripcionGeneral}</p>
          <p><strong>Costo Total:</strong> ${servicioSeleccionado.costoTotal}</p>

          {servicioSeleccionado.detalles.map((d, i) => (
            <div key={i} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
              <p><strong>Trabajo:</strong> {d.descripcionTrabajo}</p>
              <p><strong>Costo:</strong> ${d.costo}</p>

              <p><strong>Repuestos:</strong> {d.repuestos.map(r => r.nombre).join(', ')}</p>
              <p><strong>Mecánicos:</strong> {d.mecanicos.map(m => m.nombre).join(', ')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConsultaHistorico;
