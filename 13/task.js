import fs from "fs";
const day = 13;

const swap = {
  "#": ".",
  ".": "#",
};
function hasSmudge(a, b) {
  b = b.split("");
  a = a.split("");
  const differences = a.filter((e, i) => b[i] !== e).length;
  if (differences === 1) {
    return a.map((e, i) => (e !== b[i] ? swap[e] : e)).join("");
  }
  return "";
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

runTask("1", "sample", firstTask, 405);
//runTask("1", "sample-2", firstTask, 405);
runTask("1", "full", firstTask, 27300);
runTask("2", "sample", secondTask, 400);
runTask("2", "full", secondTask, 400);
// 29167 too low
// 31275 not
// 31291 too high
// 35326 too high

function firstTask(filename) {
  let result = 0;
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  const sets = input.split("\n\n");
  sets.forEach((set, num) => {
    if (!set) return;
    const matrix = set.split("\n"); //.map((e) => e.split(""));
    let setResult = 0;
    //console.log("rows", num);

    setResult += findReflection(matrix, 100);
    const transposed = transpose(matrix.map((e) => e.split(""))).map((e) =>
      e.join("")
    );
    //console.log("cols", num);
    //console.log(transposed.join("\n"));
    setResult += findReflection(transposed, 1);
    if (setResult) {
      //console.log(num, setResult + "\n" + matrix.join("\n"));
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
  for (var i = 0; i < matrix.length; i++) {
    let j = 0;
    let reflection = false;
    while (true) {
      const [up, down] = [matrix[i + 1 + j], matrix[i - j]];
      if (!up || !down) {
        break;
      }
      if (up !== down) {
        reflection = false;
        break;
      }
      if (up === down) {
        reflection = true;
      }
      j++;
    }
    let reflectionVal = (i + 1) * mult;
    if (reflection) {
      //console.log(i, j, "\n" + matrix.slice(i - j, i + 1 + j).join("\n"));
      largestReflection += reflectionVal;
    }
  }
  return largestReflection;
}

function secondTask(filename) {
  let result = 0;
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  const sets = input.split("\n\n");
  sets.forEach((set, num) => {
    if (!set) return;
    const matrix = set.split("\n"); //.map((e) => e.split(""));
    let setResult = 0;
    //console.log("rows", num);

    setResult += findReflection2(matrix, 100);
    const transposed = transpose(matrix.map((e) => e.split(""))).map((e) =>
      e.join("")
    );
    //console.log("cols", num);
    //console.log(transposed.join("\n"));
    setResult += findReflection2(transposed, 1);
    if (setResult) {
      //console.log(num, setResult + "\n" + matrix.join("\n"));
    }
    result += setResult;
  });

  return result;
}

function findReflection2(matrix, mult = 1) {
  let largestReflection = 0;
  let matrixCopy = structuredClone(matrix);
  for (var i = 0; i < matrix.length; i++) {
    let smudgeUsed = false;
    let j = 0;
    let reflection = false;

    while (true) {
      const [up, down] = [matrix[i + 1 + j], matrix[i - j]];
      if (!up || !down) {
        break;
      }
      if (up !== down) {
        if (!smudgeUsed) {
          const newUp = hasSmudge(up, down);
          if (newUp.length) {
            //console.log("Found smudge", newUp, up, i, j);
            matrix[i + 1 + j] = newUp;
            smudgeUsed = true;
            reflection = true;
            continue;
          }
        }
        matrix = matrixCopy;
        reflection = false;
        break;
      }
      if (up === down) {
        reflection = true;
      }
      j++;
    }
    let reflectionVal = (i + 1) * mult;
    if (reflection && smudgeUsed && !largestReflection) {
      //console.log(reflectionVal, i, j, "\n" + matrix.join("\n"));
      largestReflection += reflectionVal;
    }
  }
  return largestReflection;
}
