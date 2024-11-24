import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SeatMap from '../components/seatMap.js'
import TrainRouteMap from '../components/trainRoute.js';
import '../style/trainInfoPage.css';

function TrainInfoPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract train data from the navigation state
  const { train } = location.state || {};

  // placeholder data
  const placeholderTrain = {
    trainCode: 'ABC',
    origin: 'Sioux Falls',
    destination: 'Rapid City',
    departureTime: '10:00A',
    openSeats: 24,
    bookedSeats: [3, 6, 15],
  };

  const trainData = train || placeholderTrain;

  const handleBooking = (selectedSeats) => {
    navigate('/checkout', { state: { trainCode: trainData.trainCode, selectedSeats } });
  };

  return (
    <div className="train-info-container">
      {/* Left Section: Train Details */}
      <div className="train-details">
        <h1>{trainData.trainCode}</h1>
        <p><strong>Origin:</strong> {trainData.origin}</p>
        <p><strong>Destination:</strong> {trainData.destination}</p>
        <p><strong>Departure Time:</strong> {trainData.departureTime}</p>
        <p><strong>Open Seats:</strong> {trainData.openSeats}</p>
      </div>

      {/* Right Section: Seat Map and Booking */}
      <div className="train-seat-map">
        <SeatMap
          trainCode={trainData.trainCode}
          seatRows={6} // Customize the number of rows
          seatCols={4} // Customize the number of columns
          bookedSeats={trainData.bookedSeats}
          onSeatsSelected={(selectedSeats) => console.log('Selected Seats:', selectedSeats)}
        />
        <button
          className="book-tickets-button"
          onClick={() => handleBooking()}
        >
          Book Tickets
        </button>
      </div>
    </div>
  );
}

export default TrainInfoPage;
