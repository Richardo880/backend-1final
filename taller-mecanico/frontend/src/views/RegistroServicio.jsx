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

    const payload = {
      fecha: servicio.fecha,
      kilometraje: Number(servicio.kilometraje),
      descripcionGeneral: servicio.descripcionGeneral,
      costoTotal: servicio.detalles.reduce((s, d) => s + parseFloat(d.costo || 0), 0),
      vehiculo: { id: Number(servicio.vehiculoId) },
      detalles: servicio.detalles.map(d => ({
        descripcionTrabajo: d.descripcionTrabajo,
        costo: parseFloat(d.costo),
        mecanicos: d.mecanicos.map(id => ({ id })),
        repuestos: d.repuestos.map(id => ({ id }))
      }))
    };

    console.log("📤 Enviando payload:", payload);

    try {
      await registrarServicio(payload);
      alert("✅ Servicio registrado con éxito.");
      setMensaje('');
    } catch (error) {
        console.error("❌ Error al registrar servicio:", error);
        setMensaje('Error al registrar el servicio: ' + error.message);
      }
  };

  return (
    <form onSubmit={enviarFormulario}>
      <h2>Registrar Servicio</h2>

      <label>Cliente:</label>
      <select name="clienteId" value={servicio.clienteId} onChange={handleChange}>
        <option value="">Seleccione...</option>
        {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
      </select>

      <label>Vehículo:</label>
      <select name="vehiculoId" value={servicio.vehiculoId} onChange={handleChange}>
        <option value="">Seleccione...</option>
        {vehiculos.map(v => <option key={v.id} value={v.id}>{v.modelo} - {v.chapa}</option>)}
      </select>

      <label>Fecha:</label>
      <input type="date" name="fecha" value={servicio.fecha} onChange={handleChange} />

      <label>Kilometraje:</label>
      <input type="number" name="kilometraje" value={servicio.kilometraje} onChange={handleChange} />

      <label>Descripción general:</label>
      <textarea name="descripcionGeneral" value={servicio.descripcionGeneral} onChange={handleChange} />

      <h3>Detalles</h3>
      {servicio.detalles.map((detalle, index) => (
        <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <label>Descripción trabajo:</label>
          <input
            type="text"
            value={detalle.descripcionTrabajo}
            onChange={e => handleDetalleChange(index, 'descripcionTrabajo', e.target.value)}
          />

          <label>Costo:</label>
          <input
            type="number"
            value={detalle.costo}
            onChange={e => handleDetalleChange(index, 'costo', e.target.value)}
          />

          <label>Mecánicos:</label>
          <select multiple onChange={e => handleSelectMultiple(index, 'mecanicos', e.target.options)}>
            {mecanicos.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
          </select>

          <label>Repuestos:</label>
          <select multiple onChange={e => handleSelectMultiple(index, 'repuestos', e.target.options)}>
            {repuestos.map(r => <option key={r.id} value={r.id}>{r.nombre}</option>)}
          </select>
        </div>
      ))}

      <button type="button" onClick={agregarDetalle}>+ Agregar Detalle</button>
      <br /><br />
      <button type="submit">Registrar Servicio</button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
};

export default RegistroServicio;
