import fs from "fs";
const day = 6;

function runTask(stage, filename, task, expected) {
  console.log(`\nTask ${stage} - ${filename}`);
  console.time(`\tTimer`);
  const result = task(filename);
  console.timeEnd(`\tTimer`);
  console.log(`\tExpected ${expected}`);
  console.log(`\tResult: ${result}`);
  console.log(`\tPass: ${result === expected}\n`);
}
runTask("1", "sample", firstTask, 288);
runTask("1", "full", firstTask, 170000);

runTask("2", "sample", secondTask, 71503);
runTask("2", "full", secondTask, 20537782);

function waysToWinRace(race) {
  const { time, distanceToWin } = race;
  let waysToWin = 0;
  for (var i = 0; time > i; i++) {
    const speed = i || 0;
    const distance = speed * (time - i);
    if (distance > distanceToWin) {
      waysToWin++;
    }
  }

  return waysToWin;
}

function firstTask(filename) {
  const races = [];
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  const inputAsRows = input.split("\n");
  const times = inputAsRows[0]
    .split(":")[1]
    .split(" ")
    .filter((e) => e)
    .map((e) => parseInt(e));
  const distances = inputAsRows[1]
    .split(":")[1]
    .split(" ")
    .filter((e) => e)
    .map((e) => parseInt(e));
  times.forEach((time, index) => {
    races.push({ time, distanceToWin: distances[index] });
  });
  let result = 1;
  races.forEach((race) => {
    result *= waysToWinRace(race);
  });

  return result;
}

function secondTask(filename) {
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  const inputAsRows = input.split("\n");
  const time = parseInt(inputAsRows[0].split(":")[1].replaceAll(" ", ""));
  const distanceToWin = parseInt(inputAsRows[1].split(":")[1].replaceAll(" ", ""));
  let result = waysToWinRace({time, distanceToWin});
  
  return result;
}
