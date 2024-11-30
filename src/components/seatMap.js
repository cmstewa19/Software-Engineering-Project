import React, { useState } from 'react';
import styles from '../style/seatMap.module.css';

function SeatMap({
  trainCode,
  onSeatsSelected,
  seatRows = 12,
  seatCols = 4,
  bookedSeats = [],
}) {
  // Generate initial seat states (combine booked seats with selectable seats)
  const initialSeats = Array.from({ length: seatRows * seatCols }, (_, index) => ({
    id: index + 1,
    isSelected: false,
    isBooked: bookedSeats.includes(index + 1),
  }));

  const [seats, setSeats] = useState(initialSeats);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatId) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.id === seatId && !seat.isBooked
          ? { ...seat, isSelected: !seat.isSelected }
          : seat
      )
    );

    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seatId)
        ? prevSelected.filter((id) => id !== seatId)
        : [...prevSelected, seatId]
    );

    if (onSeatsSelected) {
      onSeatsSelected(selectedSeats);
    }
  };

  return (
    <div className={styles.seatSelectionContainer}>
      {trainCode && <h2>Seat Map for Train {trainCode}</h2>}

      {/* Dynamically applying grid layout based on seatCols */}
      <div
        className={styles.seatMap}
        style={{
          gridTemplateColumns: `repeat(${seatCols}, 50px)`,
        }}
      >
        {seats.map((seat) => (
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

      {/* Display selected seats */}
      <p>
        Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
      </p>
    </div>
  );
}

export default SeatMap;
