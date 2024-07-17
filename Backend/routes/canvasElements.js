const express = require("express");
const router = express.Router();
const CanvasElement = require("../models/CanvasElement");

// Get all canvas elements
router.get("/", async (req, res) => {
  try {
    const elements = await CanvasElement.find();
    res.json(elements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Create a new canvas element
router.post("/", async (req, res) => {
  try {
    const newElement = new CanvasElement(req.body);
    const savedElement = await newElement.save();
    res.status(201).json(savedElement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Save multiple canvas elements
router.post("/bulk", async (req, res) => {
  try {
    const newElements = await CanvasElement.insertMany(req.body);
    res.status(201).json(newElements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
