require ("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const morgan = require("morgan")

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'autorizacion'],
  credentials: true
}))
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/uploads", express.static("src/uploads"))

app.use("/", require("./ruta/tareaRutas"))

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Conectado a la base de datos")
    app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000"))
})
.catch((error) => console.log(error))