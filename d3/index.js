const fs = require("fs")
const readline = require('readline');

var inputFilepath = "inputs/d3.txt"
var linesCount = 0;

const rl = readline.createInterface({
    input: fs.createReadStream(inputFilepath),
    output: process.stdout,
    terminal: false
});

let raw = []
let input = []
let found = [0, 0, 0, 0, 0]

rl.on('line', (line) => {
    linesCount++; // on each linebreak, add +1 to 'linesCount'
    raw.push(line)
});

rl.on('close', () => {
    // console.log(linesCount); // print the result when the 'close' event is called

    var a = linesCount / raw[0].length
    console.log(a);

    for (k = 0; k < linesCount; k += 1) {
        input.push("")
        // console.log(k, input[k]);
        for (i = 0; i <= a * 100; i += 1) {
            input[k] += raw[k]
        }
    }

    for (k = 1; k < linesCount; k += 1) {
        if (input[k][k * 1] === "#") {
            found[0]++
        }
    }
    for (k = 1; k < linesCount; k += 1) {
        if (input[k][k * 3] === "#") {
            found[1]++
        }
    }
    for (k = 1; k < linesCount; k += 1) {
        if (input[k][k * 5] === "#") {
            found[2]++
        }
    }
    for (k = 1; k < linesCount; k += 1) {
        if (input[k][k * 7] === "#") {
            found[3]++
        }
    }

    k=0
    for (x = 2; x < linesCount; x += 2) {
        k += 1
        // if (!(k % 2)) continue;
        if (input[x][k] === "#") {
            input[x] = input[x].substring(0, k) + "X" + input[x].substring(k + 1);
            found[4]++
        } else {
            input[x] = input[x].substring(0, k) + "O" + input[x].substring(k * 1 + 1);
        }

    }

    console.log(found[0], found[1], found[2], found[3], found[4])
    console.log(found[0] * found[1] * found[2] * found[3] * found[4])

    fs.writeFileSync("out.txt", JSON.stringify(input, null, "  "), "utf-8")
});

