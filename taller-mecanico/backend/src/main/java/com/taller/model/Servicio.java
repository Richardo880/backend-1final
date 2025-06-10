package com.taller.model;

import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
public class Servicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fecha;
    private String descripcionGeneral;
    private int kilometraje;
    private double costoTotal;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "vehiculo_id")
    private Vehiculo vehiculo;

    @OneToMany(mappedBy = "servicio", cascade = CascadeType.ALL)
    private List<DetalleServicio> detalles;

    // Constructor vacío requerido para JPA
    public Servicio() {
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getDescripcionGeneral() {
        return descripcionGeneral;
    }

    public void setDescripcionGeneral(String descripcionGeneral) {
        this.descripcionGeneral = descripcionGeneral;
    }

    public int getKilometraje() {
        return kilometraje;
    }

    public void setKilometraje(int kilometraje) {
        this.kilometraje = kilometraje;
    }

    public double getCostoTotal() {
        return costoTotal;
    }

    public void setCostoTotal(double costoTotal) {
        this.costoTotal = costoTotal;
    }

    public Vehiculo getVehiculo() {
        return vehiculo;
    }

    public void setVehiculo(Vehiculo vehiculo) {
        this.vehiculo = vehiculo;
    }

    public List<DetalleServicio> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetalleServicio> detalles) {
        this.detalles = detalles;
    }

    @Override
    public String toString() {
        return "Servicio{" +
                "id=" + id +
                ", fecha=" + fecha +
                ", descripcionGeneral='" + descripcionGeneral + '\'' +
                ", kilometraje=" + kilometraje +
                ", costoTotal=" + costoTotal +
                ", vehiculo=" + (vehiculo != null ? vehiculo.getId() : "null") +
                ", detalles=" + (detalles != null ? detalles.size() : 0) +
                '}';
    }
}
