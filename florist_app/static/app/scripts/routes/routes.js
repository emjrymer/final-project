var _ = require('underscore');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
require('backbone-react-component');

var models = require('./../models/models');


var LoginPage = require('./../components/login.jsx');
var HeaderComponent = require('./../components/header.jsx');
// var DashBoard = require('./../components/dashboard.jsx');

var appContainer = document.getElementById('app');

var Router = Backbone.Router.extend({
  routes:{
    '':'index',
    'loginpage':'loginpage',
    // 'dashboard': 'dashboard'
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
    ReactDOM.unmountComponentAtNode(appContainer);

    ReactDOM.render(
      React.createElement(LoginPage),
      appContainer
    );
  },
  // loginpage: function(){
  //   ReactDOM.unmountComponentAtNode(appContainer);
  //
  //   ReactDOM.render(
  //     React.createElement(DashBoard),
  //     appContainer
  //   );
  // },

});

var router = new Router();
module.exports = router;
