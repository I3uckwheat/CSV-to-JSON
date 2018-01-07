const csvtojson = require('csvtojson');
const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');

convert(process.argv[2]);

function convert(csvFilePath){
  csvtojson().fromFile(csvFilePath)
       .on('json', jsonObj => {
         output(jsonObj);
       })
       .on('done', error => {
         if(error) console.error(error);
       });
}

function output(jsonObj){
  console.log(jsonObj)
}
