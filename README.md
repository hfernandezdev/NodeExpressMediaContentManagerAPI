# API de Gestión de Contenido Multimedia

![Screenshot](/images/Screenshot.png)

## Descripción general:
- Esta API permite la gestión de contenido multimedia, accesible según los tipos de usuarios registrados. Proporciona endpoints para la creación, lectura, actualización y eliminación (CRUD) de categorías, temáticas y contenidos multimedia, gestionando permisos según el rol de los usuarios.

## Características principales:
- Implementación de una API RESTful con Node.js y Express.
- Manejo de entidades de usuarios, categorías, temáticas y contenidos multimedia con Mongoose.
- Endpoints para realizar operaciones CRUD en usuarios, categorías, temáticas y contenidos multimedia.
- Autenticación y autorización mediante JWT.
- Gestión de Usuarios y Roles.
- Autodocumentación de la API con Swagger.

## Tecnologías utilizadas:
- [Node.js](https://nodejs.org/) - Entorno de ejecución de JavaScript.
- [Express](https://expressjs.com/) - Framework de Node.js para construir aplicaciones web y APIs.
- [MongoDB](https://www.mongodb.com/) - Base de datos NoSQL utilizada para almacenar los datos de clientes y membresías.
- [Mongoose](https://www.mongodb.com/) - ODM (Object Data Modeling) para MongoDB en Node.js.
- [Swagger](https://swagger.io/) - Herramienta para documentar APIs RESTful.
- [JWT](https://jwt.io/) - Estándar abierto para autenticación mediante tokens.

## Requisitos:
- Node.js y npm instalados en el sistema.
- MongoDB instalado y en ejecución en el sistema.

## Documentación:
- Puedes acceder a la documentación de la API en [http://localhost:3000/api-docs](http://localhost:3000/api-docs) una vez que la aplicación esté en ejecución.

## Importación en Postman:
- Abre Postman.
- Ve a la pestaña "Import" en la esquina superior izquierda.
- Selecciona la opción "Import File".
- Busca y selecciona el archivo de especificación de OpenAPI descargado.
- Postman importará automáticamente la especificación y generará una nueva colección con todas las solicitudes y rutas definidas.
- [Descargar la colección de Postman](openapi-postman-collection/openapi-postman-collection.json)

## Autor:
- [Humberto Fernández (Github)](https://github.com/hfernandezdev)

## Soporte:

Si tienes algún problema o pregunta, por favor [contacta conmigo](mailto:humbertof44@gmail.com).
