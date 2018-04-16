const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
	it('saves a user', (done) => {
		// assert(1 + 1 === 3); // false
		const brad = new User({ name: 'Brad' });

    // save a instance to db.
    brad.save()
      .then(() => {
        // using .isNew flag(true / false)
        // saved?
        assert(!brad.isNew); // isNew(true) means not saved.
        done();
      });
	});
});
