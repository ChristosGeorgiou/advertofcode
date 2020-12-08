const fs = require("fs")
const path = require("path")
const readline = require('readline');

var inputFilepath = "input.txt"
// var inputFilepath = "demo.txt"
var linesCount = 0;

var input = fs.readFileSync(path.join(__dirname, inputFilepath), "utf-8");

var data = input.split("\r\n\r\n")

console.log("total", data.length)
var objects = []
data.forEach(item => {
    var normilize = item
        .replace(/[\r\n\s]/gim, "~")
        .split("~")
    normilize.sort((a, b) => a < b ? -1 : 1)
    var o = {}
    normilize.forEach(n => {
        if (n) {
            s = n.split(":")
            o[s[0]] = s[1]
        }
    })
    objects.push(o)
});

var required = [
    "ecl",
    "pid",
    "eyr",
    "hcl",
    "byr",
    "iyr",
    "hgt"
]

var validators = {
    ecl: (i) => {
        return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]
            .indexOf(i) >= 0
    },
    pid: (i) => { return /^[0-9]{9}$/i.test(i) },
    eyr: (i) => { return i <= "2030" && i >= "2020" },
    hcl: (i) => { return /^#[0-9a-f]{6}$/i.test(i) },
    byr: (i) => { return i <= "2002" && i >= "1920" },
    iyr: (i) => { return i <= "2020" && i >= "2010" },
    hgt: (i) => {
        if (i.indexOf("cm") >= 0) {
            i = i.replace("cm", "")
            return i <= "193" && i >= "150"
        }
        if (i.indexOf("in") >= 0) {
            i = i.replace("in", "")
            return i <= "76" && i >= "59"
        }
        return false
    },
    cid: (i) => { return true }
}

objects.forEach(o => {
    o.valid = true
    o.errors = []
    for (var r of required) {
        if (!o[r]) {
            o.errors.push({
                key: `${r}`,
                reason: `missing ${r}`
            })
        } else if (!validators[r](o[r])) {
            o.errors.push({
                key: `${r}`,
                reason: `wrong ${r}`
            })
        }
    }
})

console.log("valid", objects.filter(x => x.errors.length === 0).length)

var log = objects
    .filter(x => x.errors.length === 0)

fs.writeFileSync(path.join(__dirname, "out.txt"),
    JSON.stringify(log, null, "  "), "utf-8")