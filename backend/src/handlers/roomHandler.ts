import { Socket } from "socket.io";
import { v4 as UUIDv4 } from "uuid";

const roomHandler = (socket: Socket) => {
    // create a room
    const createRoom = () => {
        const roomId = UUIDv4();
        socket.join(roomId);
        socket.emit("room-created", { roomId });
        console.log("Room created with id", roomId);
    };

    const joinRoom = () => {
        console.log("new room joined");
    };

    socket.on("create-room", createRoom);
    socket.on("join-room", joinRoom);
};

export default roomHandler;
