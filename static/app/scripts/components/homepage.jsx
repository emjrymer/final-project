
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Backbone = require('backbone');
var HeaderComponent = require('react-bootstrap').HeaderComponent;
var Footer = require('./../components/footer.jsx');





var HeaderComponent = React.createClass({
  render: function(){
    return (
      <div className='container-fluid'>
         <div className="row header-content">
           <ul className='navbuttons'>
             <li><a href="#gallery">bouquets</a></li>
             <li><a href="#index">home</a></li>
             <li><a href="#contact">contact us</a></li>
             <li id="login"><a href="#loginpage">login</a></li>
           </ul>
           <div className="header">
             <h1>La Belle Fluer</h1>
             <h3>I must have flowers always, and always!<span>-Claude Monet</span></h3>
           </div>
         </div>
         <div className="row">
           <div className="col-xs-4 image-1">
             <div>
              <h1>Flower Pic 1</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore   magna aliqua.</p>
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
          </div>
         <Footer/>
        </div>




    );
  }
});

module.exports = HeaderComponent;
