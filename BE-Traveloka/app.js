const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const flightRoutes = require('./routes/flightRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const airfieldRoutes = require('./routes/airfieldRoutes');
const airlineRoutes = require('./routes/airlineRoutes');

const app = express();

// 1) MIDDLEWARES
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// 3) ROUTES
app.use('/api/users', userRoutes);
app.use('/api/flight', flightRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/airfield', airfieldRoutes);
app.use('/api/airline', airlineRoutes);
module.exports = app;