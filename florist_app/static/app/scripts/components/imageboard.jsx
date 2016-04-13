var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var models = require('../models/models.js');


var GalleryComponent = React.createClass({
  getInitialState: function(){
    return {'products': []};
  },
  componentDidMount: function(){
    var self = this;
    var products = new models.ArrangementCollection();

    products.on('update', function(){
      self.setState({'products': products});
    });

    products.fetch();
  },
  addToCart: function(product){
    console.log("addToCart");

    // 1. Create a new cart object
    var cart = new models.Cart({arrangement: product.id});

    // 3. Save the cart object
    cart.save();

    // 4. Update the cart icon to show number of items in the cart

  },
  render: function(){
    var self = this;

    var productRows = this.state.products.map(function(product){

      return (
          <div className="col-xs-4 image" key={product.id}>
            <img src={product.get("photo")} alt=""/>
            <h1>{product.get("name")}</h1>
            <p>L{product.get("description")} {product.get("price")}</p>
            <button type='button' onClick={self.addToCart.bind(self,product)} className='btn btn-default'>Add bouquet </button>
          </div>
      )
    });
    return (
      <div className="row">
        <div className='col-xs-3'>
          <ul>
            <li>Home</li>
            <li>Gallery</li>
            <li>About Us</li>
            <li>Login</li>
          </ul>
        </div>
        <div className='col-xs-9'>
          <div className='row gallery-bouquets'>
            {productRows}
          </div>
        </div>
      </div>

  );
 }
});

module.exports = GalleryComponent;
