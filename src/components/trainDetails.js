{/* 
This component is used in trainInfoPage.js 
Styling is in trainDetails.module.css.

Function:
- Displays information about a train, including its code, origin, destination, departure time, and available seats.
- Receives trainData as a prop and renders it.
*/}

import React from 'react';
import styles from '../style/trainDetails.module.css';

function TrainDetails({ trainData }) {
  return (
    <div className={styles.trainDetails}>
      <h1>{trainData.trainCode}</h1>
      <p><strong>Origin:</strong> {trainData.origin}</p>
      <p><strong>Destination:</strong> {trainData.destination}</p>
      <p><strong>Departure Time:</strong> {trainData.departureTime}</p>
      <p><strong>Available Seats:</strong> {trainData.availableSeats}</p>
    </div>
  );
}

export default TrainDetails;