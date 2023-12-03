import fs from "fs";

const day = 3;

console.log("Task 1");
console.log("Sample: Expected 4361. Result:", firstTask("sample"));
console.log("Sample: Expected 4148. Result:", firstTask("sample-2"));
console.log("Full: Expected 525119. Result: ", firstTask("full"));

console.log("Task 2");
console.log("Sample: Expected 467835. Result", secondTask("sample"));
console.log("Full: Expected ??. Result", secondTask("full"));

//76504829

function firstTask(filename) {
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  let matrix = [];
  let sum = 0;
  const inputAsRows = input.split("\n");
  let partIds = [];
  let symbols = [];
  inputAsRows.forEach((row, y) => {
    if (!row) return;
    matrix.push(row.split(""));
  });
  inputAsRows.forEach((row, y) => {
    if (!row) return;
    let prevValue = "";
    let tempPartId = "";
    let tempPartIdLocation = [];
    const val = row.split("");
    val.forEach((e, x) => {
      if (e.match(/[0-9]{1}/)) {
        if (prevValue !== "") {
          tempPartId += e;
        } else {
          tempPartId = e;
        }
        tempPartIdLocation.push({ x, y });
        prevValue = e;
      } else {
        if (e !== ".") {
          symbols.push({ x, y });
          const adjacentNodes = [
            { x: x + 1, y },
            { x: x - 1, y },
            { x, y: y + 1 },
            { x, y: y - 1 },
            { x: x + 1, y: y + 1 },
            { x: x + 1, y: y - 1 },
            { x: x - 1, y: y + 1 },
            { x: x - 1, y: y - 1 },
          ];
          adjacentNodes.forEach((field) => {
            symbols.push(field);
            if (matrix?.[field.y]?.[field.x] !== undefined) {
              matrix[field.y][field.x] = "Y";
            }
          });
        }

        if (tempPartId !== "") {
          //console.log(tempPartId);
          partIds.push({ value: tempPartId, locations: tempPartIdLocation });
          prevValue = "";
          tempPartId = "";
          tempPartIdLocation = [];
        }
      }

      if (!val[x + 1]) {
        if (tempPartId !== "") {
          //console.log(tempPartId);
          partIds.push({ value: tempPartId, locations: tempPartIdLocation });
          prevValue = "";
          tempPartId = "";

          tempPartIdLocation = [];
        }
      }
    });
  });

  partIds.forEach((partId) => {
    if (
      partId.locations.find(
        (e) =>
          symbols.find((ee) => ee.x === e.x && ee.y === e.y)?.x !== undefined
      )
    ) {
      partId.locations.filter((e) => {
        const found = symbols.find((ee) => ee.x === e.x && ee.y === e.y);
        if (found) {
          matrix[found.y][found.x] = "X";
        }
      });

      sum += parseInt(partId.value);
    }
  });
  //matrix.forEach((e) => console.log(e.join("")));
  return sum;
}

function secondTask(filename) {
  const input = fs.readFileSync(`${day}/${filename}.txt`).toString();
  let matrix = [];
  let sum = 0;
  const inputAsRows = input.split("\n");
  let partIds = [];
  let symbols = [];
  inputAsRows.forEach((row, y) => {
    if (!row) return;
    matrix.push(row.split(""));
  });
  inputAsRows.forEach((row, y) => {
    if (!row) return;
    let prevValue = "";
    let tempPartId = "";
    let tempPartIdLocation = [];
    const val = row.split("");
    val.forEach((e, x) => {
      if (e.match(/[0-9]{1}/)) {
        if (prevValue !== "") {
          tempPartId += e;
        } else {
          tempPartId = e;
        }
        tempPartIdLocation.push({ x, y });
        prevValue = e;
      } else {
        if (e === "*") {
          const possibleGear = [];
          possibleGear.push({ x, y });
          const adjacentNodes = [
            { x: x + 1, y },
            { x: x - 1, y },
            { x, y: y + 1 },
            { x, y: y - 1 },
            { x: x + 1, y: y + 1 },
            { x: x + 1, y: y - 1 },
            { x: x - 1, y: y + 1 },
            { x: x - 1, y: y - 1 },
          ];
          adjacentNodes.forEach((field) => {
            possibleGear.push(field);
            if (matrix?.[field.y]?.[field.x] !== undefined) {
              matrix[field.y][field.x] = "Y";
            }
          });
          symbols.push(possibleGear);
        }

        if (tempPartId !== "") {
          partIds.push({ value: tempPartId, locations: tempPartIdLocation });
          prevValue = "";
          tempPartId = "";
          tempPartIdLocation = [];
        }
      }

      if (!val[x + 1]) {
        if (tempPartId !== "") {
          partIds.push({ value: tempPartId, locations: tempPartIdLocation });
          prevValue = "";
          tempPartId = "";

          tempPartIdLocation = [];
        }
      }
    });
  });
  symbols.filter((possibleGear) => {
    const parts = partIds.filter((partId) =>
      partId.locations.find((partIdLocation) =>
        possibleGear.find(
          (gearPart) =>
            gearPart.x === partIdLocation.x && gearPart.y === partIdLocation.y
        )
      )
    );
    if (parts.length === 2) {
      sum += parts.map((e) => e.value).reduce((a, b) => a * b);
      return true;
    }
  });

  return sum;
}
