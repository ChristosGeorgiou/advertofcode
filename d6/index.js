const fs = require("fs")
const path = require("path")

// var inputFilepath = "input.txt"
var inputFilepath = "demo.txt"

var input = fs.readFileSync(path.join(__dirname, inputFilepath), "utf-8");

function calc(input) {
    console.log(input)
    var groups = input.split("\r\n\r\n")
    console.log(`found ${groups.length}`)
    total = 0
    groups.forEach((group) => {
        // console.log("group.length", group.length)
        var norm = group
            .replace(/[\r\n\s]/gim, "")
            .split("")
        console.log("norm", norm)
        var uniqeuAnwers = norm
            .reduce((l, x) => { if (l.indexOf(x) === -1) l.push(x); return l }, [])

        console.log("uniqeuAnwers", uniqeuAnwers)
        uniqeuAnwers.forEach(ua => {
            var x = norm.join().match(new RegExp(ua, 'gi'))
            console.log("x", x, x.length,group.match(/[\r\n\s]/gim).length)
            if (x.length === group.match(/[\r\n\s]/gim).length) {
                total += x.length
                console.log(total)
            }
        })
    })

    return total;
}

var data = calc(input)

console.log(total)

fs.writeFileSync(path.join(__dirname, "out.txt"),
    JSON.stringify(data, null, "  "), "utf-8")
