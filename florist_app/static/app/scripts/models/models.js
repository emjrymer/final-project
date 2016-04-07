var Backbone = require('backbone');


var Login = Backbone.Model.extend({
 idAttribute: 'cid',
 urlRoot: '/login/',
});

var User = Backbone.Model.extend({
 idAttribute: 'cid',
 urlRoot: '/signup/',
});

var Arrangment = Backbone.Model.extend({
  urlRoot: '/arrangments/'
})


module.exports = {
  "Login": Login,
  "User": User,
  "Arrangment" : Arrangment
}
