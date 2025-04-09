const jwt = require('jsonwebtoken');
const userModel = require("../models/userModels");;
const JWTSECRET = process.env.JWTSECRET;

const authMiddleware = async (req, res, next) => {
    const token = req.header("auth")?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, JWTSECRET);
        const user = await userModel.findById(decoded.userId);
        if (!user) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        const {_id,username,role,email} = user;
        req.user = {_id,username,role,email};
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

const roleMiddleware = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    }
}

module.exports = { authMiddleware, roleMiddleware };    