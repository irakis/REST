const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonial.controller');

router.get('/testimonials', TestimonialController.getAll);
  
router.get('/testimonials/random', TestimonialController.getRandom);

router.get('/testimonials/:id/', TestimonialController.getSingle);
  
router.put('/testimonials/:id', TestimonialController.editSingle);

router.post('/testimonials', TestimonialController.postSingle);
  
router.delete('/testimonials/:id', TestimonialController.deleteSingle)

module.exports = router;