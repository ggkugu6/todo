const jwt = require('jsonwebtoken')

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(401).json({ massage: "Не авторизован" })
            }
            const decoded = jwt.verify(token, process.env.DB_TOKEN)
            if (decoded.role !== role) {
                return res.status(403).json({massage: "Нет доступа"})
            }
        } catch (e) {
            res.status(401).json({ massage: "Не авторизован" })
        }
        /*return console.log(req.headers)*/

    }
}