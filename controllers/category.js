const Category = require('../models/category');
const fs = require('fs');

module.exports = class API{
    //fetch all categories
    static async fetchAllCategories(req, res) {
        try {
            const categories = await Category.find();
            res.status(200).json(categories)
        } catch (error) {
            res.status(404).json({message: error.message})
        }
    }
    //fetch category by id
    static async fetchCategoryById(req, res) {
        const id = req.params.id;
        try {
            const category = await Category.findById(id);
            res.status(200).json(category)
        } catch (error) {
            res.status(404).json({message: error.message})         
        }
    }
    //create category
    static async createCategory(req, res) {
        const category = req.body;
        const imagename = req.file.filename;
        category.image = imagename;
        try {
            await Category.create(category);
            res.status(201).json({message: 'Category created successfully'})
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }
    //update a category
    static async updateCategory(req, res) {
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

        const newCategory = req.body;
        newCategory.image = newImage;

        try {
            await Category.findByIdAndUpdate(id, newCategory);
            res.status(200).json({message: 'Updated successfully'})
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }
    //delete a category
    static async deleteCategory(req, res) {
        const id = req.params.id;
        try {
            const result = await Category.findByIdAndDelete(id);
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