'use strict';
const fs = require('fs');

let inFile = process.argv[2];
new Promise(function(resolve, reject){
  fs.readFile(inFile, { encoding: 'utf8' }, (error, content) => {
    if (error) {
      console.error(error);
      reject(error);
    }
    resolve(content);
  });
})
.then((content)=>{
  let lines = content.split('\n');
  lines.pop();
  let randomLines = lines.sort(function () {
    return 0.5 - Math.random();
  });
  randomLines.forEach((line) => {
    console.log(line);
  });
})
.catch((err)=>{
  console.error(err);
});
