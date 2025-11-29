import React, { useEffect, useRef, useState } from 'react';

interface MusicPlayerProps {
  src: string;
  isPlaying: boolean;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ src, isPlaying }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<any>(null);
  const [isYoutube, setIsYoutube] = useState(false);
  const [youtubeId, setYoutubeId] = useState<string | null>(null);

  // Parse URL to detect if it's YouTube
  useEffect(() => {
    if (!src) return;
    
    // Regex for YouTube Video IDs (supports standard, short, and embed urls)
    const ytMatch = src.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    
    if (ytMatch && ytMatch[1]) {
      setIsYoutube(true);
      setYoutubeId(ytMatch[1]);
    } else {
      setIsYoutube(false);
      setYoutubeId(null);
    }
  }, [src]);

  // HTML5 Audio Logic
  useEffect(() => {
    if (!isYoutube && audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isYoutube, isPlaying, src]);

  // YouTube API Logic
  useEffect(() => {
    if (!isYoutube || !youtubeId) return;

    // Load API if not present
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      // Destroy existing player if needed to reload
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
      }

      playerRef.current = new window.YT.Player('youtube-player-hidden', {
        height: '1',
        width: '1',
        videoId: youtubeId,
        playerVars: {
          'playsinline': 1,
          'controls': 0,
          'loop': 1,
          'playlist': youtubeId, // Required for loop to work
          'disablekb': 1,
          'fs': 0,
          'origin': window.location.origin // Improve security/policy compliance
        },
        events: {
          'onReady': (event: any) => {
             // CRITICAL FIX: Force unmute and set volume
             event.target.unMute();
             event.target.setVolume(100);

             // If the app is already in "playing" state, start video
             if (isPlaying) {
                event.target.playVideo();
             }
             // Store ref
             playerRef.current = event.target;
          },
          'onStateChange': (event: any) => {
             if (event.data === window.YT.PlayerState.ENDED) {
                event.target.playVideo(); 
             }
          }
        }
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

  }, [isYoutube, youtubeId]);

  // Sync Play/Pause state for YouTube
  useEffect(() => {
    if (isYoutube && playerRef.current && typeof playerRef.current.playVideo === 'function') {
      if (isPlaying) {
        // Ensure it's unmuted when we try to play
        if (typeof playerRef.current.unMute === 'function') {
            playerRef.current.unMute();
        }
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying, isYoutube]);

  // Adjust volume or other props if needed here

  if (isYoutube) {
    // Hidden container for YouTube iframe
    return <div id="youtube-player-hidden" className="absolute opacity-0 pointer-events-none -z-10" />;
  }

  return <audio ref={audioRef} src={src} loop />;
};