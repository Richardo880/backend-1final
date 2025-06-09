package com.taller.model;

import jakarta.persistence.*;
import java.util.List;
import jakarta.json.bind.annotation.JsonbTransient;

@Entity
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String telefono;
    private String direccion;
    private String ruc;

    @Enumerated(EnumType.STRING)
    private TipoCliente tipo;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL)
    @JsonbTransient // 👉 evita serializar la lista de vehículos
    private List<Vehiculo> vehiculos;

    public enum TipoCliente {
        OCASIONAL, REGULAR, VIP
    }

    // Getters y Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getRuc() {
        return ruc;
    }

    public void setRuc(String ruc) {
        this.ruc = ruc;
    }

    public TipoCliente getTipo() {
        return tipo;
    }

    public void setTipo(TipoCliente tipo) {
        this.tipo = tipo;
    }

    public List<Vehiculo> getVehiculos() {
        return vehiculos;
    }

    public void setVehiculos(List<Vehiculo> vehiculos) {
        this.vehiculos = vehiculos;
    }
}
