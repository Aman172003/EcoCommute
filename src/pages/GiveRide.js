import React, { useEffect, useState } from "react";
import driver from "../assets/driver.jpg";
import { useNavigate } from "react-router-dom";

const GiveRide = () => {
  const navigate = useNavigate();
  const host = "http://localhost:5000";
  const [vehicle, setVehicle] = useState("");
  const [seats, setSeats] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [driverId, setDriverId] = useState(null);

  const giveride = async (vehicle, seats, source, destination) => {
    try {
      const response = await fetch(`${host}/driver/giveride`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ vehicle, seats, source, destination }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.message);
        setDriverId(responseData.driverId);
      } else {
        console.error("Error giving ride:", response.statusText);
      }
    } catch (error) {
      console.error("Error giving ride:", error);
    }
  };

  useEffect(() => {
    if (driverId) {
      navigate("/requests", {
        state: { driverId, vehicle },
      });
    }
  }, [driverId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting ride offer...");
    await giveride(vehicle, seats, source, destination);
    if (driverId) {
      navigate("/requests", {
        state: { driverId, vehicle },
      });
    }
  };

  return (
    <div className="container mx-2 mt-8 px-4">
      <div className="flex justify-center items-center mb-8">
        <form onSubmit={handleSubmit} className="flex-1 mr-8">
          <h2 className="text-3xl font-semibold mb-4 text-custom-green">
            Give Ride
          </h2>
          <div className="mb-4">
            <label
              htmlFor="vehicle"
              className="block text-lg font-semibold mb-2"
            >
              Vehicle:
            </label>
            <input
              type="text"
              id="vehicle"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              placeholder="Enter vehicle"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="seats" className="block text-lg font-semibold mb-2">
              Seats:
            </label>
            <input
              type="number"
              id="seats"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              placeholder="Enter seats"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="source"
              className="block text-lg font-semibold mb-2"
            >
              Source:
            </label>
            <input
              type="text"
              id="source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Enter source"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="destination"
              className="block text-lg font-semibold mb-2"
            >
              Destination:
            </label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700"
          >
            Offer Ride
          </button>
        </form>
        <div className="flex-1 hidden md:block">
          <img src={driver} alt="Passenger" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default GiveRide;
