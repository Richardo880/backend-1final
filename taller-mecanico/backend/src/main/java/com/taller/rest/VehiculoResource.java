package com.taller.rest;

import com.taller.model.Vehiculo;
import com.taller.service.VehiculoService;
import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/vehiculos")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class VehiculoResource {

    @EJB
    private VehiculoService vehiculoService;

    @GET
    public List<Vehiculo> listar() {
        return vehiculoService.listarVehiculos();
    }

    @POST
    public Response crear(Vehiculo vehiculo) {
        try {
            Vehiculo creado = vehiculoService.crearVehiculo(vehiculo);
            return Response.status(Response.Status.CREATED).entity(creado).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\": \"No se pudo crear el vehículo: " + e.getMessage() + "\"}")
                    .build();
        }
    }


}

