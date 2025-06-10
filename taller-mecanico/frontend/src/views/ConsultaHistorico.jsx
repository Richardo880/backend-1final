import React, { useState, useEffect } from 'react';
import { obtenerClientes } from '../api/clientes';

const ConsultaHistorico = () => {
  const [clientes, setClientes] = useState([]);
  const [clienteId, setClienteId] = useState('');
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [fechaDesde, setFechaDesde] = useState('');
  const [servicios, setServicios] = useState([]);
  const [servicioExpandido, setServicioExpandido] = useState(null);

  useEffect(() => {
    obtenerClientes().then(data => {
      setClientes(data);
    });
  }, []);

  const buscarServicios = async () => {
    let url = 'http://localhost:8080/backend/api/servicios/filtro';
    const params = [];

    if (clienteId) {
      params.push(`cliente=${clienteId}`);
      // Encontrar el cliente seleccionado para mostrar su nombre
      const cliente = clientes.find(c => c.id === parseInt(clienteId));
      setClienteSeleccionado(cliente);
    } else {
      setClienteSeleccionado(null);
    }
    
    if (fechaDesde) params.push(`fechaInicio=${fechaDesde}`);
    if (params.length > 0) url += '?' + params.join('&');

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al obtener servicios');
      }
      const data = await response.json();
      console.log('Servicios obtenidos:', data);
      setServicios(data);
      setServicioExpandido(null);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al obtener servicios: ' + error.message);
    }
  };

  const getMensajeResultados = () => {
    if (servicios.length === 0) {
      if (clienteSeleccionado) {
        return `El cliente ${clienteSeleccionado.nombre} no tiene servicios registrados`;
      }
      return 'No se encontraron servicios con los filtros seleccionados';
    }
    
    if (clienteSeleccionado) {
      return `Se encontraron ${servicios.length} servicio(s) para el cliente ${clienteSeleccionado.nombre}`;
    }
    return `Se encontraron ${servicios.length} servicio(s)`;
  };

  const toggleDetalles = async (servicio) => {
    console.log('Toggle detalles para servicio:', servicio);
    if (servicioExpandido?.id === servicio.id) {
      console.log('Cerrando detalles');
      setServicioExpandido(null);
    } else {
      try {
        console.log('Obteniendo detalles del servicio:', servicio.id);
        const response = await fetch(`http://localhost:8080/backend/api/servicios/${servicio.id}`);
        if (!response.ok) {
          throw new Error('Error al obtener detalles del servicio');
        }
        const detalles = await response.json();
        console.log('Detalles obtenidos:', detalles);
        setServicioExpandido(detalles);
      } catch (error) {
        console.error('Error:', error);
        alert('Error al obtener detalles del servicio: ' + error.message);
      }
    }
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
                onChange={e => {
                  setClienteId(e.target.value);
                  setClienteSeleccionado(null);
                  setServicios([]);
                }} 
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
                onChange={e => {
                  setFechaDesde(e.target.value);
                  setServicios([]);
                }} 
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

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title text-lg">Servicios encontrados</h3>
          
          {servicios.length === 0 ? (
            <div className={`alert ${clienteSeleccionado ? 'alert-warning' : 'alert-info'}`}>
              <span>{getMensajeResultados()}</span>
            </div>
          ) : (
            <>
              <div className="alert alert-success mb-4">
                <span>{getMensajeResultados()}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Descripción</th>
                      <th>Costo</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicios.map(servicio => (
                      <React.Fragment key={servicio.id}>
                        <tr className="hover">
                          <td>{new Date(servicio.fecha).toLocaleDateString()}</td>
                          <td className="truncate max-w-xs">{servicio.descripcionGeneral}</td>
                          <td>${servicio.costoTotal.toLocaleString()}</td>
                          <td>
                            <button 
                              onClick={() => toggleDetalles(servicio)} 
                              className={`btn btn-sm ${servicioExpandido?.id === servicio.id ? 'btn-primary' : 'btn-outline'}`}
                            >
                              {servicioExpandido?.id === servicio.id ? 'Ocultar detalles' : 'Ver detalles'}
                            </button>
                          </td>
                        </tr>
                        {servicioExpandido?.id === servicio.id && (
                          <tr>
                            <td colSpan="4" className="bg-base-200">
                              <div className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-bold mb-2">Información del Servicio</h4>
                                    <p><strong>Fecha:</strong> {new Date(servicioExpandido.fecha).toLocaleDateString()}</p>
                                    <p><strong>Kilometraje:</strong> {servicioExpandido.kilometraje.toLocaleString()} km</p>
                                    <p><strong>Costo Total:</strong> ${servicioExpandido.costoTotal.toLocaleString()}</p>
                                  </div>
                                  {servicioExpandido.vehiculo && (
                                    <div>
                                      <h4 className="font-bold mb-2">Información del Vehículo</h4>
                                      <p><strong>Marca:</strong> {servicioExpandido.vehiculo.marca}</p>
                                      <p><strong>Modelo:</strong> {servicioExpandido.vehiculo.modelo}</p>
                                      <p><strong>Chapa:</strong> {servicioExpandido.vehiculo.chapa}</p>
                                      <p><strong>Año:</strong> {servicioExpandido.vehiculo.anio}</p>
                                    </div>
                                  )}
                                </div>

                                <div className="mt-4">
                                  <h4 className="font-bold mb-2">Descripción General</h4>
                                  <p className="bg-base-100 p-3 rounded">{servicioExpandido.descripcionGeneral}</p>
                                </div>

                                <div className="mt-4">
                                  <h4 className="font-bold mb-2">Trabajos Realizados</h4>
                                  <div className="overflow-x-auto">
                                    <table className="table w-full">
                                      <thead>
                                        <tr>
                                          <th className="w-1/3">Descripción</th>
                                          <th className="w-1/4">Costo</th>
                                          <th className="w-1/4">Mecánicos</th>
                                          <th className="w-1/4">Repuestos</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {servicioExpandido.detalles && servicioExpandido.detalles.length > 0 ? (
                                          servicioExpandido.detalles.map((detalle, index) => (
                                            <tr key={index} className="hover">
                                              <td className="font-medium">{detalle.descripcionTrabajo}</td>
                                              <td className="font-bold">${detalle.costo.toLocaleString()}</td>
                                              <td>
                                                {detalle.mecanicos && detalle.mecanicos.length > 0 ? (
                                                  <div className="flex flex-wrap gap-1">
                                                    {detalle.mecanicos.map((m, i) => (
                                                      <div key={i} className="badge badge-primary badge-sm">
                                                        {m.nombre}
                                                      </div>
                                                    ))}
                                                  </div>
                                                ) : (
                                                  <span className="text-gray-500 text-sm">Sin mecánicos asignados</span>
                                                )}
                                              </td>
                                              <td>
                                                {detalle.repuestos && detalle.repuestos.length > 0 ? (
                                                  <div className="flex flex-wrap gap-1">
                                                    {detalle.repuestos.map((r, i) => (
                                                      <div key={i} className="badge badge-secondary badge-sm">
                                                        {r.nombre}
                                                      </div>
                                                    ))}
                                                  </div>
                                                ) : (
                                                  <span className="text-gray-500 text-sm">Sin repuestos utilizados</span>
                                                )}
                                              </td>
                                            </tr>
                                          ))
                                        ) : (
                                          <tr>
                                            <td colSpan="4" className="text-center text-gray-500 py-4">
                                              No hay trabajos registrados para este servicio
                                            </td>
                                          </tr>
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultaHistorico;
