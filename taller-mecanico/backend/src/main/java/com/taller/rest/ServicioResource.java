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
    public void registrarServicio(Servicio servicio) {
        servicioService.registrarServicio(servicio);
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

