//Node Code

//express library
var express =  require('express');
var socket = require('socket.io');
var ArrayList = require('arraylist');

var app = express();

var list = new ArrayList;
var clist = new ArrayList;


var server = app.listen(3001);

app.use(express.static('public'));

// WebSocket Portion
// WebSockets work with the HTTP server
var io = socket(server);

var canvas;

app.get('/canvas/:data', function(req, res) {
	console.log("i am here");

	var canvas_id =  req.params.data;

	if(list.contains(canvas_id)){
		//nothing 
		console.log("socket not created");
	}
	else{
		console.log("socket created");
		list.add(canvas_id)

		console.log(canvas_id);

		canvas = io.of(canvas_id).on('connection',newconnect); 

		clist.add(canvas)
	}

	res.sendFile(__dirname + '/public/canvas.html');

});


function newconnect(socket){
	console.log("We have a new client: " + socket.id);

	console.log(clist[0].connected);

	// When this user emits, client side: socket.emit('otherevent',some data);
	socket.on('mouse',function(data) {
		// Data comes in as whatever was sent, including objects
		//console.log("Received: 'mouse' " + data.x + " " + data.y);

		// Send it to all other clients
		socket.broadcast.emit('mouse', data);

		// This is a way to send to everyone including sender
		// io.sockets.emit('message', "this goes to everyone");

	});

	socket.on('disconnect', function(data){
		console.log("disconnect " + data);
	    console.log("Client has disconnected");
	});

}

console.log("Server running on port 3001");


