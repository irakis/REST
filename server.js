const express = require('express')
const cors = require('cors')
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');

const app = express();

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

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

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

<<<<<<< HEAD
app.listen(process.env.PORT || 8000 , () => {
  console.log('Server is running on port: 8000');
});
=======
mongoose.connect('mongodb+srv://admin:admin@cluster0.nr5hjqa.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: false, useUnifiedTopology: true })
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to the database')
})
db.on('error', err => console.log('Error' + err));
>>>>>>> ec0558cd320fcb5b3d4ee8126fe3bcc37fe727c6
