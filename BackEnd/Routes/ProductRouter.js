const EnsureAuthenticated = require('../Middlewares/Auth');
const { Product } = require('../Models/User');

const Router= require('express').Router();


Router.get("/", async (req,res)=>{
const products = await Product.find();
res.json(products);
});

Router.post("/", async (req,res)=>{
    const data=req.body;
const products = await Product.create(data);
// res.json(products);
});

Router.get("/:id", async (req,res)=>{
const product = await Product.findById(req.params.id);
res.json(product);
});



module.exports = Router;