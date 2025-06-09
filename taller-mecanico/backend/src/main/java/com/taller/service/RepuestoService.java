package com.taller.service;

import com.taller.model.Repuesto;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;

@Stateless
public class RepuestoService {

    @PersistenceContext(unitName = "tallerPU")
    private EntityManager em;

    public List<Repuesto> listarRepuestos() {
        return em.createQuery("SELECT r FROM Repuesto r", Repuesto.class).getResultList();
    }

    public void guardar(Repuesto r) {
        em.persist(r);
    }
}
