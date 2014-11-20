var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var user_num = 0;
var usernames = {};
//routing
app.use("/res", express.static(__dirname + '/res'));

app.get('/', function(req,res){
	// var filedir = __dirname+'/index.html' 
	// console.log(filedir)
	// res.sendFile(filedir)
	res.sendFile(__dirname + '/index.html')
});
io.on('connection', function(socket){
	user_num++;
	io.sockets.emit('onlinelist-update',{
		user_num: user_num,
		socket_dic: usernames
	});
	console.log('Current user_num: '+user_num);
	socket.on('setnickname', function (name){
		delete usernames[socket.nickname];
		socket.nickname = name;
		usernames[name] = name;
		io.sockets.emit('onlinelist-update',{
			user_num: user_num,
			socket_dic: usernames
		});
		socket.broadcast.emit('broadcastmsg',
		{
			nickname: 'system',
			msg: 'welcome new guy '+name+' !'
		})
	});
	socket.on('sendmessage', function (msg){
		console.log(msg);
		socket.broadcast.emit('broadcastmsg', 
			{
				nickname:socket.nickname,
				msg:msg
			})
	});
	socket.on('disconnect', function (){
		user_num--;
		//socket_havename.removeItem(socket);
		if (!usernames.hasOwnProperty(socket.nickname)){

		}else{
			socket.broadcast.emit('broadcastmsg',
				{
					nickname: 'system',
					msg: socket.nickname+' left the chatroom !'
				});
			delete usernames[socket.nickname];
			io.sockets.emit('onlinelist-update',{
				user_num: user_num,
				socket_dic: usernames
			});
		}
		console.log('Current user_num: '+user_num);
	})
});
server.listen(3000, function(){
	console.log('server started on 3000');
	user_num=0
});
