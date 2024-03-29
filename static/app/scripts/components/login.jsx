var React = require('react');
var ReactDOM = require('react-dom');
var models = require('../models/models.js');
var NavBar  = require('./../components/nav.jsx');
var Backbone = require('backbone');
var Footer = require('./../components/footer.jsx');
console.log('login require');



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
      user.save(null, {
          success: function(results){
            console.log(results);
            Backbone.history.navigate('arrangements', {trigger: true});
          },
          error: function(model, err){
            console.log(err);
          }
      });
    },

  handleSignIn: function(event) {
    event.preventDefault();
    if(localStorage.getItem('loggedin') === 'false'){
      console.log('logging in');
      localStorage.setItem('loggedin', true);
      console.log(this.localStorage);
      var login = new models.Login();
      login.set({
        'username': $('#signin-username').val(),
        'password': $('#signin-password').val()
      });

      login.save(null, {
          success: function(results){
            console.log('hello world');
            Backbone.history.navigate('arrangements', {trigger: true});
            localStorage.setItem('loggedin',true);
            location.reload();
          },
          error: function(model, err){
            console.log(err);
          }
      });
    }
  },
  render: function(){
    console.log('login page!');
    return(
      <div>

        <div className="row header-content-login">
          <NavBar/>
          <h3>get started...</h3>
         <div className="col-sm-12 signup">
           <form id="signup" onSubmit={this.handleSignUp} className="form-signup">
             <input id='signup-name' type='text' name='first_name'  className='form-control' placeholder='firstname'/>
             <input id='email' type='text' className='form-control' name="email" placeholder='email'/>
             <input id='username' type='text' className='form-control' name="username" placeholder='username'/>
             <input id='password' type='password' className='form-control' name="password" placeholder='password'/>
             <button type='submit' className='btn btn-default submit-button'>sign up</button>
           </form>
        </div>
        <div className='row col-sm-12 option'>
          <h3>already have an account?</h3>
        </div>
         <div className="col-sm-12 signin">
           <form id="signin" onSubmit={this.handleSignIn} className="form-signin">
             <input id='signin-username' type='text' className='form-control'  name='signin-username' placeholder='username'/>
             <input id='signin-password' type='password' className='form-control' name='signin-password' placeholder='password'/>
             <button type='submit' className='btn btn-default signin-button'>log in</button>
           </form>
          </div>
       </div>
     <Footer/>
    </div>

  );
 }
});

module.exports = LoginPage;
