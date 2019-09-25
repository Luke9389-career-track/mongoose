const request = require('../request');
const db = require('../db');

describe('animals api', () => {

  beforeEach(() => {
    return db.dropCollection('animals');
  });

  const elephant = {
    species: 'elephant',
    appearances: {
      pattern: 'monochrome',
      mainColor: 'grey'
    },
    numberOfEyes: 2,
    hasTail: true,
    continents: ['asia', 'africa']
  };

  function postAnimal(animal) {
    return request
      .post('/api/animals')
      .send(animal)
      .expect(200)
      .then(({ body }) => body);
  }

  it('post an animal', () => {
    return postAnimal(elephant)
      .then(animal => {
        expect(animal).toEqual({
          _id: expect.any(String),
          __v: 0,
          ...elephant
        });
      });
  });

  it('get an animal by id', () => {
    return postAnimal(elephant)
      .then(animal => {
        return request.get(`/api/animals/${animal._id}`)
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual(animal);
          });
      });
  });

  it('gets a list of animals', () => {
    return Promise.all([
      postAnimal({ species: 'elephant', appearances: { mainColor: 'blue' }, numberOfEyes: 2 }),
      postAnimal({ species: 'tiger', appearances: { mainColor: 'blue' }, numberOfEyes: 2 }),
      postAnimal({ species: 'hippo', appearances: { mainColor: 'blue' }, numberOfEyes: 2 }),
    ])
      .then(() => {
        return request
          .get('/api/animals')
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(3);
      });
  });

  it('updates an animal', () => {
    return postAnimal(elephant)
      .then(animal => {
        animal.numberOfEyes = 3;
        return request
          .put(`/api/animals/${animal._id}`)
          .send(animal)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.numberOfEyes).toBe(3);
      });
  });

  it('deletes an animal', () => {
    return postAnimal(elephant)
      .then(animal => {
        return request
          .delete(`/api/animals/${animal._id}`)
          .expect(200);
      });
  });

});