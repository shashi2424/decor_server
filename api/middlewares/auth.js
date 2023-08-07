import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export function verifyToken(req, res, next) {
    const token = req?.headers["authorization"];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, config.jwtSecret, (err, payload) => {
        if (err) return res.status(401).send({ code: 401, status: "ERROR", message: "Unauthorized" })
        req.user = {};
        req.user.mobile = payload.mobile
        req.user.role = payload.role
        next()
    })
}