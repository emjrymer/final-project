var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Backbone = require('backbone');
var models = require('../models/models');


var DashBoard = React.createClass({
  handleFormSubmit: function(event){
    event.preventDefault();

    var arrangement = new models.Arrangement();


    var image = $(".flowerPic").val();

    
    console.log(image);

    arrangement.set({
      'name': $('#name').val(),
      'price': $('#price').val(),
      'image': image
    });

    arrangement.save().then(function(results){
      Backbone.history.navigate('index', {trigger: true});
    })
  },







  handleImageSubmit: function(event){
    event.preventDefault();

    var image = new collection.Image();



    image.set({


    });

    image.save().then(function(results){
    Backbone.history.navigate('index', {trigger: true});
    })
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
                    <div className="col-sm-12">
                     <textarea className="form-control" rows="3"></textarea>
                    </div>
                  </div>

                <input className="flowerPic" type="file" name="pic" accept="image/*" />

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
