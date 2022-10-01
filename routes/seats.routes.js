const express = require('express');
const router = express.Router();

<<<<<<< HEAD
router.route('/seats').get((req, res) => {
  res.json(db.seats)
});

router.route('/seats/random').get((req, res) => {
  const randomId = Math.floor(Math.random() * (db.seats.length - 1)) + 1;
  const randomSeat = db.seats.find((singleDb) => singleDb.id == randomId);
  res.json(randomSeat);
});

router.route('/seats/:id/').get((req, res) => {
  const id = req.params.id;
  const seatId = db.seats.find((singleDb) => singleDb.id == id);
  if (!seatId) {
    res.send('There is no ID in the database...')
  } else {
    res.json(seatId);
  }
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  const editId = db.seats.find(singleId => singleId.id == req.params.id);
  if (editId) {
    db.seats[(req.params.id - 1)].day = req.body.day;
    db.seats[(req.params.id - 1)].seat = req.body.seat;
    db.seats[(req.params.id - 1)].client = req.body.client;
    db.seats[(req.params.id - 1)].email = req.body.email;
    res.json({ message: 'OK' })
  }
});

router.route('/seats/:id').post((req, res) => {
  const { client, day, email, seat, io } = req.body;

  const bookedSeat = db.seats.some(singleSeat => singleSeat.day == req.body.day && singleSeat.seat === req.body.seat);
  if (bookedSeat) {
    res.status(409).json({ error: 'The slot is already taken...' })
  } else {
    const nextId = uuidv4();

    db.seats.push({
      id: nextId, day: req.body.day, seat: req.body.seat,
      client: req.body.client, email: req.body.email
    })
    req.io.emit('seatsUpdated', db.seats)
    res.status(201).json({ message: 'OK' })
  };
});

router.route('/seats/:id').delete((req, res) => {
  db.seats.splice(req.params.id - 1);
  res.status(204).json({ message: 'OK' })
})
=======
const SeatController = require('../controllers/seat.controller');

router.get('/seats', SeatController.getAll);
  
router.get('/seats/random', SeatController.getRandom);
  
router.get('/seats/:id/', SeatController.getSingle);
  
router.put('/seats/:id', SeatController.editSingle);
  
router.post('/seats', SeatController.postSingle);

router.delete('/seats/:id', SeatController.deleteSingle);
>>>>>>> 1d87dc52db1876d6779ab6485088f5c3e33c517e

module.exports = router;