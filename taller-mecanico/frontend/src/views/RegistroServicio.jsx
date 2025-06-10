import React, { useEffect, useState } from 'react';
import { registrarServicio } from '../api/servicios';
import { obtenerClientes } from '../api/clientes';
import { obtenerVehiculos } from '../api/vehiculos';
import { obtenerMecanicos } from '../api/mecanicos';
import { obtenerRepuestos } from '../api/repuestos';

const RegistroServicio = () => {
  const [clientes, setClientes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [mecanicos, setMecanicos] = useState([]);
  const [repuestos, setRepuestos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [servicio, setServicio] = useState({
    clienteId: '',
    vehiculoId: '',
    fecha: '',
    kilometraje: '',
    descripcionGeneral: '',
    detalles: [
      {
        descripcionTrabajo: '',
        costo: '',
        mecanicos: [],
        repuestos: []
      }
    ]
  });

  useEffect(() => {
    obtenerClientes().then(setClientes);
    obtenerMecanicos().then(setMecanicos);
    obtenerRepuestos().then(setRepuestos);
  }, []);

  useEffect(() => {
    if (servicio.clienteId) {
      obtenerVehiculos(servicio.clienteId).then(setVehiculos);
    }
  }, [servicio.clienteId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServicio({ ...servicio, [name]: value });
  };

  const handleDetalleChange = (index, field, value) => {
    const nuevosDetalles = [...servicio.detalles];
    nuevosDetalles[index][field] = value;
    setServicio({ ...servicio, detalles: nuevosDetalles });
  };

  const handleSelectMultiple = (index, field, options) => {
    const selected = Array.from(options).filter(o => o.selected).map(o => Number(o.value));
    handleDetalleChange(index, field, selected);
  };

  const agregarDetalle = () => {
    setServicio({
      ...servicio,
      detalles: [...servicio.detalles, {
        descripcionTrabajo: '',
        costo: '',
        mecanicos: [],
        repuestos: []
      }]
    });
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validar que se haya seleccionado un vehículo
    if (!servicio.vehiculoId) {
      setMensaje('❌ Por favor seleccione un vehículo');
      setIsLoading(false);
      return;
    }

    // Validar que el vehículo existe en la lista
    const vehiculoSeleccionado = vehiculos.find(v => v.id === Number(servicio.vehiculoId));
    if (!vehiculoSeleccionado) {
      setMensaje('❌ El vehículo seleccionado no es válido');
      setIsLoading(false);
      return;
    }

    console.log("🚗 Vehículo seleccionado:", vehiculoSeleccionado);

    // Construir el payload
    const payload = {
      fecha: servicio.fecha,
      kilometraje: Number(servicio.kilometraje),
      descripcionGeneral: servicio.descripcionGeneral,
      costoTotal: servicio.detalles.reduce((s, d) => s + parseFloat(d.costo || 0), 0),
      vehiculo: {
        id: vehiculoSeleccionado.id,
        marca: vehiculoSeleccionado.marca,
        modelo: vehiculoSeleccionado.modelo,
        chapa: vehiculoSeleccionado.chapa,
        anho: vehiculoSeleccionado.anho,
        tipo: vehiculoSeleccionado.tipo
      },
      detalles: servicio.detalles.map(d => ({
        descripcionTrabajo: d.descripcionTrabajo,
        costo: parseFloat(d.costo || 0),
        mecanicos: d.mecanicos.map(id => ({ id: Number(id) })),
        repuestos: d.repuestos.map(id => ({ id: Number(id) }))
      }))
    };

    console.log("📤 Enviando payload completo:", JSON.stringify(payload, null, 2));

    try {
      const response = await registrarServicio(payload);
      console.log("✅ Respuesta del servidor:", response);
      setMensaje('✅ Servicio registrado con éxito.');
      // Limpiar el formulario después de un registro exitoso
      setServicio({
        clienteId: '',
        vehiculoId: '',
        fecha: '',
        kilometraje: '',
        descripcionGeneral: '',
        detalles: [{
          descripcionTrabajo: '',
          costo: '',
          mecanicos: [],
          repuestos: []
        }]
      });
    } catch (error) {
      console.error("❌ Error al registrar servicio:", error);
      setMensaje('❌ Error al registrar el servicio: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl max-w-4xl mx-auto">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold text-center mb-6">Registrar Servicio</h2>
        
        <form onSubmit={enviarFormulario} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Cliente:</span>
            </label>
            <select 
              name="clienteId" 
              value={servicio.clienteId} 
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Seleccione...</option>
              {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Vehículo:</span>
            </label>
            <select 
              name="vehiculoId" 
              value={servicio.vehiculoId} 
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Seleccione...</option>
              {vehiculos.map(v => <option key={v.id} value={v.id}>{v.modelo} - {v.chapa}</option>)}
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Fecha:</span>
            </label>
            <input 
              type="date" 
              name="fecha" 
              value={servicio.fecha} 
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Kilometraje:</span>
            </label>
            <input 
              type="number" 
              name="kilometraje" 
              value={servicio.kilometraje} 
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Ej: 50000"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Descripción general:</span>
            </label>
            <textarea 
              name="descripcionGeneral" 
              value={servicio.descripcionGeneral} 
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              placeholder="Describa el problema general del vehículo"
            />
          </div>

          <div className="divider">Detalles del servicio</div>
          
          {servicio.detalles.map((detalle, index) => (
            <div key={index} className="card bg-base-200 shadow-sm p-4 mb-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Descripción trabajo:</span>
                </label>
                <input
                  type="text"
                  value={detalle.descripcionTrabajo}
                  onChange={e => handleDetalleChange(index, 'descripcionTrabajo', e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Ej: Cambio de aceite"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Costo:</span>
                </label>
                <input
                  type="number"
                  value={detalle.costo}
                  onChange={e => handleDetalleChange(index, 'costo', e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Ej: 25000"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Mecánicos:</span>
                </label>
                <select 
                  multiple 
                  onChange={e => handleSelectMultiple(index, 'mecanicos', e.target.options)}
                  className="select select-bordered w-full h-32"
                >
                  {mecanicos.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
                </select>
                <span className="text-xs text-opacity-70 mt-1">Mantener Ctrl para selección múltiple</span>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Repuestos:</span>
                </label>
                <select 
                  multiple 
                  onChange={e => handleSelectMultiple(index, 'repuestos', e.target.options)}
                  className="select select-bordered w-full h-32"
                >
                  {repuestos.map(r => <option key={r.id} value={r.id}>{r.nombre}</option>)}
                </select>
                <span className="text-xs text-opacity-70 mt-1">Mantener Ctrl para selección múltiple</span>
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <button 
              type="button" 
              onClick={agregarDetalle} 
              className="btn btn-outline btn-sm"
            >
              + Agregar Detalle
            </button>
          </div>
          
          <div className="form-control mt-6">
            <button 
              type="submit" 
              className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Registrando...' : 'Registrar Servicio'}
            </button>
          </div>
        </form>
        
        {mensaje && (
          <div className={`alert ${mensaje.includes('✅') ? 'alert-success' : 'alert-error'} mt-4`}>
            <div>
              <span>{mensaje}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistroServicio;
