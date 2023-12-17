import fs from "fs";
const day = 12;

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
  inputAsRows.forEach((row) => {
    if (!row) return;
    let [springs, rule] = row.split(" ");
    rule = rule.split(",");
    springs = springs.split(".");
    springPermutations(springs, rule);
  });

  return result;
}

function springPermutations(springs, rule) {
  let ruleMatch = 0;
  springs.forEach((e, i) => {
   
    
  });
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
