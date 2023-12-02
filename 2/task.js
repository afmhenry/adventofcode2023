import fs from "fs";

const day = 2;
const validCase = { red: 12, green: 13, blue: 14 };
console.log("Task 1");
console.log("Sample Result: ", firstTask("sample"), ". Expected", 8);
console.log("Full Result: ", firstTask("full"), ". Expected", 2545);

console.log("Task 2");
console.log("Sample Result: ", secondTask("sample"), ". Expected", 2286);
console.log("Full Result: ", secondTask("full"), ". Expected", 53974);

function firstTask(filename) {
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  let sum = 0;
  const inputAsRows = input.split("\n");
  inputAsRows.forEach((row, i) => {
    if (!row) return;
    let rounds = row.split(":")[1].split(";");
    let hasInvalidRound = false;
    rounds.forEach((e) => {
      const colorCount = { blue: 0, red: 0, green: 0 };

      e = e.trim();
      (e.includes(",") ? e.split(",") : [e]).forEach((ee) => {
        const [amount, color] = ee.trim().split(" ");
        colorCount[color] += parseInt(amount);
      });
      if (
        Object.keys(validCase).filter(
          (color) => colorCount[color] > validCase[color]
        ).length
      ) {
        //console.log(e, i + 1);
        hasInvalidRound = true;
      }
    });
    if (!hasInvalidRound) {
      sum += 1 + i;
    }
  });
  return sum;
}

function secondTask(filename) {
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  let sum = 0;
  const inputAsRows = input.split("\n");
  inputAsRows.forEach((row, i) => {
    if (!row) return;
    let rounds = row.split(":")[1].split(";");
    const maxColorCount = { blue: 0, red: 0, green: 0 };

    rounds.forEach((e) => {
      e = e.trim();
      (e.includes(",") ? e.split(",") : [e]).forEach((ee) => {
        const [amount, color] = ee.trim().split(" ");
        if (parseInt(amount) > maxColorCount[color]) {
          maxColorCount[color] = parseInt(amount);
        }
      });
    });
    let power = 1;
    Object.keys(maxColorCount).forEach((color) => {
      if (!maxColorCount[color]) return;
      power = power * maxColorCount[color];
    });
    console.log(maxColorCount);
    sum += power;
  });
  return sum;
}
