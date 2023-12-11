import fs from "fs";
const day = 10;

const charMapping = {
  L: "└",
  J: "┘",
  7: "┐",
  F: "┌",
};
let translatedInput = [];
const directionMapping = {
  "└": [{ x: 1 }, { y: -1 }],
  "┘": [{ x: -1 }, { y: -1 }],
  "┐": [{ x: -1 }, { y: 1 }],
  "┌": [{ x: 1 }, { y: 1 }],
  "-": [{ x: 1 }, { x: -1 }],
  "|": [{ y: 1 }, { y: -1 }],
};

const pipeKeys = Object.keys(directionMapping);

function runTask(stage, filename, task, expected) {
  console.log(`\nTask ${stage} - ${filename}`);
  console.time(`\tTimer`);
  const result = task(filename);
  console.timeEnd(`\tTimer`);
  console.log(`\tExpected ${expected}`);
  console.log(`\tResult: ${result}`);
  console.log(`\tPass: ${result === expected}\n`);
}

runTask("1", "sample", firstTask, 4);
runTask("1", "full", firstTask, 7066);
// 12672 too high
// runTask("2", "sample", secondTask, 2);
// runTask("2", "full", secondTask, 948);

function firstTask(filename) {
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  const inputAsRows = input.split("\n");
  let start = {};
  translatedInput = [];
  inputAsRows.forEach((row, y) => {
    if (!row) return;
    const translatedRow = row
      .split("")
      .map((e) => (charMapping[e] ? charMapping[e] : e));
    translatedInput.push(translatedRow);

    const startingX = translatedRow.indexOf("S");
    if (startingX >= 0) {
      start = { x: startingX, y };
    }
  });
  // determine location of s
  // follow each path, replacing previous node with count
  // when next node is a known node, stop
  //console.log(translatedInput.map((e) => e.join("")).join("\n"));
  let current = start;
  let index = 0;
  let prevNodes = [...findNextNodes(current, index)];
  while (true) {
    const nextNodes = [];
    index++;
    prevNodes.forEach((node) => {
      nextNodes.push(...findNextNodes(node, index));
    });
    if (nextNodes.length === 0) break;
    prevNodes = nextNodes;
  }
  //console.log(translatedInput.map((e) => e.join("")).join("\n"));
  return index;
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

function findNextNodes(current, i) {
  const { x, y } = current;

  const adjacentNodes = [
    { x: x + 1, y },
    { x: x - 1, y },
    { x, y: y + 1 },
    { x, y: y - 1 },
    //{ x: x + 1, y: y + 1 },
    // { x: x + 1, y: y - 1 },
    // { x: x - 1, y: y + 1 },
    // { x: x - 1, y: y - 1 },
  ];
  let nextNodes = adjacentNodes.filter((e) => {
    const value = translatedInput?.[e.y]?.[e.x];
    if (!value) return false;
    const isPipe = [...pipeKeys].includes(value);
    if (!isPipe) return false;
    // and the direction points to the current node
    const directions = directionMapping[value].filter((d) => {
      if (d.x === undefined) d.x = 0;
      if (d.y === undefined) d.y = 0;
      return e.x + d.x === x && e.y + d.y === y;
    });
    return directions.length;
  });
  translatedInput[y][x] = i;

  return nextNodes;
}
