package com.taller.service;

import com.taller.model.Vehiculo;
import com.taller.model.Cliente;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import java.util.logging.Logger;
import java.util.logging.Level;

@Stateless
public class VehiculoService {

    private static final Logger logger = Logger.getLogger(VehiculoService.class.getName());

    @PersistenceContext(unitName = "tallerPU")
    private EntityManager em;

    public Vehiculo crearVehiculo(Vehiculo vehiculo) {
        em.persist(vehiculo);
        return vehiculo;
    }

    public List<Vehiculo> listarVehiculos() {
        return em.createQuery("SELECT v FROM Vehiculo v", Vehiculo.class).getResultList();
    }

    public Vehiculo buscarPorId(Long id) {
        return em.find(Vehiculo.class, id);
    }

    public List<Vehiculo> guardarVehiculosPrueba(List<Vehiculo> vehiculos) {
        logger.log(Level.INFO, "Guardando {0} vehículos de prueba", vehiculos.size());
        
        for (Vehiculo vehiculo : vehiculos) {
            // Validar datos básicos
            if (vehiculo.getMarca() == null || vehiculo.getMarca().trim().isEmpty()) {
                throw new IllegalArgumentException("La marca del vehículo es requerida");
            }
            if (vehiculo.getModelo() == null || vehiculo.getModelo().trim().isEmpty()) {
                throw new IllegalArgumentException("El modelo del vehículo es requerido");
            }
            if (vehiculo.getChapa() == null || vehiculo.getChapa().trim().isEmpty()) {
                throw new IllegalArgumentException("La chapa del vehículo es requerida");
            }
            
            // Validar que el cliente exista
            if (vehiculo.getCliente() == null || vehiculo.getCliente().getId() == null) {
                throw new IllegalArgumentException("El cliente del vehículo es requerido");
            }
            
            Cliente cliente = em.find(Cliente.class, vehiculo.getCliente().getId());
            if (cliente == null) {
                throw new IllegalArgumentException("El cliente con ID " + vehiculo.getCliente().getId() + " no existe");
            }
            
            // Establecer la relación con el cliente
            vehiculo.setCliente(cliente);
            
            // Persistir el vehículo
            em.persist(vehiculo);
            logger.log(Level.FINE, "Vehículo guardado: {0} {1} - {2}", 
                new Object[]{vehiculo.getMarca(), vehiculo.getModelo(), vehiculo.getChapa()});
        }
        
        // Forzar el flush para asegurar que todos los vehículos se guarden
        em.flush();
        
        logger.log(Level.INFO, "Vehículos de prueba guardados exitosamente");
        return vehiculos;
    }
}

