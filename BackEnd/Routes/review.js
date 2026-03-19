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
})
Router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({
      message: "Review deleted successfully"
    });

  } catch (err) {
    res.status(500).json({ message: "Error deleting review" });
  }
});

module.exports = Router;
