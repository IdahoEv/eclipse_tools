import factionGroups from '../src/factionGroups.js'

describe('factionGroups', ()=>{
  var objects;

  beforeEach(()=>{
    objects = [
      { set: 'A',
        name: 'foo'
      },
      {
        set: 'A',
        name: 'bar'
      },
      {
        set: 'B',
        name: 'baz'
      }
    ];
  });

  describe('bySet', () => {
    it("should return only the objects with matching expansion values", function(){
      var filteredObjects = factionGroups.bySet('A', objects);
      expect(filteredObjects.length).toEqual(2);

      var names = filteredObjects.map((faction)=>{return faction.name});
      expect(names).toContain('foo');
      expect(names).toContain('bar');
      expect(names).not.toContain('baz');
    });

    it("should default to the full list of factions", ()=>{
      var filteredObjects = factionGroups.bySet('Rise of the Ancients');
      var names = filteredObjects.map((faction)=>{return faction.name});
      expect(names).toContain('Exiles');
      expect(names).toContain('Sentinels of Magellan');
      expect(names).not.toContain('Orion Hegemony');

    });
  });

});
