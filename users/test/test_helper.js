const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before(done => {
	mongoose.connect('mongodb://localhost/users_test'); // users_test is a db.
	mongoose.connection
		// .once('open', () => console.log('Good to go!'))
		.once('open', () => {
			done();
		})
		.on('error', error => {
			// .once() and .on() are event handlers.
			console.warn('Warning', error);
		});
});

beforeEach(done => {
	// empty db before running each test.
	// mongoose.connection.collections.users.drop(() => {
	// 	// drop all the records.
	// 	done(); // ready to run the next test.
	// });
	const { users, comments, blogposts } = mongoose.connection.collections;
	users.drop(() => {
		comments.drop(() => {
			// must be all-lowerCase, so blogPosts won't work here!
			blogposts.drop(() => {
				done();
			});
		});
	});
});
