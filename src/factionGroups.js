import factionData from './factionData.js';

export default class  {

  static bySet(set, factions = factionData ) {
    console.log("factions is a "+(typeof factions));
    return factions.filter((faction, _idx, _arr) => {
      return faction.set == set;
    })
  }



}
