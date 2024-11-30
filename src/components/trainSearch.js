import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import arrowIcon from '../assets/arrows-icon.webp'; // Assuming the arrow icon is in your assets folder
import styles from '../style/trainSearch.module.css';

const TrainSearch = ({ trains = [], setFilteredTrains }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const filtered = trains.filter(
      (train) =>
        (!from || train.origin.toLowerCase() === from.toLowerCase()) &&
        (!to || train.destination.toLowerCase() === to.toLowerCase())
    );

    setFilteredTrains(filtered); // Update the filtered trains state

    // Navigate and force a page reload
    navigate(`/browse?from=${from}&to=${to}`);
    window.location.reload(); // Force page reload to reflect updated filtered results
  };

  // Convert origin and destination data to options for react-select
  const originOptions = [...new Set(trains.map((train) => train.origin))]
    .map((origin) => ({ label: origin, value: origin }));

  const destinationOptions = [...new Set(trains.map((train) => train.destination))]
    .map((destination) => ({ label: destination, value: destination }));

  return (
    <div className={styles.trainSearchContainer}>
      {/* From Dropdown */}
      <div className="dropdown-container">
        <Select
          id="from"
          value={from ? { label: from, value: from } : null}
          onChange={(selectedOption) => setFrom(selectedOption ? selectedOption.value : '')}
          options={originOptions}
          placeholder="Origin"
          noOptionsMessage={() => 'No trains available from this location.'}
        />
      </div>

      {/* Arrow Icon */}
      <div className="arrow-container">
        <img src={arrowIcon} alt="Arrow" className="arrow-icon" />
      </div>

      {/* To Dropdown */}
      <div className="dropdown-container">
        <Select
          id="to"
          value={to ? { label: to, value: to } : null}
          onChange={(selectedOption) => setTo(selectedOption ? selectedOption.value : '')}
          options={destinationOptions}
          placeholder="Destination"
          noOptionsMessage={() => 'No trains available from this location.'}
        />
      </div>

      {/* Search Button */}
      <div className="search-button-container">
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default TrainSearch;
