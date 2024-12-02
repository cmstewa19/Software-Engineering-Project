// This component is used in pages/trainInfoPage.js
// Formatting is in style/trainInfoPage.module.css

// Function: displays selected seats from the seatMap and 
//    allows user to navigate to checkout page after selecting seats

import React from 'react';
import styles from '../style/trainInfoPage.module.css';

function BookingSection({ selectedSeats, handleBooking }) {
  return (
    <div className={styles.bookingSection}>
      <h3>Selected Seats</h3>
      
      {/* Shows selected seats, or if none are selected shows 'None selected' */}
      <p>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None selected'}</p>
      
      {/* Button to initiate the booking process. Disabled if no seats are selected */}
      <button
        className={styles.bookTicketsButton}
        onClick={handleBooking}
        disabled={selectedSeats.length === 0} 
      >
        Book Tickets
      </button>
    </div>
  );
}

export default BookingSection;
