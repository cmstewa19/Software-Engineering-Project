import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ marginBottom: '20px' }}>
      {/* Searchable From Dropdown */}
      <Select
        value={from ? { label: from, value: from } : null}
        onChange={(selectedOption) => setFrom(selectedOption ? selectedOption.value : '')}
        options={originOptions}
        placeholder="Origin"
        noOptionsMessage={() => 'No trains available from this location.'}
      />
      {/* Searchable To Dropdown */}
      <Select
        value={to ? { label: to, value: to } : null}
        onChange={(selectedOption) => setTo(selectedOption ? selectedOption.value : '')}
        options={destinationOptions}
        placeholder="Destination"
        noOptionsMessage={() => 'No trains available from this location.'}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default TrainSearch;
