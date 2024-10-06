import React, { useRef, useEffect, useState } from 'react';
import loadingVideo from '../assets/icons/loading.mp4'; // Update the path to your video

const Loading = () => {
  const videoRef = useRef(null);
  const [loadingText, setLoadingText] = useState(""); // State to hold the animated loading text
  const fullText = "Loading..."; // Full loading text
  const animationSpeed = 200; // Time in milliseconds to reveal each character
  const disappearanceDelay = 1000; // Delay before starting to disappear

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // Set playback speed to half
    }

    const animateText = () => {
      const totalLength = fullText.length;
      
      const showText = () => {
        for (let i = 0; i <= totalLength; i++) {
          setTimeout(() => {
            setLoadingText(fullText.substring(0, i)); // Set the loading text to the substring of the full text
          }, i * animationSpeed); // Increase delay for each character
        }
      };

      const hideText = () => {
        for (let i = totalLength; i >= 0; i--) {
          setTimeout(() => {
            setLoadingText(fullText.substring(0, i)); // Set the loading text to the substring of the full text
          }, (totalLength - i) * animationSpeed); // Increase delay for each character
        }
      };

      // Run the show and hide animations in sequence
      const sequenceAnimation = () => {
        showText();
        setTimeout(() => {
          hideText();
          setTimeout(sequenceAnimation, (totalLength + 1) * animationSpeed + disappearanceDelay); // Call again for looping
        }, totalLength * animationSpeed + disappearanceDelay);
      };

      sequenceAnimation(); // Start the animation
    };

    animateText(); // Start the animation

    // Optional: Clear timeout on component unmount
    return () => {
      setLoadingText(""); // Clear loading text on unmount
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-white">
      <video
        ref={videoRef}
        src={loadingVideo}
        alt="Loading..."
        className="max-w-xs md:max-w-md lg:max-w-lg object-contain"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="mt-4 text-5xl font-bold text-gray-700">{loadingText}</div> 
    </div>
  );
};

export default Loading;
