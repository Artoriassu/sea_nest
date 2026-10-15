const companyModel = require("../models/companyModel")

//Create Company
const createCompanyController = async (req, res) => {
    try {
        const { title, imageUrl, news, products, time, logoUrl, address, phone } = req.body
        //validation
        if (!title || !address || !phone) {
            res.status(500).send({
                success: false,
                message: " Please provide title, address and phone"
            })
        }
        const newCompany = new companyModel(
            {
                title,
                imageUrl,
                news,
                products,
                time,
                logoUrl,
                address,
                phone
            }
        )
        await newCompany.save()

        res.status(201).send({
            success: true,
            message: " New Company created"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: " Error in Create Company API"
        })
    }
}

//Get All Companies
const getAllCompaniesController = async (req, res) => {
    try {
        const companies = await companyModel.find({})
        if (!companies) {
            return res.status(404).send({
                success: false,
                message: "No companies Availible"
            })
        }
        res.status(200).send({
            success: true,
            totalCount: companies.length,
            companies
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: " Error in Get All Companies API"
        })
    }
}

//Get Company By Id
const getCompanyByIdController = async (req, res) => {
    try {
        const companyId = req.params.id
        if (!companyId) {
            return res.status(404).send({
                success: false,
                message: "Please provide company Id"
            })
        }
        //find company
        const company = await companyModel.findById(companyId)
        if (!company) {
            return res.status(404).send({
                success: false,
                message: "No companies with this Id found"
            })
        }
        res.status(200).send({
            success: true,
            company
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: " Error in Get Company By Id API"
        })
    }
}

//Delete Companies
const deleteCompanyByIdController = async (req, res) => {
    try {
        const companyId = req.params.id
        if (!companyId) {
            return res.status(404).send({
                success: false,
                message: "Please provide company Id"
            })
        }
        await companyModel.findByIdAndDelete(companyId)

        return res.status(200).send({
            success: true,
            message: " Company has been deleted",
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: " Error in Delete Company By Id API"
        })
    }
}

module.exports = {
    createCompanyController,
    getAllCompaniesController,
    getCompanyByIdController,
    deleteCompanyByIdController
}