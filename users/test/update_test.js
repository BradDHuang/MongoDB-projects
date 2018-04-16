const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let brad;

  beforeEach((done) => {
    // brad = new User({ name: 'Brad' });
    // brad = new User({ name: 'Brad', postCount: 0 });
    brad = new User({ name: 'Brad', likes: 0 });

    // save a instance to db.
    brad.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({})) // Promise #2, find all.
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Jack' );
        done();
      });
  }

	it('model instance update a user: set & save', (done) => {
    brad.set( 'name', 'Jack' );
    // brad.save() // Promise #1
    assertName(brad.save(), done); // Promise #1
	});

  it('model instance update a user', (done) => {
    assertName(brad.update({ name: 'Jack' }), done); // Promise #1
	});

  it('model class update', (done) => {
    assertName(
      User.update({ name: 'Brad' }, { name: 'Jack'}),
      done
    ); // Promise #1
	});

  it('model class findOneAndUpdate', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Brad' }, { name: 'Jack'}),
      done
    ); // Promise #1
	});

  it('model class findByIdAndUpdate', (done) => {
    assertName(
      User.findByIdAndUpdate(brad._id, { name: 'Jack'}),
      done
    ); // Promise #1
	});

// use xit() to make a test pending.
  it('inc postCount by 1', (done) => {
    User.update({ name: 'Brad' }, { $inc: { likes: 10 } })
      .then(() => User.findOne({ name: 'Brad' }))
      .then((user) => {
        assert(user.likes === 10);
        done();
      });
  });

});
