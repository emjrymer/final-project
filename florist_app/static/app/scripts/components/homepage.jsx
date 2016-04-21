
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Backbone = require('backbone');
var HeaderComponent = require('react-bootstrap').HeaderComponent;
var Footer = require('./../components/footer.jsx');






var HeaderComponent = React.createClass({

  componentDidMount: function(){
    // var status;
    if(localStorage.getItem('loggedin') === 'true') {
      console.log(localStorage.getItem('loggedin'));
      // status = 'logout'
      $('#login').html('<a href="#loginpage">log out</a>')
    } else {
      console.log(localStorage.getItem('loggedin'));
      console.log('not logged');
      // status = 'login'
      $('#login').html('<a href="#loginpage">log in</a>')
    };
  },

  render: function(){
    return (
      <div className='container-fluid'>
         <div className="row header-content">
           <ul className='navbuttons col-md-6 col-md-offset-3'>
             <li className='col-xs-12 col-md-3'><a href=''>home</a></li>
             <li className='col-xs-12 col-md-3'><a href="#gallery">bouquets</a></li>
             <li className='col-xs-12 col-md-3'><a href="#cart">cart</a></li>
             <li className='col-xs-12 col-md-3' id="login"></li>
           </ul>
           <div className="header row">
             <h1>La Belle Fluer</h1>
             <h3>I must have flowers always, and always.<span>-Claude Monet</span></h3>
           </div>
         </div>
         <div className="row">
           <div className="col-xs-4 image-1">
               <div>
                 <h1>Flower Pic 1</h1>
                 <p>“Let us dance in the sun, wearing wild flowers in our hair...” ― Susan Polis Schutz</p>
               </div>
           </div>
           <div className="col-xs-4 image-2">
               <div>
                 <h1>Flower Pic 2</h1>
                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
               </div>
           </div>
           <div className="col-xs-4 image-3">
             <div>
               <h1>Flower Pic 3</h1>
               <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
             </div>
           </div>
           <Footer/>
         </div>
       </div>




    );
  }
});

module.exports = HeaderComponent;
