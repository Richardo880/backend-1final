package com.taller.service;

import com.taller.model.Servicio;
import com.taller.model.Vehiculo;
import com.taller.model.DetalleServicio;
import com.taller.model.Mecanico;
import com.taller.model.Repuesto;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.Query;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;
import java.util.logging.Level;
import jakarta.transaction.Transactional;
import jakarta.persistence.NoResultException;

@Stateless
public class ServicioService {

    private static final Logger logger = Logger.getLogger(ServicioService.class.getName());

    @PersistenceContext(unitName = "tallerPU")
    private EntityManager em;

    @Transactional
    public Servicio registrarServicio(Servicio servicio) {
        try {
            logger.log(Level.INFO, "=== INICIO DE REGISTRO DE SERVICIO ===");
            logger.log(Level.INFO, "Payload recibido: {0}", servicio);
            logger.log(Level.INFO, "Detalles en el payload: {0}", servicio.getDetalles());
            
            // Validar que el vehículo existe
            logger.log(Level.INFO, "Buscando vehículo con ID: {0}", servicio.getVehiculo().getId());
            Vehiculo vehiculo = em.find(Vehiculo.class, servicio.getVehiculo().getId());
            if (vehiculo == null) {
                logger.log(Level.SEVERE, "Vehículo no encontrado con ID: {0}", servicio.getVehiculo().getId());
                throw new IllegalArgumentException("El vehículo no existe");
            }
            logger.log(Level.INFO, "Vehículo encontrado: {0}", vehiculo.getId());

            // Crear una nueva instancia de Servicio
            logger.log(Level.INFO, "Creando nueva instancia de Servicio");
            Servicio nuevoServicio = new Servicio();
            nuevoServicio.setFecha(servicio.getFecha());
            nuevoServicio.setDescripcionGeneral(servicio.getDescripcionGeneral());
            nuevoServicio.setKilometraje(servicio.getKilometraje());
            nuevoServicio.setCostoTotal(servicio.getCostoTotal());
            nuevoServicio.setVehiculo(vehiculo);

            // Persistir el servicio primero
            logger.log(Level.INFO, "Persistiendo servicio base...");
            em.persist(nuevoServicio);
            em.flush();
            logger.log(Level.INFO, "Servicio persistido con ID: {0}", nuevoServicio.getId());

            // Procesar los detalles del servicio
            if (servicio.getDetalles() != null) {
                logger.log(Level.INFO, "Detalles recibidos en el servicio: {0}", servicio.getDetalles().size());
                for (DetalleServicio detalleDTO : servicio.getDetalles()) {
                    logger.log(Level.INFO, "Procesando detalle - Descripción: {0}, Costo: {1}", 
                        new Object[]{detalleDTO.getDescripcionTrabajo(), detalleDTO.getCosto()});
                    
                    try {
                        DetalleServicio nuevoDetalle = new DetalleServicio();
                        nuevoDetalle.setDescripcionTrabajo(detalleDTO.getDescripcionTrabajo());
                        nuevoDetalle.setCosto(detalleDTO.getCosto());
                        nuevoDetalle.setServicio(nuevoServicio); // Establecer la relación bidireccional
                        
                        // Procesar mecánicos
                        if (detalleDTO.getMecanicos() != null) {
                            logger.log(Level.INFO, "Procesando {0} mecánicos", detalleDTO.getMecanicos().size());
                            for (Mecanico mecanicoDTO : detalleDTO.getMecanicos()) {
                                logger.log(Level.INFO, "Buscando mecánico con ID: {0}", mecanicoDTO.getId());
                                Mecanico mecanico = em.find(Mecanico.class, mecanicoDTO.getId());
                                if (mecanico != null) {
                                    logger.log(Level.INFO, "Mecánico encontrado: {0}", mecanico.getId());
                                    nuevoDetalle.agregarMecanico(mecanico);
                                } else {
                                    logger.log(Level.WARNING, "¡ADVERTENCIA! Mecánico no encontrado: {0}", mecanicoDTO.getId());
                                }
                            }
                        }

                        // Procesar repuestos
                        if (detalleDTO.getRepuestos() != null) {
                            logger.log(Level.INFO, "Procesando {0} repuestos", detalleDTO.getRepuestos().size());
                            for (Repuesto repuestoDTO : detalleDTO.getRepuestos()) {
                                logger.log(Level.INFO, "Buscando repuesto con ID: {0}", repuestoDTO.getId());
                                Repuesto repuesto = em.find(Repuesto.class, repuestoDTO.getId());
                                if (repuesto != null) {
                                    logger.log(Level.INFO, "Repuesto encontrado: {0}", repuesto.getId());
                                    nuevoDetalle.agregarRepuesto(repuesto);
                                } else {
                                    logger.log(Level.WARNING, "¡ADVERTENCIA! Repuesto no encontrado: {0}", repuestoDTO.getId());
                                }
                            }
                        }

                        // Persistir el detalle
                        logger.log(Level.INFO, "Persistiendo detalle...");
                        em.persist(nuevoDetalle);
                        nuevoServicio.agregarDetalle(nuevoDetalle);
                        logger.log(Level.INFO, "Detalle persistido y agregado al servicio");
                        
                    } catch (Exception e) {
                        logger.log(Level.SEVERE, "Error al procesar detalle: {0}", e.getMessage());
                        throw e;
                    }
                }
            } else {
                logger.log(Level.WARNING, "No se encontraron detalles para procesar");
            }

            // Forzar el flush final
            logger.log(Level.INFO, "Realizando flush final...");
            em.flush();
            logger.log(Level.INFO, "=== REGISTRO DE SERVICIO COMPLETADO EXITOSAMENTE ===");
            logger.log(Level.INFO, "Servicio ID: {0}, Total detalles: {1}", 
                new Object[]{nuevoServicio.getId(), nuevoServicio.getDetalles().size()});

            return nuevoServicio;
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error durante el registro del servicio: {0}", e.getMessage());
            logger.log(Level.SEVERE, "Stack trace:", e);
            throw e;
        }
    }

