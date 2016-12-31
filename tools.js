var fs = require('fs'),
    webPage = require('webpage'),
    system = require('system');

function checkGetArgs(){
  var url,outputDir; 
  if (system.args.length < 3) {
    console.log('usage: get.js URL OUTPUTDIR');
  } else {
    system.args.forEach(function (arg, i) {
      if (i == 1) {
        if (arg.match(/^http:/i)){
          url = arg; 
        } else {
          console.log('Please provide complete url including http');
        }
      }
      if (i == 2) {
        outputDir = arg; 
      }
    });
  }
  
  return {
    "url":url,
    "outputDir":outputDir
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
  var args = checkGetArgs();
  var page = webPage.create();
  try {
    console.log('about to open: '+args['url']);
    page.open(args['url'], function (status) {

      console.log(status);
      var content = page.content;
      writeResult(args['outputDir']+'/'+args['url'].replace(/[\/]+/,'_'),content);
      phantom.exit();
    }); 
  } catch (e){
    console.log(e);
  }
};

exports.get = get
