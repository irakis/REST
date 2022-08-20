const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts)
  });
  
router.route('/concerts/random').get((req, res) => {
  const randomId = Math.floor(Math.random() * (db.concerts.length - 1)) + 1;
  const randomConcert = db.concerts.find((singleDb) => singleDb.id == randomId);
  res.json(randomConcert);
});
  
router.route('/concerts/:id/').get((req, res) => {
  const id = req.params.id;
  const concertId = db.concerts.find((singleDb) => singleDb.id == id);
  if (!concertId) {
    res.send('There is no ID in the database...')
  } else {
    res.json(concertId);
  }
});
  
router.route('/concerts/:id').put(( req,res ) => {
  const { performer, genere, price, day } = req.body;
  const editId = db.concerts.find(singleId => singleId.id == req.params.id);
  if(editId){
    db.concerts[(req.params.id - 1)].performer = req.body.performer;
    db.concerts[(req.params.id - 1)].genere = req.body.genere;
    db.concerts[(req.params.id - 1)].price = req.body.price;
    db.concerts[(req.params.id - 1)].day = req.body.day;
    res.json({message: 'OK'})
  }
})
  
router.route('/concerts/:id').post(( req, res ) => {
  const { performer, genere, price, day } = req.body;
  const newId = db.concerts.find(singleId => singleId.id == req.params.id);
  if(!newId){
    db.concerts.push({ id: req.params.id, performer: req.body.performer, genere: req.body.genere,
      price: req.body.price, day: req.body.day})
    res.json({message: 'OK'})
  } else {
    res.json({message: 'id is taken.'})
  }
})
  
router.route('/concerts/:id').delete(( req, res ) => {
  db.concerts.splice(req.params.id - 1);
  res.json({message: 'OK'})
})

module.exports = router;