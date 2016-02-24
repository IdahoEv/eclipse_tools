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
    return source.filter((faction) => {
      return (faction.set == "Eclipse" && faction.kind == 'specific');
    });
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
}

export default FactionSet
