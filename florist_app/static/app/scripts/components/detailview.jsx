var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var models = require('../models/models');


var DetailViewComponent = React.createClass({
  render: function(){
    return (
      <div>
        <div className="detailpage">
        <div className="row">
          <div className="col-xs-6">
            <img src="" className="detail-img" alt=""/>
          </div>
            <div className="col-xs-6">
              <h3 className="floral-name">Roses</h3>
              <span className="price">$300</span>
              <p className="floral-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <span>Quantity:</span>
              <input type="text" className="form-control quantity-input" placeholder=""/>
              <span>Size:</span>
              <input type="text" className="form-control size-input" placeholder=""/>
              <a href="#" className="add-to-cart">Add to Cart</a>
            </div>
        </div>
      </div>
      </div>
    )
  }
})


module.exports = DetailViewComponent;
