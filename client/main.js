//URL server see chat
const server = 'http://localhost:6677'

var socket = io.connect(server,{'forceNew':true})

//event listening
socket.on('messages', (data)=>{
	console.log(data)
	render(data)
})


function render(data){

var html = data.map(function(message, index){
	return(`
		<div class="message">
			<strong>${message.nickname}</strong> dice:
			<p>${message.text}</p>
		</div>
		`)
		}).join(' ');

	var div_msgs = document.getElementById("messages");
	div_msgs.innerHTML = html;
	div_msgs.scrollTop = div_msgs.scrollHeight;

	document.getElementById('messages').innerHTML = html;
}

function addMessage(){
	var message = {
		nickname: document.getElementById('nickname').value,
		text:document.getElementById('text').value
	}

	document.getElementById('nickname').style.display ='none';
	//Send event data
	socket.emit('add-message', message);
	text:document.getElementById('text').value ="";
	return false;
}