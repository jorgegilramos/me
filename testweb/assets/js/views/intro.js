var Backbone        = require('backbone');
var _               = require('underscore');
var $               = require('jquery');

var IntroView = Backbone.View.extend({
  initialize: function(options){
    this.appModel = options.appModel;
  }
});

module.exports = IntroView;