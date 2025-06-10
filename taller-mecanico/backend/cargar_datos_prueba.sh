#!/bin/bash

# Colores para mensajes
VERDE='\033[0;32m'
ROJO='\033[0;31m'
AMARILLO='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${AMARILLO}Iniciando carga de datos de prueba...${NC}"

# Verificar si psql está instalado
if ! command -v psql &> /dev/null; then
    echo -e "${ROJO}Error: psql no está instalado. Por favor, instale PostgreSQL.${NC}"
    exit 1
fi

# Configuración de la base de datos
DB_NAME="taller"
DB_USER="postgres"
DB_PASS="postgres"
DB_HOST="localhost"
DB_PORT="5432"

# Ruta al script SQL
SCRIPT_PATH="src/main/resources/datos_prueba.sql"

# Verificar si el archivo SQL existe
if [ ! -f "$SCRIPT_PATH" ]; then
    echo -e "${ROJO}Error: No se encontró el archivo $SCRIPT_PATH${NC}"
    exit 1
fi

echo -e "${AMARILLO}Conectando a la base de datos...${NC}"

# Intentar ejecutar el script SQL
PGPASSWORD=$DB_PASS psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f $SCRIPT_PATH

# Verificar si la ejecución fue exitosa
if [ $? -eq 0 ]; then
    echo -e "${VERDE}¡Datos de prueba cargados exitosamente!${NC}"
    echo -e "${VERDE}Se han cargado:${NC}"
    echo -e "- 5 clientes"
    echo -e "- 7 vehículos"
    echo -e "- 10 servicios"
    echo -e "- 22 detalles de servicio"
    echo -e "- 5 mecánicos"
    echo -e "- 10 repuestos"
else
    echo -e "${ROJO}Error al cargar los datos de prueba${NC}"
    exit 1
fi 