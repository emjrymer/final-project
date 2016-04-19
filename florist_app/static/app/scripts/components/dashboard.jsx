var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var models = require('../models/models');
var NavBar  = require('./../components/nav.jsx');
var Footer = require('./../components/footer.jsx');




var DashBoard = React.createClass({
  handleFormSubmit: function(event){
    event.preventDefault();

    var image = $('#image')[0].files[0];
    console.log(image);
    var data = new FormData();
    data.append('photo', image);
    data.append('name', $('#name').val());
    data.append('price', $('#price').val());
    data.append('description' ,$('#description').val());

    $.ajax({
      url: '/api/arrangements/',
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      type: 'POST',
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
    return (

        <div className="row header-content-login">
          <NavBar/>

         <div className="row">

           <div className="col-sm-12 floristform">

             <form id="signup" onSubmit={this.handleFormSubmit} className="form-signup dashboard">
               <input id='name' type='text' name='name' className='form-control'  placeholder='name'/>
               <input id='price' type='text' name='name' className='form-control'  placeholder='price'/>
                <input id='description' type='text'name='price' className='form-control' placeholder='description'/>
                <input id="image" className="flowerPic" type="file" name="pic" accept="image/*" />
                <button type='submit' className='btn btn-default submit-button-1'>Submit</button>
               <button type='submit' className='btn btn-default submit-button-1'>Browse Gallery</button>
            </form>
          </div>
          <Footer/>
        </div>
     </div>



    );
  }
});








  module.exports = DashBoard;
