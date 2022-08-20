const express = require('express')
const cors = require('cors')
const db = require('./db');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/api', testimonialsRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatsRoutes)


app.get('/favicon.ico', (req, res) => {
  res.status(204);
  res.end();
});

app.use((req, res) => {
  res.status(400).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});