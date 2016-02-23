import factionData from './factionData.js';

export default class  {

  static bySet(set, factions = factionData ) {
    console.log("factions is a "+(typeof factions));
    return factions.filter((faction, _idx, _arr) => {
      return faction.set == set;
    })
  }

  static byKind(kind, factions = factionData) {
    return factions.filter((faction, _idx, _arr) => {
      return faction.kind == kind;
    });
  }

  static specifics(factions = factionData) {
    return this.byKind('specific', factions);
  }

  static generics(factions = factionData) {
    return this.byKind('generic', factions);
  }

}
