const csvtojson = require('csvtojson');
const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');

convert(process.argv[2]);

function convert(csvFilePath){
  let buffer = [];
  csvtojson().fromFile(csvFilePath)
       .on('json', jsonObj => {
        buffer.push(jsonObj);
       })
       .on('done', error => {
         if(error) {
           console.error(error);
           return
          };
         output(buffer);
       });
}

function output(jsonArry){
  const folderName = uuidv1();
  if(!fs.existsSync("converted")){fs.mkdirSync(path.join("converted"))}

  fs.mkdirSync(path.join("converted", folderName));
  fs.writeFileSync(path.join(__dirname, "converted", folderName, 'jsonFromCsv.json'), JSON.stringify(jsonArry, null, 2))
  console.log(`Converted file located in ${path.join("converted", folderName)}`);
}
