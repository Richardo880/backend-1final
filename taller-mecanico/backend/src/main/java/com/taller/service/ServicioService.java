package com.taller.service;

import com.taller.model.Servicio;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.time.LocalDate;
import java.util.List;

@Stateless
public class ServicioService {

    @PersistenceContext(unitName = "tallerPU")
    private EntityManager em;

    public void registrarServicio(Servicio servicio) {
        em.persist(servicio);
    }

    public List<Servicio> listarServicios() {
        return em.createQuery("SELECT s FROM Servicio s", Servicio.class).getResultList();
    }

    public List<Servicio> filtrarPorClienteYFecha(Long clienteId, LocalDate fechaDesde) {
        String jpql = "SELECT s FROM Servicio s WHERE " +
                "(:clienteId IS NULL OR s.vehiculo.cliente.id = :clienteId) AND " +
                "(:fechaDesde IS NULL OR s.fecha >= :fechaDesde)";
        return em.createQuery(jpql, Servicio.class)
                .setParameter("clienteId", clienteId)
                .setParameter("fechaDesde", fechaDesde)
                .getResultList();
    }

    public Servicio buscarPorId(Long id) {
        return em.find(Servicio.class, id);
    }
}
