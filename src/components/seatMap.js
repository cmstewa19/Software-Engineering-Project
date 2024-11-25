import React, { useState } from 'react';
import '../style/seatSelector.css';

function SeatMap({ trainCode, onSeatsSelected, seatRows = 12, seatCols = 4, bookedSeats = [] }) {
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
    <div className="seat-selection-container">
      {trainCode && <h2>Seat Map for Train {trainCode}</h2>}
      <div className="seat-map">
        {seats.map((seat) => (
          <div
            key={seat.id}
            className={`seat ${seat.isBooked ? 'booked' : ''} ${
              seat.isSelected ? 'selected' : ''
            }`}
            onClick={() => handleSeatClick(seat.id)}
          >
            {seat.id}
          </div>
        ))}
      </div>
      <p>
        Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
      </p>
    </div>
  );
}

export default SeatMap;
