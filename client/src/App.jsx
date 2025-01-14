import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Form from "./components/Form";
import ItineraryDisplay from "./components/ItenaryDisplay";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<Form />} />
        <Route path="/itinerary" element={<ItineraryDisplay />} />
      </Routes>
    </Router>
  );
};

export default App;
