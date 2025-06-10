package com.taller.service;

import com.taller.model.Cliente;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import java.util.logging.Logger;
import java.util.logging.Level;

@Stateless
public class ClienteService {

    private static final Logger logger = Logger.getLogger(ClienteService.class.getName());

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

    public List<Cliente> guardarClientesPrueba(List<Cliente> clientes) {
        logger.log(Level.INFO, "Guardando {0} clientes de prueba", clientes.size());
        
        for (Cliente cliente : clientes) {
            // Validar datos básicos
            if (cliente.getNombre() == null || cliente.getNombre().trim().isEmpty()) {
                throw new IllegalArgumentException("El nombre del cliente es requerido");
            }
            if (cliente.getRuc() == null || cliente.getRuc().trim().isEmpty()) {
                throw new IllegalArgumentException("El RUC del cliente es requerido");
            }
            
            // Persistir el cliente
            em.persist(cliente);
            logger.log(Level.FINE, "Cliente guardado: {0}", cliente.getNombre());
        }
        
        // Forzar el flush para asegurar que todos los clientes se guarden
        em.flush();
        
        logger.log(Level.INFO, "Clientes de prueba guardados exitosamente");
        return clientes;
    }
}
