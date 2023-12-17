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
  const resultMatrix = shiftStonesNorthOrSouth(matrix);
  let load = 0;
  resultMatrix.reverse().forEach((e, i) => {
    load += e.filter((ee) => ee === "O").length * (i + 1);
  });
  return load;
}

function cycle(matrix) {
  matrix = shiftStonesNorthOrSouth(matrix);
  matrix = shiftStonesEastOrWest(matrix, false);
  matrix = shiftStonesNorthOrSouth(matrix, false);
  matrix = shiftStonesEastOrWest(matrix);
  return matrix;
}

function shiftStonesNorthOrSouth(matrix, north = true) {
  let tMatrix = transpose(matrix);
  return transpose(
    tMatrix.map((e) =>
      e
        .join("")
        .split("#")
        .map((e) =>
          north
            ? e.split("").sort().reverse().join("")
            : e.split("").sort().join("")
        )
        .join("#")
        .split("")
    )
  );
}

function shiftStonesEastOrWest(matrix, east = true) {
  return matrix.map((e) =>
    e
      .join("")
      .split("#")
      .map((e) =>
        east
          ? e.split("").sort().join("")
          : e.split("").sort().reverse().join("")
      )
      .join("#")
      .split("")
  );
}

function secondTask(filename) {
  let result = 0;
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  const inputAsRows = input.split("\n");
  let matrix = [];
  inputAsRows.forEach((row) => {
    if (!row) return;
    matrix.push(row.split(""));
  });
  console.log(matrix.map((e) => e.join("")).join("\n"), "\n");

  //console.log(tMatrix.map((e) => e.join("")).join("\n"));
  let cyclesRun = 1;
  for (cyclesRun; cyclesRun <= 1_000_000 - 1; cyclesRun++) {
    matrix = cycle(matrix);
    //console.log(cyclesRun);
  }

  let load = 0;
  console.log(matrix.map((e) => e.join("")).join("\n"), "\n");

  matrix.reverse().forEach((e, i) => {
    load += e.filter((ee) => ee === "O").length * (i + 1);
  });
  return load;
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
runTask("1", "full", firstTask, 109596);
runTask("2", "sample", secondTask, 64);
// runTask("2", "full", secondTask, 948);
