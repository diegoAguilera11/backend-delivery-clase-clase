# Backend Delivery Semestre I 2024
## Descripción del Proyecto
Este es un proyecto en el cual se construye una API Delivery con el fin de comprender los aspectos fundamentales de NodeJS, utilizando NodeJS, Express, MySQL y Sequelize.

![NODE Express and MySQL logo](https://miro.medium.com/v2/resize:fit:1400/1*_v_pedAJHn3NzW6prKDRdA.png)

## Tecnologías Utilizadas
- NodeJS
- Express
- MySQL
- Sequelize

## Instalación y Configuración

### Software Necesario
- Node: [Descargar Node](https://nodejs.org/en/download/current)
- Nodemon: [Descargar Nodemon](https://www.npmjs.com/package/nodemon)
- MySQL Workbench (Gestor de base de datos a elección): [Descargar MySQL](https://dev.mysql.com/downloads/installer/)

### Pasos de Ejecución
    1. Instalar MySQL Workbench. 
    2. Ingresar Seeders de Roles 
    3. Copiar el archivo `.env.example` y nombrarlo como `.env`.
    4. Ejecutar el comando `npm install` para instalar las dependencias del proyecto.
    5. Configurar las variables de entorno del archivo `.env`.
    6. Ejecutar el proyecto de manera local con el comando `nodemon app`.
    7. ¡Disfruta del APIRest!


### Seeders Roles
```sql
INSERT INTO roles(
	name,
    createdAt,
    updatedAt
)
VALUES(
	'ADMINISTRADOR',
    '2024-05-01',
    '2024-05-01'
);

INSERT INTO roles(
	name,
    createdAt,
    updatedAt
)
VALUES(
	'REPARTIDOR',
    '2024-05-01',
    '2024-05-01'
);

INSERT INTO roles(
	name,
    createdAt,
    updatedAt
)
VALUES(
	'CLIENTE',
    '2024-05-01',
    '2024-05-01'
)
```
### Autor
- Diego Aguilera Villanelo - Profesor Proyecto Integrador de Software
