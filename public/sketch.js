var socket;

var nameval;

var r,g,b;

var connectlist = {};

var div;

//generate integer between given
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function setup() {
	var currentLocation = window.location.href;


	r = getRandomInt(155, 255);
	b = getRandomInt(100, 200);
	g = getRandomInt( 55, 155);

	id = currentLocation.replace( 'https://multiusercanvas.herokuapp.com/canvas/', "" );
	id = currentLocation.replace( 'http://localhost:3000/canvas/', "" );

	canvasid = id;

	console.log(canvasid)

	socket = io.connect('http://localhost:3000/'+canvasid);

 	div = document.getElementById("textDiv");  

	createCanvas(1200,500);

	background(51);

	//get other user data
	socket.on('mouse',newDrawing);
	socket.on('newuser',newUser);
	socket.on('disuser',disUser);
	socket.on('foruser',forUser);

	var person = prompt("Please enter your name", "Harry Potter");

	if(person!=null){
		nameval = person;
		sendForConnection();
	}
}



function newUser(data){
	connectlist[data.socketid] = data.name;
	console.log(connectlist);
	div.textContent = JSON.stringify(connectlist);
	sendConnection();
} 
function forUser(data){
	connectlist[data.socketid] = data.name;
	div.textContent = JSON.stringify(connectlist);
	console.log(connectlist);
} 

function disUser(data){
	delete connectlist[data];
	div.textContent = JSON.stringify(connectlist);
	console.log(connectlist);
}

function newDrawing(data){	
	fill(data.r,data.b,data.g);	
	ellipse(data.x, data.y, 10,10);
}

function draw() {
	noStroke();
	if(mouseIsPressed){
		fill(r,b,g);	
		ellipse(mouseX, mouseY, 10,10);

		if(mouseX>0 && mouseX<1200 && mouseY>0 && mouseY<500 ){
			sendData(mouseX,mouseY,r,b,g);
		}
	}
}



function sendData(mouseX,mouseY,red,blue,green){
	var data = {
		x : mouseX,
		y : mouseY,
		r : red,
		b : blue,
		g : green,
		socketid : socket.id
	}
	socket.emit('mouse', data);
}

function sendForConnection(){

	var data = {
		name : nameval
	};
	socket.emit('newuser',data);
}
function sendConnection(){

	var data = {
		name : nameval
	};
	socket.emit('foruser',data);
}