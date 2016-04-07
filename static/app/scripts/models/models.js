var Backbone = require('backbone');


var Login = Backbone.Model.extend({
 idAttribute: 'cid',
 urlRoot: '/login/',
});

var User = Backbone.Model.extend({
 idAttribute: 'cid',
 urlRoot: '/signup/',
});



module.exports = {
  "Login": Login,
  "User": User
}
