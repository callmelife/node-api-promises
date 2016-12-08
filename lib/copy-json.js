'use strict';

const fs = require('fs');

const stdin = '/dev/stdin';
const stdout = '/dev/stdout';

//
let inFile = process.argv[2] === '-' ? stdin : process.argv[2];
let outFile = process.argv[3] ? process.argv[3] : stdout;
let outFileFlag = outFile === stdout ? 'a' : 'w';

// call with readJSON(inFile);
const readJSON = function(filename){
  return new Promise(function(resolve, reject){
    fs.readFile(filename, { encoding: 'utf8' }, (error, data) => {
      if(error){
        reject(error);
        // return error; // <-- NOT GOOD ENOUGH!
      }
      else{
        resolve(data);
      }
    });
  });
};

const writeFile = (filename, content, options) => {
  return new Promise((resolve, reject)=>{
    fs.writeFile(filename, content, options, (error)=>{
      if(error){
        reject(error);
      }
      resolve('Success');
    });
  });
};

readJSON(inFile)
  .then(JSON.parse)
  // the same thing.
  // .then((data)=>{
  //   JSON.parse(data);
  // })
  .then(function(pojo){
    pojo.promises = 'awesome!!';
    return pojo;
  })
  .then(function(pojo){
    return JSON.stringify(pojo, null, 2);
  })
  .then(function(wutdis){
    console.log("wutdis is1 ", wutdis);
  })
  .then((json) => writeFile(outFile, json, {flag: outFileFlag}))
  .then(function(wutdis){
    console.log("wutdis2 is ", wutdis);
  })
  .catch((err)=>{
    console.error(err);
  });
