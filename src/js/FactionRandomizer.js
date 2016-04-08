import FactionSet from './FactionSet.js';
import ArrayTools from './ArrayTools.js';

const SET_SELECTION_MAX = {
  'Eclipse': 6,
  'Rise of the Ancients': 3,
  'Shadow of the Rift': 2
}
var FactionRandomizer = class {

  // players should be an integer.  FactionOptions should
  // be an object like:
  //
  // {
  //   "Eclipse": { generics: 2 },
  //   "Rise of the Ancients": { generics: 1}
  // }
  //
  // That selector would select from the 6 base factions, 2 terrans, the
  // 3 Rise factions, 2 magellan, but would exclude the Shadow of the Rift factions.
  static getRandomFactions(players, factionOptions) {

    // Insert placeholders for generic factions and randomize
    var factionArray = ArrayTools.shuffle(FactionSet.factionsWithPlaceholders(factionOptions));
    //this._logFactionArray('--------------randomized factions', factionArray);

    var setSelectionCount = {
      'Eclipse': 0,
      'Rise of the Ancients': 0,
      'Shadow of the Rift': 0
    };

    // Walk the array and null out factions that collide with previous ones
    for (var ii = 0; ii < factionArray.length; ii++) {
      var set = factionArray[ii].set;
      if (setSelectionCount[set] >= SET_SELECTION_MAX[set]) {
        factionArray[ii] = null;
      } else {
        setSelectionCount[set] += 1;
      }
    }

    // strip nulls and slice to N players
    factionArray = factionArray.filter((faction) => faction).slice(0, players);

    var selectedSpecifics = factionArray.filter((faction) => {
      return faction.kind == 'specific';
    });

    var selectedSetsWithGenerics = ArrayTools.unique(factionArray.reduce((sets, faction, _idx, _arr) => {
      if (faction.kind == "generic") {
        sets.push(faction.set);
      }
      return sets
    }, []));

    // make a safe generic subset for each faction represented in the array
    // randomize those subsets
    var genericSubsets = {};
    selectedSetsWithGenerics.forEach((setName)=>{
      genericSubsets[setName] = ArrayTools.shuffle(
        FactionSet.safeGenericSubset(setName, factionArray)
      );
    });

    // for each generic placeholder in the faction array, replace it with a
    // faction popped off the generic array
    factionArray.forEach((faction, index) => {
      if(faction.kind == 'generic') {
        factionArray.splice(index, 1, genericSubsets[faction.set].pop());
      }
    });

    // Need a final shuffle to eliminate biases caused by the conflict resolver, which is
    // more likely to eliminate expansion set factions later in the array.
    return ArrayTools.shuffle(factionArray);
  }

  static _logFactionArray(label, arr) {
    console.log("\n\n");
    console.log(label);
    arr.forEach((faction, idx) => {
      if (faction == undefined) {
        console.log(undefined);
      } else {
        console.log(`${faction.name} - ${faction.kind} - ${faction.set}`);
      }
    });
  }
}

export default FactionRandomizer;
