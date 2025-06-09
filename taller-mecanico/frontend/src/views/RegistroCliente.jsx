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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setCliente(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMensaje('Enviando...');
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold text-center mb-6">Registro de Cliente</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nombre completo</span>
            </label>
            <input 
              type="text"
              name="nombre"
              value={cliente.nombre}
              onChange={handleChange}
              placeholder="Ej: Juan Pérez"
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
              value={cliente.telefono}
              onChange={handleChange}
              placeholder="Ej: 912345678"
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
              value={cliente.direccion}
              onChange={handleChange}
              placeholder="Ej: Av. Principal 123"
              className="input input-bordered w-full"
              required
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">RUC</span>
            </label>
            <input 
              type="text"
              name="ruc"
              value={cliente.ruc}
              onChange={handleChange}
              placeholder="Ej: 80012345-6"
              className="input input-bordered w-full"
              required
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Tipo de Cliente</span>
            </label>
            <select 
              name="tipo"
              value={cliente.tipo}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="REGULAR">Regular</option>
              <option value="VIP">VIP</option>
            </select>
          </div>
          
          <div className="form-control mt-6">
            <button 
              type="submit" 
              className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Registrando...' : 'Registrar Cliente'}
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

export default RegistroCliente;
