const fs = require("fs");
const gm = require("gm").subClass({ imageMagick: true });

const [, , doFunc, inputFile, newFile, ...args] = process.argv;

console.log("arg1: ", arg1);
console.log("arg2: ", inputFile);

if (doFunc === "vsmall") {
  gm(inputFile)
    .resize(100, 100)
    .write(newFile, (err) => {
      console.log("callback");
      if (err) console.warn("error writing", err);
    });
} else if (rotateCW) {

}
