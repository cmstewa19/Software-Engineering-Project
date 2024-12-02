import React, { useState, useEffect } from 'react';
import { fetchTrainData } from '../services/api.js';
import { useLocation } from 'react-router-dom';
import Header from '../components/header.js';
import Sidebar from '../components/sidebar.js';
import TrainTable from '../components/trainTable.js';
import TrainSearch from '../components/trainSearch.js';
import { formatDate } from '../utils/trainUtils';

function BrowseTrainsPage() {
  const [allTrains, setAllTrains] = useState([]); // Full train data
  const [filteredTrains, setFilteredTrains] = useState([]); // Filtered trains
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: 'trainCode',
    direction: 'asc',
  });

  const location = useLocation(); // Get the current URL
  const searchParams = new URLSearchParams(location.search); // Parse query params

  const from = searchParams.get('from');
  const to = searchParams.get('to');

  useEffect(() => {
    const getData = async () => {
      try {
        const trainData = await fetchTrainData();
        const flattenedTrains = Object.values(trainData || {}).flat().map((train) => {
          const departureStation = train.stations[0];
          const arrivalStation = train.stations[train.stations.length - 1];
          const departureTime = departureStation ? formatDate(departureStation.schDep) : 'No departure time available';
          const arrivalTime = arrivalStation ? formatDate(arrivalStation.schArr) : 'No arrival time available';
          const trainCode = train.trainID || 'Unknown';
          
          return {
            trainCode,
            origin: departureStation?.name || 'Unknown',
            destination: arrivalStation?.name || 'Unknown',
            departureTime,
            arrivalTime,
            availableSeats: Math.floor(Math.random() * 61),
            price: '$9.99',
          };
        });

        setAllTrains(flattenedTrains); // Set full train data

        // Apply filters if they exist
        if (from || to) {
          const filtered = flattenedTrains.filter(
            (train) =>
              (!from || train.origin.toLowerCase() === from.toLowerCase()) &&
              (!to || train.destination.toLowerCase() === to.toLowerCase())
          );
          setFilteredTrains(filtered); // Set filtered trains
        } else {
          setFilteredTrains(flattenedTrains); // If no filter, show all
        }

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getData();
  }, [location.search]); // Re-run effect when query params change

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Sorting logic for filtered trains
  const sortedTrains = [...filteredTrains].sort((a, b) => {
    const key = sortConfig.key;
    const direction = sortConfig.direction === 'asc' ? 1 : -1;

    if (key === 'departureTime' || key === 'arrivalTime') {
      const dateA = new Date(a[key]);
      const dateB = new Date(b[key]);
      return direction * (dateA - dateB);
    }

    if (typeof a[key] === 'string') {
      return direction * a[key].localeCompare(b[key]);
    }

    return direction * (a[key] - b[key]);
  });

  // Handle sorting when a column header is clicked
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Render sorting arrow next to the column header
  const getSortArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '▼' : '▲';
    }
    return '';
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <h2>Browse Trains</h2>

      {/* TrainSearch Component */}
      <TrainSearch trains={allTrains} setFilteredTrains={setFilteredTrains} />

      {/* TrainTable Component */}
      <TrainTable trains={sortedTrains} requestSort={requestSort} getSortArrow={getSortArrow} />
    </div>
  );
}

export default BrowseTrainsPage;
