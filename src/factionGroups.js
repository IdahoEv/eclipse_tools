export default function groupByExpansion(factions, expansion) {
  console.log("factions is a "+(typeof factions));
  return factions.filter((faction, _idx, _arr) => {
    return faction.expansion == expansion;
  })
}
