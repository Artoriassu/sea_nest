const express = require("express");
const { createCompanyController, getAllCompaniesController, getCompanyByIdController, deleteCompanyByIdController } = require("../controllers/companyController");
const authMiddleware = require("../middleware/authMiddleware");

//router object

const router = express.Router()

//routes 

// CREATE COMPANY
router.post('/createCompany', authMiddleware, createCompanyController)


// GET All COMPANIES
router.get('/getAll', getAllCompaniesController)

// GET COMPANY BY ID
router.get('/get/:id', getCompanyByIdController)

// DELETE COMPANY
router.delete('/delete/:id', authMiddleware, deleteCompanyByIdController)

//export
module.exports = router