const routes = require('express').Router();
const logger = require('../logger');
const causedb = require('../db/cause');
// const City = require('../controllers/cityController');
// const causeCat = require('../controllers/causeController');

// include all routes for city
routes.use('/city', require('./city'));
routes.use('/companyCause', require('./companyCause'))
routes.use('/', require('./companyCause'))


// landing page route
routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});


// get cause from database via query
routes.get('/causes', (req, res, next) => causedb.getCauses((causes, err) => {
	logger.debug('entering get cause');
	if (causes) {
		logger.debug('inside if cause');
		return next(causes);
	};
}));



module.exports = routes;