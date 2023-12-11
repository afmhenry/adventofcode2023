import fs from "fs";
const day = 11;
const insert = (arr, index, newItem) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index),
];
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
// runTask("1", "full", firstTask, 18673);
// runTask("2", "sample", secondTask, 2);
// runTask("2", "full", secondTask, 948);

function firstTask(filename) {
  let result = 0;
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  const inputAsRows = input.split("\n");
  let matrix = [];
  let expandedMatrix = [];
  let galaxies = [];

  inputAsRows.forEach((row, i) => {
    if (!row) return;
    row = row.split("");
    if (row.includes("#")) {
      row = row.map((e) => {
        if (e === "#") {
          let id = galaxies.length + 1;
          galaxies.push(id);
          return id;
        } else {
          return e;
        }
      });
    } else {
      expandedMatrix.push(row);
    }
    expandedMatrix.push(row);
    matrix.push(row);
  });
  const galaxyPairs = galaxies.flatMap((v, i) =>
    galaxies.slice(i + 1).map((w) => v + " " + w)
  );
  const emptyColumn = [];
  let expandedColIndex = 0;
  expandedMatrix[0].forEach((_, i) => {
    if (expandedMatrix.filter((e) => e[i] !== ".").length === 0) {
      emptyColumn.push(i);
    }
  });
  emptyColumn.reverse().forEach((newColIndex) => {
    expandedMatrix.forEach(
      (e, i) => (expandedMatrix[i] = insert(e, newColIndex, "."))
    );
  });
  console.log(galaxyPairs);
  console.log(expandedMatrix.map((e) => e.join("")).join("\n"));

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
