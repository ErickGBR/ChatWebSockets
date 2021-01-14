var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port=6677;

app.use(express.static('client'))


app.get('/hola-mundo', function(res,res){
	res.status(200).send("hola mundo");
});

var messages =[{
	id:1,
	text:'Bienvenido al chat privado',
	nickname:"Bot - ErickBurgos"
}]

io.on('connection', function(socket){
	console.log(`Nodo con ip: ${socket.handshake.address} se ha conectado..`);

	socket.emit('messages',messages);

	socket.on('add-message', (data)=>{
		messages.push(data);
		io.sockets.emit('messages', messages);
	})

})


server.listen(port,function(){
	console.log("El servidor esta funcionando en: ",port);
});