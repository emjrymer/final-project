window.$ = window.jQuery = require('jquery');
var Backbone = require('backbone');

var router = require('./routes/routes');
  $(function(){
    var csrftoken = $("input[name='csrfmiddlewaretoken']").val();

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
    
    Backbone.history.start();
  });
