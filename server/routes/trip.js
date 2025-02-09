const express = require("express");
const auth = require("../middleware/auth");
const Trip = require("../models/Trip");
const Groq = require("groq-sdk");
const router = express.Router();

// Generate Trip Itinerary
router.post("/generate", auth, async (req, res) => {
  const { destination, duration, budget, travelers } = req.body;

  if (!destination || !duration || !budget || !travelers) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const groq = new Groq({ apiKey: process.env.KEY });
    {
      /****Daily Itinerary:**  
      - Morning: Activities, estimated cost, and best time  
      - Afternoon: Attractions, travel time, and budget info  
      - Evening: Restaurants, nightlife, or relaxing activities  
      - Transport: How to commute within ${destination}  
      - Estimated budget breakdown per day  

      **Accommodation Suggestions:**  
      - Best areas to stay (budget-friendly, mid-range, luxury)  
      - Recommended hotels or Airbnb options within budget  

      **Food & Dining Recommendations:**  
      - Must-try dishes and where to find them  
      - Top restaurants categorized by budget  
      - Street food & market recommendations  

      **Budget Breakdown:**  
      - Accommodation  
      - Food & Drinks  
      - Transport & Local Travel  
      - Sightseeing & Activities  
      - Miscellaneous expenses  

      **Travel & Safety Tips:**  
      - Local customs and etiquette  
      - Best transport modes & estimated fares  
      - Money-saving travel tips  
      - Safety considerations   */
    }

    // Construct a detailed prompt
    const prompt = `
      You are an expert travel planner. Generate a structured ${duration}-day trip plan for ${destination} for ${travelers} travelers with a ${budget} budget.

      

      Strictly Generate response Format in this  structured JSON:
      {
  "destination": "string", // Name of the destination
  "duration": "string", // Duration of the trip (e.g., "4 days")
  "itinerary": {
    "day_1": {
      "morning": {
        "activity": "string", // Activity for the morning
        "estimated_cost": "string", // Estimated cost for the activity
        "best_time": "string" // Best time for the activity
      },
      "afternoon": {
        "attraction": "string", // Attraction to visit
        "travel_time": "string", // Travel time to the attraction
        "budget_info": "string" // Budget information for the attraction
      },
      "evening": {
        "restaurant": "string", // Recommended restaurant
        "nightlife": "string", // Nightlife activity
        "relaxing_activity": "string" // Relaxing activity
      },
      "transport": {
        "mode": "string", // Mode of transport
        "estimated_fare": "string" // Estimated fare for transport
      },
      "estimated_budget_breakdown": {
        "accommodation": "string", // Estimated accommodation cost
        "food": "string", // Estimated food cost
        "transport": "string", // Estimated transport cost
        "activities": "string", // Estimated activity cost
        "total": "string" // Total estimated cost for the day
      }
    },
    "day_2": {
      // Repeat the same structure as day_1
    },
    "day_3": {
      // Repeat the same structure as day_1
    },
    "day_4": {
      // Repeat the same structure as day_1
    }
    // Add more days as needed
  },
  "accommodation": {
    "best_areas": {
      "budget_friendly": "string", // Budget-friendly areas to stay
      "mid_range": "string", // Mid-range areas to stay
      "luxury": "string" // Luxury areas to stay
    },
    "recommended_hotels": {
      "budget": "string", // Budget hotel recommendations
      "mid_range": "string", // Mid-range hotel recommendations
      "luxury": "string" // Luxury hotel recommendations
    },
    "airbnb_options": {
      "shared_room": "string", // Shared room Airbnb options
      "entire_home": "string" // Entire home Airbnb options
    }
  },
  "food_recommendations": {
    "must_try_dishes": {
      "traditional": "string", // Traditional dishes to try
      "street_food": "string" // Street food to try
    },
    "top_restaurants": {
      "budget": "string", // Budget-friendly restaurants
      "mid_range": "string", // Mid-range restaurants
      "luxury": "string" // Luxury restaurants
    },
    "street_food_markets": {
      "area_1": "string", // Street food markets in a specific area
      "area_2": "string" // Street food markets in another area
    }
  },
  "budget_breakdown": {
    "accommodation": "string", // Estimated accommodation cost
    "food_drinks": "string", // Estimated food and drinks cost
    "transport_local_travel": "string", // Estimated transport cost
    "sightseeing_activities": "string", // Estimated sightseeing and activities cost
    "miscellaneous_expenses": "string" // Estimated miscellaneous expenses
  },
  "travel_tips": {
    "local_customs_etiquette": "string", // Local customs and etiquette
    "best_transport_modes": {
      "local": "string", // Best local transport modes
      "outstation": "string" // Best outstation transport modes
    },
    "estimated_fares": {
      "mode_1": "string", // Estimated fare for a specific transport mode
      "mode_2": "string" // Estimated fare for another transport mode
    },
    "money_saving_tips": {
      "accommodation": "string", // Money-saving tips for accommodation
      "food": "string", // Money-saving tips for food
      "transport": "string" // Money-saving tips for transport
    },
    "safety_considerations": {
      "health": "string", // Health safety tips
      "security": "string" // Security safety tips
    }
  }
}
    `;

    // Call Groq API
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
    });

    // Extract and parse the response
    const responseText =
      chatCompletion.choices[0]?.message?.content.trim() || "";
    // Remove the backticks and "json" keyword
    const cleanedResponse = responseText
      .replace(/^```json/, "")
      .replace(/```$/, "")
      .trim();
    console.log("AI Response:", cleanedResponse);
    let responseJson;
    try {
      responseJson = JSON.parse(cleanedResponse);
    } catch (error) {
      console.error("Failed to parse response as JSON:", responseText);
      return res.status(500).json({ error: "AI response parsing failed" });
    }

    res.json({ success: true, itinerary: responseJson });
  } catch (error) {
    console.error("Error generating itinerary:", error);
    res.status(500).json({ error: "Failed to generate itinerary" });
  }
});

// Save Trip
router.post("/save", auth, async (req, res) => {
  const { destination, duration, budget, travelers, itinerary } = req.body;

  if (!destination || !duration || !budget || !travelers || !itinerary) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const trip = new Trip({
      userId: req.user.id,
      destination,
      duration,
      budget,
      travelers,
      itinerary,
    });
    await trip.save();
    res.json({ success: true, trip });
  } catch (error) {
    console.error("Error saving trip:", error);
    res.status(500).json({ error: "Failed to save trip" });
  }
});

// Get Saved Trips
router.get("/saved", auth, async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user.id });
    res.json({ success: true, trips });
  } catch (error) {
    console.error("Error fetching saved trips:", error);
    res.status(500).json({ error: "Failed to fetch saved trips" });
  }
});

module.exports = router;
