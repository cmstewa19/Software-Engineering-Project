import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';

// Set map container style
const containerStyle = {
  width: '100%',
  height: '400px',
};

function TrainRouteMap({ origin, destination }) {
  const [directionsResponse, setDirectionsResponse] = useState(null);

  useEffect(() => {
    if (!origin || !destination) {
      console.error('Origin and destination are required to plot the route');
      return;
    }

    const fetchDirections = async () => {
      const directionsService = new window.google.maps.DirectionsService();

      // Use DirectionsService to get the route
      directionsService.route(
        {
          origin, // Starting point
          destination, // End point
          travelMode: window.google.maps.TravelMode.TRANSIT, // Use TRANSIT mode for trains
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirectionsResponse(result);
          } else {
            console.error('Error fetching directions:', status);
          }
        }
      );
    };

    fetchDirections();
  }, [origin, destination]);

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: 39.8283, lng: -98.5795 }} // Default to USA center
        zoom={5} 
      >
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default TrainRouteMap;
