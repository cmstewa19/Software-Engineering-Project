{/* 
This component is used in 


Function: 

*/}

import React from "react";
import { useNavigate } from 'react-router-dom';
import QR from "react-qr-code";


{/* Component that returns a QR code. As of now it has a static value */}
function QRCode({url}) {
    const navigate = useNavigate();
    
    const backupUrl = "localhost:3001/home"; //fallback in case link doesn't get passed properly
    const Url = url || backupUrl;

    return (
        <div onClick={() => navigate({Url})} style={{ height: "auto", margin: "15px", maxWidth: "200px", width: "100%" }}>
            <QR
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={Url}
                viewBox={`0 0 256 256`}
            />
        </div>
    );
};

export default QRCode;