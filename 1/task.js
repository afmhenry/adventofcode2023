import fs from "fs";

const day = 1;
const numbers = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
const numbersButReverse = numbers.map((e) => e.split("").reverse().join(""));
const regexOne = new RegExp(`([0-9]|${numbers.join("|")}){1}`);
const regexTwo = new RegExp(`([0-9]|${numbersButReverse.join("|")}){1}`);

function runTask(stage, filename, task, expected) {
  console.log(`\nTask ${stage} - ${filename}`);
  console.time(`\tTimer`);
  const result = task(filename);
  console.timeEnd(`\tTimer`);
  console.log(`\tExpected ${expected}`);
  console.log(`\tResult: ${result}`);
  console.log(`\tPass: ${result === expected}\n`);
}
runTask("1", "sample", firstTask, 142);
runTask("1", "full", firstTask, 53974);

runTask("2", "sample-2", secondTask, 281);
runTask("2", "full", secondTask, 52840);

function firstTask(filename) {
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();

  const inputAsRows = input.split("\n");
  let sum = 0;
  inputAsRows.forEach((e) => {
    if (!e) return;
    const matches = e.matchAll(/[0-9]{1}/g);
    const matchAsArray = [...matches];
    const firstNum = matchAsArray[0][0];
    let result = firstNum;
    result += matchAsArray.slice(-1)[0][0];
    sum += parseInt(result);
  });
  return sum;
}

function secondTask(filename) {
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();

  const inputAsRows = input.split("\n");
  let sum = 0;
  inputAsRows.forEach((row) => {
    if (!row) return;

    let firstMatch = row.match(regexOne)?.[0];
    let secondMatch = row.split("").reverse().join("").match(regexTwo)?.[0];
    if (!firstMatch.match(/[0-9]{1}/)) {
      firstMatch = numbers.indexOf(firstMatch).toString();
    }
    if (!secondMatch.match(/[0-9]{1}/)) {
      secondMatch = numbersButReverse.indexOf(secondMatch).toString();
    }
    //console.log(firstMatch + secondMatch, row)
    sum += parseInt(firstMatch + secondMatch);
  });
  return sum;
}
