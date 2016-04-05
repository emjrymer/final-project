var Backbone = require('backbone');


var Login = Backbone.Model.extend({
 idAttribute: 'cid'
});

var SellerCollection = Backbone.Collection.extend({
  model: Login,
  url: 'http://tiny-ring-server.herokuapp.com/',
  parse: function(data){
    return data;
  }
});

module.exports = {
  "Login": Login,
  "SellerCollection": SellerCollection
}
