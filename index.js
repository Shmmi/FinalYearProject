
import express from "express";
import cors from "cors";
import session from 'express-session';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



// Creating a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'moviemate'
});

// Connecting to the MySQL server
connection.connect(function(err) {
  if (err) {
    throw err;
  } else {
    console.log('Connected to the MySQL server.');
  }
});

// Setting the port for the server to listen on
const PORT = process.env.PORT || 3001;
const app = express();

// Using the cors middleware to allow cross-origin requests
app.use(cors());

// Using the express-session middleware to enable session management
app.use(session({
  secret: 'your secret here',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

// Using the express.json() middleware to parse JSON request bodies
app.use(express.json());

// Creating a route that generates and returns a token for the user when they sign in
app.post('/signin', (req, res) => {
  // Getting the email and password from the request body
  const email = req.body.email;
  const password = req.body.password;
  // Finding the user by email from the database
  User.findOne({ email: email })
    .then((user) => {
      // Checking if the user exists
      if (user) {
        // Comparing the password with the hashed password in the database
        bcrypt.compare(password, user.password, (error, result) => {
          // Checking if the password matches
          if (result) {
            // Generating a token for the user with jsonwebtoken
            const token = jwt.sign(
              { id: user._id },
              process.env.JWT_SECRET,
              { expiresIn: '1h' } // Setting an expiration time for the token
            );
            // Sending a success response with the user data and token
            res.status(200).json({
              message: 'User signed in successfully',
              data: user,
              token: token,
            });
          } else {
            // Sending an unauthorized response with a message
            res.status(401).json({
              message: 'Invalid password',
            });
          }
        });
      } else {
        // Sending a not found response with a message
        res.status(404).json({
          message: 'User not found',
        });
      }
    })
    .catch((error) => {
      // Sending an error response with the error message
      res.status(500).json({
        message: 'Something went wrong',
        error: error,
      });
    });
});

// Starting the server and listening on the specified port
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// Defining a GET route for the /api endpoint that returns a JSON response
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Defining a POST route for the /signup endpoint that handles user registration
app.post('/signup', (req, res) => {
  // Getting the user data from the request body
  const { username, email, password } = req.body;

  // Validating the user data
  if (!username || !email || !password) {
    // Sending an error response if any of the fields are missing
    res.status(400).json({ error: 'Missing username, email, or password' });
    return;
  }

  // Hashing the password before storing it in the database
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Inserting the user data into the database
  connection.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword],
    (error, results) => {
      if (error) {
        // Handling errors
        res.status(500).json({ error });
      } else {
        // Sending a success response
        res.json({ message: 'User created successfully' });
      }
    }
  );
});

// Defining a POST route for the /login endpoint that handles user authentication
app.post('/login', (req, res) => {
  // Getting the user data from the request body
  const { email, password } = req.body;

  // Checking if a user with the given email address exists in the database
  connection.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (error, results) => {
      if (error) {
        // Handling errors
        res.status(500).json({ error });
      } else if (results.length === 0) {
        // No user with the given email address was found
        res.status(401).json({ error: 'Invalid email or password' });
      } else {
        // A user with the given email address was found
        const user = results[0];

        // Checking if the given password matches the hashed password in the database
        if (bcrypt.compareSync(password, user.password)) {
          // Password is correct

          // Creating a session for the user and sending a success response
          req.session.user = user; // Setting a session variable for the logged-in user

          res.json({ message: 'Login successful', user });
        } else {
          // Password is incorrect
          res.status(401).json({ error: 'Invalid email or password' });
        }
      }
    }
  );
});

// Defining a POST route for handling review submissions
app.post('/reviews', (req, res) => {
    const { movieId, text, rating } = req.body;
    
    if (!movieId || !text || !rating) {
        return res.status(400).json({ error: 'Invalid review data' });
    }

    if (!req.session.user) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    connection.query(
        'INSERT INTO reviews (movie_id, user_id, text, rating) VALUES (?, ?, ?, ?)',
        [movieId, req.session.user.id, text, rating],
        (error) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'An error occurred while submitting your review' });
            } else {
                res.sendStatus(204);
            }
        }
    );
});
// Creating a route that returns the user data based on the user ID
app.get('/user/:id', (req, res) => {
  // Getting the user ID from the request parameter
  const userId = req.params.id;
  // Verifying the user ID
  if (userId) {
    // Finding the user data from the database
    User.findById(userId)
      .then((user) => {
        // Sending a success response with the user data
        res.status(200).json({
          message: 'User data fetched successfully',
          data: user,
        });
      })
      .catch((error) => {
        // Sending an error response with the error message
        res.status(500).json({
          message: 'Something went wrong',
          error: error,
        });
      });
  } else {
    // Sending a bad request response with a message
    res.status(400).json({
      message: 'User ID is missing',
    });
  }
});

/*
import express from "express";
import cors from "cors";
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Importing jsonwebtoken library
import dotenv from 'dotenv'; // Importing dotenv library

dotenv.config(); // Loading environment variables from .env file

const connection = mysql.createConnection({
  host: process.env.DB_HOST, // Using environment variable for database host
  user: process.env.DB_USER, // Using environment variable for database user
  password: process.env.DB_PASSWORD, // Using environment variable for database password
  database: process.env.DB_NAME, // Using environment variable for database name
});

connection.connect(function(err) {
  if (err) {
    throw err;
  } else {
    console.log('Connected to the MySQL server.');
  }
});

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post('/signup', async (req, res) => { // Using async/await syntax
  try { // Using try/catch block to handle errors and rejections
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ error: 'Missing username, email, or password' });
      return;
    }
    const hashedPassword = bcrypt.hashSync(password, 10);

    connection.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword],
      (error, results) => {
        if (error) {
          res.status(500).json({ error });
        } else {
          // Generating a token for the user using jsonwebtoken library
          const token = jwt.sign({ id: results.insertId }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.json({ message: 'User created successfully', token });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while signing up' });
  }
});

app.post('/login', async (req, res) => { // Using async/await syntax
  try { // Using try/catch block to handle errors and rejections
    const { email, password } = req.body;

    connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      (error, results) => {
        if (error) {
          res.status(500).json({ error });
        } else if (results.length === 0) {
          res.status(401).json({ error: 'Invalid email or password' });
        } else {
          const user = results[0];

          if (bcrypt.compareSync(password, user.password)) {
            // Generating a token for the user using jsonwebtoken library
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ message: 'Login successful', token });
          } else {
            res.status(401).json({ error: 'Invalid email or password' });
          }
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
});

app.post('/reviews', async (req, res) => { // Using async/await syntax
  try { // Using try/catch block to handle errors and rejections
    const { movieId, text, rating } = req.body;

    if (!movieId || !text || !rating) {
      return res.status(400).json({ error: 'Invalid review data' });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    connection.query(
      'INSERT INTO reviews (movie_id, user_id, text, rating) VALUES (?, ?, ?, ?)',
      [movieId, decoded.id, text, rating],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred while submitting your review' });
        } else {
          res.sendStatus(204);
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while submitting your review' });
  }
});

*/

