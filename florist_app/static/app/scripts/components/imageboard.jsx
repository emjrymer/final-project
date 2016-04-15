var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var models = require('../models/models.js');
var NavBar  = require('./../components/nav.jsx');



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
    cart.save(null, {
        success: function(results){
          console.log(results);
          Backbone.history.navigate('cart', {trigger: true});
        },
        error: function(model, err){
          console.log(err);
        }
    });

    // 4. Update the cart icon to show number of items in the cart

  },
  render: function(){
      console.log('gallery page!');
    var self = this;

    var productRows = this.state.products.map(function(product){

      return (
              <div className="col-xs-4 image" key={product.id}>
                <img src={product.get("photo")} alt=""/>
                <h1>{product.get("name")}</h1>
                <p>{product.get("description")} - ${product.get("price")}</p>
                <button type='button' onClick={self.addToCart.bind(self,product)} className='btn btn-default'>Add bouquet </button>
              </div>
      )
    });
    return (
      <div className="row">
          <NavBar/>
        <div className='col-xs-3'>
            <div className='quote'><p>“She cast her fragrance and her radiance over me. I ought never to have run away from her... I ought to have guessed all the affection that lay behind her poor little stratagems. Flowers are so inconsistent! But I was too young to know how to love her...”
            </p><p id="author">― Antoine de Saint-Exupéry, <br/>The Little Prince</p></div>
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
