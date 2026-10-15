const orderModel = require("../models/orderModel")
const productModel = require("../models/productModel")

//Create Product
const createProductController = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            imageUrl,
            code,
            status } = req.body
        //validation
        if (!title || !description || !price) {
            res.status(500).send({
                success: false,
                message: " Please provide title, description and price"
            })
        }
        const newProduct = new productModel(
            {
                title,
                description,
                price,
                imageUrl,
                code,
                status
            }
        )
        await newProduct.save()

        res.status(201).send({
            success: true,
            message: " New Product created"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: " Error in Create Product API"
        })
    }
}

//Get All Products
const getAllProductsController = async (req, res) => {
    try {
        const products = await productModel.find({})
        if (!products) {
            return res.status(404).send({
                success: false,
                message: "No products Availible"
            })
        }
        res.status(200).send({
            success: true,
            totalCount: products.length,
            products
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: " Error in Get All Products API"
        })
    }
}

//Get Product By Id
const getProductByIdController = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(404).send({
                success: false,
                message: "Please provide Product Id"
            })
        }
        //find product
        const product = await productModel.findById(productId)
        if (!product) {
            return res.status(404).send({
                success: false,
                message: "No products with this Id found"
            })
        }
        res.status(200).send({
            success: true,
            product
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: " Error in Get Product By Id API"
        })
    }
}

//Update Product
const updateProductController = async (req, res) => {
    try {
        //find product
        const productId = req.params.id
        const product = await productModel.findById({ _id: productId })
        //validation
        if (!product) {
            res.status(404).send({
                success: false,
                message: "Product not found",
                error
            })
        }
        //update
        const {
            title,
            description,
            price,
            imageUrl,
            code,
            status
        } = req.body
        const updatedProduct = await productModel.findByIdAndUpdate(productId, {
            title,
            description,
            price,
            imageUrl,
            code,
            status
        }, { new: true })

        if (!updatedProduct) {
            return res.status(500).send({
                success: false,
                message: "No product found"
            })
        }
        res.status(200).send({
            success: true,
            message: "Product Updated Successfully"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: " Error in Update Product API",
            error
        })
    }
}

//DELETE PRODUCT
const deleteProductByIdController = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(404).send({
                success: false,
                message: "Please provide product Id"
            })
        }
        const product = await productModel.findById({ _id: productId })
        //validation
        if (!product) {
            return res.status(404).send({
                success: false,
                message: "Product not found",
            })
        }
        await productModel.findByIdAndDelete(productId)

        return res.status(200).send({
            success: true,
            message: " Product has been deleted",
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: " Error in Delete Product By Id API"
        })
    }
}


//MAKE ORDER
const makeOrderController = async (req, res) => {
    try {
        const { data } = req.body
        if (!data.cart) {
            return res.status(500).send({
                success: false,
                message: " Please choose product",
            })
        }
        else if (!data.buyerNumber) {
            return res.status(500).send({
                success: false,
                message: " Please type your phone number",
            })
        }
        const newOrder = await orderModel({
            products: data.cart,
            buyerNumber: data.buyerNumber,
        })
        await newOrder.save()
        return res.status(201).send({
            success: true,
            message: " Order made succesfully",
            newOrder
        })
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: " Error in Choose Product API",
            error
        })
    }
}

//GET ALL ORDERS
const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        if (!orders) {
            return res.status(404).send({
                success: false,
                message: "No orders availible"
            })
        }
        res.status(200).send({
            success: true,
            totalCount: orders.length,
            products
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: " Error in Get All Orders API"
        })
    }
}

//UPDATE ORDER STATUS
const updateOrderStatusController = async (req, res) => {
    try {
        const orderId = req.params.id
        const { status } = req.body
        const updatedCategory = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true })
        if (!updatedCategory) {
            return res.status(500).send({
                success: false,
                message: "No order found"
            })
        }
        res.status(200).send({
            success: true,
            message: "Order Status Updated Successfully"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: " Error in Update Order Status API"
        })
    }
}

//DELETE ORDER
const deleteOrderByIdController = async (req, res) => {
    try {
        const orderId = req.params.id
        if (!orderId) {
            return res.status(404).send({
                success: false,
                message: "Please provide order Id"
            })
        }
        const order = await orderModel.findById({ _id: orderId })
        //validation
        if (!order) {
            return res.status(404).send({
                success: false,
                message: "Order not found",
            })
        }
        await orderModel.findByIdAndDelete(orderId)

        return res.status(200).send({
            success: true,
            message: " Order has been deleted",
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: " Error in Delete Order By Id API"
        })
    }
}

module.exports = {
    createProductController,
    getAllProductsController,
    getProductByIdController,
    updateProductController,
    deleteProductByIdController,
    makeOrderController,
    updateOrderStatusController,
    deleteOrderByIdController,
}