var socket = io();
var nickname = 'anonymous';
$('#send-button').click(function(){
	var msg = $('input.input').val()
	if (msg.length==0){

	}else{
		addmessage('You ('+nickname+') :> '+msg)
		socket.emit('sendmessage', $('input.input').val())	
	}
	$('input.input').val('')
	return false // no refresh
})
$('#save-nickname').click(function(){
	var nick = $('#input-nickname').val()
	if (nick.length!=0){
		nickname=nick
		addmessage('your nickname has been changed to '+nickname+'!')
		socket.emit('setnickname', nickname)
	}else{
		addmessage('your nickname remains anonymous!')
	}
	$('#nickname-modal').modal('toggle')
})
socket.on('broadcastmsg', function(data){
	addmessage(data.nickname + ' :>' + data.msg)
})

function addmessage(msg){
	// alert(msg)
	var safemsg = $("#x").text(msg).html(); 
	$('#messages > li:last').append('<li>'+safemsg+'</li>')
	$('#messages li:odd').addClass("odd")

}