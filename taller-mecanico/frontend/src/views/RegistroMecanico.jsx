import React, { useState } from 'react';

const RegistroMecanico = () => {
  const [mecanico, setMecanico] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    fechaIngreso: '',
    especialidad: ''
  });
  const [mensaje, setMensaje] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setMecanico(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMensaje('Enviando...');
    try {
      const response = await fetch('http://localhost:8080/backend/api/mecanicos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mecanico)
      });
      if (response.ok) {
        setMensaje('✅ Mecánico registrado con éxito.');
        setMecanico({ nombre: '', direccion: '', telefono: '', fechaIngreso: '', especialidad: '' });
      } else {
        setMensaje('❌ Error al registrar mecánico.');
      }
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error de red al registrar mecánico.');
    }
  };

  return (
    <div className="consulta-container">
      <h2>Registro de Mecánico</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre" value={mecanico.nombre} onChange={handleChange} placeholder="Nombre" required />
        <input name="direccion" value={mecanico.direccion} onChange={handleChange} placeholder="Dirección" required />
        <input name="telefono" value={mecanico.telefono} onChange={handleChange} placeholder="Teléfono" required />
        <input type="date" name="fechaIngreso" value={mecanico.fechaIngreso} onChange={handleChange} required />
        <input name="especialidad" value={mecanico.especialidad} onChange={handleChange} placeholder="Especialidad" required />
        <button type="submit">Registrar</button>
      </form>
      <p>{mensaje}</p>
    </div>
  );
};

export default RegistroMecanico;
