const express = require("express");
const { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteUserController } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

//router object

const router = express.Router()

//routes 

// GET USER || GET
router.get('/getUser', authMiddleware, getUserController)

// UPDATE PROFILE || PUT
router.put('/updateUser', authMiddleware, updateUserController)

// UPDATE PASSWORD 
router.post('/updatePassword', authMiddleware, updatePasswordController)

// RESET PASSWORD 
router.post('/resetPassword', authMiddleware, resetPasswordController)

// DELETE USER || DELETE
router.delete('/deleteUser/:id', authMiddleware, deleteUserController)



//export
module.exports = router