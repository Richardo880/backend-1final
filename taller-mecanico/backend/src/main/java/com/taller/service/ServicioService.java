package com.taller.service;

import com.taller.model.Servicio;
import com.taller.model.Vehiculo;
import com.taller.model.DetalleServicio;
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
        System.out.println("🔍 Iniciando registro de servicio...");
        
        // Validar que el vehículo existe y obtener la referencia completa
        if (servicio.getVehiculo() == null) {
            System.err.println("❌ El vehículo es null");
            throw new IllegalArgumentException("El vehículo es requerido");
        }

        if (servicio.getVehiculo().getId() == null) {
            System.err.println("❌ El ID del vehículo es null");
            throw new IllegalArgumentException("El ID del vehículo es requerido");
        }

        System.out.println("🔍 Buscando vehículo con ID: " + servicio.getVehiculo().getId());
        Vehiculo vehiculo = em.find(Vehiculo.class, servicio.getVehiculo().getId());
        
        if (vehiculo == null) {
            System.err.println("❌ No se encontró el vehículo con ID: " + servicio.getVehiculo().getId());
            throw new IllegalArgumentException("El vehículo no existe");
        }

        System.out.println("✅ Vehículo encontrado: " + vehiculo.getMarca() + " " + vehiculo.getModelo());

        // Establecer la referencia al vehículo
        servicio.setVehiculo(vehiculo);

        // Establecer la relación bidireccional con los detalles
        if (servicio.getDetalles() != null) {
            for (DetalleServicio detalle : servicio.getDetalles()) {
                detalle.setServicio(servicio);
            }
        }

        // Persistir el servicio
        System.out.println("💾 Persistiendo servicio...");
        em.persist(servicio);
        
        // Forzar el flush para asegurar que se persista
        System.out.println("🔄 Forzando flush...");
        em.flush();
        
        System.out.println("✅ Servicio registrado exitosamente");
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
