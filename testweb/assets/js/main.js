var TestWeb = window.TestWeb || (window.TestWeb = {});
var $                   = require('jquery');
global.jQuery           = $;
window.$                = $;
var _                   = require('underscore');
var Backbone            = require('backbone');
Backbone.$ = $;

var Models = {}

var Views = {
  Intro:                require('./views/intro.js')
};

var AppModel = new Backbone.Model();

TestWeb.Main = {
  init: function(){
  }
};
TestWeb.Main.init();