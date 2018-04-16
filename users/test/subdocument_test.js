const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
	it('can create a subdoc.', (done) => {
		const brad = new User({
      name: 'Brad',
      posts: [{ title: 'postTitle'}]
    });

    brad.save()
      .then(() => User.findOne({ name: 'Brad' }))
      .then((user) => {
        assert(user.posts[0].title === 'postTitle');
        done();
      });
	});

  it('create a new post and save it', (done) => {
    const brad = new User({
      name: 'Brad',
      posts: []
    });

    brad.save()
      .then(() => User.findOne({ name: 'Brad' }))
      .then((user) => {
        user.posts.push({ title: 'new post' });
        // user.save();
        return user.save();
      })
      .then(() => User.findOne({ name: 'Brad' }))
      .then((user) => {
        assert(user.posts[0].title === 'new post');
        done();
      });
  });

	it('can remove a subdoc.', (done) => {
    const brad = new User({
      name: 'Brad',
      posts: [{ title: 'new title' }]
    });

    brad.save()
      .then(() => User.findOne({ name: 'Brad' }))
			.then((user) => {
        // user.posts[0].remove();
				const post = user.posts[0];
				post.remove();
				return user.save();
      })
			.then(() => User.findOne({ name: 'Brad' }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
	});

});
