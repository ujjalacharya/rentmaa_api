const Router = require('express').Router();

//Importing controllers
const Properties = require('../controllers/properties');
const Categories = require('../controllers/categories');
const Users = require('../controllers/users');

//Properties routes
Router.route('/properties')
  .get(Properties.getAllProperties)
  .post(Properties.postProperty);
Router.route('/properties/:id')
  .get(Properties.getProperty)
  .put(Properties.updateProperty)
  .delete(Properties.deleteProperty);
  
//Categories routes
Router.route('/categories')
  .get(Categories.getAllCategories)
  .post(Categories.postCategory);
Router.route('/categories/:id')
  .get(Categories.getCategory)
  .put(Categories.updateCategory)
  .delete(Categories.deleteCategory);

//User routes
Router
  .post('/register', Users.registerUser)
  .post('/login', Users.loginUser);

module.exports = Router;