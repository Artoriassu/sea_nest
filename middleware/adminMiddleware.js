const JWT = require("jsonwebtoken")
const userModel = require("../models/userModel")

module.exports = async (req, res, next) => {
    try {
        //get token
        const token = req.headers["authorization"].split(" ")[1]
        JWT.verify(token, process.env.JWT_SECRET, async (err, decode) => {
            if (err) {
                res.status(401).send({
                    success: false,
                    message: "Un-Authorize user",
                })
            }
            else {
                req.user = decode
                const user = await userModel.findById(req.user.id)
                if (user.userType !== "admin") {
                    return res.status(401).send({
                        success: false,
                        message: "Only admin access",
                    })
                }
                else {
                    next();
                } 
            }
        })
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Unauthorized access",
            error
        })
    }
}