    public List<Servicio> listarServicios() {
        return em.createQuery("SELECT s FROM Servicio s", Servicio.class).getResultList();
    }

    public List<Servicio> filtrarPorClienteYFecha(Long clienteId, LocalDate fechaInicio) {
        StringBuilder jpql = new StringBuilder("SELECT s FROM Servicio s WHERE 1=1");
        List<Object> params = new ArrayList<>();

        if (clienteId != null) {
            jpql.append(" AND s.vehiculo.cliente.id = ?").append(params.size() + 1);
            params.add(clienteId);
        }

        if (fechaInicio != null) {
            jpql.append(" AND s.fecha >= ?").append(params.size() + 1);
            params.add(fechaInicio);
        }

        TypedQuery<Servicio> query = em.createQuery(jpql.toString(), Servicio.class);
        for (int i = 0; i < params.size(); i++) {
            query.setParameter(i + 1, params.get(i));
        }

        return query.getResultList();
    }

    public List<Servicio> filtrarServicios(LocalDate fechaInicio, LocalDate fechaFin, String placa, String cliente) {
        try {
            logger.log(Level.INFO, "=== INICIO DE FILTRADO DE SERVICIOS ===");
            logger.log(Level.INFO, "Parámetros de filtrado:");
            logger.log(Level.INFO, "- fechaInicio: {0}", fechaInicio);
            logger.log(Level.INFO, "- fechaFin: {0}", fechaFin);
            logger.log(Level.INFO, "- placa: {0}", placa);
            logger.log(Level.INFO, "- cliente: {0}", cliente);

            // Construir la consulta SQL nativa dinámicamente
            StringBuilder sqlNativo = new StringBuilder(
                "SELECT DISTINCT s.id, s.fecha FROM Servicio s " +
                "LEFT JOIN vehiculo v ON v.id = s.vehiculo_id " +
                "LEFT JOIN cliente c ON c.id = v.cliente_id " +
                "WHERE 1=1 "  // Siempre incluimos esta condición para facilitar la construcción dinámica
            );
            List<Object> params = new ArrayList<>();
            int paramIndex = 1;

            // Agregar condiciones solo si los parámetros no son nulos
            if (fechaInicio != null) {
                logger.log(Level.INFO, "Agregando filtro de fecha inicio: {0}", fechaInicio);
                sqlNativo.append(" AND s.fecha >= ?").append(paramIndex++);
                params.add(fechaInicio);
            }

            if (fechaFin != null) {
                logger.log(Level.INFO, "Agregando filtro de fecha fin: {0}", fechaFin);
                sqlNativo.append(" AND s.fecha <= ?").append(paramIndex++);
                params.add(fechaFin);
            }

            if (placa != null && !placa.trim().isEmpty()) {
                logger.log(Level.INFO, "Agregando filtro de placa: {0}", placa);
                sqlNativo.append(" AND LOWER(v.chapa) LIKE LOWER(?").append(paramIndex++).append(")");
                params.add("%" + placa.trim() + "%");
            }

            if (cliente != null && !cliente.trim().isEmpty()) {
                logger.log(Level.INFO, "Agregando filtro de cliente: {0}", cliente);
                try {
                    Long clienteId = Long.parseLong(cliente.trim());
                    sqlNativo.append(" AND c.id = ?").append(paramIndex++);
                    params.add(clienteId);
                } catch (NumberFormatException e) {
                    logger.log(Level.WARNING, "El ID del cliente no es un número válido: {0}", cliente);
                    throw new IllegalArgumentException("El ID del cliente debe ser un número válido");
                }
            }

            // Ordenar por fecha descendente (más reciente primero)
            sqlNativo.append(" ORDER BY s.fecha DESC");

            String queryFinal = sqlNativo.toString();
            logger.log(Level.INFO, "Consulta SQL final: {0}", queryFinal);
            logger.log(Level.INFO, "Número de parámetros a establecer: {0}", params.size());
            
            Query query = em.createNativeQuery(queryFinal);
            for (int i = 0; i < params.size(); i++) {
                query.setParameter(i + 1, params.get(i));
                logger.log(Level.INFO, "Parámetro {0}: {1}", new Object[]{i + 1, params.get(i)});
            }

            @SuppressWarnings("unchecked")
            List<Object[]> resultados = query.getResultList();
            List<Long> servicioIds = new ArrayList<>();
            for (Object[] resultado : resultados) {
                servicioIds.add((Long) resultado[0]);
            }

            logger.log(Level.INFO, "Servicios encontrados: {0}", servicioIds.size());

            if (servicioIds.isEmpty()) {
                logger.log(Level.INFO, "No se encontraron servicios que cumplan con los criterios de búsqueda");
                return new ArrayList<>();
            }

            // Consulta JPQL para obtener los servicios completos
            String jpqlCompleta = 
                "SELECT s FROM Servicio s " +
                "WHERE s.id IN :ids " +
                "ORDER BY s.fecha DESC";

            logger.log(Level.INFO, "Cargando detalles completos de los servicios");
            TypedQuery<Servicio> queryCompleta = em.createQuery(jpqlCompleta, Servicio.class)
                .setParameter("ids", servicioIds);

            List<Servicio> servicios = queryCompleta.getResultList();
            logger.log(Level.INFO, "Servicios cargados exitosamente: {0}", servicios.size());

            // Cargar las relaciones para cada servicio
            for (Servicio servicio : servicios) {
                logger.log(Level.FINE, "Cargando relaciones para servicio ID: {0}", servicio.getId());
                
                // Forzar la carga de detalles
                if (servicio.getDetalles() != null) {
                    servicio.getDetalles().size();
                    for (DetalleServicio detalle : servicio.getDetalles()) {
                        // Forzar la carga de mecánicos y repuestos
                        detalle.getMecanicos().size();
                        detalle.getRepuestos().size();
                    }
                }

                // Forzar la carga de vehículo y cliente
                if (servicio.getVehiculo() != null) {
                    servicio.getVehiculo().getCliente();
                }
            }

            logger.log(Level.INFO, "=== FILTRADO DE SERVICIOS COMPLETADO EXITOSAMENTE ===");
            return servicios;

        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error durante el filtrado de servicios", e);
            throw new RuntimeException("Error al filtrar servicios: " + e.getMessage(), e);
        }
    }

