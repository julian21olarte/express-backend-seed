# polls-test-backend
> Backend para aplicacion de encuestas.



## Requerimientos

1. Nodejs 8.9.4 o superior
2. Npm 5.5 o superior
3. Mysql 5.7 / MariaDB 10.2
4. Base de datos creada previamente, `polls_test` por ejemplo
5. Instalacion del [frontend](https://github.com/julian21olarte/polls-test-frontend) de la aplicacion

## Instalación
```
1. npm install
```
```
2. Para desplegar este backend es necesario configurar las credenciales de Mysql en el objeto Sequelize 
del archivo models/index.js. Utilizamos por defecto una base de datos llamada `polls_test` y las credenciales 
por defecto de Mysql
```
> User: `root` y Pass: `root`

``` javascript
const sequelize = new Sequelize('polls_test', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 50,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
```

## Despliegue

```
1. Ejecutar `npm start` o `npm run dev` para ejecutar el proyecto.
```
> Por defecto se ejecuta en el puerto `3000`.

```
2. Por defecto se provee un usuario administrador para realizar pruebas en la aplicacion
```
> User: `granactate` y Password: `granactate`

