const express = require('express');
const router = express.Router();
const Category = require('../controllers/category')
const multer = require('multer');
const {
    requireSignin,
    adminMiddleware,
} = require("../middlewares");

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname)
    },
})

let upload = multer({
    storage: storage,
}).single("image")

router.get('/', Category.fetchAllCategories)
router.get('/:id', Category.fetchCategoryById)
router.post('/create',requireSignin, adminMiddleware ,upload, Category.createCategory)
router.patch('/:id',upload,requireSignin, adminMiddleware, Category.updateCategory)
router.delete('/:id',requireSignin, adminMiddleware, Category.deleteCategory)

module.exports = router;