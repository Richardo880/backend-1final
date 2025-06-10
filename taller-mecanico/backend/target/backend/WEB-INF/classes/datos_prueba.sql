-- Limpiar tablas existentes (en orden inverso a las dependencias)
DELETE FROM detalleservicio;
DELETE FROM servicio;
DELETE FROM vehiculo;
DELETE FROM cliente;

-- Insertar clientes
INSERT INTO cliente (id, nombre, ruc, telefono, direccion) VALUES
(1, 'Juan Pérez', '123456-7', '0981-123456', 'Av. Principal 123'),
(2, 'María González', '234567-8', '0982-234567', 'Calle Secundaria 456'),
(3, 'Carlos Rodríguez', '345678-9', '0983-345678', 'Ruta 2 Km 45'),
(4, 'Ana Martínez', '456789-0', '0984-456789', 'Av. Libertador 789'),
(5, 'Roberto Silva', '567890-1', '0985-567890', 'Calle Principal 321');

-- Insertar vehículos
INSERT INTO vehiculo (id, marca, modelo, chapa, anio, tipo, cliente_id) VALUES
(1, 'Toyota', 'Corolla', 'ABC-123', 2020, 'Sedan', 1),
(2, 'Honda', 'Civic', 'DEF-456', 2019, 'Sedan', 1),
(3, 'Ford', 'Ranger', 'GHI-789', 2021, 'Camioneta', 2),
(4, 'Volkswagen', 'Golf', 'JKL-012', 2018, 'Hatchback', 3),
(5, 'Chevrolet', 'Onix', 'MNO-345', 2022, 'Hatchback', 3),
(6, 'Fiat', 'Strada', 'PQR-678', 2020, 'Camioneta', 4),
(7, 'Renault', 'Kwid', 'STU-901', 2021, 'SUV', 5);

-- Insertar servicios
INSERT INTO servicio (id, fecha, kilometraje, descripcion_general, costo_total, vehiculo_id) VALUES
(1, '2024-01-15', 15000, 'Cambio de aceite y filtros', 150000, 1),
(2, '2024-01-20', 25000, 'Revisión de frenos', 200000, 2),
(3, '2024-02-01', 30000, 'Cambio de correa de distribución', 450000, 3),
(4, '2024-02-10', 18000, 'Alineación y balanceo', 120000, 4),
(5, '2024-02-15', 22000, 'Cambio de pastillas de freno', 180000, 5),
(6, '2024-02-20', 28000, 'Revisión de suspensión', 250000, 6),
(7, '2024-03-01', 12000, 'Cambio de aceite y filtros', 150000, 7),
(8, '2024-03-05', 32000, 'Cambio de embrague', 600000, 1),
(9, '2024-03-10', 19000, 'Revisión de aire acondicionado', 180000, 2),
(10, '2024-03-15', 35000, 'Cambio de bujías y cables', 220000, 3);

-- Insertar detalles de servicio
INSERT INTO detalleservicio (id, descripcion, costo, servicio_id) VALUES
(1, 'Cambio de aceite sintético', 80000, 1),
(2, 'Cambio de filtro de aceite', 40000, 1),
(3, 'Cambio de filtro de aire', 30000, 1),
(4, 'Revisión de pastillas de freno', 100000, 2),
(5, 'Ajuste de frenos', 100000, 2),
(6, 'Cambio de correa de distribución', 350000, 3),
(7, 'Cambio de tensor', 100000, 3),
(8, 'Alineación de ruedas', 60000, 4),
(9, 'Balanceo de ruedas', 60000, 4),
(10, 'Cambio de pastillas de freno delanteras', 120000, 5),
(11, 'Cambio de pastillas de freno traseras', 60000, 5),
(12, 'Revisión de amortiguadores', 150000, 6),
(13, 'Revisión de resortes', 100000, 6),
(14, 'Cambio de aceite sintético', 80000, 7),
(15, 'Cambio de filtro de aceite', 40000, 7),
(16, 'Cambio de filtro de aire', 30000, 7),
(17, 'Cambio de kit de embrague', 500000, 8),
(18, 'Mano de obra embrague', 100000, 8),
(19, 'Revisión de compresor', 90000, 9),
(20, 'Recarga de gas refrigerante', 90000, 9),
(21, 'Cambio de bujías', 120000, 10),
(22, 'Cambio de cables de bujías', 100000, 10);

-- Insertar mecánicos (asumiendo que existe la tabla)
INSERT INTO mecanico (id, nombre, especialidad) VALUES
(1, 'Pedro Gómez', 'Motor'),
(2, 'Luis Martínez', 'Frenos'),
(3, 'Carlos Rodríguez', 'Suspensión'),
(4, 'Miguel Sánchez', 'Electricidad'),
(5, 'José Pérez', 'General');

-- Asignar mecánicos a detalles de servicio
INSERT INTO detalle_mecanico (detalle_id, mecanico_id) VALUES
(1, 1), (2, 1), (3, 1),  -- Servicio 1
(4, 2), (5, 2),          -- Servicio 2
(6, 1), (7, 1),          -- Servicio 3
(8, 3), (9, 3),          -- Servicio 4
(10, 2), (11, 2),        -- Servicio 5
(12, 3), (13, 3),        -- Servicio 6
(14, 1), (15, 1), (16, 1), -- Servicio 7
(17, 1), (18, 1),        -- Servicio 8
(19, 4), (20, 4),        -- Servicio 9
(21, 1), (22, 1);        -- Servicio 10

-- Insertar repuestos
INSERT INTO repuesto (id, nombre, descripcion, precio) VALUES
(1, 'Aceite Sintético 5W-30', 'Aceite de motor sintético', 80000),
(2, 'Filtro de Aceite', 'Filtro de aceite universal', 40000),
(3, 'Filtro de Aire', 'Filtro de aire de papel', 30000),
(4, 'Pastillas de Freno Delanteras', 'Pastillas de freno cerámicas', 120000),
(5, 'Pastillas de Freno Traseras', 'Pastillas de freno cerámicas', 60000),
(6, 'Kit de Embrague', 'Kit completo de embrague', 500000),
(7, 'Correa de Distribución', 'Correa de distribución reforzada', 350000),
(8, 'Tensor', 'Tensor de correa', 100000),
(9, 'Bujías', 'Bujías de iridio', 120000),
(10, 'Cables de Bujías', 'Cables de bujías de alta tensión', 100000);

-- Asignar repuestos a detalles de servicio
INSERT INTO detalle_repuesto (detalle_id, repuesto_id, cantidad) VALUES
(1, 1, 1),  -- Aceite para cambio de aceite
(2, 2, 1),  -- Filtro para cambio de filtro
(3, 3, 1),  -- Filtro de aire
(4, 4, 1),  -- Pastillas delanteras
(5, 4, 1),  -- Pastillas delanteras (ajuste)
(6, 7, 1),  -- Correa de distribución
(7, 8, 1),  -- Tensor
(8, 4, 1),  -- Pastillas para alineación
(9, 4, 1),  -- Pastillas para balanceo
(10, 4, 1), -- Pastillas delanteras
(11, 5, 1), -- Pastillas traseras
(14, 1, 1), -- Aceite para cambio
(15, 2, 1), -- Filtro de aceite
(16, 3, 1), -- Filtro de aire
(17, 6, 1), -- Kit de embrague
(21, 9, 4), -- Bujías (4 unidades)
(22, 10, 1); -- Cables de bujías 