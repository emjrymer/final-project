var _ = require('underscore');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
require('backbone-react-component');

var models = require('./../models/models');
var jewelryCollection = new models.JewelryCollection();

var SignupPage = require('./../components/admin-login.jsx');
var HeaderComponent = require('./../components/index.jsx');

var Router = Backbone.Router.extend({
  routes:{
    '':'index',
    'adminlogin':'adminloginpage',
    // 'adminscreen':'adminscreen'
  },
  index: function(){
    ReactDOM.render(
      React.createElement(HeaderComponent),
      document.getElementById('app')
    );
  },
  adminloginpage: function(){
    ReactDOM.render(
      React.createElement(SignupPage),
      document.getElementById('app')
    );
  },
  adminscreen: function(){
    ReactDOM.render(
      React.createElement(AdminScreenComponent),
      document.getElementById('app')
    );
  }
});

var router = new Router();
module.exports = router;
jewelryCollection.fetch();
console.log(jewelryCollection);
