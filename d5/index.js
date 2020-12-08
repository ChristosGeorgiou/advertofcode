const fs = require("fs")
const path = require("path")
const readline = require('readline');

var inputFilepath = "input.txt"
// var inputFilepath = "demo.txt"
var linesCount = 0;

var input = fs.readFileSync(path.join(__dirname, inputFilepath), "utf-8");

var data = input.split("\r\n")

console.log("total", data.length)

var objects = []
var MAX_ROWS = 128
var MAC_COLS = 8

function calc(input) {
    // console.log(input)
    var row = MAX_ROWS, col = 8
    for (var i = 0; i <= 7; i++) {
        var span = MAX_ROWS / Math.pow(2, i + 1)
        if (input[i] === "F") {
            row = row - span
        }
        // console.log(input[i], `[${row - span}-${row}]`)
    }
    for (var i = 0; i <= 4; i++) {
        var span = MAC_COLS / Math.pow(2, i + 1)
        if (input[7 + i] === "L") {
            col = col - span
        }
        // console.log(input[7 + i], `[${col - span}-${col}]`)
    }
    return {
        row: row - 1,
        col: col - 1,
        seat: ((row - 1) * 8) + col - 1
    }
}

data.forEach(item => {
    var x = calc(item)
    objects.push(x)
});


objects.sort((a, b) => a.seat - b.seat)

objects.forEach((o, i) => {
    if (objects[i + 1] && objects[i + 1].seat !== objects[i].seat + 1) {
        console.log("missing", o.seat + 1)
    }
})

console.log("max", Math.max.apply(Math, objects.map(o => o.seat)))

fs.writeFileSync(path.join(__dirname, "out.txt"),
    JSON.stringify(objects, null, "  "), "utf-8")
