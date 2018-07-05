'user strict'
// const exec = require('child_process').exec
const querystring = require("querystring");
const formidable = require('formidable');
const util = require('util');
const fs = require("fs");
function start(response, request){
console.log('request handler "start" was called')
//ls -lah 获取当前目录下的所有文件
//我们想象一个更耗时的命令： “find /”，它在我机器上需要执行1分钟左右的时间
const body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';
  response.writeHead(200,{'content-Type': 'text/html'})
  response.write(body)
  response.end()

}

function upload(response, request){
  console.log('request handler "upload" was called')
  var form = new formidable.IncomingForm();
  console.log("about to parse");
    form.parse(request, function(err, fields, files) {
      console.log(files.upload.path);
      fs.renameSync(files.upload.path, "/tmp/test.png");
      response.writeHead(200, {'content-type': 'text/html'});
      response.write('received image:\n\n');
      response.write("<img src='/show' />");
      // response.end(util.inspect({fields: fields, files: files}));
    });
}

function show(response, request){
console.log('request handler "show" was called .')
fs.readFile("/tmp/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });

}
exports.start = start
exports.upload = upload
exports.show = show
