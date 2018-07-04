'user strict'
const http = require('http')
const url = require('url')
function start(route, handle){
http.createServer(function(request, response){
  const pathname = url.parse(request.url).pathname
  var postData = "";
  console.log('request for '+ pathname + ' received')
  request.setEncoding("utf8");//接收数据的编码格式为UTF-8

  request.addListener("data", function(postDataChunk) {
    postData += postDataChunk;
    console.log("Received POST data chunk '"+
    postDataChunk + "'.");
  });//注册了“data”事件的监听器，用于收集每次接收到的新数据块，并将其赋值给postData 变量

  request.addListener("end", function() {
    route(pathname, handle, response, postData)
  });//所有数据接收完毕后才触发
  
}).listen(8888)

console.log('Server has started at http://localhost:8888/')
}
exports.start = start
