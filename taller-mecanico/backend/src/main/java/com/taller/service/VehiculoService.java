package com.taller.service;

import com.taller.model.Vehiculo;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;

@Stateless
public class VehiculoService {

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
}

