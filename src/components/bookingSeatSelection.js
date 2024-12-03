import React from 'react';
import styles from '../style/trainInfoPage.module.css';

function BookingSection({ selectedSeats, handleBooking }) {
  return (
    <div className={styles.bookingSection}>
      <h3>Selected Seats</h3>
      <p>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None selected'}</p>
      <button
        className={styles.bookTicketsButton}
        onClick={handleBooking}
        disabled={selectedSeats.length === 0} // disable book button if no seats are selected yet
      >
        Book Tickets
      </button>
    </div>
  );
}

export default BookingSection;
