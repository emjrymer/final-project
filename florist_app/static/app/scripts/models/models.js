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
  url: '/api/arrangements/'
})

var Cart = Backbone.Model.extend({
  urlRoot: '/api/carts/'
})


var CartCollection = Backbone.Collection.extend({
  model: Cart,
  url: '/api/carts/'
})



module.exports = {
  "Login": Login,
  "User": User,
  "Arrangement" : Arrangement,
  'ArrangementCollection': ArrangementCollection,
  "Cart": Cart,
  "CartCollection": CartCollection
}
