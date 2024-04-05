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
    <div className="h-screen">
      <h2>Give Ride</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Vehicle"
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Seats"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
        />
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
        <button type="submit">Offer Ride</button>
      </form>
    </div>
  );
};

export default GiveRide;
