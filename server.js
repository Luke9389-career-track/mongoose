require('dotenv').config();
require('./lib/connect')();
const express = require('express');
const app = express();
const Animal = require('./lib/models/animals');

app.use(express.json());

app.get('/api/animals', (req, res, next) => {
  Animal.find()
    .then(animals => {
      res.json(animals);
    })
    .catch(next);
});

app.get('/api/animals/:id', (req, res, next) => {
  Animal.findById(req.params.id)
    .then(animal => {
      res.json(animal);
    })
    .catch(next); 
});

app.post('/api/animals', (req, res, next) => {
  Animal.create(req.body)
    .then(animal => {
      res.json(animal);
    })
    .catch(next);
});

app.put('/api/animals/:id', (req, res, next) => {
  Animal.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
    .then(animal => {
      res.json(animal);
    })
    .catch(next);
});

app.delete('/api/animals/:id', (req, res, next) => {
  Animal.findByIdAndRemove(req.params.id)
    .then(removed => {
      res.json(removed);
    })
    .catch(next);
});

app.listen(3000, () => console.log('server running on 3000'));