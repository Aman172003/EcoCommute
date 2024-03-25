import React from "react";
import hero from "../assets/hero.png";

const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="lg:w-1/2 p-8 flex flex-col justify-center items-center">
        <div>
          <h2 className="text-4xl lg:text-6xl font-bold text-custom-green mb-4 lg:mb-8">
            Sustainable Urban Mobility: Paving the Way to a Greener Future
          </h2>
          <h3 className="text-lg lg:text-xl font-semibold text-green-700 mb-4 lg:mb-8">
            Optimize Your Commute, Minimize Your Footprint
          </h3>
          <button className="custom-button px-5 py-3">Click me</button>
        </div>
      </div>
      <div className="lg:w-1/2 p-8 flex justify-center items-center lg:mt-0 lg:-ml-8">
        <img src={hero} className="w-2/3 lg:w-full h-auto" alt="Hero Image" />
      </div>
    </div>
  );
};

export default Home;
