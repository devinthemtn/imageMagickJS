const fs = require("fs");
const gm = require("gm").subClass({ imageMagick: true });

let [, , inputFile, newFile, doFunc, ...args] = process.argv;

function setFuncByName(filename) {
  const regExIsPoster = /Poster/;
  const regExIsLandscape = /_L\.\w+$/;
  const isOddPage = getPageNum(filename) % 2 !== 0;
  console.log("is Odd: ", isOddPage);
  let doFunc = "";
  if (regExIsPoster.test(filename)) {
    // fileName is Poster Image
    if (regExIsLandscape.test(filename)) {
      // fileName is Poster & landscape
      doFunc = "cutPosterRotateCW";
    } else {
      // fileName is Poster & NOT Landscape
      doFunc = "cutPoster";
    }
  } else {
    if (regExIsLandscape.test(filename)) {
      // fileName is Landscape & NOT poster
    } else {
      // fileName NOT Landscape & NOT poster
    }
  }
  return doFunc;
}

function getPageNum(filename) {
  // find end, find number
  let numberStringRegex = /_\d+(_\D)*./g;
  let numString = filename.match(numberStringRegex);
  // isolate just the number
  let justNumA = numString[0].match(/\d+/);
  return justNumA[0];
}

let pageNum = getPageNum(inputFile);

// set function by inputFile name conventions
if (typeof doFunc === "undefined") {
  doFunc = setFuncByName(inputFile);
}
console.log("doFunc: ", doFunc);
// ImageMagick transformations
if (doFunc === "") return; // no manipulation needed exit
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
  if (pageNum % 2 === 0) {
    //even page number
    //cut on right
    gm(inputFile)
      .crop(910, 1310, 30, 60)
      .write(newFile, (err) => {
        if (err) console.warn("error writing", err);
        else console.log("done");
      });
  } else {
    //odd page number
    //cut on left
  }
} else if (doFunc === "cutPoster") {
  if (pageNum % 2 === 0) {
    //even page - cut on right
    gm(inputFile)
      .crop(910, 1310, 0, 60)
      .write(newFile, (err) => {
        if (err) console.warn("error writing", err);
        else console.log("done good");
      });
  } else {
    //odd page -- cur on left
    gm(inputFile)
      .crop(910, 1310, 30, 60)
      .write(newFile, (err) => {
        if (err) console.warn("error writing", err);
        else console.log("done good");
      });
  }
}
