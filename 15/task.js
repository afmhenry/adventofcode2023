import fs from "fs";
const day = 15;

function firstTask(filename) {
  let result = 0;
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  const inputAsRows = input.split(",");
  inputAsRows.forEach((row) => {
    let current = 0;

    if (!row) return;
    row.split("").forEach((char) => {
      current += char.charCodeAt();
      current *= 17;
      current %= 256;
    });
    result += current;
  });

  return result;
}

function HASH(chars) {
  let current = 0;
  chars.split("").forEach((char) => {
    current += char.charCodeAt();
    current *= 17;
    current %= 256;
  });
  return current;
}
function secondTask(filename) {
  let result = 0;
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  const inputAsRows = input.split(",");
  const boxes = {};
  inputAsRows.forEach((row) => {
    let current = 0;

    if (!row) return;
    if (row.includes("=")) {
      const [label, focal] = row.split("=");
      const labelHash = HASH(label);
      boxes[labelHash] ||= {};
      boxes[labelHash][label] = focal;
    } else if (row.includes("-")) {
      const label = row.split("-")[0];
      const labelHash = HASH(label);
      if (boxes[labelHash]?.[label]) delete boxes[labelHash][label];
    }
  });
  Object.entries(boxes).forEach(([i, contents]) => {
    i = parseInt(i);
    if (!Object.keys(contents).length) return;
    Object.values(contents).forEach((e, j) => {
      result += (i + 1) * parseInt(e) * (j + 1);
    });
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

runTask("1", "sample", firstTask, 1320);
runTask("1", "full", firstTask, 517551);
runTask("2", "sample", secondTask, 145);
runTask("2", "full", secondTask, 948);
