var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var models = require('../models/models');
var NavBar  = require('./../components/nav.jsx');
var Footer = require('./../components/footer.jsx');




var DashBoard = React.createClass({
  handleFormSubmit: function(event){
    event.preventDefault();
    var data = new FormData();
    if (this.props.model){
      // Update View (we are updating existing arrangement)
      var type = 'PUT';
      var url = '/api/arrangements/' + this.props.model.id + '/';
    } else {
      // Create View (we are creating a new arranagment)
      var type = 'POST';
      var image = $('#image')[0].files[0];
      data.append('photo', image);
      var url = '/api/arrangements/';
    }
    data.append('name', $('#name').val());
    data.append('price', $('#price').val());
    data.append('description' ,$('#description').val());

    $.ajax({
      url: url,
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      type: type,
      success: function(data){
        Backbone.history.navigate('arrangements', {trigger: true});
      },
      error: function(data){
        alert('no upload');
      }
    });

    // var arrangement = new models.Arrangement();
    // arrangement.set({
    //   'name': $('#name').val(),
    //   'price': $('#price').val(),
    // });

    // arrangement.save().then(function(results){
    //   Backbone.history.navigate('index', {trigger: true});
    // })
  },
  render: function(){
    var arrangementName, price, description, imageField = '';
    if (this.props.model){
      arrangementName = this.props.model.name;
      price = this.props.model.price;
      description = this.props.model.description;
      imageField = (
        <img src={this.props.model.photo} alt={description}/>
      )
    } else {
      imageField = (
        <input id="image" className="flowerPic" type="file" name="pic" accept="image/*" />
      )
    }
    return (

        <div className="row header-content-login">
          <NavBar/>
            <h3>dashboard</h3>

         <div className="row">

           <div className="col-sm-12 floristform">

             <form id="signup" onSubmit={this.handleFormSubmit} className="form-signup dashboard">
               <input id='name' type='text' name='name' className='form-control'  placeholder='name' defaultValue={arrangementName}/>
               <input id='price' type='text' name='name' className='form-control'  placeholder='price' defaultValue={price}/>
                <input id='description' type='text'name='price' className='form-control' placeholder='description' defaultValue={description}/>
                {imageField}
                <button type='submit' className='btn btn-default submit-button-1'>Submit</button>
                <a href='#gallery' className='browse-option'></a>
            </form>
          </div>
        </div>
        <div className='yellowborder'></div>
        <Footer/>

     </div>



    );
  }
});








  module.exports = DashBoard;
