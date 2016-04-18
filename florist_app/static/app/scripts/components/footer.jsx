var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var models = require('../models/models');


var Footer = React.createClass({
  render: function(){
    return (
      <div>
        <ul className='navbuttons-login-1'>
          <li><a href="https://www.facebook.com/">facebook</a></li>
          <li><a href="https://twitter.com/">twitter</a></li>
          <li><a href="https://www.instagram.com/">instagram</a></li>
        </ul>
    </div>
    );
  }
});


module.exports = Footer;