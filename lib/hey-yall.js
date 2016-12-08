'use strict';

const fs = require('fs');

let inFile = process.argv[2];
new Promise(function(resolve, reject){
  fs.readFile(inFile, { encoding: 'utf8' }, (error, content) => {
    if (error) {
      console.error(error);
      reject(error);
    }
    else {
      resolve(content);
    }
  });
})
.then((content)=>{
  let lines = content.split('\n');
  lines.pop();
  lines.forEach((line) => {
    console.log('Hello, ' + line + '!');
  });
})
.catch((err)=>{
  console.error(err);
});
