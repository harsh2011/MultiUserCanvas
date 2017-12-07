//Node Code

//express library
var express =  require('express');
//socket library
var socket = require('socket.io');
//arraylist as data structure
var ArrayList = require('arraylist');
//Dictionary
var dict = require("dict");


//express app
var app = express();

var list = new ArrayList;

var server = app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

//socket intialization
var io = socket(server);

// WebSocket Portion
// WebSockets work with the HTTP server

var canvas;

//inital page (send the public folder to client which load index.html)
app.use(express.static('public'));

//canvas page (it loads canvas.html)
app.get('/canvas/:data', function(req, res) {
	
	var temp = {};
	temp["a"] = "a";
	temp["b"] = "b";
	console.log(temp);


	var canvas_id =  req.params.data;

	//check if the canvas id exist
	if(list.contains(canvas_id)){
		//when socket exist 
		console.log("socket not created");
	}
	else{
		//when socket not exist (new socket is created)
		console.log("socket created");
		
		list.add(canvas_id);

		//creating socket of the given ID
		canvas = io.of(canvas_id).on('connection',newconnect); 
	}

	//return canvas.html
	res.sendFile(__dirname + '/public/canvas.html');

});


function newconnect(socket){

	socket.on('newuser',function(data){
		newdata= {
			name : data.name,
			socketid : socket.id
		};
		socket.broadcast.emit('newuser',newdata);
	});

	socket.on('foruser',function(data){
		newdata= {
			name : data.name,
			socketid : socket.id
		};
		socket.broadcast.emit('foruser',newdata);
	});

	// When this user emits, client side: socket.emit('otherevent',some data);
	socket.on('mouse',function(data) {
		// Data comes for a client

		// Send it to all other clients
		socket.broadcast.emit('mouse', data);
	});

	socket.on('disconnect', function(data){
		console.log("disconnect " + socket.id);
		socket.broadcast.emit('disuser',socket.id);
	});

}

console.log("Server running on port 3000");


