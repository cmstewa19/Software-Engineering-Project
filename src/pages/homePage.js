import React, { useState, useEffect } from "react";
import NavigationButton from '../components/navigationButton.js';
import Header from '../components/header.js';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar.js';
import QRCode from '../components/QRCode.js';
import TrainSearch from '../components/trainSearch.js';
import { fetchTrainData } from '../services/api.js'; // import Amtrak API call
import { formatDate } from '../utils/trainUtils'; // Utility functions
import styles from '../style/homePage.module.css'; // styling

// Home Page Component
const Home = ({ tickets, loading: ticketLoading, trains, setFilteredTrains }) => {
  const [allTrains, setAllTrains] = useState([]); // Full train data
  const [filteredTrains, setFilteredTrainsState] = useState([]); // Trains after filtering
  const [loading, setLoading] = useState(true); // Local loading state for train data
  const [error, setError] = useState(null); // Error state for fetching data
  document.getElementsByTagName("body")[0].style.backgroundColor="#F5F5F5";

  const navigate = useNavigate();
  let first = "";
  let nextTicket = {
    url: null,
    origin: null,
    destination: null,
    departDate: null,
  };

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

  const fetchUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/home", {
        method: "GET",
        headers:{ 'Content-Type': 'application/json' },
        credentials:"include",
        withCredentials:""
      });
      const data = await response.text();
      if(response.ok){
        if(data.message == "no ticket"){return false;}
        return true;
      } else {
        setError(data.error || 'Something went wrong.');
        navigate("/");
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError('An error occurred. Please try again later.');
    }
  }

  // Function to get a specific cookie by name
  function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let c = cookies[i].trim();
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;  // Cookie not found
  }

  if(fetchUserInfo()) {
    nextTicket.url = decodeURIComponent(getCookie("url"));
    nextTicket.origin = decodeURIComponent(getCookie("origin"));
    nextTicket.destination = decodeURIComponent(getCookie("destination"));
    nextTicket.departDate = decodeURIComponent(getCookie("departDate"));
  }
  first = getCookie("first");
  
  

  

  return (
    <div className={styles.homePage}>
      {/* Header */}
      <Header />

      {/* Sidebar */}
      <Sidebar />

      {/* Welcome Message */}
      <h2 className={styles.welcomeText}>Welcome {first}!</h2>

      {/* Main content wrapper */}
      <div className={styles.contentWrapper}>
        {/* Profile Card Section */}
        <div className={styles.profileCard}>
          <div className={styles.ticketCard}>
            {nextTicket.origin != null ? (
              <>
                <h2>{nextTicket.origin} → {nextTicket.destination}</h2>
                <h2>{nextTicket.departDate}</h2>
                
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

        {/* Train Search Section */}
        <div className={styles.trainSearchContainer}>
          <TrainSearch trains={allTrains} setFilteredTrains={setFilteredTrainsState} />
        </div>
      </div>
    </div>
  );
};

export default Home;