import React, { useEffect, useState } from 'react';

const ResumenGeneral = () => {
  const [clientes, setClientes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [mecanicos, setMecanicos] = useState([]);
  const [repuestos, setRepuestos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/backend/api/clientes')
      .then(res => res.json())
      .then(setClientes)
      .catch(err => console.error('Error cargando clientes', err));

    fetch('http://localhost:8080/backend/api/vehiculos')
      .then(res => res.json())
      .then(setVehiculos)
      .catch(err => console.error('Error cargando vehículos', err));

    fetch('http://localhost:8080/backend/api/mecanicos')
      .then(res => res.json())
      .then(setMecanicos)
      .catch(err => console.error('Error cargando mecánicos', err));

    fetch('http://localhost:8080/backend/api/repuestos')
      .then(res => res.json())
      .then(setRepuestos)
      .catch(err => console.error('Error cargando repuestos', err));
  }, []);

  return (
    <div className="consulta-container">
      <h2>Resumen General</h2>

      <section>
        <h3>📋 Clientes</h3>
        <ul>
          {clientes.map(c => (
            <li key={c.id}>{c.nombre} - {c.telefono} - {c.ruc}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>🚗 Vehículos</h3>
        <ul>
          {vehiculos.map(v => (
            <li key={v.id}>{v.marca} {v.modelo} ({v.chapa}) - Cliente ID: {v.cliente?.id}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>🧰 Mecánicos</h3>
        <ul>
          {mecanicos.map(m => (
            <li key={m.id}>{m.nombre} - {m.especialidad} - {m.fechaIngreso}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>🔧 Repuestos</h3>
        <ul>
          {repuestos.map(r => (
            <li key={r.id}>{r.codigo} - {r.nombre}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ResumenGeneral;
