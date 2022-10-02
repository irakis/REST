const express = require('express');
const router = express.Router();

const SeatController = require('../controllers/seat.controller');

router.get('/seats', SeatController.getAll);
  
router.get('/seats/random', SeatController.getRandom);
  
router.get('/seats/:id/', SeatController.getSingle);
  
router.put('/seats/:id', SeatController.editSingle);
  
router.post('/seats', SeatController.postSingle);

router.delete('/seats/:id', SeatController.deleteSingle);

module.exports = router;