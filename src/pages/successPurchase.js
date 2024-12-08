import styles from '../style/scanTicketPage.module.css'; // styling
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";

const PurchaseSuccess = () => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate("/home");
        document.getElementsByTagName("body")[0].style.backgroundColor="#F5F5F5";
    }

    return(
        <div className={styles.container} onClick={onClick}>
            <h2 className={styles.successIcon}>{"✓"}</h2>
            <h2 className={styles.text}>{"SUCCESS"}</h2>
        </div>
    )
}

export default PurchaseSuccess;
