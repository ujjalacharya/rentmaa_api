const Router = require('express').Router();

//Importing controllers
const Properties = require('../controllers/properties');
const Categories = require('../controllers/categories');

//Properties routes
Router
  .get('/properties', Properties.getAllProperties)
  .post('/properties', Properties.postProperty);

//Categories routes
Router
  .get('/categories', Categories.getAllCategories)
  .post('/categories', Categories.postCategory);

module.exports = Router;