import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
   <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
            <Link to="/" style={{ marginRight: '10px' }}>Registrar Servicio</Link>
        </li>
        <li>
            <Link to="/consulta">Consultar Servicios</Link>
        </li>
        <li>
            <Link to="/carga">Carga de Prueba</Link>
        </li>
        <li>
            <Link to="/registro-cliente">Registrar Cliente</Link>
        </li>
        <li>
            <Link to="/registro-vehiculo">Registrar Vehiculo</Link>
        </li>
        <li>
            <Link to="/registro-mecanico">Registrar Mecánico</Link>
        </li>
        <li>
            <Link to="/registro-repuesto">Registrar Repuesto</Link>
        </li>
        <li>
            <Link to="/resumen">Ver Resumen General</Link>
        </li>

        
      </ul>
    </div>
  </div>
 
  
</div>
  )
}

export default Navbar
