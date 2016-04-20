var Backbone = require('backbone');


var Login = Backbone.Model.extend({
 idAttribute: 'cid',
 urlRoot: '/api/login/',
});

var User = Backbone.Model.extend({
 idAttribute: 'cid',
 urlRoot: '/signup/',
});

var Arrangement = Backbone.Model.extend({
  urlRoot: '/api/arrangements/' //+ id
})

var ArrangementCollection = Backbone.Collection.extend({
  model: Arrangement,
  initialize: function(opts){
    this.extraParams = false;
  },
  url: function(){
    var extraParams = "";
    if (this.byUser){
        extraParams = "ByUser";
    }
    return '/api/arrangements' + extraParams + "/";
  }
})

var Cart = Backbone.Model.extend({
  urlRoot: '/api/carts/'
})


var CartCollection = Backbone.Collection.extend({
  model: Cart,
  url: '/api/carts/'
});


var Bouquet = Backbone.Model.extend({
  // urlRoot: '/api/arrangements/'+ bouquetId + '/'
})

var Payment = Backbone.Model.extend({
  urlRoot: '/api/charge/'


module.exports = {
  "Login": Login,
  "User": User,
  "Arrangement" : Arrangement,
  'ArrangementCollection': ArrangementCollection,
  "Cart": Cart,
  "CartCollection": CartCollection,
  "Payment" : Payment,
  "Bouquet" : Bouquet
}
