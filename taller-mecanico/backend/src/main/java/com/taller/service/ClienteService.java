package com.taller.service;

import com.taller.model.Cliente;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;

@Stateless
public class ClienteService {

    @PersistenceContext(unitName = "tallerPU")
    private EntityManager em;

    public void crearCliente(Cliente cliente) {
        em.persist(cliente);
    }

    public List<Cliente> listarClientes() {
        return em.createQuery("SELECT c FROM Cliente c", Cliente.class).getResultList();
    }

    public Cliente buscarPorId(Long id) {
        return em.find(Cliente.class, id);
    }
}
