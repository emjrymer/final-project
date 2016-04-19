var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var models = require('../models/models');


var NavBar = React.createClass({
  render: function(){
    return (
      <div>
        <ul className='navbuttons-login'>
          <li><a href="#gallery">bouquets</a></li>
          <li><a href="#">home</a></li>
          <li><a href="#cart">cart</a></li>
          <li id="login"><a href="#loginpage">login</a></li>
        </ul>
      </div>
    );
  }
});


module.exports = NavBar;
