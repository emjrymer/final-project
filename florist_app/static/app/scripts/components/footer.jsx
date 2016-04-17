var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var models = require('../models/models');


var Footer = React.createClass({
  render: function(){
    return (
      <div>
        <ul className='navbuttons-login-1'>
          <li><a href="#gallery">facebook</a></li>
          <li><a href="#">twitter</a></li>
          <li><a href="#">instagram</a></li>
        </ul>
    </div>
    );
  }
});


module.exports = Footer;
