// waiting for database integration

// when a user visits browse it will fetch latest data from the
//      amtrack api and write that to the database. it will
//      then display the data from the database for browsing.

import React, { useEffect, useState } from 'react';
import { fetchTrainData } from '../services/api.js';  // import amtrack api call
import Header from '../components/header.js'; // header
import Sidebar from '../components/sidebar.js'; // sidebar

function BrowseTrainsPage() {
  const [data, setData] = useState(null);           // store the fetched data
  const [loading, setLoading] = useState(true);     // manage loading state
  const [error, setError] = useState(null);         // handle error state
  const [sortConfig, setSortConfig] = useState({
    key: 'trainID',     // default sorting key
    direction: 'asc',   // default sorting direction
  });

  useEffect(() => {
    // fetch data using the function from api.js
    const getData = async () => {
      try {
        const trainData = await fetchTrainData();
        setData(trainData);  // update state with the fetched data
        setLoading(false);   // set loading to false after data is fetched
      } catch (error) {
        setError(error);     // handle any errors
        setLoading(false);   // set loading to false in case of error
      }
    };
    
    getData();  // call the async function
  }, []);  

  if (loading) {
    return <div>Loading...</div>;  // display loading message
  }

  if (error) {
    return <div>Error: {error.message}</div>;  // display error message if an error occurs
  }

  // Function to generate random number for available seats
  //    *** Rework - currently generates a new one every time table is sorted ***
  const getRandomSeats = () => Math.floor(Math.random() * 61); // Random between 0 and 60

  // Function to generate a random future date based on the provided train schedule times
  //    *** Need to rework ***
  const getRandomFutureDate = (dateStr) => {
    const date = new Date(dateStr);  // convert string to Date object
    if (isNaN(date)) {
      console.error('Invalid date:', dateStr);
      return new Date();  // return today's current date as a placeholder if invalid
    }
    // simulate future trains (amtrack api has info on currently running trains)
    const daysAhead = Math.floor(Math.random() * 5) + 1;  // random number between 1 and 5
    date.setDate(date.getDate() + daysAhead); 
    return date;
  };

  // Function to format a date into a readable string (MM/DD/YYYY HH:mm AM/PM)
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  // Flatten the data into one list of trains and add random values
  const flattenedTrains = Object.values(data || {}).flat().map((train) => {
    const originStation = train.stations[0]; 
    const destinationStation = train.stations[train.stations.length - 1]; 
    
    // Get departure/arrival dates
    const randomDepartureDate = getRandomFutureDate(train.schDep);
    const randomArrivalDate = getRandomFutureDate(train.schArr);

    return {
      trainID: train.trainID,
      origin: originStation.name,
      destination: destinationStation.name,
      departureTime: formatDate(randomDepartureDate),
      arrivalTime: formatDate(randomArrivalDate),
      availableSeats: getRandomSeats(),
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

    return direction * (a[key] - b[key]); // For numbers
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
      
        {/* Sidebar component */}
        <Sidebar />
        <h1 style={{ marginLeft: '150px' }}>Browse Trains</h1>

        <div style={{ overflowX: 'auto' }}>
            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th onClick={() => requestSort('trainID')}>
                    Train ID/Code {getSortArrow('trainID')}
                    </th>
                    <th onClick={() => requestSort('origin')}>
                    Origin {getSortArrow('origin')}
                    </th>
                    <th onClick={() => requestSort('destination')}>
                    Destination {getSortArrow('destination')}
                    </th>
                    <th onClick={() => requestSort('departureTime')}>
                    Departure Time {getSortArrow('departureTime')}
                    </th>
                    <th onClick={() => requestSort('arrivalTime')}>
                    Arrival Time {getSortArrow('arrivalTime')}
                    </th>
                    <th onClick={() => requestSort('availableSeats')}>
                    Available Seats {getSortArrow('availableSeats')}
                    </th>
                    <th onClick={() => requestSort('price')}>
                    Price {getSortArrow('price')}
                    </th>
                </tr>
          </thead>
          <tbody>
            {sortedTrains.map((train, index) => (
              <tr key={index}>
                <td>{train.trainID}</td>
                <td>{train.origin}</td>
                <td>{train.destination}</td>
                <td>{train.departureTime}</td>
                <td>{train.arrivalTime}</td>
                <td>{train.availableSeats}</td>
                <td>{train.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BrowseTrainsPage;
