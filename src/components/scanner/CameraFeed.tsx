'use client';

import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import { useFaceDetection } from '@/hooks/useFaceDetection';
import * as faceapi from 'face-api.js';

interface CameraFeedProps {
  onFaceDetected: (detection: faceapi.WithFaceDescriptor<any> | null) => void;
  isProcessing: boolean;
  matchResult: any;
}

export default function CameraFeed({ onFaceDetected, isProcessing, matchResult }: CameraFeedProps) {
  const webcamRef = useRef<Webcam>(null);
  const { isModelsLoaded, detectFace } = useFaceDetection();

  // Face detection loop
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isModelsLoaded && !isProcessing && !matchResult) {
      interval = setInterval(async () => {
        if (webcamRef.current && webcamRef.current.video) {
          const video = webcamRef.current.video;
          if (video.readyState === 4) {
            const detection = await detectFace(video);
            if (detection) {
              onFaceDetected(detection);
            }
          }
        }
      }, 500); // Check every 500ms
    }

    return () => clearInterval(interval);
  }, [isModelsLoaded, detectFace, isProcessing, matchResult, onFaceDetected]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black flex flex-col items-center justify-center pt-12 pb-20">
      {!isModelsLoaded && (
        <div className="absolute z-50 text-white font-label-md flex flex-col items-center gap-2">
           <span className="material-symbols-outlined animate-spin">refresh</span>
           Memuat AI Model...
        </div>
      )}

      {/* Dimming Overlay (as per design) */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>

      {/* Live Camera Feed */}
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: 'user' }}
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      {/* Scanning Frame from Prototype */}
      <div className="relative z-20 w-[85%] max-w-sm aspect-[3/4] rounded-xl border border-white/20 flex items-center justify-center overflow-hidden">
        {/* Frame Corners */}
        <div className="absolute top-0 left-0 scanner-corner border-t-4 border-l-4 rounded-tl-xl"></div>
        <div className="absolute top-0 right-0 scanner-corner border-t-4 border-r-4 rounded-tr-xl"></div>
        <div className="absolute bottom-0 left-0 scanner-corner border-b-4 border-l-4 rounded-bl-xl"></div>
        <div className="absolute bottom-0 right-0 scanner-corner border-b-4 border-r-4 rounded-br-xl"></div>

        {/* Dynamic State Overlay */}
        {matchResult ? (
           <div className="face-detected-box w-48 h-56 rounded-full flex flex-col items-center justify-end pb-4 bg-primary-fixed-dim/10 border-2 border-primary-fixed-dim shadow-[0_0_15px_rgba(161,212,148,0.4)] transition-all duration-300">
               <div className="bg-primary px-3 py-1 rounded-full mb-2 flex items-center gap-1.5 shadow-lg">
                   <span className="material-symbols-outlined text-[14px] text-on-primary">check_circle</span>
                   <span className="text-[10px] font-label-md text-on-primary uppercase tracking-widest">Matched</span>
               </div>
           </div>
        ) : isProcessing ? (
           <div className="face-detected-box w-48 h-56 rounded-full flex flex-col items-center justify-end pb-4 bg-primary-fixed-dim/10 border-2 border-primary-fixed-dim shadow-[0_0_15px_rgba(161,212,148,0.4)] transition-all duration-300">
             <div className="bg-primary px-3 py-1 rounded-full mb-2 flex items-center gap-1.5 shadow-lg">
                 <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse"></span>
                 <span className="text-[10px] font-label-md text-on-primary uppercase tracking-widest">Scanning...</span>
             </div>
           </div>
        ) : (
           <div className="w-48 h-56 rounded-full border border-white/30 flex flex-col items-center justify-end pb-4 transition-all duration-300">
             {/* Idle state */}
           </div>
        )}

        {/* Scanning Line Animation */}
        {!matchResult && (
           <div className="absolute w-full h-0.5 bg-primary-fixed-dim shadow-[0_0_15px_#a1d494] top-1/2 animate-[bounce_3s_infinite] opacity-50"></div>
        )}
      </div>
    </div>
  );
}
