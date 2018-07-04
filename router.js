'user strict'
//路由
function route ( pathname, handle, response, postData) {
console.log ('About to router a request for ' + pathname)
if(typeof handle[pathname] === 'function'){
return handle[pathname](response, postData)
}else{
console.log('No request handler found for ' + pathname)
response.writeHead(200,{'content-Type': 'text/html'})
response.write('404 Not Found')
response.end
}
}

exports.route = route
