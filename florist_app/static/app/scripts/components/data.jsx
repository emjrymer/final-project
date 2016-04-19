var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Backbone = require('backbone');
var models = require('../models/models.js');
var NavBar  = require('./../components/nav.jsx');
var ModelArrangement = require('../models/models.js').ArrangementCollection;
var Footer = require('./../components/footer.jsx');


var arrangementCollection = new ModelArrangement();





var CreateDataComponent = React.createClass({
  mixins:[Backbone.React.Component.Mixin],
  getInitialState: function(){
    return {'products': []};
  },
  componentDidMount: function(){
    arrangementCollection.fetch();
  },
  render: function(){
    console.log('arra collec: ', arrangementCollection.models);

    var productRows = this.props.collection.map(function(product){
      return (
        <tr key={product.id}>
          <td>{product.name}</td>
          <td>$ {product.price}</td>
          <td>{product.description}</td>
          <td><img src={product.photo}/></td>
          <td><a href={"#dashboard/" + product.id + "/"}>Edit</a></td>
        </tr>
      )
    });

    console.log("arrangements!");
    return(
      <div className="createproductspage">
          <NavBar/>
        <h3>current products</h3>
        <div className='current-products'>
        <a href="#dashboard" className="add-button">Add</a>
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
          <div className='yellowborder'>

          </div>
          <Footer/>



      </div>
    );
  }
});

module.exports = CreateDataComponent;
