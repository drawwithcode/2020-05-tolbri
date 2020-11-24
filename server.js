let express = require("express");
let socket = require("socket.io");

let app = express();

let port = process.env.PORT || 3000;

let server = app.listen(port);

let io = socket(server);

app.use(express.static("public"));


io.on("connection", newConnection);

function newConnection(socket) {
  console.log("new connection: " + socket.client.id);
  socket.on("mouse", mouseMessage);

  function mouseMessage(dataReceived) {
    socket.broadcast.emit("mouseBroadcast", dataReceived);
  }

}
