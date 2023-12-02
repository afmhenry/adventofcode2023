import fs from "fs";

const day = 1
const numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
const numbersButReverse = numbers.map(e => e.split("").reverse().join(""))
const regexOne = new RegExp(`([0-9]|${numbers.join("|")}){1}`)
const regexTwo = new RegExp(`([0-9]|${numbersButReverse.join("|")}){1}`)

console.log("Task 1")
console.log("Sample Result: ", firstTask("sample"), ". Expected", 142)
console.log("Full Result: ", firstTask("full"), ". Expected", 53974)

console.log("Task 2")
console.log("Sample Result: ", secondTask("sample-2"), ". Expected", 281)
console.log("Full Result: ", secondTask("full"), ". Expected", 52840)

function firstTask(filename) {

    const input = fs.readFileSync(`${day}/${filename}.txt`).toString()

    const inputAsRows = input.split("\n")
    let sum = 0
    inputAsRows.forEach((e) => {
        if (!e) return
        const matches = e.matchAll(/[0-9]{1}/g)
        const matchAsArray = [...matches]
        const firstNum = matchAsArray[0][0]
        let result = firstNum
        result += matchAsArray.slice(-1)[0][0]
        sum += parseInt(result)
    })
    return sum
}

function secondTask(filename) {

    const input = fs.readFileSync(`${day}/${filename}.txt`).toString()

    const inputAsRows = input.split("\n")
    let sum = 0
    inputAsRows.forEach((row) => {
        if (!row) return

        let firstMatch = row.match(regexOne)?.[0]
        let secondMatch = row.split("").reverse().join("").match(regexTwo)?.[0]
        if (!firstMatch.match(/[0-9]{1}/)) {
            firstMatch = numbers.indexOf(firstMatch).toString()
        }
        if (!secondMatch.match(/[0-9]{1}/)) {
            secondMatch = numbersButReverse.indexOf(secondMatch).toString()
        }
        //console.log(firstMatch + secondMatch, row)
        sum += parseInt(firstMatch + secondMatch)
    })
    return sum
}
