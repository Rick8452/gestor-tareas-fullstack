                    App lista de tareas FullStack

Este proyecto tiene como objetivo la creacion de una app de lista de tareas que cumpla con los siguientes requisitos:

-EJERCICIO 1 “Mini API de Tareas” (Backend)

Se creo una API REST que permita:

● Crear, listar, actualizar y eliminar tareas.
● Cada tarea tiene: id, titulo, descripcion, completada
(booleano), fechaCreacion.
● Usa MongoDB (Mongoose) o PostgreSQL (TypeORM).
● Protege las rutas con un middleware simple de autenticación (ej.
token fijo en headers).

Para la implementacion de este primer paso se utilizaron las siguientes tecnologías: 
* Node.js 
* Express
* MongoDB Atlas
* Mongoose 
* Multer

1. Para el modelado de los datos que se insertan en MongoDB se utilizo un esquema con campos ya definidos por el usuario tales como (titulo, descripcion, fechaCreacion, completada, archivo) todo con validacion automatica usando mongoose.Schema.

2. Se creo un controlador con las caracteristicas para (crear tarea, obtener tarea, actualizar tarea y eliminar tarea) se uso el booleano para verificar si es ya fue completada la tarea y asi tambien mostrarlo al usuario, se manejo Multer para el manejo de los archivos que el usuario comparte para mostarlos en la lista de atreas como evidencia u otro fin, por ultimo se guarda en MongoDB atlas la insercion de la nueva tarea o la modificacion o eliminacion de esta tarea. 

3. Se ultizo una autenticacion simple con un token statico ("123456") quese verifica con un header de autorizacion el token se añadio al archivo .env donde se encuentra tambien la ruta de conexion con la base de datos en MongoDB Atlas.

4. Se configuro un servidor en localhost:5173 con un cors configurado para vue el cual ayuda a la conexion con el frontend que se menciona mas adelante.

- EJERCICIO 2 “App de Lista de Tareas” (Frontend)

Se creo una interfaz que consuma la API del ejercicio anterior con las siguientes caracteristicas:

● Permite al usuario ver, crear, actualizar y eliminar tareas.
● Usa pinia para manejar el estado global.
● Los estilos son simples con Bootstrap.
● Validaciones básicas con vuelidate.
● Muestra alertas al usuario con sweetalert2.

Tecnologías utilizadas: Vue (Nuxt 4) + Pinia

El siguiente esquema muestra la arquitectura final:

             ____ =>TareasView.vue -----> TareaCard.vue
            |                                  |
            |                                  | 
Vue router --                                  |
            |                                  V
            |____=> NuevaTarea.vue ---> Pinia Store ----> consume API
                                                            Backend


1. Con Pinia Store se obtiene un estado donde se tienen acciones como createTarea que usa FormData para enviar los archivos, tambien utiliza interceptores axios para el manejo de errores y por ultimo se usa fetchTareas para obtener los datos del paginado.

2. Las vistas son manejadas por TareasView y NuevaTarea las cuales cuentan con validaciones con Vuelidate y muestra las tareas previamente almacenadas o nuevas.

Con esto y otras implementaciones se obtiene una app de lista de tareas funcional para gestionar tareas del usuario a traves de un CRUD.

Notas adicionales

Se utilizaron los siguientes recursos como apoyo para la gestion de errores y correccion de fallos, y asi asegurar el funcionamento correcto del aplicativo, tambien se utlizo la inteligencia artificial deepseek para corregir algunos errores.

https://stackoverflow.com/questions/78242609/problem-with-react-vite-while-running-the-npm-run-dev-command

https://stackoverflow.com/questions/74186757/localhost-mongodb-connection-with-mongoose-not-working

https://www.youtube.com/watch?v=F53M1sbCPlM&t=147s

https://www.youtube.com/watch?v=Oa5blAV7Fyg&t=6259s

https://www.youtube.com/watch?v=sHXxASRp2nw

https://stackoverflow.com/questions/78491880/nodemon-not-working-when-using-script-but-works-when-i-use-it-manually

https://stackoverflow.com/questions/73408434/vite-failed-to-load-config-from-vite-config-js

https://stackoverflow.com/questions/69959110/im-getting-no-response-of-get-request-with-axios-on-my-node-js-api

https://stackoverflow.com/questions/52039375/stuck-while-installing-packages-npm-err-notarget-no-matching-version-found-for

https://es.stackoverflow.com/questions/409852/aclaracion-en-rutas-nodejs 

https://chat.deepseek.com/
