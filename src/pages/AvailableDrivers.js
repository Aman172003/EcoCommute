import React, { useState } from "react";
import passenger from "../assets/passenger.jpg";
import { useLocation } from "react-router-dom";

const AskForRide = () => {
  const host = "http://localhost:5000";
  const location = useLocation();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const drivers = location.state?.drivers;
  const passengerId = location.state?.passengerId;

  const handleRequestRide = async (driverId) => {
    try {
      const response = await fetch(`${host}/driver/askride/${driverId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"), // Assuming you have an authentication token
        },
        body: JSON.stringify({
          source,
          destination,
          passengerId,
        }),
      });

      if (response.ok) {
        console.log("Ride request sent successfully", response);
      } else {
        console.error("Error sending ride request:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending ride request:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", { source, destination });
  };

  return (
    <div className="container mx-auto mt-2 px-4">
      <div>
        <h3 className="text-2xl font-semibold mb-4">Available Drivers:</h3>
        <ul>
          {drivers.map((driver) => (
            <li key={driver._id} className="mb-4">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-lg font-semibold">{driver.name}</p>
                  <p className="text-gray-600">Vehicle: {driver.vehicle}</p>
                  <p className="text-gray-600">Seats: {driver.seats}</p>
                </div>
                <button
                  onClick={() => handleRequestRide(driver._id)}
                  className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700"
                >
                  Request Ride
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AskForRide;
