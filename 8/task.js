import fs from "fs";
const day = 8;
const map = {};
const newMap = {};
let instructions;

function runTask(stage, filename, task, expected) {
  console.log(`\nTask ${stage} - ${filename}`);
  console.time(`\tTimer`);
  const result = task(filename);
  console.timeEnd(`\tTimer`);
  console.log(`\tExpected ${expected}`);
  console.log(`\tResult: ${result}`);
  console.log(`\tPass: ${result === expected}\n`);
}
runTask("1", "sample", firstTask, 2);
runTask("1", "sample-2", firstTask, 6);
runTask("1", "full", firstTask, 18673);
runTask("2", "sample-3", secondTask, 6);
runTask("2", "full", secondTask, 17972669116327);

function firstTask(filename) {
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  const inputAsRows = input.split("\n");
  instructions = inputAsRows[0].trim().split("");
  let currentLocation = inputAsRows[2].split(" =")[0].trim();
  inputAsRows.forEach((row, i) => {
    if (!row || i === 0) return;
    const [a, b] = row.split(" = ");
    const location = a.trim();
    const [L, R] = b
      .trim()
      .replace("(", "")
      .replace(")", "")
      .split(",")
      .map((e) => e.trim());
    map[location] = { R, L };
  });
  let i = 0;
  // eslint-disable-next-line no-constant-condition
  let prevLocation = currentLocation;
  let result = 0;
  for (i = 0; true; i++) {
    let newLocation = map[prevLocation][instructions[i % instructions.length]];
    newMap[prevLocation] ||= [];
    newMap[prevLocation].push({ i: i + 1, next: newLocation });
    if (newLocation === "ZZZ") {
      result = i + 1;
      break;
    }
    prevLocation = newLocation;
  }
  return result;
}

function secondTask(filename) {
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  const inputAsRows = input.split("\n");
  instructions = inputAsRows[0].trim().split("");
  const allLocations = [];
  inputAsRows.forEach((row, i) => {
    if (!row || i === 0) return;
    const [a, b] = row.split(" = ");
    const location = a.trim();
    const [L, R] = b
      .trim()
      .replace("(", "")
      .replace(")", "")
      .split(",")
      .map((e) => e.trim());
    map[location] = { R, L };
    allLocations.push(location);
  });
  let i = 0;
  let locationHitZ;
  let startingLocations = allLocations.filter((e) => e.endsWith("A"));
  // eslint-disable-next-line no-constant-condition
  let hitZ = [];
  for (i = 0; true; i++) {
    let hits = [];
    startingLocations.forEach((location, j) => {
      let newLocation = map[location][instructions[i % instructions.length]];
      startingLocations[j] = newLocation;
      if (newLocation.endsWith("Z")) {
        hits.push(j);
      }
    });
    startingLocations = startingLocations.filter((e, j) => !hits.includes(j));
    if (hits.length > 0) hitZ.push(i + 1);
    if (startingLocations.length === 0) break;
  }
  const lowestCommonDenominator = hitZ.reduce((acc, val) => lcm(acc, val), 1);
  return lowestCommonDenominator;
}

function lcm(x, y) {
  // Euclidean algorithm
  return !x || !y ? 0 : Math.abs((x * y) / gcd(x, y));
}

function gcd(x, y) {
  // Euclidean algorithm
  x = Math.abs(x);
  y = Math.abs(y);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
}
