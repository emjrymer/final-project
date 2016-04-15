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
                </tr>
              </thead>
              <tbody>
                {products}
              </tbody>
            </table>
            <p>Total Cart Price:  $15</p>
                <form method="post" onSubmit={ this.handleSubmit }>
                  <input size="20" data-stripe="number" placeholder="number"/>
                  <input size="4" data-stripe="cvc" placeholder="cvc" />
                  <input size="2" data-stripe="exp-month" placeholder="exp-month" />
                  <input size="4" data-stripe="exp-year" placeholder="exp-year" />
                  <button type="submit">Pay</button>
                </form>
          </div>


    )
  }
})


module.exports = CartComponent;
