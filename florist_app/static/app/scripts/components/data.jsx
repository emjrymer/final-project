var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Backbone = require('backbone');
var models = require('../models/models.js');
var NavBar  = require('./../components/nav.jsx');
var ModelArrangement = require('../models/models.js').ArrangementCollection;
var Footer = require('./../components/footer.jsx');


var CreateDataComponent = React.createClass({
  mixins:[Backbone.React.Component.Mixin],
  getInitialState: function(){
    return {'products': this.props.collection};
  },
  render: function(){
    var productRows = this.state.products.map(function(product){
      return (
        <tr key={product.id}>
          <td>{product.name}</td>
          <td>$ {product.price}</td>
          <td>{product.description}</td>
          <td><img src={product.photo}/></td>
          <td>
            <a href={"#dashboard/" + product.id + "/"}>
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </a>
          </td>
        </tr>
      )
    });

    console.log("arrangements!");
    return(
              <div>
                <div className="createproductspage col-sm-10 col-sm-offset-1">
                    <NavBar/>
                  <h3>current products</h3>
                  <div className='current-products'>
                    <table className="table">
                      <thead>
                        <tr>
                          <td>Name</td>
                          <td>Price</td>
                          <td>Description</td>
                          <td className="add-image">Photo</td>
                          <td>Actions</td>
                        </tr>
                      </thead>
                      <tbody>
                        {productRows}
                      </tbody>
                    </table>
                  </div>
                    <a href="#dashboard" className="add-button col-xs-12">
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </a>
               </div>
               <Footer/>
             </div>
    );
  }
});

module.exports = CreateDataComponent;
