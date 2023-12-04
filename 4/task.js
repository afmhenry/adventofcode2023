import fs from "fs";

const day = 4;
const entriesFromAInB = (a, b) => a.filter((e) => b.includes(e));

console.log("Task 1");
console.log("Sample: Expected 13. Result:", firstTask("sample"));
console.log("Full: Expected 20117. Result: ", firstTask("full"));

console.log("Task 2");
console.log("Sample: Expected 30. Result", secondTask("sample"));
console.log("Full: Expected 13768818. Result", secondTask("full"));
console.log("Full: Expected 13768818. Result", secondTaskButBetter("full"));

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
  console.time("secondTask");
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
  console.timeEnd("secondTask");

  return sum;
  // end timer
}

function secondTaskButBetter(filename) {
  // start a timer
  console.time("secondTaskButBetter");
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
  console.timeEnd("secondTaskButBetter");

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
