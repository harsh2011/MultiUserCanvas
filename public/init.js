var button;
var canvasid;
var incanvasid;

var greeting;

function setup() {
	incanvasid = createInput();
	incanvasid.position(30,60);

	button = createButton('submit');
	button.position(incanvasid.x + incanvasid.width,60);
	button.mousePressed(onclicksubmit);

	greeting = createElement('h2', 'what is your canvas id?');
	greeting.position(incanvasid.x,incanvasid.y - 50);
}



function onclicksubmit(){
	canvasid = incanvasid.value();
	window.location.href = '/canvas/'+canvasid;
	console.log(incanvasid.value());
}
