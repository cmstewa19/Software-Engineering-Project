import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SeatMap from '../components/seatMap.js';
import styles from '../style/trainInfoPage.module.css';
import Header from '../components/header.js';
import BookingSection from '../components/bookingSeatSelection.js'; 
import TrainDetails from '../components/trainDetails.js';
import TrainRouteMap from '../components/trainRouteMap.js';

function TrainInfoPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract train data from the navigation state
  const { train } = location.state || {};

  const trainData = train || placeholderTrain;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [mapCenter, setMapCenter] = useState(null);  

  // Update the selectedSeats state when seats are selected
  const handleSeatSelection = (seats) => {
    // Map selected seats to ticket details
    const updatedSelectedSeats = seats.map(seat => ({
      trainCode: trainData.trainCode,
      origin: trainData.origin,
      destination: trainData.destination,
      departureTime: trainData.departureTime,
      arrivalTime: trainData.departureTime,
      seatNumber: seat, // Seat number selected by the user
      price: 9.99,  
      qrCode: "someGeneratedQrCode",  // Example 
    }));
  
    // Set the updated selected seats with all ticket details
    setSelectedSeats(updatedSelectedSeats);
  };

  const handleBooking = () => {
    // Create a ticket object (or array) with the necessary details
    const tickets = selectedSeats.map(seat => ({
      trainCode: trainData.trainCode,
      origin: trainData.origin,
      destination: trainData.destination,
      departureTime: trainData.departureTime,
      arrivalTime: trainData.departureTime,
      seatNumber: seat,  
      price: 9.99,  
      qrCode: "someGeneratedQrCode",  // Example 
    }));
  
    // Pass the tickets array to the checkout page
    navigate('/checkout', {
      state: { 
        tickets,
        selectedSeats,
      },
    });
  };
  

  // Effect to update the map center based on the origin and destination
  useEffect(() => {
    if (trainData.origin && trainData.destination) {
      const origin = trainData.origin; 
      const destination = trainData.destination;
      setMapCenter({ lat: 39.8283, lng: -98.5795 });  // Placeholder center (central US)
    }
  }, [trainData.origin, trainData.destination]);

  return (
    <div className={styles.body}>
      {/* Header */}
      <Header />

      {/* Left Section: Train Details and Train Route Map */}
      <div className={styles.leftSection}>
        {/* Train Details */}
        <TrainDetails trainData={trainData} />

        {/* Train Route Map */}
        <div className={styles.trainRouteMapContainer}>
          {mapCenter && (
            <TrainRouteMap 
              origin={trainData.origin} 
              destination={trainData.destination} 
              center={mapCenter} 
            />
          )}
        </div>
      </div>

      {/* Right Section: Seat Map and Booking */}
      <div className={styles.seatMapAndBooking}>
        <div className={styles.trainSeatMap}>
          <SeatMap
            trainCode={trainData.trainCode}
            seatRows={12}
            seatCols={5}
            bookedSeats={trainData.bookedSeats}
            onSeatsSelected={handleSeatSelection} 
          />
        </div>

        {/* Booking Section */}
        <div className={styles.bookingSection}>
          <BookingSection selectedSeats={selectedSeats} handleBooking={handleBooking} />
        </div>   
      </div>   
    </div>
  );
}

export default TrainInfoPage;
