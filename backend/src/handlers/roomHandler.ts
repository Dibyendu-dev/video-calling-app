import { Socket } from "socket.io";
import { v4 as UUIDv4 } from "uuid";
import IRoomParams from "../interfaces/IRoomParams";

// map stores for a room what all peers have joined
    const rooms: Record<string ,string[]> = {}  

const roomHandler = (socket: Socket) => {
    
    const createRoom = () => {
         // this will be our unique room id in which multiple
        // connection will exchange data
        const roomId = UUIDv4();

          //  make the socket connection enter a new room
        socket.join(roomId);

        rooms[roomId] = []; // create a new entry for the room

         //  emit an event from server side that
        // socket connection has been added to a room
        socket.emit("room-created", { roomId });
        console.log("Room created with id", roomId);
    };


    //  The below function is executed everytime a user(creator or joinee) joins
    //  a new room
    const joinedRoom = ({roomId , peerId}: IRoomParams) => {
        if(rooms[roomId]){
            console.log("new user has joined the room" , roomId, "with peer id as", peerId);
            // the moment new user joins, add the peerId to the key of roomId
            rooms[roomId].push(peerId);
            socket.join(roomId); // make the user join the socket room

             // below event is for logging purpose
            socket.emit("get-users", {
                roomId,
                participants: rooms[roomId]
            });
        }
    };

    socket.on("create-room", createRoom);
    socket.on("joined-room", joinedRoom);
};

export default roomHandler;
