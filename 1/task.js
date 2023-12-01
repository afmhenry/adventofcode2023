import fs from "fs";


const input = fs.readFileSync("1/live.txt").toString()

const inputAsRows = input.split("\n")
let sum = 0
inputAsRows.forEach((e, i) => {
    if (!e) return
    const matches = e.matchAll(/[0-9]{1}/g)
    const matchAsArray = [...matches]
    const firstNum = matchAsArray[0][0]
    let result = firstNum
    result += matchAsArray.slice(-1)[0][0]
    console.log(i, result)

    sum += parseInt(result)
})

console.log(sum)

