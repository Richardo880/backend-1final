package com.taller.service;

import com.taller.model.Mecanico;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import java.util.logging.Logger;
import java.util.logging.Level;

@Stateless
public class MecanicoService {

    private static final Logger logger = Logger.getLogger(MecanicoService.class.getName());

    @PersistenceContext(unitName = "tallerPU")
    private EntityManager em;

    public Mecanico findById(Long id) {
        return em.find(Mecanico.class, id);
    }

    public List<Mecanico> findAll() {
        return em.createQuery("SELECT m FROM Mecanico m", Mecanico.class).getResultList();
    }

    public Mecanico guardar(Mecanico mecanico) {
        if (mecanico.getId() == null) {
            em.persist(mecanico);
            return mecanico;
        } else {
            return em.merge(mecanico);
        }
    }

    public void eliminar(Long id) {
        Mecanico mecanico = findById(id);
        if (mecanico != null) {
            em.remove(mecanico);
        }
    }

    public List<Mecanico> guardarMecanicosPrueba(List<Mecanico> mecanicos) {
        logger.log(Level.INFO, "Guardando {0} mecánicos de prueba", mecanicos.size());
        
        for (Mecanico mecanico : mecanicos) {
            // Validar datos básicos
            if (mecanico.getNombre() == null || mecanico.getNombre().trim().isEmpty()) {
                throw new IllegalArgumentException("El nombre del mecánico es requerido");
            }
            if (mecanico.getEspecialidad() == null || mecanico.getEspecialidad().trim().isEmpty()) {
                throw new IllegalArgumentException("La especialidad del mecánico es requerida");
            }
            
            // Persistir el mecánico
            em.persist(mecanico);
            logger.log(Level.FINE, "Mecánico guardado: {0} - {1}", 
                new Object[]{mecanico.getNombre(), mecanico.getEspecialidad()});
        }
        
        // Forzar el flush para asegurar que todos los mecánicos se guarden
        em.flush();
        
        logger.log(Level.INFO, "Mecánicos de prueba guardados exitosamente");
        return mecanicos;
    }

    public List<Mecanico> listarMecanicos() {
        return em.createQuery("SELECT m FROM Mecanico m", Mecanico.class).getResultList();
    }
}

