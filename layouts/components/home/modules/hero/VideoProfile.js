import React, { useEffect, useRef } from "react";

export default function VideoProfile({ play }) {
  const videoRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    // Ada dua instance VideoProfile di HomeHero (desktop & mobile).
    // Hanya instance yang sedang terlihat yang boleh jalan,
    // supaya video/audionya tidak "kedobel".
    const visible = el.offsetParent !== null;
    if (play && visible) {
      el.play().catch(() => {});
    } else {
      el.pause();
      if (!play) el.currentTime = 0;
    }
  }, [play]);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (boxRef.current?.requestFullscreen) {
      boxRef.current.requestFullscreen();
    }
  };

  return (
    <div
      ref={boxRef}
      className="w-full h-full justify-center items-center flex flex-row relative bg-black"
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        loop
        playsInline
        preload="none"
      >
        <source src="/video/home/company-profile.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {play && (
        <button
          onClick={toggleFullscreen}
          aria-label="Fullscreen"
          title="Fullscreen"
          className="absolute bottom-3 right-3 z-[70] flex items-center justify-center w-9 h-9 rounded-lg border border-primary/60 bg-black/50 text-primary hover:bg-primary hover:text-black transition-colors cursor-pointer"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 6V2h4" />
            <path d="M14 10v4h-4" />
            <path d="M10 2h4v4" />
            <path d="M6 14H2v-4" />
          </svg>
        </button>
      )}
    </div>
  );
}
