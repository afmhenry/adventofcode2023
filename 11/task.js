import fs from "fs";
const day = 11;
const insert = (arr, index, newItem) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  ...newItem,
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

runTask("1", "sample", firstTask, 374);
runTask("1", "full", firstTask, 9918828);
runTask("2", "sample", secondTask, 82000210);
runTask("2", "full", secondTask, 692506533832);
// too low
// 82_000_210

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
          galaxies.push({ id });
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
    galaxies.slice(i + 1).map((w) => [v.id, w.id])
  );

  const emptyColumn = [];
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
  // get the position of each galaxy in the expanded matrix
  galaxies.forEach((galaxy) => {
    galaxy.position ||= {};
    galaxy.position.x = expandedMatrix.findIndex((e) => e.includes(galaxy.id));
    galaxy.position.y = expandedMatrix[galaxy.position.x].findIndex(
      (e) => e === galaxy.id
    );
  });

  galaxyPairs.forEach(([a, b]) => {
    const [posA, posB] = galaxies
      .filter((g) => g.id === a || g.id === b)
      .map((e) => e.position);
    result += Math.abs(posA.x - posB.x) + Math.abs(posA.y - posB.y);
  });
  //console.log(galaxies, galaxyPairs);
  //console.log(expandedMatrix.map((e) => e.join("")).join("\n"));

  return result;
}

function secondTask(filename) {
  let result = 0;
  const expansion = 1_000_000 - 1;
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  const inputAsRows = input.split("\n");
  const emptyColumn = [];
  const emptyRow = [];
  let matrix = [];
  let galaxies = [];

  inputAsRows.forEach((row, i) => {
    if (!row) return;
    row = row.split("");
    if (row.includes("#")) {
      row = row.map((e) => {
        if (e === "#") {
          let id = galaxies.length + 1;
          galaxies.push({ id });
          return id;
        } else {
          return e;
        }
      });
    } else {
      emptyRow.push(i);
    }
    matrix.push(row);
  });
  const galaxyPairs = galaxies.flatMap((v, i) =>
    galaxies.slice(i + 1).map((w) => [v.id, w.id])
  );

  matrix[0].forEach((_, i) => {
    if (matrix.filter((e) => e[i] !== ".").length === 0) {
      emptyColumn.push(i);
    }
  });

  // get the position of each galaxy in the expanded matrix
  galaxies.forEach((galaxy) => {
    galaxy.position ||= {};
    galaxy.position.x = matrix.findIndex((e) => e.includes(galaxy.id));
    galaxy.position.y = matrix[galaxy.position.x].findIndex(
      (e) => e === galaxy.id
    );
  });
  // console.log("y:", emptyColumn);
  // console.log("x:", emptyRow);

  galaxyPairs.forEach(([a, b]) => {
    const [posA, posB] = galaxies
      .filter((g) => g.id === a || g.id === b)
      .map((e) => e.position);

    // console.log(a, posA);
    // console.log(b, posB);

    const yMultiplier =
      emptyColumn.filter(
        (e) => (e > posA.y && e < posB.y) || (e < posA.y && e > posB.y)
      ).length * expansion;
    const xMultiplier =
      emptyRow.filter(
        (e) => (e > posA.x && e < posB.x) || (e < posA.x && e > posB.x)
      ).length * expansion;
    //console.log("\t", xMultiplier, yMultiplier);
    result +=
      Math.abs(posA.x - posB.x) +
      yMultiplier +
      xMultiplier +
      Math.abs(posA.y - posB.y);
  });
  //console.log(matrix.map((e) => e.join("")).join("\n"));

  return result;
}
