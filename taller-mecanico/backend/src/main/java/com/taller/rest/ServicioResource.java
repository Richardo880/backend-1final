package com.taller.rest;

import com.taller.model.DetalleServicio;
import com.taller.model.Servicio;
import com.taller.service.ServicioService;
import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.time.LocalDate;
import java.util.List;

@Path("/servicios")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ServicioResource {

    @EJB
    private ServicioService servicioService;

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
    public List<Servicio> filtrarServicios(@QueryParam("clienteId") Long clienteId,
                                           @QueryParam("fechaDesde") String fechaStr) {
        LocalDate fechaDesde = (fechaStr != null) ? LocalDate.parse(fechaStr) : null;
        return servicioService.filtrarPorClienteYFecha(clienteId, fechaDesde);
    }

    @GET
    @Path("/{id}")
    public Servicio buscarPorId(@PathParam("id") Long id) {
        return servicioService.buscarPorId(id);
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

