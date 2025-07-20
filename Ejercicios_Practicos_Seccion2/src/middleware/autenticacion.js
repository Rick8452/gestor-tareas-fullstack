module.exports = function (req, res, next) {
    const token = req.headers["autorizacion"]
    if (token === "123456") {
        next()
    } else {
        res.status(403).json({message:  "No autorizado"})
    }
}