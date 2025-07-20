
const mongoose = require("mongoose")
const tareaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: String,
    fechaCreacion: { type: Date, default: Date.now },
    completada: { type: Boolean, default: false },
    archivo: String,
})

module.exports = mongoose.model("Tarea", tareaSchema)
