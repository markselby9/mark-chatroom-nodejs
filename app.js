var express = require('express')
var app = express()
var http = require('http')
var server = http.createServer(app)
var io = require('socket.io').listen(server)
var user_num = 0
var socket_havename = {}
app.use("/res", express.static(__dirname + '/res'))
app.get('/', function(req,res){
	// var filedir = __dirname+'/index.html' 
	// console.log(filedir)
	// res.sendFile(filedir)
	res.sendFile(__dirname + '/index.html')
})
io.on('connection', function(socket){
	console.log('someone connected to the chatroom.')
	socket.nickname="anonymous"
	user_num++
	socket.on('setnickname', function (name){
		socket.nickname = name
		socket_havename[name]=socket
		socket.broadcast.emit('broadcastmsg',
		{
			nickname: 'system',
			msg: 'welcome new guy '+name+' !'
		})
	})
	socket.on('sendmessage', function (msg){
		console.log(msg)
		socket.broadcast.emit('broadcastmsg', 
			{
				nickname:socket.nickname,
				msg:msg
			})
	})
	socket.on('disconnect', function (){
		console.log('someone left the chatroom.')
		user_num--
	})
})
server.listen(3000, function(){
	console.log('server started on 3000')
	user_num=0
})
