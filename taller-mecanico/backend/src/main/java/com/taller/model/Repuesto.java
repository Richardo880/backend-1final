package com.taller.model;

import jakarta.persistence.*;
import java.util.List;
import jakarta.json.bind.annotation.JsonbTransient;


@Entity
public class Repuesto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigo;
    private String nombre;

    @JsonbTransient
    @ManyToMany(mappedBy = "repuestos")
    private List<DetalleServicio> detalles;

    // Getters y Setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<DetalleServicio> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetalleServicio> detalles) {
        this.detalles = detalles;
    }
}
