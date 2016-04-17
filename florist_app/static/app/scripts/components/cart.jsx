var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var models = require('../models/models');
var NavBar  = require('./../components/nav.jsx');
var CartCollection = require('../models/models.js').CartCollection;


var CartComponent = React.createClass({
  getInitialState: function(){
    return {'products': []};
  },
  componentDidMount: function(){
    var self = this;
    var cart = new models.CartCollection();
    console.log(cart);
    cart.fetch().done(function(products){
      console.log(products);
      self.setState({ 'products': products});
    });
},

    render: function(){
      var products = this.state.products.map(function(indivCart){
        console.log(indivCart);
        var imgUrl= indivCart.arrangement_photo;
        return(
            <tr key={indivCart.id}>
              <td>{indivCart.arrangement_name}</td>
              <td>$ {indivCart.arrangement_price}</td>
              <td className="add-image"><img src={imgUrl} /></td>
              <td><a href={"#carts/" + indivCart.id + "/"}>Remove</a></td>
            </tr>
        )
      });




      return (
          <div className="createproductspage">
              <NavBar/>
            <h3>Checkout</h3>
            <table className="table">
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
            <div>
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
                </div>
          </div>

    )
  }
});


module.exports = CartComponent;
