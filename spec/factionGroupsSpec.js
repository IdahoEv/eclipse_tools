import groupByExpansion from '../src/factionGroups.js'
console.log(groupByExpansion);

describe('groupByExpansion', function(){

  it("should return only the objects with expansion: values", function(){
    var objects = [
      { expansion: 'A',
        name: 'foo'
      },
      {
        expansion: 'A',
        name: 'bar'
      },
      {
        expansion: 'B',
        name: 'baz'
      }
    ];

    var filteredObjects = groupByExpansion(objects, 'A');
    expect(filteredObjects.length).toEqual(2);
  });

});
