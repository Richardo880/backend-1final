package com.taller.rest;

import com.taller.model.Repuesto;
import com.taller.service.RepuestoService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/repuestos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RepuestoResource {

    @Inject
    private RepuestoService repuestoService;

    @GET
    public List<Repuesto> listarRepuestos() {
        return repuestoService.listarRepuestos();
    }

    @POST
    public Response crear(Repuesto r) {
        try {
            repuestoService.guardar(r);
            return Response.status(Response.Status.CREATED).entity(r).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error al guardar el repuesto: " + e.getMessage())
                    .build();
        }
    }
}
