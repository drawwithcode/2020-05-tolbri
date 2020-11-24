let socket = io();

function preload(){
  // put preload code here
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  // put setup code here
}

function draw() {
  // put drawing code here
  ellipse(mouseX, mouseY, 40);
}





function mouseMoved() {
  let message = {
    x: mouseX,
    y: mouseY
  }
  socket.emit("mouse", message);
}

socket.on("connect", newConnection);

function newConnection() {
  console.log("Your ID: ", socket.id);
}


socket.on("mouseBroadcast", otherMouse);


function otherMouse(data) {
  fill("yello");
  ellipse(data.x, data.y, 40);
}
