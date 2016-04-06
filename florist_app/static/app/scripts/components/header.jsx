var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Backbone = require('backbone');
var HeaderComponent = require('react-bootstrap').HeaderComponent;
var Carousel = require('react-bootstrap').Carousel;



var HeaderComponent = React.createClass({
  render: function(){
    return (
      <div>
        <div className="header">
           <a href="#loginpage" className="login btn btn.btn-*-outline">login</a>
           <h1>La Belle Fluer</h1>
           <h3>"I must have flowers always, and always."<span>-Claude Monet</span></h3>
        </div>

        <div className="navigation">
           <ul className='navbuttons'>
             <li><button type="button" className="bouquet btn btn.btn-*-outline">bouquets</button></li>
             <li><button type="button" className="about btn btn.btn-*-outline">about us</button></li>
           </ul>
        </div>

        <div className="container">
          <div className="row">

              <Carousel>
                <Carousel.Item>
                  <img width={900} height={500} alt="900x500" src="/static/dist/images/backround.jpg"/>
                  </Carousel.Item>
                <Carousel.Item>
                  <img width={900} height={500} alt="900x500" src="/static/dist/images/brightpoppies.jpg"/>
                  </Carousel.Item>
                <Carousel.Item>
                  <img width={900} height={500} alt="900x500" src="/static/dist/images/brightflorals.jpg"/>
                </Carousel.Item>
              </Carousel>
        </div>
      </div>
  </div>



    );
  },
})

module.exports = HeaderComponent;
