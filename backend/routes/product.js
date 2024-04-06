const Product=require("../models/product");

const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const SearchFeatures = require('../utils/searchFeatures');
const ErrorHandler = require('../utils/errorHandler');
const express=require("express");
const router = express.Router();
//Route 1: Get products using GET "api/product/products". No login required
router.get("/products",async (req,res)=>{
    const resultPerPage = 12;
    const productsCount = await Product.countDocuments();
    // console.log(req.query);

    const searchFeature = new SearchFeatures(Product.find(), req.query)
        .search()
        .filter();

    let products = await searchFeature.query;
    let filteredProductsCount = products.length;

    searchFeature.pagination(resultPerPage);

    products = await searchFeature.query.clone();

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    });
});

// Get All Products ---Product Sliders
exports.getProducts = asyncErrorHandler(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});



//Route 2: Get all products using GET "api/product/allproducts". No login required
router.get("/allproducts",async (req,res)=>{
    try{
        const products=await Product.find();
        res.json(products);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;