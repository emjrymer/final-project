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
  urlRoot: '/api/arrangements/'
})

var ArrangementCollection = Backbone.Collection.extend({
  model: Arrangement,
  url: '/api/arrangements/'
})

var Cart = Backbone.Model.extend({
  urlRoot: '/api/baskets/'
})


var CartCollection = Backbone.Collection.extend({
  model: Cart,
  url: '/api/baskets/'
})



module.exports = {
  "Login": Login,
  "User": User,
  "Arrangement" : Arrangement,
  'ArrangementCollection': ArrangementCollection,
  "Cart": Cart,
  "CartCollection": CartCollection


}
