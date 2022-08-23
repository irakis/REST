const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials)
});
  
router.route('/testimonials/random').get((req, res) => {
  const randomId = Math.round( Math.random () + 1 );
  const randomTestimonial = db.testimonials.find((singleDb) => singleDb.id == randomId);
  res.json(randomTestimonial);
});

router.route('/testimonials/:id/').get((req, res) => {
  const id = req.params.id;
  const testimonialId = db.testimonials.find((singleDb) => singleDb.id == id);
  if (!testimonialId) {
    res.send('There is no ID in the database...')
  } else {
    res.json(testimonialId);
  }
});
  
router.route('/testimonials/:id').put(( req,res ) => {
  const { author, text } = req.body;
  const editId = db.testimonials.find(singleId => singleId.id == req.params.id);
  if(editId){
    db.testimonials[(req.params.id - 1)].author = req.body.author;
    db.testimonials[(req.params.id - 1)].text = req.body.text;

    res.json({message: 'OK'})
  }
})

router.route('/testimonials/:id').post(( req, res ) => {
  const { author, text } = req.body;
  const newId = db.testimonials.find(singleId => singleId.id == req.params.id);
  if(!newId){
    db.testimonials.push({ id: req.params.id, author: req.body.author, text: req.body.text})
    res.json({message: 'OK'})
  } else {
    res.json({message: 'id is taken.'})
  }
})
  
router.route('/testimonials/:id').delete(( req, res ) => {
  db.testimonials.splice(req.params.id - 1);
  res.json({message: 'OK'})
})

module.exports = router;