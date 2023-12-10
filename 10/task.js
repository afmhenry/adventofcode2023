import fs from "fs";
const day = 10;

const charMapping = {
  L: "└",
  J: "┘",
  7: "┐",
  F: "┌",
};

const directionMapping = {
  L: [{ x: 1 }, { y: 1 }],
  J: [{ x: -1 }, { y: 1 }],
  7: [{ x: -1 }, { y: -1 }],
  F: [{ x: 1 }, { y: -1 }],
  "-": [{ x: 1 }, { x: -1 }],
  "|": [{ y: 1 }, { y: -1 }],
};
function runTask(stage, filename, task, expected) {
  console.log(`\nTask ${stage} - ${filename}`);
  console.time(`\tTimer`);
  const result = task(filename);
  console.timeEnd(`\tTimer`);
  console.log(`\tExpected ${expected}`);
  console.log(`\tResult: ${result}`);
  console.log(`\tPass: ${result === expected}\n`);
}

runTask("1", "sample", firstTask, 114);
runTask("1", "full", firstTask, 18673);
// runTask("2", "sample", secondTask, 2);
// runTask("2", "full", secondTask, 948);

function firstTask(filename) {
  let result = 0;
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  const inputAsRows = input.split("\n");
  const translatedInput = [];
  inputAsRows.forEach((row) => {
    if (!row) return;
    translatedInput.push(
      row.split("").map((e) => (charMapping[e] ? charMapping[e] : e))
    );
  });

  // determine location of s
  // follow each path, replacing previous node with count
  // when next node is a known node, stop
  console.log(translatedInput.map((e) => e.join("")).join("\n"));

  return result;
}
function secondTask(filename) {
  let result = 0;
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  const inputAsRows = input.split("\n");
  inputAsRows.forEach((row) => {
    if (!row) return;
  });

  return result;
}
