const app = require('../../app');
const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
	it('handles a POST request to /api/drivers to create a new driver', done => {
		Driver.count().then(count => {
			request(app)
				.post('/api/drivers')
				.send({ email: 'test@test.com' })
				.end(() => {
					// err, response
					// console.log(response);
					// assert(response.body.hi === 'Brad!');
					Driver.count().then(newCount => {
						assert(count + 1 === newCount);
						done();
					});
					// done();
				});
		});
	});

	it('handles a PUT request to edit a driver', done => {
		const driver = new Driver({ email: 't@t.com', driving: false });
		driver.save().then(() => {
			request(app)
				.put('/api/drivers/' + driver._id)
				.send({ driving: true })
				.end(() => {
					Driver.findOne({ email: 't@t.com' }).then(driver => {
						assert(driver.driving === true);
						done();
					});
				});
		});
	});

	it('handles a DELETE request to delete a driver', done => {
		const driver = new Driver({ email: 'te@te.com' });
		driver.save().then(() => {
			request(app)
				.delete(`/api/drivers/${driver._id}`)
				.end(() => {
					Driver.findOne({ email: 'te@te.com' }).then(driver => {
						assert(driver === null);
						done();
					});
				});
		});
	});

	it('GET a list of drivers near a location', done => {
		const seattleDriver = new Driver({
			email: 'seattle@test.com',
			geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] }
		});
		const miamiDriver = new Driver({
			email: 'miami@test.com',
			geometry: { type: 'Point', coordinates: [-80.2534507, 25.791581] }
		});

		Promise.all([seattleDriver.save(), miamiDriver.save()]).then(() => {
			request(app)
				.get('/api/drivers?lng=-80&lat=25')
				.end((err, response) => {
					// console.log(response);
					assert(response.body.length === 1);
					assert(response.body[0].email === 'miami@test.com');
					done();
				});
		});
	});
});
