var Backbone = require('backbone');


var Login = Backbone.Model.extend({
 idAttribute: 'cid',
 urlRoot: '/login/',
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


module.exports = {
  "Login": Login,
  "User": User,
  "Arrangement" : Arrangement,
  'ArrangementCollection': ArrangementCollection

}
