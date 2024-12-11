import styles from '../style/scanTicketPage.module.css'; // styling
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";

const ScanTicket = () => {
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState('');
    //on click function to return to home page
    const onClick = () => {
        navigate("/home");
        document.getElementsByTagName("body")[0].style.backgroundColor="#F5F5F5";
    };
    
    //get parameters from url
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
    const uid = params.user; 
    const tid = params.ticket;

    // fetch to backend to see if ticket is valid
    async function fetchTicket() {
    try {
        const response = await fetch('http://localhost:3000/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uid, tid }),
          credentials: 'include',
        });
    
        const data = await response.json();
        setResult(data);
        if (response.ok) {
            console.log(parseInt(data.valid));
            if(parseInt(data.valid) == 1) { setIsValid(true); }
        } else {
          setError(data.error || 'Failed to scan ticket.');
          
        }
      } catch (err) {
        console.error('ERROR: failed to scan ticket', err);
      }
    }

    //fix for multiple fetches
    //if nothing has ben fetched do this first
    if(!hasFetched) {
        fetchTicket();
        setHasFetched(true);
    }
    
    //don't render anything until data has been fetched
    if(hasFetched) {
        document.getElementsByTagName("body")[0].style.backgroundColor= isValid ? "#5CB85C" : "#ED4337";
        return(
            <div className={styles.container} onClick={onClick}>
                <h2 className={isValid ? styles.successIcon : styles.errorIcon}>{isValid ? "✓" : "X"}</h2>
                <h2 className={styles.text}>{isValid ? "SUCCESS" : "INVALID TICKET"}</h2>
            </div>
        );
    }
    
}

export default ScanTicket;