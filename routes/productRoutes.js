const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { createProductController, getAllProductsController, getProductByIdController, updateProductController, deleteProductByIdController, makeOrderController, updateOrderStatusController, deleteOrderByIdController } = require("../controllers/productController");
const adminMiddleware = require("../middleware/adminMiddleware");


//router object

const router = express.Router()

//routes 

// CREATE PRODUCT
router.post('/createProduct', authMiddleware, createProductController)

// GET ALL PRODUCTS
router.get('/getProducts', getAllProductsController)

// GET single PRODUCT
router.get('/getProduct/:id', getProductByIdController)

// UPDATE PRODUCT
router.put('/update/:id', authMiddleware, updateProductController)

// DELETE PRODUCT
router.delete('/delete/:id', authMiddleware, deleteProductByIdController)

// MAKE ORDER 
router.post('/makeOrder', authMiddleware, makeOrderController)

// CHANGE ORDER STATUS 
router.post('/changeOrderStatus', authMiddleware, updateOrderStatusController)

// DELETE ORDER
router.delete('/deleteOrder/:id', authMiddleware, deleteOrderByIdController)

//export
module.exports = router