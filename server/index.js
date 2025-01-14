require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper function to generate prompts for different aspects of the trip
const generatePrompts = (formData) => {
  const { destination, noofdays, budget, people } = formData;

  return {
    attractions: `Act as a travel expert and create a detailed ${noofdays}-day itinerary for ${destination}. 
      Consider a ${budget} budget for ${people}. For each day, suggest:
      1. Must-visit attractions and why they're special
      2. Best time to visit each place
      3. Estimated time needed
      4. Tips for the best experience
      5. Nearby food recommendations
      Format the response as a structured JSON with days as keys.`,

    food: `As a local food expert in ${destination}, suggest:
      1. Must-try local dishes and where to find them
      2. Famous restaurants within ${budget} budget
      3. Best local markets or street food areas
      4. Special food experiences or food tours
      Format the response as a JSON list.`,

    tips: `Provide insider tips for ${destination} considering:
      1. Local customs and etiquette
      2. Transportation options and tips
      3. Safety considerations
      4. Money-saving tips for ${budget} budget
      5. Best areas to stay for ${people}
      Format the response as a JSON list.`,
  };
};

// Updated function to parse and format Gemini's response
const formatResponse = (geminiResponse) => {
  try {
    // Remove Markdown-style formatting
    const cleanedResponse = geminiResponse.replace(/```json|```/g, "").trim();
    return { content: JSON.parse(cleanedResponse) };
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    return {
      content: null,
      error: "Response formatting failed. Raw content: " + geminiResponse,
    };
  }
};

// Main API endpoint for generating itineraries
app.post("/api/generate-itinerary", async (req, res) => {
  try {
    const formData = req.body;
    const prompts = generatePrompts(formData);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate responses for different aspects in parallel
    const [attractionsResult, foodResult, tipsResult] = await Promise.all([
      model.generateContent(prompts.attractions),
      model.generateContent(prompts.food),
      model.generateContent(prompts.tips),
    ]);

    const itinerary = {
      destination: formData.destination,
      duration: formData.noofdays,
      budget: formData.budget,
      travelers: formData.people,
      dailyPlan: formatResponse(attractionsResult.response.text()),
      foodRecommendations: formatResponse(foodResult.response.text()),
      travelTips: formatResponse(tipsResult.response.text()),
      generated: new Date().toISOString(),
    };

    res.json({
      success: true,
      data: itinerary,
    });
  } catch (error) {
    console.error("Itinerary generation error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate itinerary",
      details: error.message,
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Internal server error",
    details: err.message,
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
