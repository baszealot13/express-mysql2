const jwt = require('jsonwebtoken')

class RouteProtection {
    static verify(req, res, next) {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader.split(' ').pop()
            const decoded = jwt.verify(token, 'abc123456')

            req.user = { id: decoded.id }

            return next()
        } catch (error) {
            console.log('RouteProtection.verify: ', error);
            res.status(401).json({ message: 'Unauthoriz' }).end()
        }
    }
}

module.exports = RouteProtection