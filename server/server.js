const express = require('express'); // required node package
const sqlite3 = require('sqlite3').verbose(); //require package
const QRCode = require('qrcode'); //require package for the qr code generator
const app = express(); //instance of our app
const port = 3000; //local hosting port

//middleware to handle JSON and URL-encoded data
app.use(express.json());

//connect to  database
const db = //initialize database here


//Block of code with app endpoints for retireving tickets, not sure if we would want these here as well as the endpoint for the qrcode
/*

//app endpoint to get all tickets for a user
app.get('USER ID PATH LOCATION', (req, res) => {
    const userId = REQ PARAMS FOR USERID;
    db.all('SELECT NUMBER OF TICKETS FROM USERID', [userId], (err, rows) => {
        if (err) { //catch error
            return res.status(500).json({ error: 'Error in app endpoint to get all tickets for a user' }); //report error
        }
        res.json(rows); //report rows of users tickets
    });
});

//app endpoint to get details for a specific ticket
app.get('TICKETID PATHL OCATION', (req, res) => {
    const ticketId = REQ PARAMS FOR TICKETSID;
    db.get('SELECT TICKET FROM TICKETID', [ticketId], (err, row) => {
        if (err) { //catch errors
            return res.status(500).json({ error: 'Error in app endpoint to get details for a specific ticket' }); //report error
        }
        if (!row) {
            return res.status(404).json({ error: 'Ticket not found' }); //report wether or not ticket exists
        }
        res.json(row); //report row of ticket
    });
});

//app endpoint to generate QR code for a ticket
app.get('TICKETID', (req, res) => {
    const ticketId = REQ PARAMS FOR TICKETSID;
    db.get('SELECT TICKET FROM TICKETID', [ticketId], (err, row) => {
        if (err || !row) { //check for exisitng ticket
            return res.status(404).json({ error: 'Ticket not found' }); //report no exisitng ticket
        }
        //generate QR code containing ticket info 
        QRCode.toDataURL(JSON.stringify(row), (err, url) => {
            if (err) { //catch error
                return res.status(500).json({ error: 'Failed to generate QR code' }); //report error
            }
            res.json({ qrCode: url }); //report qrCode
        });
    });
});



*/

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});