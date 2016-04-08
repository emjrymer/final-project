window.$ = window.jQuery = require('jquery');
var Backbone = require('backbone');

var router = require('./routes/routes');
  $(function(){
    Backbone.history.start();
  });
