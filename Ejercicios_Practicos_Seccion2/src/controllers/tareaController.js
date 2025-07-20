const Tarea = require("../models/Tarea")
exports.crearTarea = async (req, res) => {
    try {
    const { titulo, descripcion} = req.body
    const completada = req.body.completada === "true"
    const archivo = req.file ? req.file.filename : null

    console.log("Datos recibidos:", {
            titulo, 
            descripcion, 
            completada,
            archivo
        })

    const nuevaTarea = new Tarea({
        titulo,
        descripcion,
        completada,
        archivo
    })
    const tareaGuardada = await nuevaTarea.save()
        console.log("Tarea guardada en MongoDB:", tareaGuardada)
        
        res.status(201).json(tareaGuardada)
    } catch  {
        console.error("Error al crear tarea:", error)
        res.status(500).json({ error: error.message })
    }
    
}

exports.obtenerTareas = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const [tareas, total] = await Promise.all([
      Tarea.find().skip(skip).limit(limit),
      Tarea.countDocuments()
    ]);

    res.json({ tareas, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.actualizarTarea = async (req, res) => {
    const tarea = await Tarea.findByIdAndUpdate(req.params.id, req.body,{new : true})
    res.json(tarea)
}

exports.eliminarTarea = async (req, res) => {
    await Tarea.findByIdAndDelete(req.params.id)
    res.json({message: "Tarea Eliminada"})
}