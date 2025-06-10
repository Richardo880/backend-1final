package com.taller.service;

import com.taller.model.Repuesto;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import java.util.logging.Logger;
import java.util.logging.Level;

@Stateless
public class RepuestoService {

    private static final Logger logger = Logger.getLogger(RepuestoService.class.getName());

    @PersistenceContext(unitName = "tallerPU")
    private EntityManager em;

    public Repuesto findById(Long id) {
        return em.find(Repuesto.class, id);
    }

    public List<Repuesto> findAll() {
        return em.createQuery("SELECT r FROM Repuesto r", Repuesto.class).getResultList();
    }

    public Repuesto guardar(Repuesto repuesto) {
        if (repuesto.getId() == null) {
            em.persist(repuesto);
            return repuesto;
        } else {
            return em.merge(repuesto);
        }
    }

    public void eliminar(Long id) {
        Repuesto repuesto = findById(id);
        if (repuesto != null) {
            em.remove(repuesto);
        }
    }

    public List<Repuesto> guardarRepuestosPrueba(List<Repuesto> repuestos) {
        logger.log(Level.INFO, "Guardando {0} repuestos de prueba", repuestos.size());
        
        for (Repuesto repuesto : repuestos) {
            // Validar datos básicos
            if (repuesto.getNombre() == null || repuesto.getNombre().trim().isEmpty()) {
                throw new IllegalArgumentException("El nombre del repuesto es requerido");
            }
            if (repuesto.getPrecio() == null || repuesto.getPrecio() <= 0) {
                throw new IllegalArgumentException("El precio del repuesto debe ser mayor a 0");
            }
            
            // Persistir el repuesto
            em.persist(repuesto);
            logger.log(Level.FINE, "Repuesto guardado: {0} - {1}", 
                new Object[]{repuesto.getNombre(), repuesto.getPrecio()});
        }
        
        // Forzar el flush para asegurar que todos los repuestos se guarden
        em.flush();
        
        logger.log(Level.INFO, "Repuestos de prueba guardados exitosamente");
        return repuestos;
    }

    public List<Repuesto> listarRepuestos() {
        return em.createQuery("SELECT r FROM Repuesto r", Repuesto.class).getResultList();
    }
}
