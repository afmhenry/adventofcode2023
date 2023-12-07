import fs from "fs";

const day = 4;
const entriesFromAInB = (a, b) => a.filter((e) => b.includes(e));

function runTask(stage, filename, task, expected) {
  console.log(`\nTask ${stage} - ${filename}`);
  console.time(`\tTimer`);
  const result = task(filename);
  console.timeEnd(`\tTimer`);
  console.log(`\tExpected ${expected}`);
  console.log(`\tResult: ${result}`);
  console.log(`\tPass: ${result === expected}\n`);
}
runTask("1", "sample", firstTask, 13);
runTask("1", "full", firstTask, 20117);

runTask("2", "sample", secondTask, 30);
runTask("2", "full", secondTaskButBetter, 13768818);
runTask("2", "full", secondTask, 13768818);

function firstTask(filename) {
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  let sum = 0;
  const inputAsRows = input.split("\n");
  inputAsRows.forEach((row) => {
    if (!row) return;
    let [winningValues, cardValues] = row.split("|");
    cardValues = cardValues
      .split(" ")
      .filter((e) => e)
      .map((e) => e.trim());
    winningValues = winningValues
      .split(" ")
      .filter((e) => e)
      .map((e) => e.trim());
    if (entriesFromAInB(cardValues, winningValues).length === 0) return;
    sum += Math.pow(2, entriesFromAInB(cardValues, winningValues).length - 1);
  });

  return sum;
}

function secondTask(filename) {
  // start a timer
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  const inputAsRows = input.split("\n");
  const winningIndicies = [];
  inputAsRows.forEach((row, i) => {
    if (!row) return;
    const countOfWinners = findWinners(row).length;
    winningIndicies.push({ index: i, countOfWinners });
  });

  function getAddedCards(i) {
    const card = winningIndicies[i];
    let nestedAddedCards = [];
    const addedCards = winningIndicies.slice(
      i + 1,
      i + 1 + card.countOfWinners
    );
    addedCards.forEach((e) => {
      nestedAddedCards = [...nestedAddedCards, ...getAddedCards(e.index)];
    });

    return [...addedCards, ...nestedAddedCards];
  }

  // Loop over master list
  const result = [];
  winningIndicies.forEach((winner) => {
    const allAddedCards = getAddedCards(winner.index);
    result.push(allAddedCards);
  });

  const sum = result.reduce((acc, e) => acc + e.length, winningIndicies.length);
  //traverseCards(winningIndicies);
  return sum;
  // end timer
}

function secondTaskButBetter(filename) {
  // start a timer
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  const inputAsRows = input.split("\n");
  const winningIndicies = [];
  inputAsRows.forEach((row, i) => {
    if (!row) return;
    const countOfWinners = findWinners(row).length;
    winningIndicies.push({ index: i, countOfWinners });
  });
  const reversedCards = winningIndicies.reverse();
  reversedCards.forEach((card, i) => {
    let addedCards = 1;
    const newCards = reversedCards.slice(i - card.countOfWinners, i);
    newCards.forEach((e) => (addedCards += e.addedCards));
    card.addedCards = addedCards;
  });
  const result = reversedCards.reduce((acc, e) => acc + e.addedCards, 0);

  return result;
}

function findWinners(row) {
  if (!row) return;
  let [winningValues, cardValues] = row.split("|");
  cardValues = cardValues
    .split(" ")
    .filter((e) => e)
    .map((e) => e.trim());
  winningValues = winningValues
    .split(" ")
    .filter((e) => e)
    .map((e) => e.trim());
  return entriesFromAInB(cardValues, winningValues);
}
