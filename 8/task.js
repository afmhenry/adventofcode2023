import fs from "fs";
const day = 8;
const map = {};
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
//runTask("1", "full", firstTask, 254024898);
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
  Object.entries(map).forEach(([key, value]) => {
    let prevLocation = key;
    for (i = 0; i < instructions.length; i++) {
      prevLocation = map[prevLocation][instructions[i]];
      map[key][instructions.slice(0, i + 1).join("")] = prevLocation;
    }
  });
  console.log(map);
  // while (true) {
  //   currentLocation = map[currentLocation].X;
  //   if (currentLocation === "ZZZ") break;
  //   i++;
  // }
  // return (i * instructions.length) / 2;
}

function enrichLocation(currentLocation, i) {}
