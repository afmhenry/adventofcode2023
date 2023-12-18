import fs from "fs";
const day = 18;
function transpose(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

function firstTask(filename) {
  let result = 0;
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  const inputAsRows = input.split("\n");
  let position = [0, 0];
  let nodes = [];
  inputAsRows.forEach((row) => {
    if (!row) return;
    let [direction, steps, color] = row.split(" ");
    const [x, y] = position;
    const stepsAsNumber = parseInt(steps);
    color = color.replace(/(\(|\))/g, "");
    switch (direction) {
      case "R":
        for (let i = 0; i < stepsAsNumber; i++) {
          nodes.push([x + i, y, color]);
        }
        position = [x + stepsAsNumber, y];
        break;
      case "L":
        for (let i = 0; i < stepsAsNumber; i++) {
          nodes.push([x - i, y, color]);
        }
        position = [x - stepsAsNumber, y];
        break;
      case "D":
        for (let i = 0; i < stepsAsNumber; i++) {
          nodes.push([x, y + i, color]);
        }
        position = [x, y + stepsAsNumber];
        break;
      case "U":
        for (let i = 0; i < stepsAsNumber; i++) {
          nodes.push([x, y - i, color]);
        }
        position = [x, y - stepsAsNumber];
        break;
    }
  });
  const maxX = Math.max(...nodes.map((node) => node[0]));
  const minX = Math.min(...nodes.map((node) => node[0]));
  const maxY = Math.max(...nodes.map((node) => node[1]));
  const minY = Math.min(...nodes.map((node) => node[1]));
  const matrix = [];
  for (let i = 0; i <= maxY - minY; i++) {
    matrix.push([]);
    for (let j = 0; j <= maxX - minX; j++) {
      matrix[i].push(".");
    }
  }
  console.log(maxX, minX, maxY, minY);
  // for each position, add to the matrix
  nodes.forEach((node) => {
    const [x, y, color] = node;
    matrix[y - minY][x - minX] = "#";
  });
  console.log(matrix.map((e) => e.join(" ")).join("\n"));

  matrix.forEach((row) => {
    // get indexes of #
    const walls = [];
    let wallActive = false;
    // fill in the walls
    let prev = 
    row.forEach((e) => {
     
    });
    console.log(walls.join(""));
    result += walls.length;
  });
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
//runTask("1", "full", firstTask, 18673);
// runTask("2", "sample", secondTask, 2);
// runTask("2", "full", secondTask, 948);
