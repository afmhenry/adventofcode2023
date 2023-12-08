import fs from "fs";
const day = 8;
const map = {};
const newMap = {};
let instructions;
let iterations = 1;

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
// runTask("2", "sample", secondTask, 5905);
// runTask("2", "full", secondTask, 254115617);
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
  let prevLocation = "AAA";
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