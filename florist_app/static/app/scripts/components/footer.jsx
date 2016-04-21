var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var models = require('../models/models');


var Footer = React.createClass({
  render: function(){
    return (
      <div className='row'>
        <ul className='navbuttons-login-1 col-md-12'>
          <li><a target="_blank" href="https://www.facebook.com/">facebook</a></li>
          <li><a target="_blank" href="https://twitter.com/">twitter</a></li>
          <li><a target="_blank" href="https://www.instagram.com/">instagram</a></li>
        </ul>
    </div>
    );
  }
});


module.exports = Footer;
