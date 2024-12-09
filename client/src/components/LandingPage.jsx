import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="p-10">
      <div className="text-center mx-28">
        <h1 className="text-8xl my-5">
          Discover Your Next Adventure with AI: Personalized Itenaries at Your
          Personalities
        </h1>
        <h2 className="text-4xl">
          Your personal trip planner and travel curator, creating custom
          itenaries tailloured at your interest and budget
        </h2>
        <button className="bg-black text-white py-2 px-5 rounded-md">
          <Link to={"/form"}> Get's Started</Link>
        </button>
      </div>
      <div className="text-center">Image</div>
    </div>
  );
}

export default LandingPage;
