const express = require('express')
const cors = require('cors')
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertRoutes = require('./routes/concerts.routes');
const workshopsRoutes = require('./routes/workshops.routes');
const seatsRoutes = require('./routes/seats.routes');
const performerRoutes = require('./routes/performer.routes');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', testimonialsRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatsRoutes);
app.use('/api', performerRoutes);
app.use('/api', workshopsRoutes);

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket!');
  socket.on('seatsUpdated', () => {
    console.log('SERVER seatsUpdated noticed!!'); 
  })
});

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(400).send('404 not found...');
});

//connect backend to the database

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if (NODE_ENV === 'production') {
  dbUri = 'mongodb+srv://admin:admin@cluster0.nr5hjqa.mongodb.net/NewWaveDB?retryWrites=true&w=majority';
} else if (NODE_ENV === 'test') {
  dbUri = 'mongodb://localhost:27017/NewWaveDBtest';
} else {
  dbUri = 'mongodb://localhost:27017/NewWaveDB';
}

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to the database')
})
db.on('error', err => console.log('Error' + err));

module.exports = server;