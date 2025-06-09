import React, { useState } from 'react';

const RegistroCliente = () => {
  const [cliente, setCliente] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    ruc: '',
    tipo: 'REGULAR'
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setCliente(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMensaje('Enviando...');

    try {
      const response = await fetch('http://localhost:8080/backend/api/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
      });

      if (response.ok) {
        setMensaje('✅ Cliente registrado correctamente.');
        setCliente({ nombre: '', telefono: '', direccion: '', ruc: '', tipo: 'REGULAR' });
      } else {
        setMensaje('❌ Error al registrar cliente.');
      }
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error de red al registrar cliente.');
    }
  };

  return (
    <div className="consulta-container">
      <h2>Registro de Cliente</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre" value={cliente.nombre} onChange={handleChange} placeholder="Nombre" required />
        <input name="telefono" value={cliente.telefono} onChange={handleChange} placeholder="Teléfono" required />
        <input name="direccion" value={cliente.direccion} onChange={handleChange} placeholder="Dirección" required />
        <input name="ruc" value={cliente.ruc} onChange={handleChange} placeholder="RUC" required />
        <select name="tipo" value={cliente.tipo} onChange={handleChange}>
          <option value="REGULAR">REGULAR</option>
          <option value="VIP">VIP</option>
        </select>
        <button type="submit">Registrar Cliente</button>
      </form>
      <p>{mensaje}</p>
    </div>
  );
};

export default RegistroCliente;
