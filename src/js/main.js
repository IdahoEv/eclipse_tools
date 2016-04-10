import UX         from './FactionUXInterface.js';
var packageJSON = require('../../package.json');

$(function(){

  $('.ui.dropdown').dropdown();
  $("#version").html(packageJSON.version);

  UX.setUpOnLoad();
});
