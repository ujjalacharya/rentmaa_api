const Router = require('express').Router();

//Importing controllers
const Properties = require('../controllers/properties');
const Categories = require('../controllers/categories');

//Properties routes
Router
  .get('/properties', Properties.getAllProperties)
  .get('/properties/:id', Properties.getProperty)
  .post('/properties', Properties.postProperty)
  .put('/properties/:id', Properties.updateProperty)
  .delete('/properties/:id', Properties.deleteProperty);
  
//Categories routes
Router
  .get('/categories', Categories.getAllCategories)
  .get('/categories/:id', Categories.getCategory)
  .post('/categories', Categories.postCategory)
  .put('/categories/:id', Categories.updateCategory)
  .delete('/categories/:id', Categories.deleteCategory);

module.exports = Router;