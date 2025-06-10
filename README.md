# 🛠️ Sistema de Gestión de Taller Mecánico - Backend

📌 **Proyecto Académico - Taller Mecánico**


📌 **Electiva: Programación Web - Backend**  
📌 **Trabajo Práctico: Primer Final**  
📌 **Prof.: Ing. Gustavo Sosa Cataldo**

---

## **👥 Integrantes del Proyecto**

Este proyecto fue desarrollado por el siguiente equipo de trabajo:

- **Kevin Galeano**
- **María José Duarte**
- **Tobías Otazu**
- **Ricardo Toledo**
- **Enrique Saldivar**
📌 **Tecnologías utilizadas:** Jakarta EE, WildFly, PostgreSQL, React


## 📝 Descripción del Proyecto

Este sistema permite registrar y gestionar las operaciones de un **taller mecánico**, incluyendo:

✅ Gestión de **clientes** y **vehículos**  
✅ Registro de **mecánicos** y **repuestos**  
✅ Registro completo de **servicios realizados**, con detalles, costos, repuestos y mano de obra  
✅ Consultas filtradas por cliente  
✅ Arquitectura backend RESTful + frontend React

---
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

Verifica Maven:
```bash
mvn -version
```

---

## 🚀 Despliegue del Backend en WildFly

### 1️⃣ Configurar PostgreSQL

- Crear una base de datos: `tallerdb`
- Editar el archivo `persistence.xml` con tus credenciales de PostgreSQL.

### 2️⃣ Descargar el Driver JDBC

- Descargar desde: https://jdbc.postgresql.org/download/
- Copiar el `.jar` (por ejemplo, `postgresql-42.7.5.jar`) a:

```bash
$WILDFLY_HOME/modules/system/layers/base/org/postgresql/main/
```

### 3️⃣ Crear `module.xml`

```xml
<module xmlns="urn:jboss:module:1.1" name="org.postgresql">
    <resources>
        <resource-root path="postgresql-42.7.5.jar"/>
    </resources>
    <dependencies>
        <module name="javax.api"/>
        <module name="javax.transaction.api"/>
    </dependencies>
</module>
```

### 4️⃣ Configurar `standalone.xml`

Dentro de `<datasources>`:
```xml
<datasource jndi-name="java:jboss/datasources/PostgresDS" pool-name="PostgresDS" enabled="true" use-java-context="true">
    <connection-url>jdbc:postgresql://localhost:5432/tallerdb</connection-url>
    <driver>postgres</driver>
    <security>
        <user-name>postgres</user-name>
        <password>postgres</password>
    </security>
</datasource>
```

Dentro de `<drivers>`:
```xml
<driver name="postgres" module="org.postgresql">
    <driver-class>org.postgresql.Driver</driver-class>
</driver>
```

Dentro de `<subsystem xmlns="urn:jboss:domain:ee:4.0">`:
```xml
<default-bindings datasource="java:jboss/datasources/PostgresDS" />
```

---

## 🧪 Despliegue del Proyecto

1. Compilar y empaquetar:
```bash
cd backend
mvn clean package
```

2. Copiar el `.war` generado (`backend.war`) a:
```bash
$WILDFLY_HOME/standalone/deployments/
```

3. Iniciar WildFly:
```bash
$WILDFLY_HOME/bin/standalone.sh
```

4. Accede a los endpoints desde:
```
http://localhost:8080/backend/api/
```

---

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

---

## 📡 Endpoints REST

| Entidad      | Método  | Ruta                                  |
|--------------|---------|----------------------------------------|
| Clientes     | GET     | `/api/clientes`                        |
| Vehículos    | GET     | `/api/vehiculos?clienteId=1`           |
| Mecánicos    | POST    | `/api/mecanicos`                       |
| Repuestos    | GET     | `/api/repuestos`                       |
| Servicios    | POST    | `/api/servicios`                       |
| Consultas    | GET     | `/api/servicios/filtro?clienteId=1`    |

---

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


## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
