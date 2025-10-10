import { useEffect, useRef } from "react";

const UserFeedPlayer: React.FC<{ stream?: MediaStream }> = ({ stream }) => {
    
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <>
      <video
        ref={videoRef}
        style={{ width: "250px", height: "100px" }}
        muted={true}
        autoPlay
      />
    </>
  );
};

export default UserFeedPlayer;
