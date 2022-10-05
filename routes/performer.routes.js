const express = require('express');
const router = express.Router();

const PerformerController = require('../controllers/performer.controller');

router.get('/concerts/performer/:performer', PerformerController.getSingle);
  
router.get('/concerts/genre/:genre', PerformerController.getSingleGenre);
  
router.get('/concerts/price/pricemin/:price_min/picemax/:price_max', PerformerController.getByPriceRange);

router.get('/concerts/price/:price/day/:day', PerformerController.getSingleByPriceDay);

router.get('/concerts/day/:day', PerformerController.getSingleByDay);

module.exports = router;