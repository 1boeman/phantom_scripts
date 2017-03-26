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
//kill after a minute if still running
function maxTime(){
  setTimeout(function(){
    phantom.exit();
  },60000)
}

exports.maxTime = maxTime;
exports.writeResult = writeResult;
exports.defaultOutputDir = defaultOutputDir;
