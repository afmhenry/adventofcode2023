import fs from "fs";
const day = 8;
const cards = [
  "A",
  "K",
  "Q",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "-1",
  "-1",
  "J",
].reverse();

function runTask(stage, filename, task, expected) {
  console.log(`\nTask ${stage} - ${filename}`);
  console.time(`\tTimer`);
  const result = task(filename);
  console.timeEnd(`\tTimer`);
  console.log(`\tExpected ${expected}`);
  console.log(`\tResult: ${result}`);
  console.log(`\tPass: ${result === expected}\n`);
}
runTask("1", "sample", firstTask, 6440);
runTask("1", "sample-2", firstTask, 6440);
runTask("1", "full", firstTask, 254024898);
runTask("2", "sample", secondTask, 5905);
runTask("2", "full", secondTask, 254115617);

function firstTask(filename) {
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  const inputAsRows = input.split("\n");
  const handsWithValues = [];
  inputAsRows.forEach((row) => {
    let [hand, value] = row.split(" ").map((e) => e.trim());
    let sortedHand = hand
      .split("")
      .sort((a, b) => cards.indexOf(b) - cards.indexOf(a))
      .join("");
    const partsCount = getHandParts(sortedHand);
    handsWithValues.push({
      ...findHands(partsCount, hand),
      hand: hand,
      value: value,
    });
  });
  const result = handsWithValues.sort((a, b) => {
    return chooseWinner(a, b);
  });

  return result.reduce((acc, curr, i) => {
    return acc + parseInt(curr.value) * (i + 1);
  }, 0);
}

function secondTask(filename) {
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  const inputAsRows = input.split("\n");
  const handsWithValues = [];
  inputAsRows.forEach((row) => {
    let [hand, value] = row.split(" ").map((e) => e.trim());
    let sortedHand = hand
      .split("")
      .sort((a, b) => cards.indexOf(b) - cards.indexOf(a))
      .join("");
    const partsCount = getHandParts(sortedHand);
    handsWithValues.push({
      ...findHands(partsCount, hand),
      hand: hand,
      value: value,
    });
  });
  const result = handsWithValues.sort((a, b) => {
    return chooseWinner(a, b);
  });

  return result.reduce((acc, curr, i) => {
    return acc + parseInt(curr.value) * (i + 1);
  }, 0);
}

function findHands(hand, sorted) {
  if (hand["5"]) {
    return { rank: 7, faceValue: cards.indexOf(hand["5"][0]) };
  }
  if (hand["4"]) {
    return {
      rank: 6,
      faceValue: hand["4"][0],
    };
  }
  if (hand["3"] && hand["2"]) {
    return {
      rank: 5,
      faceValue: hand["3"][0] + hand["2"][0],
    };
  }
  if (hand["3"]) {
    return {
      rank: 4,
      faceValue: hand["3"][0],
    };
  }
  if (hand["2"]?.length === 2) {
    return {
      rank: 3,
      faceValue: hand["2"][0] + hand["2"][1],
    };
  }
  if (hand["2"]) {
    return {
      rank: 2,
      faceValue: hand["2"][0],
    };
  }
  hand = sorted.split("");
  return { rank: 1, faceValue: "" };
}

function chooseWinner(hand1, hand2) {
  if (hand1.rank !== hand2.rank) {
    return hand1.rank - hand2.rank;
  } else {
    for (let i = 0; i < hand1.hand.length; i++) {
      if (hand1.hand[i] !== hand2.hand[i]) {
        return cards.indexOf(hand1.hand[i]) - cards.indexOf(hand2.hand[i]);
      }
    }
  }
}
function getHandParts(hand) {
  let prev = "";
  let count = 0;
  let parts = {};
  let jokerCount = 0;

  hand.split("").forEach((card) => {
    if (card === "J") {
      jokerCount++;
      return;
    }
    if (prev === card) {
      count++;
      parts[card] = count;
      return;
    }
    count = 1;
    parts[card] = count;
    prev = card;
  });
  if (jokerCount === 5) {
    parts["A"] = 5;
  } else if (jokerCount) {
    const max = Math.max(...Object.values(parts));
    const maxKey = Object.keys(parts).filter((key) => parts[key] === max);

    if (maxKey.length === 1) {
      parts[maxKey[0]] += jokerCount;
    } else {
      const maxKeyIndex = Math.max(...maxKey.map((key) => cards.indexOf(key)));
      parts[cards[maxKeyIndex]] += jokerCount;
    }
  }

  // transpose parts
  const partsByCount = {};
  Object.keys(parts).forEach((key) => {
    const count = parts[key];

    if (!partsByCount[count]) {
      partsByCount[count] = [];
    }
    partsByCount[count].push(key);
  });

  // add joker count to otherw
  return partsByCount;
}
