"use strict";
var tools = require('./tools.js');
var fs = require('fs'),
    webPage = require('webpage'),
    system = require('system');

function checkGetArgs(){
  var url,
      outputDir=".",
      outputSub="";
 
  if (system.args.length < 4) {
    console.log('usage: get.js <URL> <OUTPUTDIR> <OUTPUTSUBDIR>');
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
        outputSub = arg;
      }
    });
  }

  if (outputSub.length){
    outputDir = outputDir+'/'+outputSub; 
  }

  if (!fs.isDirectory(outputDir)){
    fs.makeTree(outputDir);
  }
 
  return {
    "url":url,
    "outputDir":outputDir,
  }
}

function get(){
  var args = checkGetArgs(),
      page = webPage.create(),
      outputDir = args['outputDir'];
  try {
    console.log('about to open: '+args['url']);
    page.open(args['url'], function (status) {
      console.log(status);
      var content = page.content;
      var outputFile = args['url'].replace(/[^a-zA-Z\d]/g,'_');
      tools.writeResult(outputDir+'/'+outputFile,content);
      phantom.exit();
    }); 
  } catch (e){
    console.log(e);
    phantom.exit();
  }
};

get();
