
import FactionSet from '../src/FactionSet.js'

describe('FactionSet', ()=>{

  describe('factionsWithPlaceholders', () => {
    var source, results;
    beforeEach(() => {
      source = [
        { set: "Eclipse", name: "E1", kind: 'specific' },
        { set: "Eclipse", name: "E2", kind: 'specific' },
        { set: "Eclipse", name: "E3", kind: 'specific' },
        { set: "Eclipse", name: "EG1", kind: 'generic' },
        { set: "Eclipse", name: "EG2", kind: 'generic' },
        { set: "Rise of the Ancients", name: "R1", kind: 'specific' },
        { set: "Rise of the Ancients", name: "RG1", kind: 'generic' },
      ];
    });

    it("should make an array with factions from one set and zero placeholders", () => {
      var selector = { "Eclipse": { numGenerics: 0} };
      var results = FactionSet.factionsWithPlaceholders(selector, source);
      expect(results.length).toEqual(3);
      var names = results.map((faction) => {return faction.name});
      expect(names).toContain("E1");
      expect(names).toContain("E2");
      expect(names).toContain("E3");
      expect(names).not.toContain("EG1");
      expect(names).not.toContain("EG2");
      expect(names).not.toContain("R1");
      expect(names).not.toContain("RG1");
    });

    it("should make an array with factions from two sets and zero placeholders", () => {
      var selector = {
        "Eclipse":              { numGenerics: 0},
        "Rise of the Ancients": { numGenerics: 0}
      };
      var results = FactionSet.factionsWithPlaceholders(selector, source);
      expect(results.length).toEqual(4);
      var names = results.map((faction) => {return faction.name});
      expect(names).toContain("E1");
      expect(names).toContain("E2");
      expect(names).toContain("E3");
      expect(names).not.toContain("EG1");
      expect(names).not.toContain("EG2");
      expect(names).toContain("R1");
      expect(names).not.toContain("RG1");
    });


    it("should make an array with factions from two sets and two placeholders each", () => {
      var selector = {
        "Eclipse":              { numGenerics: 2},
        "Rise of the Ancients": { numGenerics: 2}
      };
      var results = FactionSet.factionsWithPlaceholders(selector, source);
      expect(results.length).toEqual(8);
      var names = results.map((faction) => {return faction.name});
      expect(names).toContain("E1");
      expect(names).toContain("E2");
      expect(names).toContain("E3");
      expect(names).not.toContain("EG1");
      expect(names).not.toContain("EG2");
      expect(names).toContain("R1");
      expect(names).not.toContain("RG1");

      expect(names).toContain('terrans');
      expect(names).toContain('magellan');
    });

    it("should make an array with factions from two sets and two placeholders each", () => {
      var selector = {
        "Eclipse":              { numGenerics: 2},
        "Rise of the Ancients": { numGenerics: 2},
        "Shadow of the Rift":   false
      };
      var results = FactionSet.factionsWithPlaceholders(selector, source);
      console.log(results);
      expect(results.length).toEqual(8);
      var names = results.map((faction) => {return faction.name});
      expect(names).toContain("E1");
      expect(names).toContain("E2");
      expect(names).toContain("E3");
      expect(names).not.toContain("EG1");
      expect(names).not.toContain("EG2");
      expect(names).toContain("R1");
      expect(names).not.toContain("RG1");

      expect(names).toContain('terrans');
      expect(names).toContain('magellan');
    });
  });

  describe('safeGenericSubset', () => {
    var source, selected, results;
    beforeEach(() => {
      source = [
        { set: "Eclipse", name: "E1", kind: 'specific', page: '01' },
        { set: "Eclipse", name: "E2", kind: 'specific', page: '02' },
        { set: "Eclipse", name: "E3", kind: 'specific', page: '03' },
        { set: "Eclipse", name: "EG1", kind: 'generic', page: '01' },
        { set: "Eclipse", name: "EG2", kind: 'generic', page: '02' },
        { set: "Eclipse", name: "EG3", kind: 'generic', page: '03' },
        { set: "Rise of the Ancients", name: "R1", kind: 'specific', page: '04' },
        { set: "Rise of the Ancients", name: "R2", kind: 'specific', page: '05' },
        { set: "Rise of the Ancients", name: "RG1", kind: 'generic', page: '04' },
        { set: "Rise of the Ancients", name: "RG2", kind: 'generic', page: '05' },
      ];
    });

    it("should return the generics that don't have the same pages as already-selected specifics", () => {
      selected = [
        { set: "Eclipse",              name: "E2", kind: 'specific', page: '02' },
        { set: "Rise of the Ancients", name: "R1", kind: 'specific', page: '04' },
      ];
      var results = FactionSet.safeGenericSubset("Eclipse", selected, source);
      expect(results.length).toEqual(2);
      expect(results).toContain({ set: "Eclipse", name: "EG1", kind: 'generic', page: '01' });
      expect(results).toContain({ set: "Eclipse", name: "EG3", kind: 'generic', page: '03' });
    });

    it("should return the generics that don't have the same pages as already-selected specifics", () => {
      selected = [
        { set: "Eclipse",              name: "E2", kind: 'specific', page: '02' },
        { set: "Rise of the Ancients", name: "R1", kind: 'specific', page: '04' },
      ];
      var results = FactionSet.safeGenericSubset("Rise of the Ancients", selected, source);
      expect(results.length).toEqual(1);
      expect(results).toContain({ set: "Rise of the Ancients", name: "RG2", kind: 'generic', page: '05' });
    });
  });

  describe('genericPlaceholder', () => {
    it("should generate an array containing a single generic placeholder for Eclipse", () => {
      expect(FactionSet.genericPlaceholder("Eclipse",1)).toEqual([{
        kind: "generic",
        set:  "Eclipse",
        name: "terrans",
        placeholder: true
      }]);
    });
    it("should generate an array containing a single generic placeholder for Rise of the Ancients", () => {
      expect(FactionSet.genericPlaceholder("Rise of the Ancients", 1)).toEqual([{
        kind: "generic",
        set:  "Rise of the Ancients",
        name: "magellan",
        placeholder: true
      }]);
    });
    it("should generate an array containing a single generic placeholder for Shadow of the Rift", () => {
      expect(FactionSet.genericPlaceholder("Shadow of the Rift", 1)).toEqual([{
        kind: "generic",
        set:  "Shadow of the Rift",
        name: "octantis",
        placeholder: true
      }]);
    });

    it("should generate multiple generic placeholders for Eclipse", () => {
      expect(FactionSet.genericPlaceholder("Eclipse", 3)).toEqual([{
            kind: "generic",
            set:  "Eclipse",
            name: "terrans",
            placeholder: true
          },
          {
            kind: "generic",
            set:  "Eclipse",
            name: "terrans",
            placeholder: true
          },
          {
            kind: "generic",
            set:  "Eclipse",
            name: "terrans",
            placeholder: true
          }
      ]);

    });
  });
});
