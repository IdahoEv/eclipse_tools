import $ from "jquery";
import UX         from './FactionUXInterface.js';
import Randomizer from './FactionRandomizer.js';

$(function(){
  console.log('ready handler running');
  $('#randomize_trigger').click(()=>{
    console.log("Trigger clicked!");

    // see which togglers are on

    var options = {};

    options['Eclipse'] = UX.assembleFactionSpecifier('Eclipse');
    options['Rise of the Ancients'] = UX.assembleFactionSpecifier('Rise of the Ancients');
    options['Shadow of the Rift']   = UX.assembleFactionSpecifier('Shadow of the Rift');

    var playerCount = $('#player_count').val();
    var results = Randomizer.getRandomFactions(playerCount, options);
    console.log(results.map(
      (faction) => faction.name
    ));

    UX.populateResults(results);
  });



});
