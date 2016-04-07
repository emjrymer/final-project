var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Backbone = require('backbone');
var Arrangment = require('../models/models').Arrangment;

var DashBoard = React.createClass({
  render: function(){
    return (
      <div>
        <div class="container">
         <div className="row">
           <div className="col-sm-12 signup">
             <form id="signup" onSubmit={this.handleSignUp} className="form-signup">
               <input id='signup-name' type='text' name='first_name'  className='form-control'  placeholder='name'/>
                <input id='signup-email' type='text' className='form-control' placeholder='price'/>
               <button type='submit' className='btn btn-default submit-button'>Submit</button>
               <button type='submit' className='btn btn-default submit-button'>Add Image</button>
             </form>
          </div>
        </div>
            <div className="row">
              <div className="col-sm-12">
               <textarea class="form-control" rows="3"></textarea>
              </div>
            </div>

          <div className="media">
            <div className="row">
              <div className="col-sm-12">
              <div className=" media-left">
                <a href="#">
                <img className="media-object" src="..." alt="..." />
               </a>
             </div>
             <div className="media-body">
              <h4 className="media-heading">Image</h4>
            </div>
         </div>
      </div>
    </div>
  </div>
</div>


    );
  }
});








  module.exports = DashBoard;
