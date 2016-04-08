import changeCase from 'change-case';

var FactionUXInterface = class {

  static assembleFactionOptions() {

  }
  static assembleFactionSpecifier(expansion) {

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
      $('#player_count_'+ii).prop("disabled", ii > maxPlayers);
    }
  }

  static _disableOptionRow(setName) {
  }
}

export default FactionUXInterface;
