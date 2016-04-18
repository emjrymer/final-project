var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var models = require('../models/models');


var NavBar = React.createClass({
  render: function(){
    return (
        <div>
        <ul className='navbuttons-login'>
          <li><a href="#arrangements">bouquets</a></li>
          <li><a href="#about">about us</a></li>
          <li><a href="#contact">contact us</a></li>
          <li id="login"><a href="#loginpage">login</a></li>
        </ul>
        <div className="header-login">
          <h1>La Belle Fleur</h1>
        </div>
        </div>
    );
  }
});


module.exports = NavBar;
