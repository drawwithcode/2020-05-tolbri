let socket = io();
let users = 1;
let size = 50;

function preload() {
  // put preload code here
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  rectMode(CENTER);
  noCursor();
  background("#E3F2FD");
  strokeWeight(2);

  // put setup code here
}

function draw() {
  // put drawing code here
}

function drawLine(data) {
  stroke(data.c);
  if(data.l == true) {
    line(data.x, data.y, data.pX, data.pY);
  } else {
    line(data.x + windowWidth / 2, data.y, data.pX + windowWidth / 2, data.pY);
  }


}

function resizeArea() {
  stroke("#90CAF9");
  square(windowWidth / 2 - windowWidth / 4, windowHeight / 2, size * users);
}


function mouseMoved() {

  if (
    mouseX > windowWidth / 2 - windowWidth / 4 - size / 2 * users &&
    mouseX < windowWidth / 2 - windowWidth / 4 + size / 2 * users &&
    mouseY > windowHeight / 2 - size / 2 * users &&
    mouseY < windowHeight / 2 + size / 2 * users
  ) {
    let data = {
      x: mouseX,
      y: mouseY,
      pX: pmouseX,
      pY: pmouseY,
      c: "#1565C0",
      l: true
    }
    drawLine(data);

    let message = {
      x: mouseX,
      y: mouseY,
      pX: pmouseX,
      pY: pmouseY,
      c: "#00897B",
      l: false
    }
    socket.emit("mouse", message);
  } else {
    let data = {
      x: mouseX,
      y: mouseY,
      pX: pmouseX,
      pY: pmouseY,
      c: "#BBDEFB",
      l: true
    }
    drawLine(data);
  }

}

function resetSpace(data) {
  push();
  rectMode(CORNER);
  noStroke();
  fill("#0D47A1");
  let m = map(data, 0, 60, 0, windowWidth);
  rect(0, 0, m, 5);
  pop();
  if (data >= 60) {
        background("#E3F2FD");
        resizeArea();
  }
}

socket.on("reset", resetSpace);
socket.on("mouseBroadcast", drawLine);
socket.on("userCount", userCount);

function userCount(data) {
  if (users != data) {
      users = data;
      setTimeout(resizeArea,1000);
  }
  console.log("Connected Users: " + users);
}
