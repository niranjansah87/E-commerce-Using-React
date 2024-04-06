const connectToMongoose = require('./config/db');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Connect to MongoDB
connectToMongoose();

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

// Apply CORS middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Available routes
app.use('/api/auth', require('./routes/auth'));
// app.use('/api/product', require('./routes/product'));

// Start the server
const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Error Handling for Uncaught Exceptions
// process.on('uncaughtException', (err) => {
//   console.log(`Uncaught Exception Error: ${err.message}`);
//   process.exit(1);
// });

// Error Handling for Unhandled Promise Rejection
// process.on('unhandledRejection', (err) => {
//   console.log(`Unhandled Promise Rejection Error: ${err.message}`);
//   server.close(() => {
//     process.exit(1);
//   });
// });
