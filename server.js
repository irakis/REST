const express = require('express')
const cors = require('cors')

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.get('/favicon.ico', (req, res) => {
  res.status(204);
  res.end();
});

app.get('/testimonials', (req, res) => {
  res.json(db)
});

app.get('/testimonials/random', (req, res) => {
  const randomId = Math.round(Math.random()+1);
  const randomTestimonial = db.find((singleDb) => singleDb.id == randomId);
  res.json(randomTestimonial);
});

app.get('/testimonials/:id/', (req, res) => {
  const id = req.params.id;
  const testimonialId = db.find((singleDb) => singleDb.id == id);
  if (!testimonialId) {
    res.send('There is no ID in the database...')
  } else {
    res.json(testimonialId);
  }
});

app.put('/testimonials/:id', ( req,res ) => {
  const { author, text } = req.body;
  const editId = db.find(singleId => singleId.id == req.params.id);
  if(editId){
    db[(req.params.id - 1)].author = req.body.author;
    db[(req.params.id - 1)].text = req.body.text;

    res.json({message: 'OK'})
  }
})

app.post('/testimonials/:id', ( req, res ) => {
  const { author, text } = req.body;
  const newId = db.find(singleId => singleId.id == req.params.id);
  if(!newId){
    db.push({ id: req.params.id, author: req.body.author, text: req.body.text})
    res.json({message: 'OK'})
  } else {
    res.json({message: 'id is taken.'})
  }
})

app.delete('/testimonials/:id', ( req, res ) => {
  db.splice(req.params.id - 1);
  res.json({message: 'OK'})
})

app.use((req, res) => {
  res.status(400).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});