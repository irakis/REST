const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concert.controller');

router.get('/concerts', ConcertController.getAll);
  
router.get('/concerts/random', ConcertController.getRandom);
  
router.get('/concerts/:id/', ConcertController.getSingle);

router.put('/concerts/:id', ConcertController.editSingle);
  
router.post('/concerts', ConcertController.postSingle);
  
router.delete('/concerts/:id', ConcertController.deleteSingle);

module.exports = router;