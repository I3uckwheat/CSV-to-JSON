const csvtojson = require('csvtojson');
const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');

convert(process.argv[2]);

function convert(csvFilePath){
  let buffer = [];
  csvtojson().fromFile(csvFilePath)
       .on('json', jsonObj => {
        //  console.log(jsonObj);
        buffer.push(jsonObj);
       })
       .on('done', error => {
         if(error) {
           console.error(error);
           return
          };
         output(buffer);
         console.log(buffer);
       });
}

function output(jsonArry){
  const folderName = uuidv1();
  fs.mkdirSync(folderName);
  fs.writeFileSync(path.join(__dirname, folderName, 'jsonFromCsv.json'), JSON.stringify(jsonArry, null, 2))
  console.log(jsonArry)
  console.log("finished");
}
