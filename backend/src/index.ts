import cors from "cors";
import express from "express";
import http from "http";
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

io.on("connection", (socket) => {

  console.log("New user connected");
 
  // pass the socket conn to the room handler for room creation and joining
   roomHandler(socket); 

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
  
});

server.listen(serverConfig.PORT, () => {
  console.log(`Server is up at port ${serverConfig.PORT}`);
});
