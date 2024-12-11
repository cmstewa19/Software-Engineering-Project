require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const QRCode = require('qrcode');
const Stripe = require('stripe');
const session = require('express-session');
const db = require('./database');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'Lax',
      maxAge: 3600000,
    },
  })
);

// Stripe endpoint
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

    console.log('Payment Intent created:', paymentIntent.id);
    console.log('Client Secret:', paymentIntent.client_secret);

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

// QR endpoint
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



// Users Table Endpoints

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  db.get('SELECT * FROM Users WHERE email = ?', [email], (err, row) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!row) {
      return res.status(401).json({ error: 'Email not found. Sign up below.' });
    }

    if (row.password !== password) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    // Set session data after successful login
    req.session.user = { user_id: row.user_id, email: row.email };

    // save session
    req.session.save((err) => {
      if (err) {
        console.error('Error saving session:', err);
      } 
    });

    res.status(200).json({ message: 'Login successful!', user: { user_id: row.user_id, email: row.email } });
  });
});

// Signup endpoint
app.post('/api/signup', (req, res) => {
  const { firstName, lastName, phoneNumber, email, password } = req.body;

  if (!firstName || !lastName || !phoneNumber || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  db.get('SELECT * FROM Users WHERE email = ?', [email], (err, row) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: 'Database error.' });
    }
    if (row) {
      return res.status(400).json({ error: 'Email already in use.' });
    }

    db.run(
      `INSERT INTO Users (email, password, first_name, last_name, phone_number, created_at, updated_at)
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

// // Change password endpoint
// app.post('/api/change-password', (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: 'Email and password are required.' });
//   }

//   db.get('SELECT * FROM Users WHERE email = ?', [email], (err, row) => {
//     if (err) {
//       console.error('Database Error:', err);
//       return res.status(500).json({ error: 'Database error.' });
//     }
//     if (!row) {
//       return res.status(400).json({ error: 'Invalid email.' });
//     }

//     db.run('UPDATE Users SET password = ?, updated_at = datetime("now") WHERE email = ?', [password, email], (err) => {
//       if (err) {
//         console.error('Database Error:', err);
//         return res.status(500).json({ error: 'Failed to update password.' });
//       }
//       res.status(200).json({ message: 'Password changed successfully!' });
//     });
//   });
// });

// Display user info endpoint (for profile page)
app.get('/api/profile', (req, res) => {
  if (!req.session || !req.session.user || !req.session.user.user_id) {
    //console.log('Session: ', req.session)
    //console.log('Session.user: ', req.session.user)
    //console.log('Session.user.user_id: ', req.session.user.user_id)
    return res.status(401).json({ error: 'Unauthorized. Please log in.' });
  }

  //console.log('Assigning user:', req.session.user.user_id)
  const user_id = req.session.user.user_id;

  db.get(
    'SELECT email, first_name, last_name, phone_number, billing_address FROM Users WHERE user_id = ?',
    [user_id],
    (err, row) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ error: 'Database error.' });
      }
      if (!row) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.status(200).json(row);
    }
  );
});


// Tickets Table Endpoints
app.post('/api/purchase-ticket', (req, res) => {
  // Check if the user is logged in and the session exists
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  // Extract the user_id from the session
  const user_id = req.session.user.user_id;

  if (!req.body || !Array.isArray(req.body.tickets)) {
    return res.status(400).json({ error: 'Request body or tickets array is missing.' });
  }

  // Log the received data
  //console.log('Received ticket purchase data:', req.body.tickets);

  // Iterate over each ticket in the array
  req.body.tickets.forEach(ticket => {
    const { trainCode, origin, destination, departureTime, arrivalTime, seatNumber, qrCode, price } = ticket;

    // Validate the received data for each ticket
    if (!trainCode || !origin || !destination || !departureTime || !arrivalTime || !price) {
      console.log('Invalid ticket data:', ticket);
      return res.status(400).json({ error: 'Missing required fields in ticket data.' });
    }

    // Insert the ticket details into the database
    db.run(
      `INSERT INTO Tickets (user_id, train_id, origin, destination, departure_time, arrival_time, seat_number, qr_code, price)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [user_id, trainCode, origin, destination, departureTime, arrivalTime, seatNumber, qrCode, price],
      (err) => {
        if (err) {
          console.error('Database Error:', err);
          return res.status(500).json({ error: 'Failed to purchase ticket.' });
        }
        //console.log('Ticket saved:', ticket);
      }
    );
  });

  res.status(201).json({ message: 'Tickets purchased successfully!' });
});

app.get('/api/my-tickets', (req, res) => {
  // Check if the user is logged in and the session exists
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  // Extract the user_id from the session
  const user_id = req.session.user.user_id;

  db.all('SELECT * FROM Tickets WHERE user_id = ?', [user_id], (err, rows) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: 'Database error.' });
    }

    console.log("Rows: ", rows)
    // Return the user's tickets
    res.status(200).json(rows);
  });
});


// endpoint to test session. just for testing purposes, not used in application.
app.get('/api/test-session', (req, res) => {
  //console.log(req.session); // Check if user info is in session
  res.status(200).json({ user: req.session.user });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
