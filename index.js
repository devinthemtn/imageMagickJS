const fs = require("fs");
const gm = require("gm").subClass({ imageMagick: true });

const [, , doFunc, inputFile, newFile, ...args] = process.argv;

// console.log("arg1: ", arg1);
// console.log("arg2: ", inputFile);
function setFuncByName(filename) {
  if (filename.match(/_1(_?)./)) {
    //odd page
  }
}

function getPageNum(filename) {
  // find end, find number
  let numberStringRegex = /_\d+(_\D)*./g;
  let numString = filename.match(numberStringRegex);
  // isolate just the number
  let justNumA = numString[0].match(/\d+/);
  return justNumA[0];
}

// setFuncByName(inputFile);
let pageNum = getPageNum(inputFile);
console.log("pageNum: ", pageNum);

if (doFunc === "thumb") {
  gm(inputFile)
    .resize(100, 100)
    .write(newFile, (err) => {
      console.log("callback");
      if (err) console.warn("error writing", err);
    });
} else if (doFunc === "rotateCW") {
  gm(inputFile)
    .rotate("white", 90)
    .write(newFile, (err) => {
      if (err) console.warn("error writing", err);
      else console.log("done");
    });
} else if (doFunc === "posterCutRotate") {
} else if (doFunc === "posterCut") {
}
