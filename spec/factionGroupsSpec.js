import factionGroups from '../src/factionGroups.js'

describe('factionGroups', ()=>{
  var objects;

  beforeEach(()=>{
    objects = [
      { set: 'A',
        name: 'foo',
        kind: 'specific',
        color: 'blue'
      },
      {
        set: 'A',
        name: 'bar',
        kind: 'generic',
        color: 'blue'
      },
      {
        set: 'B',
        name: 'baz',
        kind: 'specific',
        color: 'lemon'
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

  describe('specifics', () => {
    it("should return only specific factions", () => {
      var filteredObjects = factionGroups.specifics(objects);
      expect(filteredObjects.length).toEqual(2);

      var names = filteredObjects.map((faction)=>{return faction.name});
      expect(names).toContain('foo');
      expect(names).toContain('baz');
      expect(names).not.toContain('bar');
    });

    it("should default to the full list of factions", ()=>{
      var filteredObjects = factionGroups.specifics();
      var names = filteredObjects.map((faction)=>{return faction.name});
      expect(names).toContain('Exiles');
      expect(names).not.toContain('Sentinels of Magellan');
      expect(names).toContain('Orion Hegemony');
    });
  });

  describe('generics', () => {
    it("should return only generic factions", () => {
      var filteredObjects = factionGroups.generics(objects);
      expect(filteredObjects.length).toEqual(1);

      var names = filteredObjects.map((faction)=>{return faction.name});
      expect(names).not.toContain('foo');
      expect(names).not.toContain('baz');
      expect(names).toContain('bar');
    });

    it("should default to the full list of factions", ()=>{
      var filteredObjects = factionGroups.generics();
      var names = filteredObjects.map((faction)=>{return faction.name});
      expect(names).not.toContain('Exiles');
      expect(names).toContain('Sentinels of Magellan');
      expect(names).not.toContain('Orion Hegemony');
    });
  });


  describe('genericsExcludingPages', () => {
    beforeEach(()=>{
      objects = [
        { set: 'A',
          name: 'foo',
          kind: 'specific',
          page: '01'
        },
        {
          set: 'A',
          name: 'bar',
          kind: 'generic',
          page: '01'
        },
        {
          set: 'A',
          name: 'baz',
          kind: 'specific',
          page: '02'
        },
        {
          set: 'A',
          name: 'qux',
          kind: 'generic',
          page: '02'
        },
      ];
    });

    it("should strip out th matching colors", () => {
      var filteredObjects = factionGroups.genericsExcludingPages(['01'], objects);
      expect(filteredObjects.length).toEqual(1);

      var names = filteredObjects.map((faction)=>{return faction.name});
      expect(names).not.toContain('foo'); // not generic
      expect(names).not.toContain('bar'); // on page 01
      expect(names).not.toContain('baz'); // not generic
      expect(names).toContain('qux');
    });
  });


});
