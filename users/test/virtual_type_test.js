const assert = require('assert');
const User = require('../src/user');

describe('virtual types', () => {
	it('postCount: return # of posts', (done) => {
    const brad = new User({
      name: 'Brad',
      posts: [{ title: 'postTitle'}]
    });

    brad.save()
      .then(() => User.findOne({ name: 'Brad' }))
      .then((user) => {
        assert(user.postCount === 1);
        done();
      });
  });
});
