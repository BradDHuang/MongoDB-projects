const assert = require('assert');
const User = require('../src/user');

describe('Reading records', () => {
  let brad, ross, chris, ben;

  beforeEach((done) => {
    brad = new User({ name: 'Brad' });
    ross = new User({ name: 'Ross' });
    chris = new User({ name: 'Chris' });
    ben = new User({ name: 'Ben' });

    // save a instance to db.
    // brad.save()
    Promise.all([brad.save(), ben.save(), ross.save(), chris.save()])
      .then(() => done());
  });

	it('reads all users with name Brad', (done) => {
		User.find({ name: 'Brad' })
      .then((users) => {
        // console.log(users);
        // assert(users[0]._id === brad._id); // not working!
        assert(users[0]._id.toString() === brad._id.toString());
        done();
      });
	});

  it('reads a user with a particular id', (done) => {
		User.findOne({ _id: brad._id })
      .then((user) => {
        assert(user.name === 'Brad');
        done();
      });
	});

  it('skip() / limit(), sort() test', (done) => {
    User.find({})
      .sort({ name: 1 }) // ascending order.
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === 'Brad');
        assert(users[1].name === 'Chris');
        done();
      });
  });

});
