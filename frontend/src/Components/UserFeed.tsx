import React, { useRef, useEffect } from "react";
import { MicOff } from "lucide-react";

type UserFeedProps = {
  userName?: string;
  isLocal?: boolean;
  isMuted?: boolean;
  isVideoOff?: boolean;
  stream?: MediaStream;
};

export const UserVideoFeed: React.FC<UserFeedProps> = ({
  userName,
  isLocal = false,
  isMuted = false,
  isVideoOff = false,
  stream,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      try {
        videoRef.current.srcObject = stream;
      } catch {
        // ignore in case of attach errors
      }
    }
  }, [stream]);

  return (
    <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl group h-full">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted={isLocal || isMuted}
        autoPlay
        playsInline
      />

      {isVideoOff && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
              <span className="text-3xl font-bold text-white">
                {userName?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <p className="text-white font-medium">{userName}</p>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium text-sm">
              {userName} {isLocal && "(You)"}
            </span>
            {isMuted && (
              <div className="bg-red-500 rounded-full p-1">
                <MicOff className="w-3 h-3 text-white" />
              </div>
            )}
          </div>

          <div className="flex gap-1">
            <div className="w-1 h-3 bg-green-500 rounded-full"></div>
            <div className="w-1 h-4 bg-green-500 rounded-full"></div>
            <div className="w-1 h-5 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 border-4 border-green-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </div>
  );
};

export default UserVideoFeed;
