import changeCase from 'change-case';
import Randomizer from './FactionRandomizer.js';

var FactionUXInterface = class {

  static _assembleFactionSpecifier(expansion) {

    var divID = '#' + changeCase.snakeCase(expansion) + '_selections';
    var checkbox = divID + ' .expansion_toggler';
    var dropdown = divID + ' select';


    if ($(checkbox).prop('checked')) {
      return { numGenerics: Number($(dropdown).val()) };
    } else {
      return false;
    }
  }

  static populateResults(factionArray) {
    var output = "<tr><th>Player</th><th>Faction</th><th>Color</th>";
    var num = 1;
    for (var faction of factionArray) {
      output += `<tr><td>${num}</td><td>${faction.name}</td><td>${faction.color}</td>`;
      num += 1;
    }
    $('#results table').html(output);
    $('#results').show(350);
    $('#settings').hide(350);
  }

  // Handle all the things that need to get updated when a setting changes
  static digest(){
    var maxPlayers = 0;

    // TODO probably DRY this bit out, eh?
    if ($('#eclipse_selections .expansion_toggler').prop('checked')) {
      maxPlayers += 6;
      $('#eclipse_selections').removeClass('disabled');
    } else {
      $('#eclipse_selections').addClass('disabled');
    }

    if ($('#rise_of_the_ancients_selections .expansion_toggler').prop('checked')) {
      maxPlayers += 3;
      $('#rise_of_the_ancients_selections').removeClass('disabled');
    } else {
      $('#rise_of_the_ancients_selections').addClass('disabled');
    }


    if ($('#shadow_of_the_rift_selections .expansion_toggler').prop('checked')) {
      maxPlayers += 2;
      $('#shadow_of_the_rift_selections').removeClass('disabled');
    } else {
      $('#shadow_of_the_rift_selections').addClass('disabled');
    }

    if (maxPlayers > 12) {
      maxPlayers = 12;
    }

    // Don't allow randomize if there aren't any sets selected
    $("#randomize_trigger").prop('disabled', maxPlayers < 2);

    // If the user currently has too many players selected, reduce their
    // selection to the max currently allowable
    var playerCount = $('#player_count').val();
    if (playerCount > maxPlayers) {
      $('#player_count').val(maxPlayers.toString())
    }

    // disable all player # options greater than maxPlayers
    for (var ii = 2; ii < 13; ii++) {
      if ( ii > maxPlayers) {
        $('#player_count_'+ii).prop("disabled", true);
        $(`#player_options .menu .item[data-value='${ii}']`).addClass("disabled");
      } else {
        $('#player_count_'+ii).prop("disabled", false);
        $(`#player_options .menu .item[data-value='${ii}']`).removeClass("disabled");
      }
    }
  }

  static setUpOnLoad(){
    $('#randomize_trigger, #reroll_trigger').click(()=>{
      var options = {};
      options['Eclipse'] =              this._assembleFactionSpecifier('Eclipse');
      options['Rise of the Ancients'] = this._assembleFactionSpecifier('Rise of the Ancients');
      options['Shadow of the Rift']   = this._assembleFactionSpecifier('Shadow of the Rift');

      var playerCount = $('#player_count').val();
      var results = Randomizer.getRandomFactions(playerCount, options);

      this.populateResults(results);
      ga('send', 'event', 'Faction Randomizer', 'Generate', '', playerCount);
    });


    $('#change_trigger').click(()=>{
      //$('#results').slideUp(300);
      $('#results').hide(300);
      $('#settings').show(300);
    });
    $('.expansion_toggler').change((element) => {
      this.digest();
    });
    this.digest();
  }
}

export default FactionUXInterface;
