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
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Consulta de Servicios</h2>

      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h3 className="card-title text-lg">Filtros de búsqueda</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Cliente</span>
              </label>
              <select 
                value={clienteId} 
                onChange={e => setClienteId(e.target.value)} 
                className="select select-bordered w-full"
              >
                <option value="">Todos los clientes</option>
                {clientes.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Fecha desde</span>
              </label>
              <input 
                type="date" 
                value={fechaDesde} 
                onChange={e => setFechaDesde(e.target.value)} 
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control justify-end items-end">
              <button 
                onClick={buscarServicios} 
                className="btn btn-primary mt-8"
              >
                Buscar Servicios
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-lg">Servicios encontrados</h3>
            
            {servicios.length === 0 ? (
              <div className="alert alert-info">
                <span>No hay servicios que mostrar. Realiza una búsqueda.</span>
              </div>
            ) : (
              <div className="overflow-y-auto max-h-96">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Descripción</th>
                      <th>Costo</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicios.map(s => (
                      <tr key={s.id} className="hover">
                        <td>{s.fecha}</td>
                        <td className="truncate max-w-xs">{s.descripcionGeneral}</td>
                        <td>${s.costoTotal}</td>
                        <td>
                          <button 
                            onClick={() => seleccionarServicio(s.id)} 
                            className="btn btn-sm btn-outline"
                          >
                            Ver detalles
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-lg">Detalles del servicio</h3>
            
            {servicioSeleccionado ? (
              <div className="overflow-y-auto max-h-96">
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="stat">
                    <div className="stat-title">Fecha</div>
                    <div className="stat-value text-lg">{servicioSeleccionado.fecha}</div>
                  </div>
                  
                  <div className="stat">
                    <div className="stat-title">Kilometraje</div>
                    <div className="stat-value text-lg">{servicioSeleccionado.kilometraje}</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold">Descripción general</h4>
                  <p className="bg-base-200 p-2 rounded">{servicioSeleccionado.descripcionGeneral}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-primary">Costo total</h4>
                  <p className="text-xl font-bold">${servicioSeleccionado.costoTotal}</p>
                </div>
                
                <div className="divider">Detalles de trabajos realizados</div>
                
                <div className="space-y-4">
                  {servicioSeleccionado.detalles.map((d, i) => (
                    <div key={i} className="card bg-base-200 shadow-sm">
                      <div className="card-body p-4">
                        <h3 className="card-title text-sm">{d.descripcionTrabajo}</h3>
                        <p className="text-right font-bold">${d.costo}</p>
                        
                        <div className="mt-2 text-sm">
                          <div className="mb-1">
                            <span className="font-semibold">Mecánicos:</span> 
                            <span className="badge badge-ghost ml-1">
                              {d.mecanicos.map(m => m.nombre).join(', ') || 'Ninguno'}
                            </span>
                          </div>
                          
                          <div>
                            <span className="font-semibold">Repuestos:</span> 
                            <span className="badge badge-ghost ml-1">
                              {d.repuestos.map(r => r.nombre).join(', ') || 'Ninguno'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="alert alert-info">
                <span>Selecciona un servicio para ver sus detalles.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultaHistorico;
