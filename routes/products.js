const express = require('express');
const router = express.Router();
const Product = require('../controllers/products')
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

router.get('/', Product.fetchAllProducts)
router.get('/:id', Product.fetchProductById)
router.post('/create',requireSignin, adminMiddleware ,upload, Product.createProduct)
router.patch('/:id',upload,requireSignin, adminMiddleware, Product.updateProduct)
router.delete('/:id',requireSignin, adminMiddleware, Product.deleteProduct)

module.exports = router;