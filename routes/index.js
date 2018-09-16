const Router = require('express').Router();

//Importing controllers
const Properties = require('../controllers/properties');
const Categories = require('../controllers/categories');

//Properties routes
Router
  .get('/properties', Properties.getAllProperties)
  .post('/properties', Properties.postProperty);

//Categories routes
Router.get('/api/categories', Categories.getAllCategories);

module.exports = Router;