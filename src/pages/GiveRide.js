import React, { useRef, useState } from 'react';
import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api'

const center = { lat: 12.9716, lng: 77.5946 }; // Bengaluru coordinates

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCdiugRD3AtoVHnc3_mbEyUYSCIItI9DcQ',
    libraries: ['places'],
  })

  const [map, setMap] = useState(/** @type google.maps.Map*/(null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  /**@type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /**@type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef()

  if (!isLoaded) {
    return (<p>Loading....</p>)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destinationRef.current.value = ''
  }

  async function calculateRoute() {
    if (!originRef.current.value || !destinationRef.current.value) {
      return;
    }
  
    const directionsService = new window.google.maps.DirectionsService(); // Create a new DirectionsService instance
    directionsService.route(
      {
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: 'DRIVING',
      },
      (result, status) => {
        if (status === 'OK') {
          setDirectionsResponse(result); // Set the directions response
          setDistance(result.routes[0].legs[0].distance.text); // Set distance
          setDuration(result.routes[0].legs[0].duration.text); // Set duration
        } else {
          console.error('Directions request failed due to ' + status); // Log an error if the request fails
        }
      }
    );
  }
  

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ height: '100%', width: '100%' }}
        onLoad={map => setMap(map)}
      >
        <Marker position={center} />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </div>
  );
}

export default App;
