package com.taller.rest;

import com.taller.model.DetalleServicio;
import com.taller.model.Servicio;
import com.taller.service.ServicioService;
import jakarta.ejb.EJB;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;
import java.util.logging.Logger;
import java.util.logging.Level;

@Path("/servicios")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ServicioResource {

    private static final Logger logger = Logger.getLogger(ServicioResource.class.getName());

    @EJB
    private ServicioService servicioService;

    @Inject
    private ServicioService servicioServiceInject;

    @GET
    public List<Servicio> listarServicios() {
        return servicioService.listarServicios();
    }

    @POST
    public Response registrarServicio(Servicio servicio) {
        try {
            logger.log(Level.INFO, "=== INICIO DE REGISTRO DE SERVICIO ===");
            logger.log(Level.INFO, "📥 Servicio recibido en el backend:");
            logger.log(Level.INFO, "ID: {0}", servicio.getId());
            logger.log(Level.INFO, "Fecha: {0}", servicio.getFecha());
            logger.log(Level.INFO, "Descripción: {0}", servicio.getDescripcionGeneral());
            logger.log(Level.INFO, "Kilometraje: {0}", servicio.getKilometraje());
            logger.log(Level.INFO, "Costo Total: {0}", servicio.getCostoTotal());
            logger.log(Level.INFO, "Vehículo: {0}", servicio.getVehiculo() != null ? 
                "ID=" + servicio.getVehiculo().getId() : "null");
            
            if (servicio.getVehiculo() != null) {
                logger.log(Level.INFO, "Detalles del vehículo recibido:");
                logger.log(Level.INFO, "- ID: {0}", servicio.getVehiculo().getId());
                logger.log(Level.INFO, "- Marca: {0}", servicio.getVehiculo().getMarca());
                logger.log(Level.INFO, "- Modelo: {0}", servicio.getVehiculo().getModelo());
                logger.log(Level.INFO, "- Chapa: {0}", servicio.getVehiculo().getChapa());
            }

            // Log de detalles
            logger.log(Level.INFO, "Detalles del servicio recibidos:");
            if (servicio.getDetalles() != null) {
                logger.log(Level.INFO, "Cantidad de detalles: {0}", servicio.getDetalles().size());
                for (int i = 0; i < servicio.getDetalles().size(); i++) {
                    DetalleServicio detalle = servicio.getDetalles().get(i);
                    logger.log(Level.INFO, "Detalle {0}:", i + 1);
                    logger.log(Level.INFO, "- Descripción: {0}", detalle.getDescripcionTrabajo());
                    logger.log(Level.INFO, "- Costo: {0}", detalle.getCosto());
                    logger.log(Level.INFO, "- Mecánicos: {0}", detalle.getMecanicos() != null ? detalle.getMecanicos().size() : 0);
                    logger.log(Level.INFO, "- Repuestos: {0}", detalle.getRepuestos() != null ? detalle.getRepuestos().size() : 0);
                }
            } else {
                logger.log(Level.WARNING, "⚠️ No se recibieron detalles en el servicio");
            }

            Servicio servicioRegistrado = servicioService.registrarServicio(servicio);
            logger.log(Level.INFO, "=== REGISTRO DE SERVICIO COMPLETADO EXITOSAMENTE ===");
            logger.log(Level.INFO, "Servicio registrado con ID: {0}", servicioRegistrado.getId());

            // Crear un DTO para la respuesta
            Map<String, Object> responseDTO = new HashMap<>();
            responseDTO.put("id", servicioRegistrado.getId());
            responseDTO.put("fecha", servicioRegistrado.getFecha());
            responseDTO.put("descripcionGeneral", servicioRegistrado.getDescripcionGeneral());
            responseDTO.put("kilometraje", servicioRegistrado.getKilometraje());
            responseDTO.put("costoTotal", servicioRegistrado.getCostoTotal());
            
            // Agregar vehículo
            if (servicioRegistrado.getVehiculo() != null) {
                Map<String, Object> vehiculoDTO = new HashMap<>();
                vehiculoDTO.put("id", servicioRegistrado.getVehiculo().getId());
                vehiculoDTO.put("marca", servicioRegistrado.getVehiculo().getMarca());
                vehiculoDTO.put("modelo", servicioRegistrado.getVehiculo().getModelo());
                vehiculoDTO.put("chapa", servicioRegistrado.getVehiculo().getChapa());
                vehiculoDTO.put("anio", servicioRegistrado.getVehiculo().getAnio());
                responseDTO.put("vehiculo", vehiculoDTO);
            }
            
            // Agregar detalles usando el método DTO
            responseDTO.put("detalles", servicioRegistrado.getDetallesDTO());

            return Response.status(Response.Status.CREATED).entity(responseDTO).build();
        } catch (Exception e) {
            logger.log(Level.SEVERE, "❌ Error al registrar servicio: {0}", e.getMessage());
            logger.log(Level.SEVERE, "Stack trace:", e);
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\": \"No se pudo registrar el servicio: " + e.getMessage() + "\"}")
                    .build();
        }
    }

    @GET
    @Path("/filtro")
    @Produces(MediaType.APPLICATION_JSON)
    public Response filtrarServicios(
            @QueryParam("fechaInicio") String fechaInicioStr,
            @QueryParam("fechaFin") String fechaFinStr,
            @QueryParam("placa") String placa,
            @QueryParam("cliente") String cliente) {
        try {
            logger.log(Level.INFO, "Iniciando filtrado de servicios");
            logger.log(Level.INFO, "Parámetros recibidos - fechaInicio: {0}, fechaFin: {1}, placa: {2}, cliente: {3}", 
                new Object[]{fechaInicioStr, fechaFinStr, placa, cliente});

            LocalDate fechaInicio = null;
            LocalDate fechaFin = null;

            if (fechaInicioStr != null && !fechaInicioStr.isEmpty()) {
                fechaInicio = LocalDate.parse(fechaInicioStr);
                logger.log(Level.INFO, "Fecha inicio parseada: {0}", fechaInicio);
            }
            if (fechaFinStr != null && !fechaFinStr.isEmpty()) {
                fechaFin = LocalDate.parse(fechaFinStr);
                logger.log(Level.INFO, "Fecha fin parseada: {0}", fechaFin);
            }

            List<Servicio> servicios = servicioService.filtrarServicios(fechaInicio, fechaFin, placa, cliente);
            logger.log(Level.INFO, "Servicios encontrados: {0}", servicios.size());

            // Convertir los servicios a un formato que incluya los detalles serializados
            List<Map<String, Object>> serviciosSerializados = servicios.stream()
                .map(servicio -> {
                    Map<String, Object> servicioMap = new HashMap<>();
                    servicioMap.put("id", servicio.getId());
                    servicioMap.put("fecha", servicio.getFecha());
                    servicioMap.put("descripcionGeneral", servicio.getDescripcionGeneral());
                    servicioMap.put("kilometraje", servicio.getKilometraje());
                    servicioMap.put("costoTotal", servicio.getCostoTotal());
                    
                    // Agregar información del vehículo
                    if (servicio.getVehiculo() != null) {
                        Map<String, Object> vehiculoMap = new HashMap<>();
                        vehiculoMap.put("id", servicio.getVehiculo().getId());
                        vehiculoMap.put("marca", servicio.getVehiculo().getMarca());
                        vehiculoMap.put("modelo", servicio.getVehiculo().getModelo());
                        vehiculoMap.put("chapa", servicio.getVehiculo().getChapa());
                        vehiculoMap.put("anio", servicio.getVehiculo().getAnio());
                        vehiculoMap.put("tipo", servicio.getVehiculo().getTipo());
                        
                        // Agregar información del cliente
                        if (servicio.getVehiculo().getCliente() != null) {
                            Map<String, Object> clienteMap = new HashMap<>();
                            clienteMap.put("id", servicio.getVehiculo().getCliente().getId());
                            clienteMap.put("nombre", servicio.getVehiculo().getCliente().getNombre());
                            clienteMap.put("ruc", servicio.getVehiculo().getCliente().getRuc());
                            vehiculoMap.put("cliente", clienteMap);
                        }
                        
                        servicioMap.put("vehiculo", vehiculoMap);
                    }

                    // Agregar detalles usando el nuevo método DTO
                    servicioMap.put("detalles", servicio.getDetallesDTO());
                    
                    return servicioMap;
                })
                .collect(Collectors.toList());

            return Response.ok(serviciosSerializados).build();
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error al filtrar servicios", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error al filtrar servicios: " + e.getMessage())
                    .build();
        }
    }

    @GET
    @Path("/{id}")
    public Response buscarPorId(@PathParam("id") Long id) {
        try {
            Servicio servicio = servicioService.buscarPorId(id);
            if (servicio == null) {
                return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"error\": \"Servicio no encontrado\"}")
                    .build();
            }

            // Crear un mapa con los datos del servicio
            Map<String, Object> servicioDTO = new HashMap<>();
            servicioDTO.put("id", servicio.getId());
            servicioDTO.put("fecha", servicio.getFecha());
            servicioDTO.put("descripcionGeneral", servicio.getDescripcionGeneral());
            servicioDTO.put("kilometraje", servicio.getKilometraje());
            servicioDTO.put("costoTotal", servicio.getCostoTotal());
            
            // Agregar vehículo
            if (servicio.getVehiculo() != null) {
                Map<String, Object> vehiculoDTO = new HashMap<>();
                vehiculoDTO.put("id", servicio.getVehiculo().getId());
                vehiculoDTO.put("marca", servicio.getVehiculo().getMarca());
                vehiculoDTO.put("modelo", servicio.getVehiculo().getModelo());
                vehiculoDTO.put("chapa", servicio.getVehiculo().getChapa());
                vehiculoDTO.put("placa", servicio.getVehiculo().getPlaca());
                vehiculoDTO.put("anio", servicio.getVehiculo().getAnio());
                
                // Agregar cliente
                if (servicio.getVehiculo().getCliente() != null) {
                    Map<String, Object> clienteDTO = new HashMap<>();
                    clienteDTO.put("id", servicio.getVehiculo().getCliente().getId());
                    clienteDTO.put("nombre", servicio.getVehiculo().getCliente().getNombre());
                    clienteDTO.put("ruc", servicio.getVehiculo().getCliente().getRuc());
                    vehiculoDTO.put("cliente", clienteDTO);
                }
                
                servicioDTO.put("vehiculo", vehiculoDTO);
            }
            
            // Agregar detalles usando el nuevo método DTO
            servicioDTO.put("detalles", servicio.getDetallesDTO());
            
            return Response.ok(servicioDTO).build();
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error al buscar servicio por ID: " + id, e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity("{\"error\": \"Error al buscar el servicio: " + e.getMessage() + "\"}")
                .build();
        }
    }

    @GET
    @Path("/test")
    public Response testSerializacion() {
        Servicio s = new Servicio();
        s.setId(1L);
        s.setDescripcionGeneral("Servicio de prueba");
        s.setFecha(LocalDate.now());
        s.setKilometraje(12345);

        DetalleServicio detalle = new DetalleServicio();
        detalle.setDescripcionTrabajo("Cambio de aceite");
        detalle.setCosto(150000.0);

        s.setDetalles(List.of(detalle));

        return Response.ok(s).build();
    }

}

