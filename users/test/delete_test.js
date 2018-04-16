const assert = require('assert');
const User = require('../src/user');

describe('Deleting records', () => {
  let brad;

  beforeEach((done) => {
    brad = new User({ name: 'Brad' });

    // save a instance to db.
    brad.save()
      .then(() => done());
  });

	it('model instance remove a user', (done) => {
    brad.remove() // Promise #1
      .then(() => User.findOne({ name: 'Brad' })) // Promise #2
      .then((user) => {
        assert(user === null);
        done();
      });
	});

  it('class method remove users', (done) => {
    User.remove({ name: 'Brad' }) // Promise #1
      .then(() => User.findOne({ name: 'Brad' })) // Promise #2
      .then((user) => {
        assert(user === null);
        done();
      });
	});

  it('class method findOneAndRemove a user', (done) => {
    User.findOneAndRemove({ name: 'Brad' }) // Promise #1
      .then(() => User.findOne({ name: 'Brad' })) // Promise #2
      .then((user) => {
        assert(user === null);
        done();
      });
	});

  it('class method findByIdAndRemove a user', (done) => {
    User.findByIdAndRemove(brad._id) // Promise #1
      .then(() => User.findOne({ name: 'Brad' })) // Promise #2
      .then((user) => {
        assert(user === null);
        done();
      });
	});

});
