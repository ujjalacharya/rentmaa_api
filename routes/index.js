const Router = require('express').Router();
const isAdmin = require('passport');
const isLogin = require('passport');
const ensureAuth = isLogin.authenticate('login-rule', { session: false });
const ensureAdmin = isAdmin.authenticate('admin-rule', { session: false });
const {uploadAvatar} = require('../helpers/multer');

//Importing controllers
const Properties = require('../controllers/properties');
const Categories = require('../controllers/categories');
const Users = require('../controllers/users');

//Properties routes
Router.route('/properties')
  .get(Properties.getAllProperties)
  .post(ensureAuth, Properties.postProperty);
Router.route('/properties/search')
  .get(Properties.queryProperty)
Router.route('/properties/:id')
  .get(Properties.getProperty)
  .put(ensureAuth, Properties.updateProperty)
  .delete(ensureAuth, Properties.deleteProperty);
Router.route('/properties/like/:id')
  .get(ensureAuth, Properties.likeProperty);
Router.route('/properties/comment/:id')
  .post(ensureAuth, Properties.commentProperty);
Router.route('/properties/comment/:id/:comment_id')
  .delete(ensureAuth, Properties.deleteComment);
  
//Categories routes
Router.route('/categories')
  .get(ensureAdmin, Categories.getAllCategories)
  .post(ensureAuth, Categories.postCategory);
Router.route('/categories/:id')
  .get(Categories.getCategory)
  .put(ensureAuth, Categories.updateCategory)
  .delete(ensureAuth, Categories.deleteCategory);

//User routes
Router
  .post('/register',uploadAvatar, Users.registerUser)
  .post('/login', Users.loginUser);

module.exports = Router;