import React, { useEffect, useState } from 'react';
import { fetchTrainData } from '../services/api.js';  // import amtrack api call
import Header from '../components/header.js'; // header
import Sidebar from '../components/sidebar.js'; // sidebar
import TrainTable from '../components/trainTable.js'; // import the TrainTable component
import { formatDate } from '../utils/trainUtils'; // import utility functions

function BrowseTrainsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: 'trainCode',
    direction: 'asc',
  });

  //might not work
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  while(true) {
    console.log(params.origin);
    console.log(params.destination);
    break;
  }
  
  

  useEffect(() => {
    const getData = async () => {
      try {
        const trainData = await fetchTrainData();
        setData(trainData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const flattenedTrains = Object.values(data || {}).flat().map((train) => {
    const departureStation = train.stations[0];
    const arrivalStation = train.stations[train.stations.length - 1];
  
    const departureTime = departureStation
      ? formatDate(departureStation.schDep)
      : 'No departure time available';
    const arrivalTime = arrivalStation
      ? formatDate(arrivalStation.schArr)
      : 'No arrival time available';
  
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
  
  // sort the trains based on the selected column and direction
  const sortedTrains = [...flattenedTrains].sort((a, b) => {
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

  // Function to handle sorting when a column header is clicked
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Function to render the sorting arrow (up or down) next to the column header
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
      <TrainTable trains={sortedTrains} requestSort={requestSort} getSortArrow={getSortArrow} />
    </div>
  );
}

export default BrowseTrainsPage;