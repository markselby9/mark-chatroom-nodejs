var socket = io();
$('form').submit(function(){
	socket.emit('sendmessage', $('input#m').val())
	$('input#m').val('')
	return false // no refresh
})
socket.on('broadcastmsg', function(msg){
	alert(msg)
})