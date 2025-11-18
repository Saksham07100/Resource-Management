require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

const askDoubt = async (req, res) => {
  const { question } = req.body || {};

  if (!question || question.trim().length < 3) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter a valid question." });
  }

  try {
    // Check if Gemini is configured
    if (!genAI) {
      return res.json({
        success: true,
        answer: "The chatbot service is not configured. Please add GEMINI_API_KEY to the server environment.",
        sources: [],
      });
    }

    // Get the model and generate response
    const model = genAI.getGenerativeModel({ 
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.7,
      }
    });

    const result = await model.generateContent(question);
    const response = await result.response;
    const answer = response.text() || "I could not generate a response. Please try again.";

    return res.json({
      success: true,
      answer,
      sources: [],
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    
    // Handle specific Gemini API errors
    let errorMessage = "Unable to process your question.";
    
    if (error.message && error.message.includes("API key")) {
      errorMessage = "API key is invalid. Please check your Gemini API key configuration.";
    } else if (error.message && error.message.includes("quota")) {
      errorMessage = "API quota exceeded. Please try again later.";
    } else if (error.message && error.message.includes("404")) {
      errorMessage = "Invalid model specified. Try using 'gemini-pro' in GEMINI_MODEL configuration.";
    } else if (error.status === 400) {
      errorMessage = "Invalid request. Please try rephrasing your question.";
    }
    
    return res
      .status(500)
      .json({ success: false, message: errorMessage });
  }
};

module.exports = { askDoubt };

