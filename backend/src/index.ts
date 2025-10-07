import express from "express";
import http from "http";
import serverConfig from "./config/serverConfig";

const app = express();

const server = http.createServer(app);

server.listen(serverConfig.PORT, () => {
    console.log(`Server is up at port ${serverConfig.PORT}`);
});
