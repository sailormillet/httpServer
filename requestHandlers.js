'user strict'
const exec = require('child_process').exec
const querystring = require("querystring");
function start(response, postData){
console.log('request handler "start" was called')
//ls -lah 获取当前目录下的所有文件
//我们想象一个更耗时的命令： “find /”，它在我机器上需要执行1分钟左右的时间
const body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';
exec("find /",
    { timeout: 10000, maxBuffer: 20000*1024 },
     function(error, stdout, stderr){
  response.writeHead(200,{'content-Type': 'text/html'})
  response.write(body)
  response.end()
})
}

function upload(response, postData){
console.log('request handler "upload" was called')
 response.writeHead(200,{'content-Type': 'text/html'})
  response.write("You've sent: " + querystring.parse(postData).text)
  response.end()
}

function stop(response){
console.log('request handler "stop" was called . server stop')
}
exports.start = start
exports.upload = upload
exports.stop = stop
