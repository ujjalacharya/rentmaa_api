const Router = require('express').Router();
const passport = require('passport');
const ensureAuth = passport.authenticate('jwt', { session: false });

//Importing controllers
const Properties = require('../controllers/properties');
const Categories = require('../controllers/categories');
const Users = require('../controllers/users');

//Properties routes
Router.route('/properties')
  .get(Properties.getAllProperties)
  .post(ensureAuth, Properties.postProperty);
Router.route('/properties/:id')
  .get(Properties.getProperty)
  .put(ensureAuth, Properties.updateProperty)
  .delete(ensureAuth, Properties.deleteProperty);
  
//Categories routes
Router.route('/categories')
  .get(Categories.getAllCategories)
  .post(ensureAuth, Categories.postCategory);
Router.route('/categories/:id')
  .get(Categories.getCategory)
  .put(ensureAuth, Categories.updateCategory)
  .delete(ensureAuth, Categories.deleteCategory);

//User routes
Router
  .post('/register', Users.registerUser)
  .post('/login', Users.loginUser);

module.exports = Router;