import changeCase from 'change-case';
import $ from "jquery";

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
    $('#results').show('blind');
  }
}

export default FactionUXInterface;
