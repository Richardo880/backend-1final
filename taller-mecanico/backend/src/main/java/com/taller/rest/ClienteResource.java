package com.taller.rest;

import com.taller.model.Cliente;
import com.taller.service.ClienteService;
import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/clientes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ClienteResource {

    @EJB
    private ClienteService clienteService;

    @GET
    public List<Cliente> listarClientes() {
        return clienteService.listarClientes();
    }

    @POST
    public void crearCliente(Cliente cliente) {
        clienteService.crearCliente(cliente);
    }

    @GET
    @Path("/{id}")
    public Cliente buscarPorId(@PathParam("id") Long id) {
        return clienteService.buscarPorId(id);
    }


}

