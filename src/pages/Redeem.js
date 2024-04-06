import React from "react";
import { useNavigate } from "react-router-dom";

const Redeem = () => {
  const navigate = useNavigate();
  const goodies = [
    {
      id: 1,
      name: "Money Plant",
      pointsRequired: 1000,
      imageUrl: require("../assets/plant.jpg"),
    },
    {
      id: 2,
      name: "Bottle",
      pointsRequired: 2500,
      imageUrl: require("../assets/bottle.jpeg"),
    },
    {
      id: 4,
      name: "Cap",
      pointsRequired: 3500,
      imageUrl: require("../assets/cap.jpg"),
    },
    {
      id: 5,
      name: "T-Shirt",
      pointsRequired: 4500,
      imageUrl: require("../assets/tshirt.jpeg"),
    },
  ];
  const currentCoins = localStorage.getItem("coins") || 0;
  return (
    <div className="container mx-auto mt-8 flex flex-col items-center mb-8">
      {localStorage.getItem("id") ? (
        <>
          <h2 className="text-2xl text-custom-green font-bold mb-4">
            Welcome, {localStorage.getItem("name")}!
          </h2>
          <p className="text-lg mb-4">Eco-Coins Available : {currentCoins}</p>
        </>
      ) : (
        <h2 className="text-2xl text-custom-green font-bold mb-4">
          Please Sign in to grab the goodies &#10148;
          <a
            className="text-lg text-green-600 hover:text-green-500"
            onClick={() => navigate("/login")}
            href=""
          >
            {" "}
            Sign in
          </a>
        </h2>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {goodies.map((goodie) => (
          <div
            key={goodie.id}
            className="bg-white rounded-lg shadow-md overflow-hidden w-72"
          >
            <img
              className="w-full h-48 object-cover"
              src={goodie.imageUrl}
              alt={goodie.name}
            />
            <div className="p-4">
              <p className="text-lg font-semibold mb-2">{goodie.name}</p>
              <p className="text-sm text-custom-green mb-4">
                EcoCoins Required: {goodie.pointsRequired}
              </p>

              <button
                className={`custom-button px-3 py-2 ${
                  currentCoins < goodie.pointsRequired
                    ? "opacity-50 pointer-events-none"
                    : ""
                }`}
              >
                Redeem
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Redeem;
