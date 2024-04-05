// import React, { useRef, useState } from 'react';
// import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api'

// const center = { lat: 12.9716, lng: 77.5946 }; // Bengaluru coordinates

// function App() {
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: 'AIzaSyCdiugRD3AtoVHnc3_mbEyUYSCIItI9DcQ',
//     libraries: ['places'],
//   })

//   const [map, setMap] = useState(/** @type google.maps.Map*/(null))
//   const [directionsResponse, setDirectionsResponse] = useState(null)
//   const [distance, setDistance] = useState('')
//   const [duration, setDuration] = useState('')

//   /**@type React.MutableRefObject<HTMLInputElement> */
//   const originRef = useRef()
//   /**@type React.MutableRefObject<HTMLInputElement> */
//   const destinationRef = useRef()

//   if (!isLoaded) {
//     return (<p>Loading....</p>)
//   }

//   function clearRoute() {
//     setDirectionsResponse(null)
//     setDistance('')
//     setDuration('')
//     originRef.current.value = ''
//     destinationRef.current.value = ''
//   }

//   async function calculateRoute() {
//     if (!originRef.current.value || !destinationRef.current.value) {
//       return;
//     }

//     const directionsService = new window.google.maps.DirectionsService();
//     directionsService.route(
//       {
//         origin: originRef.current.value,
//         destination: destinationRef.current.value,
//         travelMode: 'DRIVING',
//       },
//       (result, status) => {
//         if (status === 'OK') {
//           setDirectionsResponse(result);
//           setDistance(result.routes[0].legs[0].distance.text);
//           setDuration(result.routes[0].legs[0].duration.text);
//         } else {
//           console.error('Directions request failed due to ' + status);
//         }
//       }
//     );
//   }

//   return (
//     <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
//       <GoogleMap
//         center={center}
//         zoom={15}
//         mapContainerStyle={{ height: '100%', width: '100%' }}
//         onLoad={map => setMap(map)}
//       >
//         <Marker position={center} />
//         {directionsResponse && (
//           <DirectionsRenderer directions={directionsResponse} />
//         )}
//       </GoogleMap>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import driver from "../assets/driver.jpg";

const GiveRide = () => {
  const host = "http://localhost:5000";
  const [vehicle, setVehicle] = useState("");
  const [seats, setSeats] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const giveride = async (vehicle, seats, source, destination) => {
    try {
      const response = await fetch(`${host}/driver/giveride`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ vehicle, seats, source, destination }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.message);
      } else {
        console.error("Error giving ride:", response.statusText);
      }
    } catch (error) {
      console.error("Error giving ride:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting ride offer...");
    giveride(vehicle, seats, source, destination);
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
