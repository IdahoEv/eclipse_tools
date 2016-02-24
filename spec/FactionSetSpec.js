
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
  });

  describe('genericPlaceholder', () => {
    it("should generate an array containing a single generic placeholder for Eclipse", () => {
      expect(FactionSet.genericPlaceholder("Eclipse")).toEqual([{
        kind: "generic",
        set:  "Eclipse",
        name: "terrans",
        placeholder: true
      }]);
    });
    it("should generate an array containing a single generic placeholder for Rise of the Ancients", () => {
      expect(FactionSet.genericPlaceholder("Rise of the Ancients")).toEqual([{
        kind: "generic",
        set:  "Rise of the Ancients",
        name: "magellan",
        placeholder: true
      }]);
    });
    it("should generate an array containing a single generic placeholder for Shadow of the Rift", () => {
      expect(FactionSet.genericPlaceholder("Shadow of the Rift")).toEqual([{
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
