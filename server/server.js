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
app.use(cors());
app.use(express.json());

// Session middleware setup
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Use environment variable for production
    resave: false,  // Don't save session if it hasn't been modified
    saveUninitialized: false, // Don't create session until something is stored
    cookie: {
      secure: false, // Set to true if you're using HTTPS in production
      httpOnly: true, // Helps protect against XSS attacks
      maxAge: 3600000, // 1 hour expiration
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

    // Set session data (creates a session for the user)
    req.session.user = { userid: row.userid, email: row.email };

    // Log session data to confirm it's set
    console.log('Session Data:', req.session);

    res.status(200).json({ message: 'Login successful!' });
  });
});
  

  
// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
