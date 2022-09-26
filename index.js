const express = require('express')
require('dotenv').config()
const { dbConnection } = require('./database/config')

// Crear el servidor de express
const app = express()

// Base de datos
dbConnection()

// Directorio publico
app.use(express.static('public'))

// Lectura y parseo del body
app.use(express.json())

// Rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

// Escuchar peticion
app.listen(process.env.PORT, () => {
  console.log(`servidor corriendo en puerto ${process.env.PORT}`)
})
