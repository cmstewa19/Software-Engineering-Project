import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';

// Set map container style
const containerStyle = {
  width: '100%',
  height: '400px',
};

function TrainRouteMap({ origin, destination }) {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  // Geocode function to convert place names to lat/lng coordinates
  const geocodeLocation = (address) => {
    if (!window.google) {
      console.error('Google Maps API is not loaded yet');
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          const { lat, lng } = results[0].geometry.location;
          resolve({ lat: lat(), lng: lng() });
        } else {
          reject('Geocode failed: ' + status);
        }
      });
    });
  };

  // Effect for initializing coordinates once Google Maps is loaded
  useEffect(() => {
    console.log('Origin:', origin);
    console.log('Destination:', destination);
    console.log('Google Maps Loaded:', googleMapsLoaded);

    if (!origin || !destination) {
      console.error('Origin or destination is not provided');
      return;
    }

    if (!googleMapsLoaded) {
      console.log('Google Maps API not ready yet');
      return;
    }
    // got thru here successfully
    const fetchCoordinates = async () => {
      try {
        console.log('Fetching coordinates...');
        const originCoords = await geocodeLocation(origin);
        const destinationCoords = await geocodeLocation(destination);

        // Validate the coordinates
        if (originCoords && destinationCoords) {
          setOriginCoords(originCoords);
          setDestinationCoords(destinationCoords);
          console.log('originCoords: ',originCoords);
          console.log('destinationCoords: ', destinationCoords);
          // got to here successfully

        } else {
          console.error('Invalid coordinates from geocoding');
        }
      } catch (error) {
        console.error('Error during geocoding:', error);
      }
    };

    // Only fetch coordinates if they are not already provided as lat/lng
    if (typeof origin === 'string' && typeof destination === 'string') {
      fetchCoordinates();
    } else {
      setOriginCoords(origin);
      setDestinationCoords(destination);
    }
  }, [origin, destination, googleMapsLoaded]);

  // Callback for when Google Maps is loaded
  const onLoad = () => {
    setGoogleMapsLoaded(true);
  };

  // Effect for fetching directions once coordinates are available
  useEffect(() => {
    if (originCoords && destinationCoords && googleMapsLoaded) {
      const fetchDirections = async () => {
        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
          {
            origin: originCoords, // Starting point (lat/lng object)
            destination: destinationCoords, // End point (lat/lng object)
            travelMode: window.google.maps.TravelMode.TRANSIT,
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
    }
  }, [originCoords, destinationCoords, googleMapsLoaded]);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY} onLoad={onLoad}>
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
