const express = require("express");
const router = express.Router();
const axios = require("axios");
router.post("/generateCaption", async (req, res) => {
  try {
    const prompt = req.body.prompt; // Extract inputData from the body
    console.log(prompt);
    if (!prompt) {
      return res.status(400).json({ message: "inputData is required" });
    }

    const targetApiUrl = "http://localhost:11434/api/generate/";
    const requestData = {
      model: "llama3",
      prompt: prompt,
      stream: false,
    };

    const response1 = await axios.post(targetApiUrl, requestData);

    const targetApiResponse = response1.data.response;

    res.status(200).json({
     
      data: targetApiResponse,
    });
  } catch (error) {
    console.error("Error calling the target API:", error);
    res.status(500).json({
      message: "Error calling the target API",
      error: error.message,
    });
  }
});

module.exports = router;
