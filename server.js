let express = require("express");
let socket = require("socket.io");

let app = express();

let port = process.env.PORT || 3000;

let server = app.listen(port);

let io = socket(server);

app.use(express.static("public"));


let time = 60;
let userCount = 0;
io.on("connection", newConnection);
function newConnection(socket) {
  userCount = userCount + 1;
  console.log("User Connected. User Count: " + userCount);
  io.emit("userCount", userCount);
  socket.on("mouse", function(dataReceived) {
    socket.broadcast.emit("mouseBroadcast", dataReceived);
  });
  socket.on("disconnect", function() {
    userCount = userCount - 1;
    console.log("User Disconnected. User Count: " + userCount);
    io.emit("userCount", userCount);
  });
}

var timer = setInterval(function(){
  time = time + 1;
  io.emit("reset", time);
  if (time >= 60) {
    time = 0;
  }
}, 1000)
