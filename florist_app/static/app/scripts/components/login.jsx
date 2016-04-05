var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Backbone = require('backbone');

var SignupPage = React.createClass({
  handleSignUp: function(){
    console.log('handleSignUp');

      var user = new Parse.User();
      user.set({'name': $('#signup-name').val(), 'email': $('#signup-email').val(), 'username': $('#signup-username').val(), 'password': $('#signup-password').val()});
      user.signUp(null, {
        'success': function(results){
          console.log('results: ', results);
          Backbone.history.navigate('homePage', {trigger: true});
        },
        'error': function(user, error){
          console.log(user, error);
        }
      });
  },
  handleSignIn: function(){
  console.log('handleSignIn');
    Parse.User
      .logIn($('#signin-username').val(), $('#signin-password').val(), {
        success: function(user) {
          console.log(user);
          Backbone.history.navigate('adminscreen', {trigger: true});
        },
        error: function(user, error) {
        }
      });
    console.log(Parse.User.current());
  },
  render: function(){
    return(
      <div className="row">
       <div className="col-md-6 signup">
         <form id="signup" className="form-signup">
           <input id='signup-name' type='text' className='form-control' placeholder='name'/>
           <input id='signup-email' type='text' className='form-control' placeholder='email'/>
           <input id='signup-username' type='text' className='form-control' placeholder='username'/>
           <input id='signup-password' type='password' className='form-control' placeholder='password'/>
         </form>
         <button onClick={this.handleSignUp} type='button' className='btn btn-default submit-button'>Submit</button>
       </div>
       <div className="col-md-6 signin">
         <form id="signin" className="form-signin">
           <input id='signin-username' type='text' className='form-control' placeholder='username'/>
           <input id='signin-password' type='password' className='form-control' placeholder='password'/>
         </form>
         <button onClick={this.handleSignIn} type='button' className='btn btn-default signin-button'>Sign In</button>
       </div>
     </div>
    );
  }
});

module.exports = SignupPage;
