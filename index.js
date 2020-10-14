const fs = require("fs");
const gm = require("gm").subClass({ imageMagick: true });

const [, , doFunc, inputFile, newFile, ...args] = process.argv;

function setFuncByName(filename) {
  const regExIsPoster = /Poster/;
  const regExIsLandscape = /_L\.\w+$/;
  const isOddPage = getPageNum(filename) % 2 !== 0;
  console.log("is Odd: ", isOddPage);
  if (regExIsPoster.test(filename)) {
    // fileName is Poster Image
    if (regExIsLandscape.test(filename)) {
      // fileName is Poster & landscape
    }
  } else {
    if (regExIsLandscape.test(filename)) {
      // fileName is in Landscape & NOT poster
      console.log("Landscape yes");
    }
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

setFuncByName(inputFile);
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
