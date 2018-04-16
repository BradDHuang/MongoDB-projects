const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  it('requires a user name', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    // console.log(validationResult);
    // const message = validationResult.errors.name.message;
    const {message} = validationResult.errors.name; // ES6

    assert(message === 'Name required!');
  });

  it('requires a user name length no less than 3 characters', () => {
    const user = new User({ name: 'Al' });
    const validationResult = user.validateSync();
    const {message} = validationResult.errors.name; // ES6

    assert(message === 'Name must be no less than 3 characters.');
  });

  it('disallows invalid records from being saved.', (done) => {
    const user = new User({ name: 'Al' });
    user.save()
      .catch((validationResult) => {
        const {message} = validationResult.errors.name;

        assert(message === 'Name must be no less than 3 characters.');
        done();
      });
  });

});
