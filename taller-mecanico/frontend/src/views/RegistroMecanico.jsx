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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setMecanico(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold text-center mb-6">Registro de Mecánico</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nombre completo</span>
            </label>
            <input 
              type="text"
              name="nombre"
              value={mecanico.nombre}
              onChange={handleChange}
              placeholder="Ej: Juan Pérez"
              className="input input-bordered w-full"
              required
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Dirección</span>
            </label>
            <input 
              type="text"
              name="direccion"
              value={mecanico.direccion}
              onChange={handleChange}
              placeholder="Ej: Av. Principal 123"
              className="input input-bordered w-full"
              required
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Teléfono</span>
            </label>
            <input 
              type="tel"
              name="telefono"
              value={mecanico.telefono}
              onChange={handleChange}
              placeholder="Ej: 912345678"
              className="input input-bordered w-full"
              required
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Fecha de ingreso</span>
            </label>
            <input 
              type="date"
              name="fechaIngreso"
              value={mecanico.fechaIngreso}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Especialidad</span>
            </label>
            <input 
              type="text"
              name="especialidad"
              value={mecanico.especialidad}
              onChange={handleChange}
              placeholder="Ej: Electrónica automotriz"
              className="input input-bordered w-full"
              required
            />
          </div>
          
          <div className="form-control mt-6">
            <button 
              type="submit" 
              className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Registrando...' : 'Registrar Mecánico'}
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

export default RegistroMecanico;
