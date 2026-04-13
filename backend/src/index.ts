import cors from "cors";
import express from "express";
import http from "http";
import { ExpressPeerServer } from "peer";
import { Server } from "socket.io";
import serverConfig from "./config/serverConfig";
import roomHandler from "./handlers/roomHandler";

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    methods: ["POST", "GET"],
    origin: "*",
  },
});

const peerServer = ExpressPeerServer(server, {
  path: "/myapp",
});

app.use("/myapp", peerServer);

io.on("connection", (socket) => {

  console.log("New user connected");

  roomHandler(socket);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

});

server.listen(serverConfig.PORT, () => {
  console.log(`Server is up at port ${serverConfig.PORT}`);
});
