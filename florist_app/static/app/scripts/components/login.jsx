var React = require('react');
var ReactDOM = require('react-dom');
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
        'username': $('#username').val(),
        'password': $('#password').val(),
        'email': $('#email').val()
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
      'username': $('#signin-username').val(),
      'password': $('#signin-password').val()
    });

    login.save().then(function(results){
      Backbone.history.navigate('dashboard', {trigger: true});
    });
  },
  render: function(){
    console.log('login page!');
    return(
      <div>

        <div className="row header-content-login">
          <ul className='navbuttons-login'>
            <li><a href="imageboard">bouquets</a></li>
            <li><a href="url">about us</a></li>
            <li><a href="url">contact us</a></li>
            <li id="loginl"><a href="#loginpage">login</a></li>
          </ul>
          <div className="header-login">
            <h1>La Belle Fluer</h1>
          </div>
        <div className="row">
         <div className="col-sm-6 signup">
           <form id="signup" onSubmit={this.handleSignUp} className="form-signup">
             <input id='signup-name' type='text' name='first_name'  className='form-control' placeholder='firstname'/>
             <input id='email' type='text' className='form-control' name="email" placeholder='email'/>
             <input id='username' type='text' className='form-control' name="username" placeholder='username'/>
             <input id='password' type='password' className='form-control' name="password" placeholder='password'/>
             <button type='submit' className='btn btn-default submit-button'>Sign Up</button>
           </form>
        </div>
         <div className="col-sm-6 signin">
           <form id="signin" onSubmit={this.handleSignIn} className="form-signin">
             <input id='signin-username' type='text' className='form-control'  name='signin-username' placeholder='username'/>
             <input id='signin-password' type='password' className='form-control' name='signin-password' placeholder='password'/>
             <button type='submit' className='btn btn-default signin-button'>Log In</button>
           </form>
          </div>
       </div>
     </div>
   </div>
    );
  }
});

module.exports = LoginPage;
