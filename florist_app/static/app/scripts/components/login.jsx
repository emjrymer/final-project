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
            Backbone.history.navigate('dashboard', {trigger: true});
          },
          error: function(model, err){
            console.log(err);
<<<<<<< d2feba3c5c5eb0d92e95592efa991c0908bc8532
        }

  });
  },
=======
          }
  })
},
>>>>>>> styling changes

  handleSignIn: function(event) {
    event.preventDefault();
    console.log('handleSignIn');

    var login = new models.Login();
    login.set({
      'username': $('#signin-username').val(),
      'password': $('#signin-password').val()
    });

    login.save(null, {
        success: function(results){
          console.log(results);
          Backbone.history.navigate('dashboard', {trigger: true});
        },
        error: function(model, err){
          console.log(err);
        }
    });
  },
  render: function(){
    console.log('login page!');
    return(
      <div>

        <div className="row header-content-login">
          <NavBar/>
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
     <div className="footer">

     </div>
     <Footer/>

   </div>
 </div>
  );
 }
});

module.exports = LoginPage;
