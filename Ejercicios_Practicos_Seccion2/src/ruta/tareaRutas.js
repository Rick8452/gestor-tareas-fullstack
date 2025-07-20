const express = require("express")
const router = express.Router()
const auth= require("../middleware/autenticacion")
const multer = require("multer")
const tareaController = require("../controllers/tareaController")

const storage = multer.diskStorage({
    destination: "src/uploads/",
    filename: (req, file, cb) => cb (null, Date.now()+ "-" + file.originalname)
})

const upload = multer({storage})
router.get("/tareas", tareaController.obtenerTareas)
router.post("/tareas",  upload.single("archivo"), tareaController.crearTarea)
router.put("/:id",  tareaController.actualizarTarea)
router.delete("/:id",  tareaController.eliminarTarea)

module.exports = router