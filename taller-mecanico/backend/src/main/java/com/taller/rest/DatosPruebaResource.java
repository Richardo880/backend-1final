package com.taller.rest;

import com.taller.model.*;
import com.taller.service.*;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;
import java.util.logging.Level;

@Path("/datos-prueba")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class DatosPruebaResource {
    
    private static final Logger logger = Logger.getLogger(DatosPruebaResource.class.getName());
    
    @Inject
    private ClienteService clienteService;
    
    @Inject
    private VehiculoService vehiculoService;
    
    @Inject
    private MecanicoService mecanicoService;
    
    @Inject
    private RepuestoService repuestoService;
    
    @POST
    @Path("/cargar")
    public Response cargarDatosPrueba() {
        try {
            logger.info("Iniciando carga de datos de prueba...");
            
            // 1. Cargar clientes
            List<Cliente> clientes = crearClientesPrueba();
            clienteService.guardarClientesPrueba(clientes);
            logger.info("Clientes cargados exitosamente: " + clientes.size());
            
            // 2. Cargar vehículos
            List<Vehiculo> vehiculos = crearVehiculosPrueba(clientes);
            vehiculoService.guardarVehiculosPrueba(vehiculos);
            logger.info("Vehículos cargados exitosamente: " + vehiculos.size());
            
            // 3. Cargar mecánicos
            List<Mecanico> mecanicos = crearMecanicosPrueba();
            mecanicoService.guardarMecanicosPrueba(mecanicos);
            logger.info("Mecánicos cargados exitosamente: " + mecanicos.size());
            
            // 4. Cargar repuestos
            List<Repuesto> repuestos = crearRepuestosPrueba();
            repuestoService.guardarRepuestosPrueba(repuestos);
            logger.info("Repuestos cargados exitosamente: " + repuestos.size());
            
            return Response.ok("Datos de prueba cargados exitosamente").build();
            
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error al cargar datos de prueba", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error al cargar datos de prueba: " + e.getMessage())
                    .build();
        }
    }
    
    private List<Cliente> crearClientesPrueba() {
        List<Cliente> clientes = new ArrayList<>();
        
        clientes.add(new Cliente("Juan Pérez", "12345678901", "0987654321", "juan@email.com"));
        clientes.add(new Cliente("María García", "23456789012", "0987654322", "maria@email.com"));
        clientes.add(new Cliente("Carlos López", "34567890123", "0987654323", "carlos@email.com"));
        clientes.add(new Cliente("Ana Martínez", "45678901234", "0987654324", "ana@email.com"));
        clientes.add(new Cliente("Roberto Sánchez", "56789012345", "0987654325", "roberto@email.com"));
        
        return clientes;
    }
    
    private List<Vehiculo> crearVehiculosPrueba(List<Cliente> clientes) {
        List<Vehiculo> vehiculos = new ArrayList<>();
        
        vehiculos.add(new Vehiculo("Toyota", "Corolla", "ABC123", "2020", clientes.get(0)));
        vehiculos.add(new Vehiculo("Honda", "Civic", "DEF456", "2021", clientes.get(1)));
        vehiculos.add(new Vehiculo("Ford", "Focus", "GHI789", "2019", clientes.get(2)));
        vehiculos.add(new Vehiculo("Chevrolet", "Cruze", "JKL012", "2022", clientes.get(3)));
        vehiculos.add(new Vehiculo("Volkswagen", "Golf", "MNO345", "2021", clientes.get(4)));
        
        return vehiculos;
    }
    
    private List<Mecanico> crearMecanicosPrueba() {
        List<Mecanico> mecanicos = new ArrayList<>();
        
        mecanicos.add(new Mecanico("Pedro Rodríguez", "Mecánica General", "0987654326"));
        mecanicos.add(new Mecanico("Luis Torres", "Electricidad Automotriz", "0987654327"));
        mecanicos.add(new Mecanico("Miguel González", "Suspensión y Frenos", "0987654328"));
        mecanicos.add(new Mecanico("José Ramírez", "Motor y Transmisión", "0987654329"));
        mecanicos.add(new Mecanico("Fernando Silva", "Diagnóstico Electrónico", "0987654330"));
        
        return mecanicos;
    }
    
    private List<Repuesto> crearRepuestosPrueba() {
        List<Repuesto> repuestos = new ArrayList<>();
        
        repuestos.add(new Repuesto("Filtro de Aceite", "Filtro de aceite sintético", 25.0));
        repuestos.add(new Repuesto("Pastillas de Freno", "Pastillas de freno cerámicas", 45.0));
        repuestos.add(new Repuesto("Aceite de Motor", "Aceite sintético 5W-30", 35.0));
        repuestos.add(new Repuesto("Bujías", "Bujías de iridio", 15.0));
        repuestos.add(new Repuesto("Filtro de Aire", "Filtro de aire de alto flujo", 30.0));
        
        return repuestos;
    }
} 