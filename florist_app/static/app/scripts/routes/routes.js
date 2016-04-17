var _ = require('underscore');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
require('backbone-react-component');

var models = require('./../models/models');

var ImageComponent = require('./../components/imageboard.jsx');
var LoginPage = require('./../components/login.jsx');
var HeaderComponent = require('./../components/homepage.jsx');
var DashBoard = require('./../components/dashboard.jsx');
var ImageComponent = require('./../components/imageboard.jsx');
var CreateDataComponent = require('./../components/data.jsx');
var appContainer = document.getElementById('app');
var ModelArrangement = require('../models/models').ArrangementCollection;
var GalleryComponent = require('./../components/imageboard.jsx');
var CartComponent = require('./../components/cart.jsx');
var DetailViewComponent = require('./../components/detailview.jsx');
var notfound = require('./../components/notfound.jsx');
var Router = Backbone.Router.extend({
  routes:{
    '':'index',
    'loginpage':'loginpage',
    'dashboard': 'dashboard',
    'arrangements' : 'arrangements',
    "gallery": "gallery",
    "cart": "cart",
    "detailview" : "detailview",
    "*notFound": "notfound"
  },
  index: function(){
    ReactDOM.unmountComponentAtNode(appContainer);

    ReactDOM.render(
      React.createElement(HeaderComponent),
      appContainer
    );
  },
  notfound: function(){
      ReactDOM.unmountComponentAtNode(appContainer);
      ReactDOM.render(
        React.createElement(notfound),
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
  dashboard: function(){
    ReactDOM.unmountComponentAtNode(appContainer);

    ReactDOM.render(
      React.createElement(DashBoard),
      appContainer
    );
  },
  gallery: function(){
    ReactDOM.unmountComponentAtNode(appContainer);

    ReactDOM.render(
      React.createElement(GalleryComponent),
      appContainer
    );
  },
  arrangements: function(){
        ReactDOM.unmountComponentAtNode(appContainer);
        var arrangementCollection = new ModelArrangement();
        arrangementCollection.fetch().then(function(response){
        ReactDOM.render(
        React.createElement(CreateDataComponent, {collection: response}),
        appContainer
      );

    })
  },
  cart: function(){
    ReactDOM.unmountComponentAtNode(appContainer);

    ReactDOM.render(
      React.createElement(CartComponent),
      appContainer
    );
  },

  detailview: function(){
    ReactDOM.unmountComponentAtNode(appContainer);

    ReactDOM.render(
      React.createElement(DetailViewComponent),
      appContainer
    );
  },

});

var router = new Router();
module.exports = router;
