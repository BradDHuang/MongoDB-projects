const Driver = require('../models/driver');

module.exports = {
	greeting(req, res) {
		res.send({ hi: 'Brad!' });
	},
	// greeting: function(req, res){}
	index(req, res, next) {
		const { lng, lat } = req.query;
		// 'http://google.com?lng=80&lat=20'
		// lng=80&lat=20 is the query.
		// Driver.geoNear(
		// geoNear() has been removed from newer versions of mocha.
		Driver.aggregate([
			{
				$geoNear: {
					near: {
						type: 'Point',
						coordinates: [parseFloat(lng), parseFloat(lat)]
					},
					spherical: true,
					distanceField: 'dist',
					maxDistance: 200000
				}
			}
		])
			.then(drivers => res.send(drivers))
			.catch(next);
	},

	create(req, res, next) {
		// console.log(req.body);
		// res.send({ hi: 'Brad!' });
		const driverProps = req.body;
		Driver.create(driverProps)
			.then(driver => res.send(driver))
			.catch(next);
	},

	edit(req, res, next) {
		const driverId = req.params.id;
		const driverProps = req.body;
		Driver.findByIdAndUpdate({ _id: driverId }, driverProps)
			.then(() => Driver.findById({ _id: driverId }))
			.then(driver => res.send(driver))
			.catch(next);
	},

	delete(req, res, next) {
		const driverId = req.params.id;
		Driver.findByIdAndRemove({ _id: driverId })
			.then(driver => res.status(204).send(driver))
			.catch(next);
	}
};
