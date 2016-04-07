var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var models = require('../models/models');

var Backbone = require('backbone');
console.log('login require');



var csrftoken = $("input[name='csrfmiddlewaretoken']").val();

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

var LoginPage = React.createClass({
  handleSignUp: function(event){
    event.preventDefault();
    console.log('handleSignUp');

      var user = new models.User();
      user.set({
        'username': $('#signup-username').val(),
        'password': $('#signup-password').val()
      });
      user.save().then(function(results){
          console.log('results: ', results);
          Backbone.history.navigate('dashboard', {trigger: true});
        })
  },

  handleSignIn: function(event) {
    event.preventDefault();
    console.log('handleSignIn');

    var login = new models.Login();
    login.set({
      'username': $('#signin-email').val(),
      'password': $('#signin-password').val()
    });

    login.save().then(function(results){
      Backbone.history.navigate('dashboard', {trigger: true});
    });
  },
  render: function(){
    console.log('login page!');
    return(
      <div className="row">
         <div className="col-sm-6 signup">
           <form id="signup" onSubmit={this.handleSignUp} className="form-signup">
             <input id='signup-name' type='text' name='first_name'  className='form-control' placeholder='firstname'/>
             <input id='signup-email' type='text' className='form-control' placeholder='email'/>
             <input id='signup-username' type='text' className='form-control' placeholder='username'/>
             <input id='signup-password' type='password' className='form-control' placeholder='password'/>
             <button type='submit' className='btn btn-default submit-button'>Sign Up</button>
           </form>
        </div>
         <div className="col-sm-6 signin">
           <form id="signin" onSubmit={this.handleSignIn} className="form-signin">
             <input id='signin-username' type='text' className='form-control' placeholder='username'/>
             <input id='signin-password' type='password' className='form-control' placeholder='password'/>
             <button type='submit' className='btn btn-default signin-button'>Log In</button>
           </form>

         </div>
       </div>
    );
  }
});

module.exports = LoginPage;
