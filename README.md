# Sistema de Gestión de Taller Mecánico

Sistema de gestión para talleres mecánicos que permite administrar servicios, vehículos, clientes, mecánicos y repuestos.

## Stack Tecnológico

### Backend
- Java 17
- Jakarta EE 10
- WildFly 27.0.1
- JPA/Hibernate
- PostgreSQL 15
- Maven 3.9+

### Frontend
- React 18
- Material-UI (MUI)
- Axios
- React Router DOM
- React Query

## Requisitos Previos

### Backend
1. JDK 17 o superior
2. Maven 3.9+
3. WildFly 27.0.1
4. PostgreSQL 15

### Frontend
1. Node.js 18+
2. npm 9+

## Configuración del Entorno

### Base de Datos
1. Instalar PostgreSQL 15
2. Crear una base de datos:
```sql
CREATE DATABASE taller_mecanico;
```
3. Configurar el usuario y contraseña en el archivo `persistence.xml`

### Backend
1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd taller-mecanico/backend
```

2. Configurar WildFly:
   - Descargar WildFly 27.0.1 desde [wildfly.org](https://www.wildfly.org/downloads/)
   - Descomprimir en `/opt/wildfly`
   - Configurar variables de entorno:
```bash
export JBOSS_HOME=/opt/wildfly
export PATH=$PATH:$JBOSS_HOME/bin
```

3. Configurar el datasource en WildFly:
   - Ejecutar el script de configuración:
```bash
$JBOSS_HOME/bin/jboss-cli.sh --connect
/subsystem=datasources/data-source=TallerDS:add(
    jndi-name=java:/TallerDS,
    driver-name=postgresql,
    connection-url=jdbc:postgresql://localhost:5432/taller_mecanico,
    user-name=tu_usuario,
    password=tu_password
)
```

4. Compilar y desplegar:
```bash
mvn clean package
cp target/backend.war $JBOSS_HOME/standalone/deployments/
```

5. Iniciar WildFly:
```bash
$JBOSS_HOME/bin/standalone.sh
```

### Frontend
1. Navegar al directorio del frontend:
```bash
cd taller-mecanico/frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
   - Crear archivo `.env`:
```
REACT_APP_API_URL=http://localhost:8080/backend/api
```

4. Iniciar el servidor de desarrollo:
```bash
npm start
```

## Estructura del Proyecto

```
taller-mecanico/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/taller/
│   │   │   │       ├── model/        # Entidades JPA
│   │   │   │       ├── service/      # Lógica de negocio
│   │   │   │       ├── resource/     # Endpoints REST
│   │   │   │       └── util/         # Utilidades
│   │   │   └── resources/
│   │   │       └── META-INF/
│   │   │           └── persistence.xml
│   │   └── webapp/
│   └── pom.xml
└── frontend/
    ├── src/
    │   ├── components/    # Componentes React
    │   ├── pages/        # Páginas/Vistas
    │   ├── api/          # Servicios API
    │   ├── context/      # Contextos React
    │   └── utils/        # Utilidades
    ├── package.json
    └── .env
```

## Características Principales

- Gestión de clientes y vehículos
- Registro de servicios mecánicos
- Asignación de mecánicos a servicios
- Control de inventario de repuestos
- Seguimiento de costos y facturación
- Búsqueda y filtrado de servicios
- Reportes y estadísticas

## API Endpoints

### Servicios
- `GET /api/servicios` - Listar todos los servicios
- `GET /api/servicios/{id}` - Obtener servicio por ID
- `POST /api/servicios` - Crear nuevo servicio
- `GET /api/servicios/filtrar` - Filtrar servicios

### Clientes
- `GET /api/clientes` - Listar todos los clientes
- `POST /api/clientes` - Crear nuevo cliente
- `GET /api/clientes/{id}` - Obtener cliente por ID

### Vehículos
- `GET /api/vehiculos` - Listar todos los vehículos
- `POST /api/vehiculos` - Crear nuevo vehículo
- `GET /api/vehiculos/{id}` - Obtener vehículo por ID

### Mecánicos
- `GET /api/mecanicos` - Listar todos los mecánicos
- `POST /api/mecanicos` - Crear nuevo mecánico
- `GET /api/mecanicos/{id}` - Obtener mecánico por ID

### Repuestos
- `GET /api/repuestos` - Listar todos los repuestos
- `POST /api/repuestos` - Crear nuevo repuesto
- `GET /api/repuestos/{id}` - Obtener repuesto por ID

## Solución de Problemas Comunes

### Backend
1. Error de conexión a la base de datos:
   - Verificar que PostgreSQL esté corriendo
   - Confirmar credenciales en persistence.xml
   - Verificar configuración del datasource en WildFly

2. Error de despliegue:
   - Verificar logs en `$JBOSS_HOME/standalone/log/server.log`
   - Confirmar que el WAR se generó correctamente
   - Verificar permisos en el directorio de despliegue

### Frontend
1. Error de conexión al backend:
   - Verificar que WildFly esté corriendo
   - Confirmar URL en .env
   - Verificar CORS en el backend

2. Errores de compilación:
   - Limpiar caché: `npm clean-cache`
   - Reinstalar dependencias: `npm install`
   - Verificar versiones de Node.js y npm

## Contribución

1. Fork el repositorio
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Contacto

Para soporte o consultas, por favor contactar a [tu-email@dominio.com] 