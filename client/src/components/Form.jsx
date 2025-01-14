import React, { useEffect, useState } from "react";
import { TfiPackage } from "react-icons/tfi";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Data from "../data/data";

const { Budget, Travel } = Data;

function Form() {
  const [formData, setFormdata] = useState([]);

  const handleInput = (name, value) => {
    setFormdata({ ...formData, [name]: value });
  };

  const clickHandler = () => {
    console.log(formData);
  };

  //useEffect(() => {});
  return (
    <div className="m-10">
      <h1>Tell us your travel preferences</h1>
      <h2>
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences
      </h2>
      <label>
        <h2>What is destination of choice?</h2>
        <GooglePlacesAutocomplete apiKey="AlzaSyemc9LGEmyHBjGUgXqQXEm_0obXMDpj5bA" />
        {/**<input
          placeholder="Destination"
          onChange={(e) => {
            handleInput("destination", e.target.value);
          }}
        ></input> */}
      </label>
      <label>
        <h2>How many days are you planning your trip?</h2>
        <input
          placeholder="days"
          onChange={(e) => {
            handleInput("noofdays", e.target.value);
          }}
        ></input>
      </label>
      <div>
        <h1>What is your Budget?</h1>
        <h2>
          The budget is exclusively allocated for activities and dining purposes
        </h2>
        <div className="flex flex-row">
          {Budget.map((e) => {
            return (
              <div
                key={e.id}
                className="border-[1px] border-black mx-10 p-5 cursor-pointer hover:shadow-lg hover:scale-110"
                onClick={() => {
                  handleInput("budget", e.budgetTitle);
                }}
              >
                <h1>{e.budgetTitle}</h1>
                <h1>{e.budgetNum}</h1>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h1>Who do you plan on travelling with on your next adventure?</h1>
        <div className="flex flex-row ">
          {Travel.map((e) => {
            return (
              <div
                key={e.id}
                className="border-black border-[1px] mx-10 p-10 cursor-pointer hover:shadow-lg hover:scale-110"
                onClick={() => {
                  handleInput("people", e.people);
                }}
              >
                <h1>{e.people}</h1>
              </div>
            );
          })}
        </div>
      </div>
      <button
        className="bg-black text-white px-5  py-3 rounded-md"
        onClick={clickHandler}
      >
        Generate trip
      </button>
    </div>
  );
}

export default Form;
