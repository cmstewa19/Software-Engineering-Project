import React, { useState, useEffect } from "react";
import NavigationButton from '../components/navigationButton.js';
import Header from '../components/header.js';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar.js';
import QRCode from '../components/QRCode.js';
import TrainSearch from '../components/trainSearch.js';
import { fetchTrainData } from '../services/api.js'; // import Amtrak API call
import { formatDate } from '../utils/trainUtils'; // Utility functions

// Home Page Component
const Home = ({ tickets, loading: ticketLoading, trains, setFilteredTrains }) => {
  const [allTrains, setAllTrains] = useState([]); // Full train data
  const [filteredTrains, setFilteredTrainsState] = useState([]); // Trains after filtering
  const [loading, setLoading] = useState(true); // Local loading state for train data
  const [error, setError] = useState(null); // Error state for fetching data

  const navigate = useNavigate();

  // Fetching train data using useEffect
  useEffect(() => {
    const getData = async () => {
      try {
        const trainData = await fetchTrainData();

        const flattenedTrains = Object.values(trainData || {}).flat().map((train) => {
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

        setAllTrains(flattenedTrains); // Set full train data
        setFilteredTrains(flattenedTrains); // Initialize filtered trains
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getData();
  }, []);

  // Find the ticket with the soonest departure date
  const soonestTicket = !loading && tickets.length > 0 
    ? tickets.reduce((earliest, current) => {
        return new Date(current.departureDate) < new Date(earliest.departureDate) ? current : earliest;
      }, tickets[0])
    : null;

  if (loading) {
    return <div>Loading train data...</div>; // Show loading state while fetching trains
  }

  if (error) {
    return <div>Error fetching train data: {error.message}</div>;
  }

  return (
    <div className="home-page">
      {/* Header */}
      <Header />

      {/* Sidebar */}
      <Sidebar />

      <div className="content-wrapper">
        {/* Profile Card Section */}
        <div className="profile-card">
          <div className="ticket-card" onClick={() => navigate('/myTickets')}>
            {tickets.length > 0 ? (
              <>
                <h2>{tickets[0].origin} → {tickets[0].destination}</h2>
                <h2>{tickets[0].departureDate}</h2>
                <QRCode />
              </>
            ) : (
              <h2>No tickets to display</h2>
            )}
          </div>

          {/* Button to navigate to My Tickets */}
          <NavigationButton
            text="My Tickets"
            path="/user-tickets"
            style={{
              padding: '10px 20px',
              fontSize: '18px',
              margin: '10px',
            }}
          />
        </div>

        <div>
          {/* Train Search Section */}
          <TrainSearch trains={allTrains} setFilteredTrains={setFilteredTrainsState} />
        </div>
      </div>
    </div>
  );
};

export default Home;