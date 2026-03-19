const express = require("express");
const mongoose = require("mongoose");
const EnsureAuthenticated = require("../Middlewares/Auth");
const { Product } = require("../Models/User");

const Router = express.Router();

// fetch product
Router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
}); 


// CREATE PRODUCT
Router.post("/create", async (req, res) => {
  try {
    const data = req.body;

    const newProduct = await Product.create(data);

    return res.status(201).json({
      message: "Product created",
      product: newProduct
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error",
      error: error.message
    });
  }
});

// UPDATE PRODUCT
Router.put("/update/:id",async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name: data.name,
        price: data.price,
        description: data.description,
        image: data.image
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Product updated",
      product: updatedProduct
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error",
      error: error.message
    });
  }
});

Router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error",
      error: error.message
    });
  }
});

module.exports = Router;