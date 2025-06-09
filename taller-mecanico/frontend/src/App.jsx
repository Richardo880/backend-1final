import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistroServicio from './views/RegistroServicio';
import ConsultaHistorico from './views/ConsultaHistorico';
import CargaDatos from './views/CargaDatos';
import RegistroVehiculo from './views/RegistroVehiculo';
import RegistroCliente from './views/RegistroCliente';
import RegistroMecanico from './views/RegistroMecanico';
import RegistroRepuesto from './views/RegistroRepuesto';
import ResumenGeneral from './views/ResumenGeneral';




const App = () => {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Registrar Servicio</Link>
          <Link to="/consulta">Consultar Servicios</Link>
          <Link to="/carga">Carga de Prueba</Link>
          <Link to="/registro-cliente">Registrar Cliente</Link>
          <Link to="/registro-vehiculo">Registrar Vehiculo</Link>
          <Link to="/registro-mecanico">Registrar Mecánico</Link>
          <Link to="/registro-repuesto">Registrar Repuesto</Link>
          <Link to="/resumen">Ver Resumen General</Link>
        </nav>

        <Routes>
          <Route path="/" element={<RegistroServicio />} />
          <Route path="/consulta" element={<ConsultaHistorico />} />
          <Route path="/carga" element={<CargaDatos />} />
          <Route path="/registro-vehiculo" element={<RegistroVehiculo />} />
          <Route path="/registro-cliente" element={<RegistroCliente />} />
          <Route path="/registro-mecanico" element={<RegistroMecanico />} />
          <Route path="/registro-repuesto" element={<RegistroRepuesto />} />
          <Route path="/resumen" element={<ResumenGeneral />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
