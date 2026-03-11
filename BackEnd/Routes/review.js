const { default: mongoose } = require("mongoose");
const { Review } = require("../Models/User");
const Router = require("express").Router();

Router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const reviews = await Review.create(data);

    res.status(201).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
Router.get("/:id", async (req, res) => {
  try {
    const reviews = await Review.find({
      productId: new mongoose.Types.ObjectId(req.params.id),
    });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reviews" });
  }
});

module.exports = Router;
