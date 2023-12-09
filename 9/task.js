import fs from "fs";
const day = 9;

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
/* runTask("2", "sample-3", secondTask, 6);
runTask("2", "full", secondTask, 17972669116327);  */

function firstTask(filename) {
  let result = 0;
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  const inputAsRows = input.split("\n");
  inputAsRows.forEach((row, i) => {
    let pyrEntry = [];
    if (!row) return;
    const values = row.split(" ").map((e) => parseInt(e));
    let prevDelta = values;
    while (true) {
      pyrEntry.push(prevDelta);
      if (prevDelta.filter((e) => e !== 0).length === 0) break;
      prevDelta = produceDelta(prevDelta);
    }
    const revEntry = pyrEntry.reverse();
    revEntry.forEach((iter, j) => {
      const incrementBy = (revEntry?.[j - 1] || [0]).slice(-1)[0];
      iter.push(iter.slice(-1)[0] + incrementBy);
    });
    result += revEntry.slice(-1)[0].slice(-1)[0];
  });

  return result;
}

function produceDelta(array) {
  const delta = [];
  array.forEach((e, i) => {
    if (i === array.length - 1) return;
    delta.push(array[i + 1] - e);
  });
  return delta;
}

function secondTask(filename) {
  let result = 0;
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  const inputAsRows = input.split("\n");
  inputAsRows.forEach((row, i) => {
    let pyrEntry = [];
    if (!row) return;
    const values = row.split(" ").map((e) => parseInt(e));
    let prevDelta = values;
    while (true) {
      pyrEntry.push(prevDelta);
      if (prevDelta.filter((e) => e !== 0).length === 0) break;
      prevDelta = produceDelta(prevDelta);
    }
    const revEntry = pyrEntry.reverse();
    revEntry.forEach((iter, j) => {
      const incrementBy = (revEntry?.[j - 1] || [0]).slice(1)[0];
      iter.push(iter.slice(1)[0] + incrementBy);
    });
    result += revEntry.slice(-1)[0].slice(1)[0];
  });

  return result;
}

