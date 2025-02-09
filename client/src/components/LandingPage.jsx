import React from "react";
import { Link } from "react-router-dom";
import { Compass, Calendar, Heart, Map, Sparkles, Globe } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="inline-block p-3 bg-indigo-50 rounded-lg mb-4">
      <Icon className="w-6 h-6 text-indigo-600" />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const LandingPage = () => {
  const features = [
    {
      icon: Compass,
      title: "Personalized Itineraries",
      description:
        "AI-powered recommendations based on your unique travel style and preferences",
    },
    {
      icon: Calendar,
      title: "Smart Planning",
      description:
        "Efficiently organized day-by-day schedules optimized for your interests",
    },
    {
      icon: Heart,
      title: "Curated Experiences",
      description:
        "Hand-picked activities and hidden gems that match your interests",
    },
    {
      icon: Map,
      title: "Local Insights",
      description:
        "Discover authentic experiences beyond typical tourist attractions",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Navigation Bar */}
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-900">AI Trip Planner</h1>
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 text-indigo-600 bg-white rounded-lg hover:bg-indigo-50 transition-all"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-indigo-100 rounded-full">
            <span className="flex items-center text-indigo-800 font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Travel Planning
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Discover Your Next Adventure with AI
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your personal travel curator creating custom itineraries tailored to
            your interests, style, and budget. Experience travel planning
            reimagined.
          </p>

          <Link
            to="/form"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-indigo-600 rounded-xl
              hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Start Planning Your Trip
            <Globe className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Plan With Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of AI intelligence and human
              wanderlust for your next unforgettable journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="bg-indigo-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Trusted by Thousands of Happy Travelers
            </h2>
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-indigo-600 mb-2">10k+</p>
                <p className="text-gray-600">Trips Planned</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-indigo-600 mb-2">95%</p>
                <p className="text-gray-600">Satisfied Travelers</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-indigo-600 mb-2">150+</p>
                <p className="text-gray-600">Destinations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
