import fs from "fs";
const day = 13;

function runTask(stage, filename, task, expected) {
  console.log(`\nTask ${stage} - ${filename}`);
  console.time(`\tTimer`);
  const result = task(filename);
  console.timeEnd(`\tTimer`);
  console.log(`\tExpected ${expected}`);
  console.log(`\tResult: ${result}`);
  console.log(`\tPass: ${result === expected}\n`);
}

runTask("1", "sample", firstTask, 405);
runTask("1", "sample-2", firstTask, 405);
//runTask("1", "full", firstTask, 18673);
// 25991 too low
// 28927 too high
// not 19223
// runTask("2", "sample", secondTask, 2);
// runTask("2", "full", secondTask, 948);

function firstTask(filename) {
  let result = 0;
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  const sets = input.split("\n\n");
  sets.forEach((set, num) => {
    if (!set) return;
    const matrix = set.split("\n"); //.map((e) => e.split(""));
    let setResult = 0;
    setResult += findReflection(matrix, 100);
    const transposed = transpose(matrix.map((e) => e.split(""))).map((e) =>
      e.join("")
    );
    //console.log(transposed.join("\n"));
    setResult += findReflection(transposed, 1);
    if (setResult) {
      console.log(num, setResult + "\n" + matrix.join("\n"));
    }
    result += setResult;
  });

  return result;
}

function transpose(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

function findReflection(matrix, mult = 1) {
  let largestReflection = 0;
  for (var i = 1; i < matrix.length; i++) {
    if (matrix[i] === matrix[i + 1]) {
      let j = 1;
      let reflection = false;

      while (true) {
        const [up, down] = [matrix[i + 1 + j], matrix[i - j]];
        if (!up || !down) break;
        j++;

        if (up === down) {
          reflection = true;
        }
        if (up !== down) {
          reflection = false;
          break;
        }
      }
      let reflectionVal = (i + 1) * mult;
      if (reflection && largestReflection < reflectionVal) {
        //console.log(i + 1, matrix[i + 1]);
        largestReflection = reflectionVal;
      }
    }
  }
  return largestReflection;
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
