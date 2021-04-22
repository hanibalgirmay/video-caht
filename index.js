const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const socket = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

const port = process.env.PORT || 4500;

app.get("/", (req, res) => {
  res.send("server is running");
});

socket.on("connection", (io) => {
  io.emit("me", io.id);

  io.on("disconnect", () => {
    io.broadcast.emit("callended");
  });

  io.on("calluser", ({ userToCall, signalData, from, phone }) => {
    socket.to(userToCall).emit("calluser", { signal: signalData, from: name });
  });

  io.on("answercall", (data) => {
    socket.to(data.to).emit("callaccepted", data.signal);
  });
});

server.listen(port, () => console.log("Server listening on port", port));
