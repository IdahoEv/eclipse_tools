
import FactionSet from '../src/FactionSet.js'

describe('FactionSet', ()=>{


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
