const express = require('express');
const router = express.Router();

const PerformerController = require('../controllers/performer.controller');

router.get('/concerts/performer/:performer', PerformerController.getSingle);
  
router.get('/concerts/genre/:genre', PerformerController.getSingleGenre);
  
router.get('/concerts/price/:price_min/:price_max', PerformerController.getByPriceRange);

router.get('/concerts/price/:price/day/:day', PerformerController.getSingleByPriceDay);

module.exports = router;