import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api'

const center = { lat: 12.9716, lng: 77.5946 };

const Requests = () => {
  const location = useLocation();
  const host = "http://localhost:5000";
  const [rideRequests, setRideRequests] = useState([]);
  const [error, setError] = useState("");
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCdiugRD3AtoVHnc3_mbEyUYSCIItI9DcQ",
    libraries: ['places'],
  });

  useEffect(() => {
    const fetchRideRequests = async () => {
      try {
        const response = await fetch(`${host}/driver/riderequests/${location.state?.driverId}`);
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

    if (isLoaded) {
      fetchRideRequests();
    }
  }, [location.state?.driverId, isLoaded]);

  useEffect(() => {
    if (rideRequests.length > 0 && isLoaded) {
      const { source, destination } = rideRequests[0]; // Assuming only one request for simplicity
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: source,
          destination: destination,
          travelMode: "DRIVING",
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
          } else {
            console.error("Directions request failed due to " + status);
          }
        }
      );
    }
  }, [rideRequests, isLoaded]);

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
      <div className="mt-8">
        <h2 className="text-3xl font-semibold mb-4 text-custom-green">
          Route Map
        </h2>
        {isLoaded && (
          <div style={{ height: "400px", width: "100%" }}>
            <GoogleMap
              center={center}
              zoom={12}
              mapContainerStyle={{ height: "100%", width: "100%" }}
              onLoad={setMap}
              options={{
                zoomControl:false,
                streetViewControl:false,
                mapTypeControl:false,
                fullScreenControl:false,
              }}
            >
              {directions && <DirectionsRenderer directions={directions} />}
              {rideRequests.map((request) => (
                <Marker key={request._id} position={request.source} label="S" />
              ))}
              {rideRequests.map((request) => (
                <Marker key={request._id} position={request.destination} label="D" />
              ))}
            </GoogleMap>
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
