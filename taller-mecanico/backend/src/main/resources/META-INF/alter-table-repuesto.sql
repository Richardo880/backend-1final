-- Agregar columna precio a la tabla repuesto
ALTER TABLE repuesto ADD COLUMN precio DOUBLE PRECISION NOT NULL DEFAULT 0;

-- Actualizar la columna precio para los repuestos existentes
UPDATE repuesto SET precio = 0 WHERE precio IS NULL; 