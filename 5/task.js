import fs from "fs";
const day = 5;

function runTask(stage, filename, task, expected) {
  console.log(`\nTask ${stage} - ${filename}`);
  console.time(`\tTimer`);
  const result = task(filename);
  console.timeEnd(`\tTimer`);
  console.log(`\tExpected ${expected}`);
  console.log(`\tResult: ${result}`);
  console.log(`\tPass: ${result === expected}\n`);
}
runTask("1", "sample", firstTask, 35);
runTask("1", "full", firstTask, 3374647);

runTask("2", "sample", secondTask, 46);
//runTask("2", "full", secondTask, 46);

function firstTask(filename) {
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  const inputAsRows = input.split("\n");
  let seeds = [];
  let mappings = {};
  let map = {};
  let currentMap = "";
  inputAsRows.forEach((row) => {
    if (!row) return;
    if (row.startsWith("seeds:")) {
      seeds.push(
        ...row
          .split(":")[1]
          .trim()
          .split(" ")
          .map((e) => parseInt(e))
      );
      return;
    }
    if (row.includes(" map:")) {
      currentMap = row.split(" map:")[0];
      mappings[currentMap] = [];
    } else {
      const [destRange, sourceRange, rangeLength] = row
        .split(" ")
        .filter((e) => e !== undefined)
        .map((e) => parseInt(e));
      mappings[currentMap].push({ destRange, sourceRange, rangeLength });
    }
  });
  const locations = [];
  seeds.forEach((seed) => {
    const originalSeed = seed;
    map[originalSeed] = {};
    Object.keys(mappings).forEach((key) => {
      let seedChanged = false;
      mappings[key].forEach((mapping) => {
        if (seedChanged) return;
        const { destRange, sourceRange, rangeLength } = mapping;
        if (sourceRange <= seed && seed < sourceRange + rangeLength) {
          seed = destRange + seed - sourceRange;
          seedChanged = true;
        }
      });
      //map[originalSeed][key] = seed;
      if (key === "humidity-to-location") {
        locations.push(seed);
      }
    });
  });
  return Math.min(...locations);
}

function secondTask(filename) {
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  const inputAsRows = input.split("\n");
  let seeds = [];
  let newSeeds = [];
  let mappings = {};
  let currentMap = "";
  inputAsRows.forEach((row) => {
    if (!row) return;
    if (row.startsWith("seeds:")) {
      const seedInput = row
        .split(":")[1]
        .trim()
        .split(" ")
        .map((e) => parseInt(e));
      for (var i = 0; seedInput[i]; i += 2) {
        seeds.push({ seedStart: seedInput[i], range: seedInput[i + 1] });
      }
      return;
    }
    if (row.includes(" map:")) {
      currentMap = row.split(" map:")[0];
      mappings[currentMap] = [];
    } else {
      const [destRange, sourceRange, rangeLength] = row
        .split(" ")
        .filter((e) => e !== undefined)
        .map((e) => parseInt(e));
      mappings[currentMap].push({ destRange, sourceRange, rangeLength });
    }
  });
  seeds.forEach((seedDetails) => {
    console.log(seedDetails);
  });
  return 0;
}
