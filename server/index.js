const { Server } = require("socket.io");
const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const CLIENT_ORIGIN = "http://localhost:5173";
const CORS_OPTIONS = {
  origin: CLIENT_ORIGIN,
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(CORS_OPTIONS));
const io = new Server(server, { cors: CORS_OPTIONS });

io.on("connection", (socket) => {
  console.log("User connecttd", socket.id);

  socket.on("message", (data) => {
    console.log("Message received:", data);
    socket.broadcast.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
