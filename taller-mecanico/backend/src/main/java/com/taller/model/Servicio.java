package com.taller.model;

import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Map;
import java.util.HashMap;

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

    @JsonbTransient
    @OneToMany(mappedBy = "servicio", cascade = {CascadeType.ALL}, orphanRemoval = true)
    private List<DetalleServicio> detalles = new ArrayList<>();

    // Constructor vacío requerido para JPA
    public Servicio() {
    }

    // Método helper para agregar detalles
    public void agregarDetalle(DetalleServicio detalle) {
        detalles.add(detalle);
        detalle.setServicio(this);
    }

    // Método helper para remover detalles
    public void removerDetalle(DetalleServicio detalle) {
        detalles.remove(detalle);
        detalle.setServicio(null);
    }

    // Método para obtener detalles serializables
    public List<Map<String, Object>> getDetallesDTO() {
        if (detalles == null) {
            return new ArrayList<>();
        }
        return detalles.stream()
            .map(detalle -> {
                Map<String, Object> dto = new HashMap<>();
                dto.put("id", detalle.getId());
                dto.put("descripcionTrabajo", detalle.getDescripcionTrabajo());
                dto.put("costo", detalle.getCosto());
                
                // Agregar mecánicos
                if (detalle.getMecanicos() != null) {
                    dto.put("mecanicos", detalle.getMecanicos().stream()
                        .map(m -> {
                            Map<String, Object> mDto = new HashMap<>();
                            mDto.put("id", m.getId());
                            mDto.put("nombre", m.getNombre());
                            mDto.put("especialidad", m.getEspecialidad());
                            return mDto;
                        })
                        .collect(Collectors.toList()));
                }
                
                // Agregar repuestos
                if (detalle.getRepuestos() != null) {
                    dto.put("repuestos", detalle.getRepuestos().stream()
                        .map(r -> {
                            Map<String, Object> rDto = new HashMap<>();
                            rDto.put("id", r.getId());
                            rDto.put("nombre", r.getNombre());
                            rDto.put("descripcion", r.getDescripcion());
                            rDto.put("precio", r.getPrecio());
                            return rDto;
                        })
                        .collect(Collectors.toList()));
                }
                
                return dto;
            })
            .collect(Collectors.toList());
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
