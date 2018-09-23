const Router = require('express').Router();
const isAdmin = require('passport');
const isLogin = require('passport');
const ensureLogin = isLogin.authenticate('login-rule', { session: false });
const ensureAdmin = isAdmin.authenticate('admin-rule', { session: false });
const {uploadAvatar, uploadPropertyImages} = require('../helpers/multer');

//Importing controllers
const Properties = require('../controllers/properties');
const Categories = require('../controllers/categories');
const Users = require('../controllers/users');

//Properties routes
Router.route('/properties')
  .get(Properties.getAllProperties)
  .post(uploadPropertyImages, Properties.postProperty);
Router.route('/properties/search')
  .get(Properties.queryProperty);
Router.route('/unapprovedproperties')
  .get(ensureAdmin, Properties.getAllUnapprovedProperties);
Router.route('/change-property-state/:id')
  .get(ensureAdmin, Properties.changePropertyState);
Router.route('/properties/:id')
  .get(Properties.getProperty)
  .put(ensureLogin, Properties.updateProperty)
  .delete(ensureLogin, Properties.deleteProperty);
Router.route('/properties/like/:id')
  .get(ensureLogin, Properties.likeProperty);
Router.route('/properties/comment/:id')
  .post(ensureLogin, Properties.commentProperty);
Router.route('/properties/comment/:id/:comment_id')
  .delete(ensureLogin, Properties.deleteComment);
  
//Categories routes
Router.route('/categories')
  .get(Categories.getAllCategories)
  .post(ensureAdmin, Categories.postCategory);
Router.route('/categories/:id')
  .get(ensureAdmin, Categories.getCategory)
  .put(ensureAdmin, Categories.updateCategory)
  .delete(ensureAdmin, Categories.deleteCategory);

//User routes
Router
  .post('/register',uploadAvatar, Users.registerUser)
  .post('/login', Users.loginUser);

module.exports = Router;