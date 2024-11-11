import React, { useEffect, useState } from 'react';
import { fetchTrainData } from '../services/api.js';  // import amtracker api call


function BrowseTrainsPage() {
  const [data, setData] = useState(null);           // Store the fetched data
  const [loading, setLoading] = useState(true);     // Manage loading state
  const [error, setError] = useState(null);         // Handle error state

  useEffect(() => {
    // Fetch data using the function from api.js
    const getData = async () => {
      try {
        const trainData = await fetchTrainData();
        setData(trainData);  // Update state with the fetched data
        setLoading(false);   // Set loading to false after data is fetched
      } catch (error) {
        setError(error);     // Handle any errors
        setLoading(false);   // Set loading to false in case of error
      }
    };
    
    getData();  // Call the async function
  }, []);  // Empty dependency array means this runs only once, on component mount

  if (loading) {
    return <div>Loading...</div>;  // Display loading message while data is being fetched
  }

  if (error) {
    return <div>Error: {error.message}</div>;  // Display error message if an error occurs
  }

  // Check if data is available before rendering the table
  if (data && Object.keys(data).length > 0) {
    return (
      <div>
        <h1>Train Data</h1>
        {Object.keys(data).map((trainKey) => {
          const train = data[trainKey][0];  // Assuming only one train per key
          return (
            <div key={trainKey}>
              <h2>{train.routeName} - Train {train.trainNum}</h2>
              <table border="1" cellPadding="10">
                <thead>
                  <tr>
                    <th>Station</th>
                    <th>Scheduled Arrival</th>
                    <th>Scheduled Departure</th>
                    <th>Actual Arrival</th>
                    <th>Actual Departure</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {train.stations.map((station, index) => (
                    <tr key={index}>
                      <td>{station.name}</td>
                      <td>{station.schArr}</td>
                      <td>{station.schDep}</td>
                      <td>{station.arr}</td>
                      <td>{station.dep}</td>
                      <td>{station.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div>No train data available.</div>;
  }
}

export default BrowseTrainsPage;
