
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Backbone = require('backbone');
var HeaderComponent = require('react-bootstrap').HeaderComponent;





var HeaderComponent = React.createClass({
  render: function(){
    return (
      <div className='container-fluid'>
         <div className="row header-content">
           <ul className='navbuttons'>
             <li><a href="url">bouquets</a></li>
             <li><a href="url">about us</a></li>
             <li><a href="url">contact us</a></li>
             <li id="login"><a href="url">login</a></li>
           </ul>
           <div className="header">
             <h1>La Belle Fluer</h1>
             <h3>I must have flowers always, and always!<span>-Claude Monet</span></h3>
           </div>
         </div>
         <div className="row">
           <div className="col-xs-4 image-1">
            //  <img src="%image_path(../images/brightflorals.jpg)%" alt=""/>
               <div>
                 <h1>Flower Pic 1</h1>
                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
               </div>
           </div>
           <div className="col-xs-4 image-2*">
             <img src="" alt=""/>
               <div>
                 <h1>Flower Pic 2</h1>
                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
               </div>
           </div>
           <div className="col-xs-4 image-3*">
             <img src="" alt=""/>
             <div>
               <h1>Flower Pic 3</h1>
               <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
             </div>
           </div>
         </div>
       </div>




    );
  }
});

module.exports = HeaderComponent;
