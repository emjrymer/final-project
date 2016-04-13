var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var models = require('../models/models');


var csrftoken = $("input[name='csrfmiddlewaretoken']").val();

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});


var Header = React.createClass({
  render: function(){
    return (
      <div>
        <ul className='navbuttons-login'>
          <li><a href="imageboard">bouquets</a></li>
          <li><a href="url">about us</a></li>
          <li><a href="url">contact us</a></li>
          <li id="loginl"><a href="#loginpage">login</a></li>
        </ul>
        <div className="header-login">
          <h1>La Belle Fluer</h1>
        </div>
      </div>
    )
  }
})

var DashBoard = React.createClass({
  handleFormSubmit: function(event){
    event.preventDefault();

    var image = $('#image')[0].files[0];
    console.log(image);
    var data = new FormData();
    data.append('photo', image);
    data.append('name', $('#name').val());
    data.append('price', $('#price').val());

    $.ajax({
      url: '/api/arrangements/',
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      type: 'POST',
      success: function(data){
        alert(data);
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
          <Header />

         <div className="row">

           <div className="col-sm-12 florist-form">

             <form id="signup" onSubmit={this.handleFormSubmit} className="form-signup dashboard">
               <input id='name' type='text' name='name' className='form-control'  placeholder='name'/>
               <input id='price' type='text' name='name' className='form-control'  placeholder='price'/>
                <input id='description' type='text'name='price' className='form-control' placeholder='description'/>
                <input id="image" className="flowerPic" type="file" name="pic" accept="image/*" />
                <button type='submit' className='btn btn-default submit-button-1'>Submit</button>
               <button type='submit' className='btn btn-default submit-button-1'>Add Img</button>
            </form>
          </div>
        </div>
     </div>



    );
  }
});

var Header = React.createClass({
  render: function(){
    return (
      <div>
        <ul className='navbuttons-login'>
          <li><a href="imageboard">bouquets</a></li>
          <li><a href="url">about us</a></li>
          <li><a href="url">contact us</a></li>
          <li id="loginl"><a href="#loginpage">login</a></li>
        </ul>
        <div className="header-login">
          <h1>La Belle Fluer</h1>
        </div>
      </div>
    )
  }
})







  module.exports = DashBoard;
