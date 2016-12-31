var fs = require('fs'),
    webPage = require('webpage'),
    system = require('system');

function checkGetArgs(){
  var url,
      outputDir=".",
      outputFile=""; 
  if (system.args.length < 3) {
    console.log('usage: get.js URL OUTPUTDIR OUTPUTFILE');
  } else {
    system.args.forEach(function (arg, i) {
      if (i == 1) {
        if (arg.match(/^http:/i)) {
          url = arg; 
        } else {
          console.log('Please provide complete url including http');
        }
      } else if (i == 2) {
        outputDir = arg; 
      } else if (i == 3) {
        outputFile = arg;
      }
    });
  }
  
  return {
    "url":url,
    "outputDir":outputDir,
    "outputFile":outputFile
  }
}

function writeResult(filePath,content){
  try {
    fs.write(filePath, content, 'w');
    console.log('Result written to: '+filePath)
  } catch(e) {
    console.log(e);
  }
}

function get(){
  var args = checkGetArgs(),
      page = webPage.create(),
      outputFile = args['outputFile'],
      outputDir = args['outputDir'];
  try {
    console.log('about to open: '+args['url']);
    page.open(args['url'], function (status) {
      console.log(status);
      var content = page.content;
      if (!outputFile.length) outputFile = args['url'].replace(/[^a-zA-Z\d]/g,'_');
      writeResult(outputDir+'/'+outputFile,content);
      phantom.exit();
    }); 
  } catch (e){
    console.log(e);
    phantom.exit();
  }
};

exports.get = get
