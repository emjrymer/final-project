var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var models = require('../models/models');


var DashBoard = React.createClass({
  handleFormSubmit: function(event){
    event.preventDefault();

    var image = $('#image')[0].files[0];
    console.log(image);
    var data = new FormData();
    data.append('photo', image);
    // data.append('name', $('#name').val());
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

        <div className="container">

         <div className="row">

           <div className="col-sm-12 signup">

             <form id="signup" onSubmit={this.handleFormSubmit} className="form-signup">
               <input id='name' type='text' name='name' className='form-control'  placeholder='name'/>
                <input id='price' type='text'name='price' className='form-control' placeholder='price'/>

                  <div className="row">
                    <div className="col-sm-12 note-area">
                      <h3>notes</h3>
                     <textarea className="form-control notes" rows="3"></textarea>
                    </div>
                  </div>

                <input id="image" className="flowerPic" type="file" name="pic" accept="image/*" />

               <button type='submit' className='btn btn-default submit-button'>Submit</button>
               <button type='submit' className='btn btn-default submit-button'>Add Image</button>






             </form>
          </div>
        </div>
     </div>



    );
  }
});








  module.exports = DashBoard;
