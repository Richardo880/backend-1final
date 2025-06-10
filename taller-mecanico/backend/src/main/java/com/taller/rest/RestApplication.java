package com.taller.rest;

import com.taller.filter.CorsFilter;
import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("/api")
public class RestApplication extends Application {
    
    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> classes = new HashSet<>();
        
        // Registrar el filtro CORS
        classes.add(CorsFilter.class);
        
        // Registrar los recursos REST
        classes.add(ClienteResource.class);
        classes.add(VehiculoResource.class);
        classes.add(MecanicoResource.class);
        classes.add(RepuestoResource.class);
        classes.add(ServicioResource.class);
        classes.add(DatosPruebaResource.class);
        
        return classes;
    }
}
