import FactionSet from './FactionSet.js';
import ArrayShuffler from './ArrayShuffler.js';

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
    var factionArray = FactionSet.factionsWithPlaceholders(factionOptions);

    factionArray = ArrayTools.shuffle(factionArray).slice(0, players);

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
        FactionSet.safeGenericSubset(setName, factionArray);
      )
    });

    // for each generic placeholder in the faction array, replace it with a
    // faction popped off the generic array
    factionArray.forEach((faction, index) => {
      if(faction.kind == 'generic') {
        factionArray.splice(index, 1, genericSubsets[faction.set].pop());
      }
    });

    return factionArray;
  }
}
