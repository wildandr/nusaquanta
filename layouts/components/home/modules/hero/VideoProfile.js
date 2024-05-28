import React, { useEffect, useRef } from "react";

export default function VideoProfile({ play }) {
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.load();
    videoRef.current.currentTime = 0;
    if (play) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [play]);

  return (
    <div className="w-full h-full justify-center items-center flex flex-row">
      <video ref={videoRef} className="w-full" loop playsInline preload="none">
        <source src="/video/home/video-test-3.mp4" type="video/mp4" />
        <track
          src="/path/to/captions.vtt"
          kind="subtitles"
          srcLang="en"
          label="English"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
