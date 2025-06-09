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
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Resumen General</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-xl">
              <span className="text-2xl mr-2">📋</span> Clientes
              <div className="badge badge-primary">{clientes.length}</div>
            </h3>
            
            <div className="overflow-x-auto max-h-80 overflow-y-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Teléfono</th>
                    <th>RUC</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map(c => (
                    <tr key={c.id} className="hover">
                      <td>{c.nombre}</td>
                      <td>{c.telefono}</td>
                      <td>{c.ruc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-xl">
              <span className="text-2xl mr-2">🚗</span> Vehículos
              <div className="badge badge-primary">{vehiculos.length}</div>
            </h3>
            
            <div className="overflow-x-auto max-h-80 overflow-y-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Chapa</th>
                    <th>Cliente</th>
                  </tr>
                </thead>
                <tbody>
                  {vehiculos.map(v => (
                    <tr key={v.id} className="hover">
                      <td>{v.marca}</td>
                      <td>{v.modelo}</td>
                      <td>{v.chapa}</td>
                      <td>
                        <div className="badge badge-ghost">ID: {v.cliente?.id}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-xl">
              <span className="text-2xl mr-2">🧰</span> Mecánicos
              <div className="badge badge-primary">{mecanicos.length}</div>
            </h3>
            
            <div className="overflow-x-auto max-h-80 overflow-y-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Especialidad</th>
                    <th>Fecha Ingreso</th>
                  </tr>
                </thead>
                <tbody>
                  {mecanicos.map(m => (
                    <tr key={m.id} className="hover">
                      <td>{m.nombre}</td>
                      <td>{m.especialidad}</td>
                      <td>{m.fechaIngreso}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-xl">
              <span className="text-2xl mr-2">🔧</span> Repuestos
              <div className="badge badge-primary">{repuestos.length}</div>
            </h3>
            
            <div className="overflow-x-auto max-h-80 overflow-y-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  {repuestos.map(r => (
                    <tr key={r.id} className="hover">
                      <td>{r.codigo}</td>
                      <td>{r.nombre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumenGeneral;
