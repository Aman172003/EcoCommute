import React, { useState, useEffect } from "react";

const AskForRide = () => {
  const host = "http://localhost:5000";
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    // Fetch available drivers from backend when component mounts
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await fetch(`${host}/drivers/availabledrivers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      console.log(data);
      setDrivers(data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  const handleRequestRide = async (driverId) => {
    try {
      const response = await fetch(`/api/askride/${driverId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ source, destination }),
      });
    } catch (error) {
      console.error("Error requesting ride:", error);
    }
  };

  return (
    <div className="h-screen">
      <h2>Ask For Ride</h2>
      <form>
        <input
          type="text"
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <button type="submit">Request Ride</button>
      </form>
      <h3>Available Drivers:</h3>
      <ul>
        {drivers.map((driver) => (
          <li key={driver._id}>
            {driver.name} - {driver.vehicle} - Seats: {driver.seats} -{" "}
            <button onClick={() => handleRequestRide(driver._id)}>
              Request Ride
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AskForRide;
