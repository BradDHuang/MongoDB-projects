const DriversController = require('../controllers/drivers_controller');

module.exports = app => {
	// route handler
	// http://localhost:3050/api
	// app.get('/api', (req, res) => {
	// 	res.send({ hi: 'Brad!' });
	// });
	app.get('/api', DriversController.greeting);

	app.post('/api/drivers', DriversController.create);
	// http://localhost:3050/api/drivers
	app.put('/api/drivers/:id', DriversController.edit);
	app.delete('/api/drivers/:id', DriversController.delete);

	app.get('/api/drivers', DriversController.index);
};
