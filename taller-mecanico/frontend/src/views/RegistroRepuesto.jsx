import React, { useState } from 'react';

const RegistroRepuesto = () => {
  const [repuesto, setRepuesto] = useState({
    codigo: '',
    nombre: ''
  });
  const [mensaje, setMensaje] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setRepuesto(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMensaje('Enviando...');
    try {
      const response = await fetch('http://localhost:8080/backend/api/repuestos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(repuesto)
      });
      if (response.ok) {
        setMensaje('✅ Repuesto registrado con éxito.');
        setRepuesto({ codigo: '', nombre: '' });
      } else {
        setMensaje('❌ Error al registrar repuesto.');
      }
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error de red al registrar repuesto.');
    }
  };

  return (
    <div className="consulta-container">
      <h2>Registro de Repuesto</h2>
      <form onSubmit={handleSubmit}>
        <input name="codigo" value={repuesto.codigo} onChange={handleChange} placeholder="Código" required />
        <input name="nombre" value={repuesto.nombre} onChange={handleChange} placeholder="Nombre del Repuesto" required />
        <button type="submit">Registrar</button>
      </form>
      <p>{mensaje}</p>
    </div>
  );
};

export default RegistroRepuesto;
