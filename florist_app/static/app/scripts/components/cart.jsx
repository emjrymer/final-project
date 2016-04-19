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
      console.log('state products',this.state.products);
      var products = this.state.products.map(function(indivCart){
        console.log(indivCart);
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




      return (
        <div>
          <div className="carts-page">
              <NavBar/>
            <h3>Checkout</h3>
            <div className="shopping-cart">
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
            <p>Total Cart Price:  $ ______</p>
        </div>
            <div className="payment">
                <form action="" method="POST" id="payment-form" onSubmit={ this.handleSubmit }>
                      <span className="payment-errors"></span>

                      <div className="form-row">
                        <label>
                          <span>Card Number</span>
                          <input type="text" size="20" data-stripe="number"/>
                        </label>
                      </div>

                      <div className="form-row">
                        <label>
                          <span>CVC</span>
                          <input type="text" size="4" data-stripe="cvc"/>
                        </label>
                      </div>

                      <div className="form-row">
                        <label>
                          <span>Expiration (MM/YYYY)</span>
                          <input type="text" size="2" data-stripe="exp-month"/>
                        </label>
                        <span> / </span>
                        <input type="text" size="4" data-stripe="exp-year"/>
                      </div>
                      <button type="submit">Submit Payment</button>
                </form>
                <div className="yellowborder"></div>
                <Footer/>

          </div>
        </div>
      </div>

    )
  }
});


module.exports = CartComponent;
