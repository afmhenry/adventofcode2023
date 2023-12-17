import fs from "fs";
const day = 14;
function transpose(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

function firstTask(filename) {
  let result = 0;
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  const inputAsRows = input.split("\n");
  const matrix = [];
  inputAsRows.forEach((row) => {
    if (!row) return;
    matrix.push(row.split(""));
  });
  const tMatrix = transpose(matrix);
  //console.log(tMatrix.map((e) => e.join("")).join("\n"));

  const shiftedTMatrix = tMatrix.map((row) => shiftStonesLeft(row));
  const resultMatrix = transpose(shiftedTMatrix.map((e) => e.split("")));
  console.log(resultMatrix.map((e) => e.join("")).join("\n"));
  let load = 0;
  resultMatrix.reverse().forEach((e, i) => {
    load += e.filter((ee) => ee === "O").length * (i + 1);
  });
  return load;
}
function shiftStonesLeft(row) {
  return row
    .join("")
    .split("#")
    .map((e) => e.split("").sort().reverse().join(""))
    .join("#");
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

runTask("1", "sample", firstTask, 136);
runTask("1", "full", firstTask, 18673);
// runTask("2", "sample", secondTask, 2);
// runTask("2", "full", secondTask, 948);
