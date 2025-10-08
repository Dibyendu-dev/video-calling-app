import { useContext } from "react";
import { SocketContext } from "../Context/SocketContext";

const CreateRoom: React.FC = () => {
  // SocketContext provides the socket instance as the context value (not an object with a `socket` property)
  const socket = useContext(SocketContext);

  const initRoom = () => {
    console.log("Initialising a req to create a room", socket);
    // guard against null/undefined socket to avoid runtime errors
    socket?.emit("create-room");
  };

  return (
    <button onClick={initRoom} className="btn btn-secondary">
      Start a new meeting
    </button>
  );
};

export default CreateRoom;
