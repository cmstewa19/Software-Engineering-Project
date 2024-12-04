import styles from '../style/scanTicketPage.module.css'; // styling
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";

const ScanTicket = () => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate("/home");
        document.getElementsByTagName("body")[0].style.backgroundColor="#F5F5F5";
    }
    const [isValid, setIsValid] = useState(false);
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
    // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
    const userID = params.user; // "some_value"
    const ticketID = params.ticket;

    //console log info to ensure it works. will need to connect to database here..
    console.log(userID);
    console.log(ticketID);

    if(!isValid) {
        setIsValid(true);
    }

    document.getElementsByTagName("body")[0].style.backgroundColor= isValid ? "#5CB85C" : "#ED4337";

    return(
        <div className={styles.container} onClick={onClick}>
            <h2 className={isValid ? styles.successIcon : styles.errorIcon}>{isValid ? "✓" : "X"}</h2>
            <h2 className={styles.text}>{isValid ? "SUCCESS" : "INVALID TICKET"}</h2>
        </div>
    )
}

export default ScanTicket;