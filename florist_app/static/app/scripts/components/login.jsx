var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var User = require('../models/models').User;

var Backbone = require('backbone');
console.log('login require');
var LoginPage = React.createClass({
  handleSignUp: function(event){
    event.preventDefault();
    console.log('handleSignUp');

      var user = new User();
      user.set({
        'username': $('#signup-email').val(),
        'password': $('#signup-password').val()
      });
      user.save().then(function(results){
          console.log('results: ', results);
          Backbone.history.navigate('loginpage', {trigger: true});
        })
  },

  handleSignIn: function() {
    console.log('handleSignIn');
    Parse.User
      .logIn($('#login-email').val(), $('#login-password').val(), {
        success: function(user) {
          console.log(user);
          Backbone.history.navigate('index', {trigger: true});
        },
        error: function(user, error) {
          console.log(error)
        }
      });
    console.log(Parse.User.current());
  },
  render: function(){
    console.log('login page!');
    return(
      <div className="row">
         <div className="col-md-6 signup">
           <form id="signup" onSubmit={this.handleSignUp} className="form-signup">
             <input id='signup-name' type='text' className='form-control' placeholder='name'/>
             <input id='signup-email' type='text' className='form-control' placeholder='email'/>
             <input id='signup-username' type='text' className='form-control' placeholder='username'/>
             <input id='signup-password' type='password' className='form-control' placeholder='password'/>
             <button type='submit' className='btn btn-default submit-button'>Sign Up</button>
           </form>
        </div>
         <div className="col-md-6 signin">
           <form id="signin" onSubmit={this.handleSignIn} className="form-signin">
             <input id='signin-username' type='text' className='form-control' placeholder='username'/>
             <input id='signin-password' type='password' className='form-control' placeholder='password'/>
             <button type='submit' className='btn btn-default signin-button'>Sign In</button>
           </form>

         </div>
       </div>
    );
  }
});

module.exports = LoginPage;
