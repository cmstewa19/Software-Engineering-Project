require('dotenv').config();
const express = require('express'); // required node package
const sqlite3 = require('sqlite3').verbose(); // require sqlite
const cors = require('cors'); // require cors so frontend and backend play nice
const QRCode = require('qrcode'); //require package for the qr code generator
const Stripe = require('stripe'); // require stripe for payment simulation
const db = require('./database'); // require database
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // uses your secret env key
const session = require('express-session');

const app = express(); // instance of our app
const port = 3000; // backend goes on 3000. (frontend goes on 3001)

// Middleware
app.use(cors({
  origin: 'http://localhost:3001',  // Frontend URL
  credentials: true,                // Allow cookies to be included in requests
}));

app.use(express.json());
app.use((req, res, next) => {
  console.log('Session ID on request:', req.sessionID);
  next();
});

// Session middleware setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'Lax',  
      maxAge: 3600000,    // 1 hour expiration
    },
  })
);


// Create payment intent using Stripe
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency } = req.body;

// Make sure amount and currency are valid and present
    if (!amount || !currency) {
      return res.status(400).json({ error: 'Missing amount or currency' });
    }

// Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // amount in smallest currency unit (e.g., cents)
      currency,
    });

    // Send client secret to the frontend
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
  } catch (error) {
// Log error
    console.error('Payment Intent Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to generate QR code for a ticket
app.get('/api/qr/:ticketId', (req, res) => {
  const ticketId = req.params.ticketId;

  // Fetch ticket data from the database
    db.get('SELECT * FROM tickets WHERE id = ?', [ticketId], (err, row) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    QRCode.toDataURL(JSON.stringify(row), (err, url) => {
      if (err) {
        console.error("QR Code generation error:", err);
        return res.status(500).json({ error: 'Failed to generate QR code' });
      }
      res.json({ qrCode: url });  // Return the QR code as a data URL
    });
  });
});

// Signup POST request
app.post('/api/signup', async (req, res) => {
    const { firstName, lastName, phoneNumber, email, password } = req.body;
  
    if (!firstName || !lastName || !phoneNumber || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    // Checking and inserting into the database
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      if (row) {
        return res.status(400).json({ error: 'Email already in use.' });
      }
  
      db.run(
        `INSERT INTO users (email, password, first_name, last_name, phone_number, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
        [email, password, firstName, lastName, phoneNumber],
        (err) => {
          if (err) {
            console.error('Database Error:', err);
            return res.status(500).json({ error: 'Failed to create account.' });
          }
          res.status(201).json({ message: 'Account created successfully!' });
        }
      );
    });
  });

// Login POST request
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  // Query the database for the user by email
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!row) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

// Compare the provided password with the one stored in the database
    if (row.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Log the session before setting user data
    console.log('Session before setting user:', req.session);

    // Set session data
    req.session.user = { userid: row.userid, email: row.email };

    // Log session data after setting user
    console.log('Session after setting user:', req.session);
    console.log('Session cookie after login:', req.session.cookie);

    res.status(200).json({ message: 'Login successful!' });
  });
});

// endpoint to get userinfo for profile
app.get('/api/userinfo', (req, res) => {
  console.log('Session:', req.session.user);  // Log session to check if it's set

  if (!req.session.user) {
    return res.status(401).json({ message: 'Not logged in' });
  }

  const userId = req.session.user.userid;

  // Query user data from your database
  db.get(
    'SELECT first_name, last_name, email, phone_number FROM users WHERE userid = ?',
    [userId],
    (err, row) => {
      if (err) {
        console.error('Database error:', err); // Log the error for debugging
        return res.status(500).json({ error: 'Failed to fetch user data' });
      }

      console.log('User data:', row);  // Log the returned data
      res.json(row);
    }
  );
});

// endpoint to insert tickets into database
// Endpoint to save tickets to the database
app.post('/api/save-tickets', async (req, res) => {
  const { tickets } = req.body;

  // Check if user is logged in
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: 'Unauthorized: User not logged in.' });
  }

  const userId = req.session.user.userid; // Retrieve user ID from session

  if (!tickets || tickets.length === 0) {
    return res.status(400).json({ error: 'No tickets provided.' });
  }

  try {
    // Insert tickets into the database
    const insertTicket = db.prepare(`
      INSERT INTO tickets (user_id, train_id, departure_time, arrival_time, seat_number, qr_code, price)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    tickets.forEach(async (ticket) => {
      // Generate QR code for each ticket
      const qrCodeData = await QRCode.toDataURL(JSON.stringify({
        userId,
        trainId: ticket.trainId,
        seatNumber: ticket.seatNumber,
        departureTime: ticket.departureTime,
        arrivalTime: ticket.arrivalTime,
      }));

      // Insert ticket into database
      insertTicket.run(
        userId, 
        ticket.trainId, 
        ticket.departureTime, 
        ticket.arrivalTime, 
        ticket.seatNumber, 
        qrCodeData, 
        ticket.price
      );
    });

    insertTicket.finalize(); // Close the prepared statement
    res.status(201).json({ message: 'Tickets saved successfully!' });
  } catch (error) {
    console.error('Error saving tickets:', error.message);
    res.status(500).json({ error: 'Failed to save tickets.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
