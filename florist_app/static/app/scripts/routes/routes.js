var _ = require('underscore');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
require('backbone-react-component');

var models = require('./../models/models');


var LoginPage = require('./../components/login.jsx');
var HeaderComponent = require('./../components/header.jsx');

var appContainer = document.getElementById('app');

var Router = Backbone.Router.extend({
  routes:{
    '':'index',
    'loginpage':'loginpage'
    // 'adminscreen':'adminscreen'
  },
  index: function(){
    ReactDOM.unmountComponentAtNode(appContainer);

    ReactDOM.render(
      React.createElement(HeaderComponent),
      appContainer
    );
  },
  loginpage: function(){
    console.log('login route');
    ReactDOM.render(
      React.createElement(LoginPage),
      appContainer
    );
  },

});

var router = new Router();
module.exports = router;
