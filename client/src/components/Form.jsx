import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Data from "../data/data";
const { Budget, Travel } = Data;

const Form = () => {
  const [formData, setFormData] = useState({});
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedTravel, setSelectedTravel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const clickHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:3001/api/generate-itinerary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (result.success) {
        // Navigate to itinerary page with data
        navigate("/itinerary", { state: { itineraryData: result.data } });
      } else {
        throw new Error(result.error || "Failed to generate itinerary");
      }
    } catch (error) {
      console.error("Error generating itinerary:", error);
      // Handle error - you might want to show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-8 transform hover:scale-[1.01] transition-transform duration-300">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-indigo-900">
            Tell us your travel preferences
          </h1>
          <p className="text-gray-600 text-lg">
            Just provide some basic information, and our trip planner will
            generate a customized itinerary based on your preferences
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block">
              <h2 className="text-xl font-semibold text-gray-800">
                What is your destination of choice?
              </h2>
              {/**<GooglePlacesAutocomplete apiKey="AlzaSyemc9LGEmyHBjGUgXqQXEm_0obXMDpj5bA" /> */}
              <input
                className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 outline-none"
                placeholder="Enter destination"
                onChange={(e) => handleInput("destination", e.target.value)}
              />
            </label>
          </div>

          <div className="space-y-2">
            <label className="block">
              <h2 className="text-xl font-semibold text-gray-800">
                How many days are you planning your trip?
              </h2>
              <input
                className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 outline-none"
                placeholder="Number of days"
                type="number"
                min="1"
                onChange={(e) => handleInput("noofdays", e.target.value)}
              />
            </label>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              What is your Budget?
            </h2>
            <p className="text-gray-600">
              The budget is exclusively allocated for activities and dining
              purposes
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Budget.map((item) => (
                <div
                  key={item.id}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer
                    ${
                      selectedBudget === item.budgetTitle
                        ? "border-indigo-500 bg-indigo-50 shadow-md transform -translate-y-1"
                        : "border-gray-200 hover:border-indigo-300 hover:shadow-md"
                    }`}
                  onClick={() => {
                    setSelectedBudget(item.budgetTitle);
                    handleInput("budget", item.budgetTitle);
                  }}
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.budgetTitle}
                  </h3>
                  <p className="text-indigo-600 font-bold mt-2">
                    {item.budgetNum}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Who do you plan on travelling with?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Travel.map((item) => (
                <div
                  key={item.id}
                  className={`p-6 rounded-xl border-2 text-center transition-all duration-300 cursor-pointer
                    ${
                      selectedTravel === item.people
                        ? "border-indigo-500 bg-indigo-50 shadow-md transform -translate-y-1"
                        : "border-gray-200 hover:border-indigo-300 hover:shadow-md"
                    }`}
                  onClick={() => {
                    setSelectedTravel(item.people);
                    handleInput("people", item.people);
                  }}
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.people}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          className="w-full bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg
      transform transition-all duration-300 hover:bg-indigo-700 hover:scale-[1.02] 
      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={clickHandler}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
              Generating Your Trip...
            </div>
          ) : (
            "Generate Trip"
          )}
        </button>
      </div>
    </div>
  );
};

export default Form;
