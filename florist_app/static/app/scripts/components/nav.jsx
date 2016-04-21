var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var models = require('../models/models');



var NavBar = React.createClass({

  componentDidMount: function(){
    console.log('working');
    // var status;
    if(localStorage.getItem('loggedin') === 'true') {
      console.log(localStorage.getItem('loggedin'));
      // status = 'logout'
      $('#login').html('<a href="#loginpage">log out</a>')
    } else {
      console.log(localStorage.getItem('loggedin'));
      console.log('not logged');
      // status = 'login'
      $('#login').html('<a href="#loginpage">log in</a>');
    };
  },

  logOut: function(){
    if(localStorage.getItem('loggedin') === 'true'){
      localStorage.setItem('loggedin', false);
      Backbone.history.navigate('', {trigger: true});
    }

  },


  render: function(){
    return (
      <div>
        <ul className='navbuttons-login col-md-6 col-md-offset-3'>
          <li className='col-xs-12 col-md-3'><a href="#">home</a></li>
          <li className='col-xs-12 col-md-3'><a href="#gallery">bouquets</a></li>
          <li className='col-xs-12 col-md-3'><a href="#cart">cart</a></li>
          <li onClick={this.logOut} className='col-xs-12 col-md-3' id="login"></li>
        </ul>
      </div>
    );
  }
});


module.exports = NavBar;
