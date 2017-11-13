var socket;

var incanvasid;

var r,g,b;

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

	id = currentLocation.replace( 'http://localhost:3001/canvas/', "" );

	canvasid = id;

	console.log(canvasid)

	socket = io.connect('http://localhost:3001/'+canvasid);
	
	createCanvas(1200,500);

	background(51);

	socket.on('mouse',newDrawing);
}


function newDrawing(data){
	//console.log("rec:"+data);
	
	fill(data.r,data.b,data.g);	
	ellipse(data.x, data.y, 10,10);

	//console.log("receiving : "+data.x +","+data.y);
		
	
}

function draw() {
	noStroke();
	if(mouseIsPressed){
		fill(r,b,g);	
		ellipse(mouseX, mouseY, 10,10);

		//console.log("sending : "+mouseX +","+mouseY);
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
