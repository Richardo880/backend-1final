import React, { useState, useEffect } from 'react';

const RegistroVehiculo = () => {
  const [clientes, setClientes] = useState([]);
  const [vehiculo, setVehiculo] = useState({
    marca: '',
    modelo: '',
    chapa: '',
    anho: '',
    tipo: 'COCHE',
    clienteId: ''
  });
  const [mensaje, setMensaje] = useState('');

  // Cargar clientes disponibles
  useEffect(() => {
    fetch('http://localhost:8080/backend/api/clientes')
      .then(res => res.json())
      .then(data => setClientes(data))
      .catch(() => setMensaje('❌ Error al obtener clientes'));
  }, []);

  // Manejar cambios en los inputs
  const handleChange = e => {
    const { name, value } = e.target;
    setVehiculo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMensaje('Enviando...');

    try {
      const response = await fetch('http://localhost:8080/backend/api/vehiculos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          marca: vehiculo.marca,
          modelo: vehiculo.modelo,
          chapa: vehiculo.chapa,
          anho: parseInt(vehiculo.anho),
          tipo: vehiculo.tipo,
          cliente: { id: parseInt(vehiculo.clienteId) }
        })
      });

      if (response.ok) {
        setMensaje('✅ Vehículo registrado correctamente.');
        setVehiculo({ marca: '', modelo: '', chapa: '', anho: '', tipo: 'COCHE', clienteId: '' });
      } else {
        setMensaje('❌ Error al registrar vehículo.');
      }
    } catch (error) {
      setMensaje('❌ Error de red al registrar vehículo.');
    }
  };

  return (
    <div className="consulta-container">
      <h2>Registro de Vehículo</h2>
      <form onSubmit={handleSubmit}>
        <input name="marca" value={vehiculo.marca} onChange={handleChange} placeholder="Marca" required />
        <input name="modelo" value={vehiculo.modelo} onChange={handleChange} placeholder="Modelo" required />
        <input name="chapa" value={vehiculo.chapa} onChange={handleChange} placeholder="Chapa" required />
        <input name="anho" value={vehiculo.anho} onChange={handleChange} placeholder="Año" type="number" required />

        <select name="tipo" value={vehiculo.tipo} onChange={handleChange}>
          <option value="MOTO">MOTO</option>
          <option value="COCHE">COCHE</option>
          <option value="CAMIONETA">CAMIONETA</option>
          <option value="CAMION">CAMION</option>
        </select>

        <select name="clienteId" value={vehiculo.clienteId} onChange={handleChange} required>
          <option value="">-- Seleccionar Cliente --</option>
          {clientes.map(cli => (
            <option key={cli.id} value={cli.id}>
              {cli.nombre} - {cli.ruc}
            </option>
          ))}
        </select>

        <button type="submit">Registrar Vehículo</button>
      </form>

      <p>{mensaje}</p>
    </div>
  );
};

export default RegistroVehiculo;
