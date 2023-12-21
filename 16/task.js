import fs from "fs";
const day = 16;
// result if coming from... [+x:[x,y], -x:[x,y], +y:[x,y], -y:[x,y]]
const mirrors = {
  "/": [[[0, -1]], [[0, 1]], [[-1, 0]], [[1, 0]]],
  "\\": [[[0, 1]], [[0, -1]], [[1, 0]], [[-1, 0]]],
  "|": [
    [
      [0, 1],
      [0, -1],
    ],
    [
      [0, 1],
      [0, -1],
    ],
    [[0, 1]],
    [[0, -1]],
  ],
  "-": [
    [[1, 0]],
    [[-1, 0]],
    [
      [1, 0],
      [-1, 0],
    ],
    [
      [1, 0],
      [-1, 0],
    ],
  ],
};

// dx [-1,1]
// x:
function firstTask(filename) {
  let result = 0;
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  const inputAsRows = input.split("\n");
  const matrix = [];
  inputAsRows.forEach((row) => {
    if (!row) return;
    matrix.push(row.split(""));
  });
  const temp = structuredClone(matrix);
  // [x, y, xdelta, ydelta]

  let current = [0, 0, 1, 0];

  function reflect(state) {
    const [x, y, dx, dy] = state;
    const node = matrix?.[y]?.[x];
    if (!node) return;
    if (temp[y][x] === 10000) {
      return;
    }
    if (temp[y][x] === "#") {
      temp[y][x] = 1;
    } else if (temp[y][x] >= 1) {
      temp[y][x] += 1;
    } else {
      temp[y][x] = "#";
    }

    if (node === ".") {
      if (!matrix?.[y + dy]?.[x + dx]) return;
      return [[x + dx, y + dy, dx, dy]];
    } else {
      return directionToReflections(node, dx, dy).map((dir) => {
        const [ndx, ndy] = dir;
        if (!matrix?.[y + ndy]?.[x + ndx]) return;
        return [x + ndx, y + ndy, ndx, ndy];
      });
    }
  }
  let prev = [current];
  let i = 0;
  while (true) {
    let next = [];
    prev.forEach((node) => {
      if (!node) return;
      let resp = reflect(node);
      if (!resp) return;
      next.push(...resp);
    });
    if (next.length === 0) break;
    prev = next;
  }
  console.log(temp.map((e) => e.join("")).join("\n"));
  // for each # or number, add to result
  temp.forEach((row) => {
    row.forEach((e) => {
      if (e === "#" || e >= 1) result += 1;
    });
  });
  return result;
}

function directionToReflections(node, dx, dy) {
  if (dx === 1) return mirrors[node][0];
  if (dx === -1) return mirrors[node][1];
  if (dy === 1) return mirrors[node][2];
  if (dy === -1) return mirrors[node][3];
  return [];
}

function secondTask(filename) {
  let result = 0;
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  const inputAsRows = input.split("\n");
  const matrix = [];
  inputAsRows.forEach((row) => {
    if (!row) return;
    matrix.push(row.split(""));
  });
  // [x, y, xdelta, ydelta]
  let current = [0, 0, 1, 0];
  let permutations = [];
  console.log(matrix.length, matrix[0].length);
  for (let j = 0; j < matrix.length; j++) {
    permutations.push([j, 0, 1, 0]);
    permutations.push([j, matrix[0].length - 1, -1, 0]);

    for (let k = 0; k < matrix[0].length; k++) {
      permutations.push([0, k, 0, 1]);
      permutations.push([matrix.length - 1, k, 0, -1]);
    }
  }
  console.log(permutations);
  permutations.forEach((iteration) => {
    const temp = structuredClone(matrix);

    function reflect(state) {
      const [x, y, dx, dy] = state;
      const node = matrix?.[y]?.[x];
      if (!node) return;
      if (temp[y][x] === 10000) {
        return;
      }
      if (temp[y][x] === "#") {
        temp[y][x] = 1;
      } else if (temp[y][x] >= 1) {
        temp[y][x] += 1;
      } else {
        temp[y][x] = "#";
      }

      if (node === ".") {
        if (!matrix?.[y + dy]?.[x + dx]) return;
        return [[x + dx, y + dy, dx, dy]];
      } else {
        return directionToReflections(node, dx, dy).map((dir) => {
          const [ndx, ndy] = dir;
          if (!matrix?.[y + ndy]?.[x + ndx]) return;
          return [x + ndx, y + ndy, ndx, ndy];
        });
      }
    }
    let prev = [iteration];
    while (true) {
      let next = [];
      prev.forEach((node) => {
        if (!node) return;
        let resp = reflect(node);
        if (!resp) return;
        next.push(...resp);
      });
      if (next.length === 0) break;
      prev = next;
    }
    //console.log(temp.map((e) => e.join("")).join("\n"));
    // for each # or number, add to result
    let iterationResult = 0;
    temp.forEach((row) => {
      row.forEach((e) => {
        if (e === "#" || e >= 1) iterationResult += 1;
      });
    });
    if (iterationResult > result) {
      console.log(iteration, iterationResult);
      result = iterationResult;
    }
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

//runTask("1", "sample", firstTask, 46);
//runTask("1", "full", firstTask, 7728);
// 6361 too low
// not 6882
// 7663?
runTask("2", "sample", secondTask, 51);
// runTask("2", "full", secondTask, 948);