    @Transactional
    public Servicio buscarPorId(Long id) {
        try {
            // Primero obtenemos el servicio con sus relaciones básicas
            String jpql = "SELECT s FROM Servicio s " +
                         "LEFT JOIN FETCH s.vehiculo " +
                         "LEFT JOIN FETCH s.detalles " +
                         "WHERE s.id = :id";
            
            TypedQuery<Servicio> query = em.createQuery(jpql, Servicio.class);
            query.setParameter("id", id);
            
            try {
                Servicio servicio = query.getSingleResult();
                
                // Cargar el cliente del vehículo
                if (servicio.getVehiculo() != null) {
                    servicio.getVehiculo().getCliente();
                }
                
                // Cargar mecánicos y repuestos para cada detalle
                if (servicio.getDetalles() != null) {
                    for (DetalleServicio detalle : servicio.getDetalles()) {
                        // Forzar la carga de mecánicos y repuestos
                        detalle.getMecanicos().size();
                        detalle.getRepuestos().size();
                    }
                }
                
                logger.log(Level.INFO, "Servicio encontrado: {0}", servicio.getId());
                return servicio;
            } catch (NoResultException e) {
                logger.log(Level.INFO, "No se encontró el servicio con ID: {0}", id);
                return null;
            }
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error al buscar servicio por ID: " + id, e);
            throw e;
        }
    }
}
