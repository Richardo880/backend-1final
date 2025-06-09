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
import Footer from './components/Footer';
import Navbar from './components/Navbar';




const App = () => {
  return (
    <Router>
      <div >
        <Navbar />

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
        <Footer />
      </div>
    </Router>
  );
};

export default App;
