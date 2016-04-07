import $ from "jquery";
import UX         from './FactionUXInterface.js';
import Randomizer from './FactionRandomizer.js';

$(function(){
  $('#randomize_trigger').click(()=>{
    var options = {};
    options['Eclipse'] = UX.assembleFactionSpecifier('Eclipse');
    options['Rise of the Ancients'] = UX.assembleFactionSpecifier('Rise of the Ancients');
    options['Shadow of the Rift']   = UX.assembleFactionSpecifier('Shadow of the Rift');

    var playerCount = $('#player_count').val();
    var results = Randomizer.getRandomFactions(playerCount, options);

    UX.populateResults(results);
  });
});
