const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")

//Get User Info
const getUserController = async (req, res) => {
    try {
        // find user
        const user = await userModel.findById({ _id: req.user.id }, { _id: 0 })
        //validation
        if (!user) {
            res.status(404).send({
                success: false,
                message: " User Not Found"
            })
        }
        //hide password
        user.password = undefined
        res.status(200).send({
            success: true,
            message: " User data get successfully",
            user
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: " Error in Get User API"
        })
    }
}


//Update User
const updateUserController = async (req, res) => {
    try {
        //find user
        const user = await userModel.findById({ _id: req.user.id })
        //validation
        if (!user) {
            res.status(404).send({
                success: false,
                message: "User not found",
                error
            })
        }
        //update
        const { userName } = req.body
        if (userName) {
            user.userName = userName
        }
        //save user
        await user.save()
        res.status(200).send({
            success: true,
            essage: " User updated successfully",
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: " Error in Update User API",
            error
        })
    }
}

//UPDATE PASSWORD
const updatePasswordController = async (req, res) => {
    try {
        //find user
        const user = await userModel.findById({ _id: req.user.id })
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            })
        }
        //get data from user
        const { oldPassword, newPassword } = req.body
        if (!oldPassword || !newPassword) {
            res.status(500).send({
                success: false,
                message: " Please Provide Old or New Password",
            })
        }

        //check user password | cpmpare password
        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isMatch) {
            res.status(500).send({
                success: false,
                message: "Invalid old password"
            })
        }
        //hash password
        var salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashedPassword

        await user.save()
        res.status(200).send({
            success: true,
            message: "Password Updated!",
        })
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: " Error in Password Reset API",
            error
        })
    }
}

//RESET PASSWORD
const resetPasswordController = async (req, res) => {
    try {

        const { email, newPassword, answer } = req.body
        if (!email || !newPassword || !answer) {
            return res.status(500).send({
                success: false,
                message: " Please Provide All Fields",
            })
        }
        const user = await userModel.findOne({ email, answer })
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "User not found or invalid answer",
                error
            })
        }

        //hash password
        var salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashedPassword

        await user.save()

        res.status(200).send({
            success: true,
            message: " Password Reset Successfully",
        })
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: " Error in Password Reset API",
            error
        })
    }
}

//DELETE USER
const deleteUserController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)

        return res.status(200).send({
            success: true,
            message: " User account has been deleted",
        })
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: " Error in Delete User API",
            error
        })
    }
}



module.exports = {
    getUserController,
    updateUserController,
    resetPasswordController,
    updatePasswordController,
    deleteUserController
}