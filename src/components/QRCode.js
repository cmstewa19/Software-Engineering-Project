{/* 
This component is used in 


Function: 

*/}

import React from "react";
import { useNavigate } from 'react-router-dom';
import QR from "react-qr-code";


{/* Component that returns a QR code. As of now it has a static value */}
function QRCode({userID, ticketID}) {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/scan/?user=${userID}&ticket=${ticketID}`)} style={{ height: "auto", margin: "15px", maxWidth: "200px", width: "100%" }}>
            <QR
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={`http://localhost:3000/scan/?user=${userID}&ticket=${ticketID}`}
                viewBox={`0 0 256 256`}
            />
        </div>
    );
};

export default QRCode;