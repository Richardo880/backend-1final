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
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold text-center mb-6">Registro de Vehículo</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Marca</span>
            </label>
            <input 
              type="text"
              name="marca"
              value={vehiculo.marca}
              onChange={handleChange}
              placeholder="Ej: Toyota"
              className="input input-bordered w-full"
              required
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Modelo</span>
            </label>
            <input 
              type="text"
              name="modelo"
              value={vehiculo.modelo}
              onChange={handleChange}
              placeholder="Ej: Corolla"
              className="input input-bordered w-full"
              required
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Chapa</span>
            </label>
            <input 
              type="text"
              name="chapa"
              value={vehiculo.chapa}
              onChange={handleChange}
              placeholder="Ej: ABC-123"
              className="input input-bordered w-full"
              required
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Año</span>
            </label>
            <input 
              type="number"
              name="anho"
              value={vehiculo.anho}
              onChange={handleChange}
              placeholder="Ej: 2020"
              className="input input-bordered w-full"
              required
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Tipo de vehículo</span>
            </label>
            <select 
              name="tipo"
              value={vehiculo.tipo}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="MOTO">Moto</option>
              <option value="COCHE">Coche</option>
              <option value="CAMIONETA">Camioneta</option>
              <option value="CAMION">Camión</option>
            </select>
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Cliente</span>
            </label>
            <select 
              name="clienteId"
              value={vehiculo.clienteId}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">-- Seleccionar Cliente --</option>
              {clientes.map(cli => (
                <option key={cli.id} value={cli.id}>
                  {cli.nombre} - {cli.ruc}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-control mt-6">
            <button 
              type="submit" 
              className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Registrando...' : 'Registrar Vehículo'}
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

export default RegistroVehiculo;
