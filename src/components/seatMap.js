{/* 
This component is used in trainInfoPage.js to display the seat map for a train.

Function:
  - Displays a seat map where users can select or deselect seats.
  - The seats are laid out in rows with gaps for aisles.
  - It simulates booked seats randomly and allows users to select available seats.
  - When seats are selected, the parent component is notified through the `onSeatsSelected` callback.
*/}

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../style/seatMap.module.css';

function SeatMap({ trainCode, onSeatsSelected }) {
  // Use the current location's state to retrieve train data (availableSeats)
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
  
  // initialize booked seats state using the random booked seats generator
  const [bookedSeats] = useState(generateRandomBookedSeats(bookedSeatCount));

  // create the seat layout with gaps for the aisle
  const initialSeats = Array.from({ length: totalSeats }, (_, index) => ({
    id: index + 1,
    isSelected: false,
    isBooked: bookedSeats.includes(index + 1),
  }));

  // define state variables for seats and selectedSeats
  const [seats, setSeats] = useState(initialSeats);       // current seat layout (selected/booked)
  const [selectedSeats, setSelectedSeats] = useState([]); // list of selected seat IDs

  // handle selecting a seat
  const handleSeatClick = (seatId) => {
    // toggle 'isSelected' status of the clicked seat
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.id === seatId && !seat.isBooked
          ? { ...seat, isSelected: !seat.isSelected }
          : seat
      )
    );
  
    // update list of selected seats
    const updatedSelectedSeats = selectedSeats.includes(seatId)
      ? selectedSeats.filter((id) => id !== seatId) // remove seat if it's already selected
      : [...selectedSeats, seatId];                 // add seat if it's not already selected
  
    setSelectedSeats(updatedSelectedSeats);         // update selected seat's state
  
    // call the onSeatsSelected callback with the updated selected seats list
    if (onSeatsSelected) {
      onSeatsSelected(updatedSelectedSeats);
    }
  };

  // render seat layout, each row contains 5 seats (2 + aisle + 3). 12 rows for 60 seats total.
  const renderSeats = () => {
    const rows = [];
    for (let i = 0; i < seatRows; i++) {
      const rowStartIndex = i * 5;
      rows.push(
        <div key={i} className={styles.seatRow}>
          {/* First 2 seats */}
          {seats.slice(rowStartIndex, rowStartIndex + 2).map((seat) => (
            <div
              key={seat.id}
              className={`${styles.seat} ${seat.isBooked ? styles.booked : ''} ${
                seat.isSelected ? styles.selected : ''
              }`}
              onClick={() => handleSeatClick(seat.id)} // handle seat click for selection/deselection
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
              onClick={() => handleSeatClick(seat.id)} // handle seat click for selection/deselection
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
      {trainCode && <h2>Seat Map for Train {trainCode}</h2>}  {/* Title with trainCode */}
      <div className={styles.seatMap}>{renderSeats()}</div>   {/* Render the seat layout */}
    </div>
  );
}

export default SeatMap;
