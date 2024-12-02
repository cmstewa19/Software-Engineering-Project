import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SeatMap from '../components/seatMap.js';
import styles from '../style/trainInfoPage.module.css';  // Use module CSS import

function TrainInfoPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract train data from the navigation state
  const { train } = location.state || {};

  // Placeholder data
  const placeholderTrain = {
    trainCode: 'ABC',
    origin: 'Sioux Falls',
    destination: 'Rapid City',
    departureTime: '10:00A',
    openSeats: 24,
    bookedSeats: [3, 6, 15],
  };

  const trainData = train || placeholderTrain;

  const [selectedSeats, setSelectedSeats] = useState([]);

  // Update the selectedSeats state when seats are selected
  const handleSeatSelection = (seats) => {
    setSelectedSeats(seats);
  };

  const handleBooking = () => {
    // Pass the selected seats and train info to the checkout page
    navigate('/checkout', {
      state: { trainCode: trainData.trainCode, selectedSeats },
    });
  };

  return (
    <div className={styles.trainInfoContainer}>
      {/* Left Section: Train Details */}
      <div className={styles.trainDetails}>
        <h1>{trainData.trainCode}</h1>
        <p><strong>Origin:</strong> {trainData.origin}</p>
        <p><strong>Destination:</strong> {trainData.destination}</p>
        <p><strong>Departure Time:</strong> {trainData.departureTime}</p>
        <p><strong>Open Seats:</strong> {trainData.openSeats}</p>
      </div>

      {/* Right Section: Seat Map and Booking */}
      <div className={styles.trainSeatMap}>
        <SeatMap
          trainCode={trainData.trainCode}
          seatRows={6} // Customize the number of rows
          seatCols={4} // Customize the number of columns
          bookedSeats={trainData.bookedSeats}
          onSeatsSelected={handleSeatSelection} // Pass selected seats here
        />
        <button
          className={styles.bookTicketsButton}
          onClick={handleBooking} // Trigger booking
          disabled={selectedSeats.length === 0} // Disable button if no seats are selected
        >
          Book Tickets
        </button>
      </div>
    </div>
  );
}

export default TrainInfoPage;
