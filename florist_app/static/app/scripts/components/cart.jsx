var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var models = require('../models/models');


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
          <td>{product.price}</td>
          <td>{product.description}</td>
          <td><img src={product.photo}/></td>
          <td><a href={"#addproduct"}>Edit</a></td>
        </tr>
      )
    });

    console.log("are you here!");
    return (

        <div className="createproductspage">
          <h3>Products</h3>
           <a href="#addproduct" className="add-button">Add</a>
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
    )
  }
})


module.exports = CartComponent;
