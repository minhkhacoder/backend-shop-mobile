const Product = require('../models/products');
const fs = require('fs');

module.exports = class API{
    //fetch all product
    static async fetchAllProducts(req, res) {
        try {
            const products = await Product.find();
            res.status(200).json(products)
        } catch (error) {
            res.status(404).json({message: error.message})
        }
    }
    //fetch product by id
    static async fetchProductById(req, res) {
        const id = req.params.id;
        try {
            const product = await Product.findById(id);
            res.status(200).json(product)
        } catch (error) {
            res.status(404).json({message: error.message})         
        }
    }
    //create product
    static async createProduct(req, res) {
        const product = req.body;
        const imagename = req.file.filename;
        product.image = imagename;
        try {
            await Product.create(product);
            res.status(201).json({message: 'Product created successfully'})
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }
    //update a product
    static async updateProduct(req, res) {
        const id = req.params.id;
        let newImage = "";
        if(req.file) {
            newImage = req.file.filename;
            try {
                fs.unlinkSync('./uploads/' + req.body.oldImage);
            } catch (error) {
                console.log(error);
            }
        } else {
            newImage = req.body.oldImage;
        }

        const newProduct = req.body;
        newProduct.image = newImage;

        try {
            await Product.findByIdAndUpdate(id, newProduct);
            res.status(200).json({message: 'Updated successfully'})
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }
    //delete a product
    static async deleteProduct(req, res) {
        const id = req.params.id;
        try {
            const result = await Product.findByIdAndDelete(id);
            if(result.image != '') {
                try {
                    fs.unlinkSync('./uploads/'+result.image);
                } catch (error) {
                    console.log(error);
                }
            }
            res.status(200).json({message: 'Deleted successfully'})
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }
}