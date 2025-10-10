import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../Context/SocketContext";
import UserVideoFeed from "../Components/UserFeed";
import {
  Video,
  Users,
  Settings,
  Mic,
  MicOff,
  VideoOff,
  Monitor,
  MessageSquare,
  PhoneOff,
} from "lucide-react";

const Room: React.FC = () => {
  const { id } = useParams();
  const { socket, user, stream, peers } = useContext(SocketContext);

  useEffect(() => {
    if (user) {
      socket?.emit("joined-room", { roomId: id, peerId: user._id });
      console.log("New user with id", user._id, "has joined room", id);
    }
  }, [id, user, socket]);

  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const toggleAudio = () => {
    const next = !isAudioMuted;
    setIsAudioMuted(next);

    // update local stream audio tracks
    try {
      stream?.getAudioTracks().forEach((t: MediaStreamTrack) => {
        // enabled false means muted
        t.enabled = !next;
      });
    } catch {
      // ignore
    }

    // notify others via socket
    socket?.emit("toggle-audio", { peerId: user?._id, muted: next });
  };

  const toggleVideo = () => {
    const next = !isVideoOff;
    setIsVideoOff(next);

    // update local stream video tracks
    try {
      stream?.getVideoTracks().forEach((t: MediaStreamTrack) => {
        t.enabled = !next;
      });
    } catch {
      // ignore
    }

    // notify others via socket
    socket?.emit("toggle-video", { peerId: user?._id, videoOff: next });
  };

  const participants = [
    // local user
    {
      id: user?._id ?? "local",
      name: user?.name ?? "You",
      isLocal: true,
      isMuted: false,
      isVideoOff: false,
      stream,
    },
    // peers from context
    ...Object.keys(peers || {}).map((peerId) => ({
      id: peerId,
      name: peerId,
      isLocal: false,
      isMuted: false,
      isVideoOff: false,
      stream: peers[peerId].stream,
    })),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      <div className="relative z-10 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white font-semibold text-lg">
                  Team Meeting
                </h1>
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {participants.length} participants
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Recording</span>
              </div>
              <button className="p-2 hover:bg-white/10 rounded-lg transition text-gray-400 hover:text-white">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 p-4 md:p-6 lg:p-8">
        <div
          className={`grid ${getGridClass(
            participants.length
          )} gap-4 auto-rows-fr max-w-7xl mx-auto`}
        >
          {participants.map((p) => (
            <div
              key={p.id}
              className="aspect-video min-h-[200px] max-h-[400px]"
            >
              <UserVideoFeed
                userName={p.name}
                isLocal={p.isLocal}
                isMuted={p.isMuted}
                isVideoOff={p.isVideoOff}
                stream={p.stream}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Control Bar */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-gray-900/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleAudio}
              className={`p-4 rounded-xl transition-all transform hover:scale-110 ${
                isAudioMuted
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {isAudioMuted ? (
                <MicOff className="w-6 h-6 text-white" />
              ) : (
                <Mic className="w-6 h-6 text-white" />
              )}
            </button>

            <button
              onClick={toggleVideo}
              className={`p-4 rounded-xl transition-all transform hover:scale-110 ${
                isVideoOff
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {isVideoOff ? (
                <VideoOff className="w-6 h-6 text-white" />
              ) : (
                <Video className="w-6 h-6 text-white" />
              )}
            </button>

            <button className="p-4 bg-gray-700 hover:bg-gray-600 rounded-xl transition-all transform hover:scale-110">
              <Monitor className="w-6 h-6 text-white" />
            </button>

            <button className="p-4 bg-gray-700 hover:bg-gray-600 rounded-xl transition-all transform hover:scale-110 relative">
              <MessageSquare className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                3
              </span>
            </button>

            <div className="w-px h-10 bg-gray-700 mx-2"></div>

            <button className="p-4 bg-red-500 hover:bg-red-600 rounded-xl transition-all transform hover:scale-110">
              <PhoneOff className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// helper to pick grid classes
const getGridClass = (userCount: number) => {
  if (userCount === 1) return "grid-cols-1";
  if (userCount === 2) return "grid-cols-1 lg:grid-cols-2";
  if (userCount <= 4) return "grid-cols-1 md:grid-cols-2";
  if (userCount <= 6) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
};

export default Room;
