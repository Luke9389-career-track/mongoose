const Animal = require('../animals');
// const mongoose = require('mongoose');

describe('Animal model', () => {
  it('valid model all properties', () => {
    const data = {
      species: 'elephant',
      appearances: {
        pattern: 'monochrome',
        mainColor: 'grey'
      },
      numberOfEyes: 2,
      hasTail: true,
      continents: ['asia', 'africa']
    };

    const animal = new Animal(data);
    const errors = animal.validateSync();
    console.log(errors);
    expect(errors).toBeUndefined();

    const json = animal.toJSON();

    expect(json).toEqual({
      ...data,
      _id: expect.any(Object),
    });
  });

  it('validates required properties', () => {
    const data = {};
    const animal = new Animal(data);
    const { errors } = animal.validateSync();
    expect(errors.species.kind).toBe('required');
    expect(errors.numberOfEyes.kind).toBe('required');
    expect(errors['appearances.mainColor'].kind).toBe('required');
  });

  it('populates default properties', () => {
    const data = {
      species: 'whale',
      appearances: {
        mainColor: 'blue-grey'
      },
      numberOfEyes: 2,
    };
    const whale = new Animal(data);
    const err = whale.validateSync();
    expect(err).toBeUndefined();

    expect(whale.hasTail).toBe(false);
  });

  it('enforces max and min number of eyes', () => {
    const data = {
      numberOfEyes: 100000000
    };
    const alien = new Animal(data);
    const { errors } = alien.validateSync();
    expect(errors.numberOfEyes.kind).toBe('max');
  });

  it('enforces max and min number of eyes', () => {
    const data = {
      numberOfEyes: -100000000
    };
    const alien = new Animal(data);
    const { errors } = alien.validateSync();
    expect(errors.numberOfEyes.kind).toBe('min');
  });

  it('enforces enum on continents', () => {
    const data = {
      continents: ['mars']
    };
    const alien = new Animal(data);
    const { errors } = alien.validateSync();
    expect(errors['continents.0'].kind).toBe('enum');
  });
  
});