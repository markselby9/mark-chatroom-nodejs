var express = require('express')
var app = express()
var http = require('http')
var server = http.createServer(app)
var io = require('socket.io').listen(server)
app.use("/res", express.static(__dirname + '/res'))
app.get('/', function(req,res){
	// var filedir = __dirname+'/index.html' 
	// console.log(filedir)
	// res.sendFile(filedir)
	res.sendFile(__dirname + '/index.html')
})
io.on('connection', function(socket){
	console.log('get one connection')
	socket.on('sendmessage', function handle_message (message) {
		console.log(message)
		io.emit('broadcastmsg', message)
	})
	socket.on('disconnect', function (){
		console.log('disconnected')
	})
})
server.listen(3000, function(){
	console.log('server started on 3000')
})