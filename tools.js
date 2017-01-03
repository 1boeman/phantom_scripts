var fs = require('fs'),
    webPage = require('webpage'),
    system = require('system');

var defaultOutputDir = fs.workingDirectory+'/crawl_data'

function writeResult(filePath,content){
  try {
    fs.write(filePath, content, 'w');
    console.log('Result written to: '+filePath)
  } catch(e) {
    console.log(e);
  }
}

function maxTime(){
  setTimeout(function(){
    phantom.exit();
  },30000)
}

exports.maxTime = maxTime;
exports.writeResult = writeResult;
exports.defaultOutputDir = defaultOutputDir;
