
import {useEffect, useRef} from "react";

function VideoView() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const handleLoadStart = (e: Event) => {
      console.log("loadstart", e)
    }

    video.addEventListener('loadstart', handleLoadStart);

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
    }

  }, [])

  return (
    <video ref={ref} >
      <source />
    </video>
  )
}

export default VideoView