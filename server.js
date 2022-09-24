const express = require('express')
const cors = require('cors')
const db = require('./db');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const path = require('path');
const socket = require('socket.io');

const app = express();

const server = app.listen(process.env.PORT || 8080, () => {
  console.log('Server is running on port: 8080');
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  req.io = io;
  next();
});


app.use('/api', testimonialsRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatsRoutes)

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket!')
})

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(400).send('404 not found...');
});




