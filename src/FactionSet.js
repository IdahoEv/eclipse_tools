const PLACEHOLDER_TEMPLATE =  {
      kind:        "generic",
      placeholder: true
}
const PLACEHOLDER_GENERIC_NAMES = {
      "Eclipse":                "terrans",
      "Rise of the Ancients":   "magellan",
      "Shadow of the Rift":     "octantis"
}

var FactionSet = class  {


  static factionsWithPlaceholders(selector, source) {
    var setNames = Object.keys(selector);
    var factionSet = [];

    factionSet = factionSet.concat(this._gatherSpecifics(setNames, source));
    factionSet = factionSet.concat(this._addGenericPlaceholders(selector));

    return factionSet;
  }


  static genericPlaceholder(set, count=1) {
    var placeholders = [];
    for(var ii = 0; ii<count; ii++) {
      var obj = {};
      Object.assign(obj, PLACEHOLDER_TEMPLATE);
      obj.set  = set;
      obj.name = PLACEHOLDER_GENERIC_NAMES[set];
      placeholders.push(obj);
    }
    return placeholders;
  }

  // Pull all the specific factions from the named sets.
  static _gatherSpecifics(setNames, source) {
    return source.filter((faction) => {
      return (setNames.includes(faction.set) && faction.kind == 'specific');
    });
  }

  // Generate the right number of generic placeholders for the named sets
  static _addGenericPlaceholders(selector, source) {
    var placeholders = [];
    for (let set of Object.keys(selector)) {
      placeholders = placeholders.concat(
        this.genericPlaceholder(set,selector[set].numGenerics)
      );
    }
    return placeholders;
  };
}

export default FactionSet
