package com.taller.rest;

import com.taller.model.Mecanico;
import com.taller.service.MecanicoService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/mecanicos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MecanicoResource {

    @Inject
    private MecanicoService mecanicoService;

    @GET
    public List<Mecanico> listarMecanicos() {
        return mecanicoService.listarMecanicos();
    }

    @POST
    public Response crear(Mecanico m) {
        try {
            mecanicoService.guardar(m);
            return Response.status(Response.Status.CREATED).entity(m).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error al guardar el mecánico: " + e.getMessage())
                    .build();
        }
    }
}

