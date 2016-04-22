var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var models = require('../models/models');
var NavBar  = require('./../components/nav.jsx');
var Footer = require('./../components/footer.jsx');
var CartCollection = require('../models/models.js').CartCollection;
var Payment = require('../models/models.js').Payment;
var CartDelete = require('../models/models.js').CartDelete;
var StripeCheckout = require('react-stripe-checkout');
var _ = require('underscore');


var CartComponent = React.createClass({
  getInitialState: function(){
    return {'products': [], stripeTotal: 0, runningTotal: 0};
},
componentDidMount: function(){
    var self = this;
    this.cart = new models.CartCollection();

    this.cart.fetch().done(function(products){
        self.calcTotal(products);
      self.setState({'products': products});
    });
},
calcTotal: function(products){
    var runningTotal = 0;
    products.forEach(function(product){
        runningTotal += product.arrangement_price;
    })
    var stripeTotal = runningTotal * 100;
    this.setState({runningTotal: runningTotal, stripeTotal: stripeTotal})
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
  self.calcTotal(newProducts);


  self.setState({'products': newProducts});
  // // var products = this.cart;
  // products.remove(model);

},
onToken: function(token, shippingAddress){
    $(".checkout").slideToggle(500);
    var self = this;
    var payment = new Payment();
    payment.save({stripeEmail: token.email, stripeToken: token.id, amount: this.state.stripeTotal}, function(payment){
        self.setState({products: []});

    });
    setTimeout(function(){
      $(".checkout").slideToggle(500);
    }, 5000);
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
              <td onClick={self.removeItem.bind(self,indivCart)}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </td>
            </tr>
        )
      });
      return (
        <div className="row">
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

            <div className='midsection col-sm-10'>
              <p>Total Cart Price:  $ {this.state.runningTotal}</p>
              <a href='#gallery' className='col-xs-12 col-md-6'>
                <i className="fa fa-shopping-basket" aria-hidden="true"></i>
              </a>
            </div>
            <div className="payment">
                <StripeCheckout
                    name="La Belle Fleur"
                    token={this.onToken}
                    amount={this.state.stripeTotal}
                    shippingAddress={true}
                    stripeKey="pk_test_knjiOyi3uHqK8Ae8eOtS6QRa" />
            </div>
            <div className="alert alert-success checkout" style={{"display": "none"}}  role="alert">Thank you for your order!</div>
          </div>
         </div>
        <Footer/>
      </div>


    )
  }
});


module.exports = CartComponent;
