require('dotenv').config();
const connect = require('./lib/connect');
const mongoose = require('mongoose');

connect();

const Animal = require('./lib/models/animals');

Animal.create({
  species: 'elephant',
  appearances: {
    pattern: 'monochrome',
    mainColor: 'grey'
  },
  numberOfEyes: 2,
  hasTail: true,
  continents: ['asia', 'africa']
})
  .then(createdAnimal => {
    console.log(createdAnimal);
  })
  .then(() => {
    mongoose.disconnect();
  });

// Animal.findByIdAndUpdate(
//   '5d88fb5000f58acb5b2f238a',
//   { lives: 8 },
//   { new: true }  
// )
//   .then(animals => {
//     console.log(animals);
//   })
//   .then(() => {
//     mongoose.disconnect();
//   });