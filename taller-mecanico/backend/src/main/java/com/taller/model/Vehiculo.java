package com.taller.model;

import jakarta.persistence.*;
import java.util.List;
import jakarta.json.bind.annotation.JsonbTransient;

@Entity
@Table(name = "vehiculo")
public class Vehiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String marca;
    private String chapa;
    private String modelo;
    private int anho;

    @Enumerated(EnumType.STRING)
    private TipoVehiculo tipo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @JsonbTransient
    @OneToMany(mappedBy = "vehiculo", cascade = CascadeType.ALL)
    private List<Servicio> servicios;

    public enum TipoVehiculo {
        MOTO, COCHE, CAMIONETA, CAMION
    }

    // Constructor vacío requerido para JPA
    public Vehiculo() {
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getChapa() {
        return chapa;
    }

    public void setChapa(String chapa) {
        this.chapa = chapa;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public int getAnho() {
        return anho;
    }

    public void setAnho(int anho) {
        this.anho = anho;
    }

    public TipoVehiculo getTipo() {
        return tipo;
    }

    public void setTipo(TipoVehiculo tipo) {
        this.tipo = tipo;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public List<Servicio> getServicios() {
        return servicios;
    }

    public void setServicios(List<Servicio> servicios) {
        this.servicios = servicios;
    }

    @Override
    public String toString() {
        return "Vehiculo{" +
                "id=" + id +
                ", marca='" + marca + '\'' +
                ", modelo='" + modelo + '\'' +
                ", chapa='" + chapa + '\'' +
                ", anho=" + anho +
                ", tipo=" + tipo +
                '}';
    }
}
