package com.taller.service;

import com.taller.model.Mecanico;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;

@Stateless
public class MecanicoService {

    @PersistenceContext(unitName = "tallerPU")
    private EntityManager em;

    public List<Mecanico> listarMecanicos() {
        return em.createQuery("SELECT m FROM Mecanico m", Mecanico.class).getResultList();
    }

    public void guardar(Mecanico m) {
        em.persist(m);
    }
}

