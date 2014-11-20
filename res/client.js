var socket = io();
var nickname = '';
$('#input-box').keydown(function(e){
	if(e.keyCode==13){
		sendmessage()
	}
});
$('#send-button').click(sendmessage);
$('#save-nickname').click(function(){
	var nick = $('#input-nickname').val();
	if (nick.length!=0){
		nickname=nick;
		addmessage('your nickname has been changed to '+nickname+'!');
		socket.emit('setnickname', nickname);
	}else{
		addmessage('your nickname remains anonymous!')
	}
	$('#nickname-modal').modal('toggle');
	$('#save-nickname').val('change nickname: '+nick);
});
socket.on('onlinelist-update', function(data){
	var socket_dic = data.socket_dic;
	var online_num = data.user_num;
	console.log()
	$('#online-number').html('('+online_num+' people online)');
	var keys = Object.keys(socket_dic);
	$('#online-list').html('');
	for (var i = 0; i < keys.length; i++){
		var temp_name = socket_dic[keys[i]];
		$('#online-list').append('<li class="list-group-item">'+temp_name+'</li>');
	}
});
socket.on('broadcastmsg', function(data){
	addmessage(data.nickname + ' :>' + data.msg)
});

function sendmessage(){
	var msg = $('input.input').val();
	if (nickname.length==0){

	}else if (msg.length==0){

	}else{
		addmessage('You ('+nickname+') :> '+msg)
		socket.emit('sendmessage', $('input.input').val())	
	}
	$('input.input').val('');
}
function addmessage(msg){
	// alert(msg)
	var safemsg = $("#x").text(msg).html(); 
	$('#messages > li:last').append('<li>'+safemsg+'</li>');
	$('#messages li:odd').addClass("odd");

}