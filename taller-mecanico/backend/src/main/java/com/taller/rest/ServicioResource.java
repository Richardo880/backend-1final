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
            System.out.println("📥 Servicio recibido en el backend:");
            System.out.println("ID: " + servicio.getId());
            System.out.println("Fecha: " + servicio.getFecha());
            System.out.println("Descripción: " + servicio.getDescripcionGeneral());
            System.out.println("Kilometraje: " + servicio.getKilometraje());
            System.out.println("Costo Total: " + servicio.getCostoTotal());
            System.out.println("Vehículo: " + (servicio.getVehiculo() != null ? 
                "ID=" + servicio.getVehiculo().getId() : "null"));
            
            if (servicio.getVehiculo() != null) {
                System.out.println("Detalles del vehículo recibido:");
                System.out.println("- ID: " + servicio.getVehiculo().getId());
                System.out.println("- Marca: " + servicio.getVehiculo().getMarca());
                System.out.println("- Modelo: " + servicio.getVehiculo().getModelo());
                System.out.println("- Chapa: " + servicio.getVehiculo().getChapa());
            }

            servicioService.registrarServicio(servicio);
            return Response.status(Response.Status.CREATED).entity(servicio).build();
        } catch (Exception e) {
            System.err.println("❌ Error al registrar servicio: " + e.getMessage());
            e.printStackTrace();
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

