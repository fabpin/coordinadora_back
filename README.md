# Prerequisitos
Se debe tener instalados de manera global las siguientes tecnologias
1. MySql (ejecutar el scrip coordinador-v01-15-5-2025.sql)
2. Redis

Se debe tener instalados de manera global las siguientes librerias
1. npm install yarn -g
2. yarn global add typescript 
3. yarn global add nodemon

## Proceso de instalacion

```
$ yarn install
```

## Ejecutar proyecto en desarrollo

```
$ yarn dev
```

## Diseño de la base de datos coordinadora
![Diseño](https://octodex.github.com/images/minion.png)

###### Notas

Este proyecto contiene configuracion de gruntfile para mantenimiento de la aplicacion, el cual se encarga de compilar/comprimir y limpiar el codigo generado en css asi como sus automatizaciones, esta funcionalidad es por debajo y solo se debe hacer uso de los script y se puede cambiar por webpack.