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
    io.broadcast.emit("callEnd");
  });

  io.on("callUser", ({ userToCall, signalData, from, name }) => {
    socket.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  io.on("answerCall", (data) => {
    socket.to(data.to).emit("callAccepted", data.signal);
  });
});

server.listen(port, () => console.log("Server listening on port", port));
