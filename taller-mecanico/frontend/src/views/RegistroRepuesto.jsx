import React, { useState } from 'react';

const RegistroRepuesto = () => {
  const [repuesto, setRepuesto] = useState({
    nombre: '',
    descripcion: '',
    precio: ''
  });
  const [mensaje, setMensaje] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setRepuesto(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMensaje('Enviando...');
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:8080/backend/api/repuestos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: repuesto.nombre,
          descripcion: repuesto.descripcion,
          precio: parseFloat(repuesto.precio)
        })
      });
      if (response.ok) {
        setMensaje('✅ Repuesto registrado con éxito.');
        setRepuesto({ nombre: '', descripcion: '', precio: '' });
      } else {
        setMensaje('❌ Error al registrar repuesto.');
      }
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error de red al registrar repuesto.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold text-center mb-6">Registro de Repuesto</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nombre del Repuesto</span>
            </label>
            <input 
              type="text"
              name="nombre"
              value={repuesto.nombre}
              onChange={handleChange}
              placeholder="Ej: Filtro de aceite"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Descripción</span>
            </label>
            <textarea 
              name="descripcion"
              value={repuesto.descripcion}
              onChange={handleChange}
              placeholder="Ej: Filtro de aceite sintético de alta calidad"
              className="textarea textarea-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Precio</span>
            </label>
            <input 
              type="number"
              name="precio"
              value={repuesto.precio}
              onChange={handleChange}
              placeholder="Ej: 25000"
              className="input input-bordered w-full"
              required
              min="0"
              step="0.01"
            />
          </div>
          
          <div className="form-control mt-6">
            <button 
              type="submit" 
              className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Registrando...' : 'Registrar Repuesto'}
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

export default RegistroRepuesto;
