import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SeatMap from '../components/seatMap.js';
import styles from '../style/trainInfoPage.module.css';
import Header from '../components/header.js';
import BookingSection from '../components/bookingSeatSelection.js'; 


function TrainInfoPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract train data from the navigation state
  const { train } = location.state || {};

  // // Placeholder data
  // const placeholderTrain = {
  //   trainCode: 'ABC',
  //   origin: 'Sioux Falls',
  //   destination: 'Rapid City',
  //   departureTime: '10:00A',
  //   availableSeats: 24,
  //   bookedSeats: [3, 6, 15],
  // };

  const trainData = train || placeholderTrain;

  const [selectedSeats, setSelectedSeats] = useState([]);

  // update the selectedSeats state when seats are selected
  const handleSeatSelection = (seats) => {
    setSelectedSeats(seats);
  };

  const handleBooking = () => {
    // pass the selected seats and train info to the checkout page
    navigate('/checkout', {
      state: { trainCode: trainData.trainCode, selectedSeats },
    });
  };

  return (
    <div className={styles.trainInfoContainer}>
      {/* Header */}
      <Header />

      {/* Left Section: Train Details */}
      <div className={styles.trainDetails}>
        <h1>{trainData.trainCode}</h1>
        <p><strong>Origin:</strong> {trainData.origin}</p>
        <p><strong>Destination:</strong> {trainData.destination}</p>
        <p><strong>Departure Time:</strong> {trainData.departureTime}</p>
        <p><strong>Available Seats:</strong> {trainData.availableSeats}</p>
      </div>

      {/* Right Section: Seat Map and Booking */}
      <div className={styles.seatMapAndBooking}>
        <div className={styles.trainSeatMap}>
          <SeatMap
            trainCode={trainData.trainCode}
            seatRows={12}
            seatCols={5}
            bookedSeats={trainData.bookedSeats}
            onSeatsSelected={handleSeatSelection} // Pass selected seats
          />
        </div>

        {/* Booking Section */}
        <div className={styles.bookingContainer}>
          <BookingSection selectedSeats={selectedSeats} handleBooking={handleBooking} />
        </div>   
        </div>   
    </div>
  );
}

export default TrainInfoPage;
