const routes = require('express').Router();
const logger = require('../logger');
const cause = require('../controllers/causeController');


// these are the routes for company
routes.get('/',cause.getCompanyCategory);
routes.get('/company',cause.getCompany);


module.exports = routes;