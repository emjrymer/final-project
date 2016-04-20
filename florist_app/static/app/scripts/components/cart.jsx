var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var models = require('../models/models');
var NavBar  = require('./../components/nav.jsx');
var Footer = require('./../components/footer.jsx');
var CartCollection = require('../models/models.js').CartCollection;
var CartDelete = require('../models/models.js').CartDelete;
var _ = require('underscore');


var CartComponent = React.createClass({
  getInitialState: function(){
    return {'products': []};
},
componentDidMount: function(){
    var self = this;
    this.cart = new models.CartCollection();

    this.cart.fetch().done(function(products){
      console.log(products);
      self.setState({'products': products});
    });
},
componentDidUpdate: function(){
    var self = this;
    this.cart = new models.CartCollection();

    this.cart.fetch().done(function(products){
      console.log(products);
      self.setState({'products': products});

      // configure the stripe button script tag
      var stripeButton = document.createElement('script');
      stripeButton.src = "https://checkout.stripe.com/checkout.js";
      stripeButton.setAttribute("class", "stripe-button");
      stripeButton.setAttribute("data-key", "pk_test_knjiOyi3uHqK8Ae8eOtS6QRa");
      stripeButton.setAttribute("data-amount", _.reduce(products, function(memo, product){
          return memo + (product.arrangement_price * 100);
      }, 0));
      stripeButton.setAttribute('data-name', "La Belle Fleur");
      stripeButton.setAttribute('data-description', "$$$$ money please $$$$");
      stripeButton.setAttribute('data-image', "https://s-media-cache-ak0.pinimg.com/originals/2f/c2/c9/2fc2c92e864119ceca47ff4c574b84b6.jpg");
      stripeButton.setAttribute('data-locale', "auto");

      $('#payment-button').html(stripeButton);

  $.ajax({
    url: '/charge/',
    type: 'POST',
    success: function(data){
        console.log("charged");
        Backbone.history.navigate('', {trigger: true});
    },
    error: function(){
      alert('failure, no charge made');
    }

  });
});
},
redirectSuccess: function(event){
    event.preventDefault();

    //can we empty the cart here?

    Backbone.history.navigate('', {trigger: true});
},
removeItem: function(item){
  console.log(item);
  var key = item.id;
  var self = this;
  // console.log('key', key);
  // var objectId = key;
  // console.log(key);
  // key = key.toString();
  // // CartDelete.set(key);
  // // CartDelete.save();
  // //
  //
  $.ajax({
    url: '/api/carts/' + key + "/",
    type: 'DELETE',
    success: function(msg){
      console.log('worked!');
    }

  });
  var items = self.state.products;
  var newProducts = _.without(items, _.findWhere(items, {id: item.id}));

  self.setState({'products': newProducts});
  // // var products = this.cart;
  // products.remove(model);

},

    render: function(){
      var self = this;
      var products = this.state.products.map(function(indivCart){
        var imgUrl= indivCart.arrangement_photo;
        return(
            <tr key={indivCart.id}>
              <td>{indivCart.arrangement_name}</td>
              <td>$ {indivCart.arrangement_price}</td>
              <td className="add-image"><img src={imgUrl} /></td>
              <td onClick={self.removeItem.bind(self,indivCart)}>Remove</td>
            </tr>
        )
      });

      var runningTotal = 0;
      this.state.products.forEach(function(product){
          runningTotal += product.arrangement_price;
      })

      return (
        <div>
          <div className="carts-page col-sm-10 col-sm-offset-1">
              <NavBar/>
            <h3>checkout</h3>
            <div className="shopping-cart col-sm-10 col-sm-offset-1">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Photo</td>
                    <td>Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {products}
                </tbody>
              </table>

            <div className='midsection'>
              <p>Total Cart Price:  $ {runningTotal}</p>
              <a href='#gallery' className='col-xs-12'>Continue Shopping</a>
            </div>
            <div className="payment">
              <a onClick={this.redirectSuccess}id="payment-button">Pay</a>
              <div className="yellowborder"></div>
            </div>
            <Footer/>
          </div>
        </div>
      </div>


    )
  }
});


module.exports = CartComponent;
