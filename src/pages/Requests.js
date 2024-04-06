import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Requests = () => {
  const location = useLocation();
  const host = "http://localhost:5000";
  const [rideRequests, setRideRequests] = useState([]);
  const [error, setError] = useState("");
  const driverId = location.state?.driverId;

  useEffect(() => {
    // Fetch ride requests for a specific driver when component mounts
    fetchRideRequestsForDriver(driverId); // Replace 'driver_id_here' with the actual driver ID
  }, []);

  const fetchRideRequestsForDriver = async (driverId) => {
    try {
      const response = await fetch(`${host}/driver/riderequests/${driverId}`);
      if (response.ok) {
        const requestData = await response.json();
        setRideRequests(requestData.rideRequests);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.error("Error fetching ride requests:", error);
      setError("Server Error");
    }
  };
  return (
    <div className="container mx-2 mt-8 px-4">
      <div className="mt-8">
        <h2 className="text-3xl font-semibold mb-4 text-custom-green">
          Ride Requests
        </h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {rideRequests.length > 0 ? (
          <ul>
            {rideRequests.map((request) => (
              <li key={request._id}>
                Source: {request.source}, Destination: {request.destination}
              </li>
            ))}
          </ul>
        ) : (
          <p>No ride requests</p>
        )}
      </div>
    </div>
  );
};

export default Requests;
