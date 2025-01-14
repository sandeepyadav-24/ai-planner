import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, Utensils, Info, ArrowLeft } from "lucide-react";

const ItineraryDisplay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const rawData = location.state?.itineraryData;

  // Redirect to form if no data
  React.useEffect(() => {
    if (!rawData) navigate("/form");
  }, [rawData, navigate]);

  const {
    destination,
    duration,
    budget,
    travelers,
    dailyPlan,
    foodRecommendations,
    travelTips,
  } = rawData || {};

  // Helper to parse JSON safely
  const parseContent = (content) => {
    try {
      return JSON.parse(content.replace(/```json\n|\n```/g, ""));
    } catch {
      return null;
    }
  };

  const dailyPlanData = parseContent(dailyPlan?.content);
  const foodRecommendationsData = foodRecommendations?.content || {};
  const travelTipsData = travelTips?.content || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      {/* Back button */}
      <button
        onClick={() => navigate("/form")}
        className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Form
      </button>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-indigo-900 mb-4">
            Your {duration}-Day Adventure in {destination}
          </h1>
          <div className="grid grid-cols-3 gap-4 text-gray-600">
            <div>
              <span className="font-semibold">Budget:</span> {budget}
            </div>
            <div>
              <span className="font-semibold">Duration:</span> {duration} days
            </div>
            <div>
              <span className="font-semibold">Travelers:</span> {travelers}
            </div>
          </div>
        </div>

        {/* Daily Itinerary */}
        {dailyPlanData ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center text-gray-800">
              <Calendar className="w-6 h-6 mr-2 text-indigo-600" />
              Daily Itinerary
            </h2>

            {Object.entries(dailyPlanData).map(([day, details]) => (
              <div
                key={day}
                className="bg-white rounded-xl shadow-lg p-6 hover:scale-[1.01] transition-transform"
              >
                <h3 className="text-xl font-semibold text-indigo-800 mb-4">
                  {day}
                </h3>
                <div className="space-y-4">
                  {Object.entries(details["Must-visit attractions"]).map(
                    ([key, attraction]) => (
                      <div
                        key={key}
                        className="pl-4 border-l-2 border-indigo-200"
                      >
                        <h4 className="font-semibold text-gray-800">
                          {key}: {attraction}
                        </h4>
                      </div>
                    )
                  )}
                  <div className="mt-2 text-sm text-gray-500">
                    <p>⏰ Best time: {details["Best time to visit"]}</p>
                    <p>⌛ Estimated time: {details["Estimated time needed"]}</p>
                    {details["Tips for the best experience"] && (
                      <ul className="list-disc pl-5 mt-2">
                        {Object.values(
                          details["Tips for the best experience"]
                        ).map((tip, index) => (
                          <li key={index} className="text-gray-600">
                            {tip}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No daily itinerary available.</p>
        )}

        {/* Food Recommendations */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold flex items-center text-gray-800 mb-4">
            <Utensils className="w-6 h-6 mr-2 text-indigo-600" />
            Food Recommendations
          </h2>
          <div className="grid gap-4">
            {foodRecommendationsData?.must_try_dishes?.length > 0 ? (
              foodRecommendationsData.must_try_dishes.map((dish, index) => (
                <div key={index} className="p-4 bg-indigo-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800">{dish.name}</h3>
                  <p className="text-gray-600">{dish.description}</p>
                  {dish.where_to_find && (
                    <p className="text-sm text-indigo-600 mt-1">
                      📍 Where: {dish.where_to_find}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600">No food recommendations found.</p>
            )}
          </div>
        </div>

        {/* Travel Tips */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold flex items-center text-gray-800 mb-4">
            <Info className="w-6 h-6 mr-2 text-indigo-600" />
            Travel Tips
          </h2>
          {Object.keys(travelTipsData).length > 0 ? (
            <div className="grid gap-4">
              {Object.entries(travelTipsData).map(([category, tips]) => (
                <div key={category} className="space-y-3">
                  <h3 className="font-semibold text-indigo-800 capitalize">
                    {category.replace(/_/g, " ")}
                  </h3>
                  {Array.isArray(tips) ? (
                    tips.map((tip, index) => (
                      <p
                        key={index}
                        className="flex items-start space-x-2 text-gray-700"
                      >
                        <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                          {index + 1}
                        </span>
                        {tip}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-600">{tips}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No travel tips available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItineraryDisplay;
