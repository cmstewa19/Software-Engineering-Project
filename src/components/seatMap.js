import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../style/seatMap.module.css';

function SeatMap({ trainCode, onSeatsSelected }) {
  const { state } = useLocation();
  const { availableSeats } = state.train; // retrieve available seats from train data
  const totalSeats = 60; 
  const seatRows = 12; 

  // calculate number of booked seats
  const bookedSeatCount = totalSeats - availableSeats;

  // simulate random booked seats
  const generateRandomBookedSeats = (num) => {
    const bookedSeats = new Set();
    while (bookedSeats.size < num) {
      const randomSeat = Math.floor(Math.random() * totalSeats) + 1;
      bookedSeats.add(randomSeat);
    }
    return Array.from(bookedSeats);
  };

  const [bookedSeats] = useState(generateRandomBookedSeats(bookedSeatCount));

  // create the seat layout with gaps for the aisle
  const initialSeats = Array.from({ length: totalSeats }, (_, index) => ({
    id: index + 1,
    isSelected: false,
    isBooked: bookedSeats.includes(index + 1),
  }));

  const [seats, setSeats] = useState(initialSeats);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatId) => {
    // Update the seats state
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.id === seatId && !seat.isBooked
          ? { ...seat, isSelected: !seat.isSelected }
          : seat
      )
    );
  
    // Calculate the new selected seats list
    const updatedSelectedSeats = selectedSeats.includes(seatId)
      ? selectedSeats.filter((id) => id !== seatId)
      : [...selectedSeats, seatId];
  
    setSelectedSeats(updatedSelectedSeats);
  
    // call the onSeatsSelected callback with the updated list
    if (onSeatsSelected) {
      onSeatsSelected(updatedSelectedSeats);
    }
  };

  // render seat layout with aisle gaps
  const renderSeats = () => {
    const rows = [];
    for (let i = 0; i < seatRows; i++) {
      const rowStartIndex = i * 5; // each row contains 5 seats (2 + aisle + 3)
      rows.push(
        <div key={i} className={styles.seatRow}>
          {/* First 2 seats */}
          {seats.slice(rowStartIndex, rowStartIndex + 2).map((seat) => (
            <div
              key={seat.id}
              className={`${styles.seat} ${seat.isBooked ? styles.booked : ''} ${
                seat.isSelected ? styles.selected : ''
              }`}
              onClick={() => handleSeatClick(seat.id)}
            >
              {seat.id}
            </div>
          ))}

          {/* Aisle gap */}
          <div className={styles.aisle}></div>

          {/* Last 3 seats */}
          {seats.slice(rowStartIndex + 2, rowStartIndex + 5).map((seat) => (
            <div
              key={seat.id}
              className={`${styles.seat} ${seat.isBooked ? styles.booked : ''} ${
                seat.isSelected ? styles.selected : ''
              }`}
              onClick={() => handleSeatClick(seat.id)}
            >
              {seat.id}
            </div>
          ))}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className={styles.seatSelectionContainer}>
      {trainCode && <h2>Seat Map for Train {trainCode}</h2>}
      <div className={styles.seatMap}>{renderSeats()}</div>
    </div>
  );
}

export default SeatMap;
