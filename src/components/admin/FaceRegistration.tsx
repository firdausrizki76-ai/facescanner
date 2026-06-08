'use client';

import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import { useFaceDetection } from '@/hooks/useFaceDetection';

interface FaceRegistrationProps {
  onDescriptorCaptured: (descriptor: number[]) => void;
}

export default function FaceRegistration({ onDescriptorCaptured }: FaceRegistrationProps) {
  const webcamRef = useRef<Webcam>(null);
  const { isModelsLoaded, detectFace } = useFaceDetection();
  
  const [status, setStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const captureFace = useCallback(async () => {
    if (!isModelsLoaded) return;
    setStatus('scanning');
    setErrorMessage('');

    if (webcamRef.current && webcamRef.current.video) {
      const video = webcamRef.current.video;
      if (video.readyState === 4) {
        try {
          const detection = await detectFace(video);
          if (detection) {
            // Convert Float32Array to standard array for JSON storage in Supabase
            const descriptorArray = Array.from(detection.descriptor);
            onDescriptorCaptured(descriptorArray);
            setStatus('success');
          } else {
            setStatus('error');
            setErrorMessage('Wajah tidak terdeteksi. Pastikan pencahayaan cukup dan wajah terlihat jelas.');
          }
        } catch (err) {
          setStatus('error');
          setErrorMessage('Terjadi kesalahan saat memproses wajah.');
        }
      }
    }
  }, [isModelsLoaded, detectFace, onDescriptorCaptured]);

  return (
    <div className="flex flex-col items-center w-full gap-4">
      <div className="relative w-full max-w-sm aspect-[3/4] bg-surface-container-lowest border-2 border-dashed border-outline-variant/50 rounded-xl overflow-hidden flex items-center justify-center">
        {!isModelsLoaded ? (
          <div className="flex flex-col items-center text-on-surface-variant gap-2">
            <span className="material-symbols-outlined animate-spin">refresh</span>
            <span className="text-label-md">Memuat AI Model...</span>
          </div>
        ) : (
          <>
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: 'user' }}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity ${status === 'success' ? 'opacity-50' : 'opacity-100'}`}
            />
            {status === 'scanning' && (
              <div className="absolute inset-0 border-4 border-primary z-10">
                <div className="w-full h-1 bg-primary shadow-[0_0_15px_rgba(21,66,18,0.8)] animate-[bounce_2s_infinite]"></div>
              </div>
            )}
            {status === 'success' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary/20 backdrop-blur-sm z-20">
                <div className="bg-primary text-on-primary rounded-full p-3 mb-2">
                  <span className="material-symbols-outlined text-[32px]">check</span>
                </div>
                <span className="font-bold text-primary-container drop-shadow-md">Data Wajah Tersimpan</span>
              </div>
            )}
          </>
        )}
      </div>

      <div className="w-full max-w-sm">
        {status === 'error' && (
          <div className="mb-3 p-3 bg-error/10 text-error rounded border border-error/20 text-label-md flex gap-2 items-start">
             <span className="material-symbols-outlined text-[16px]">warning</span>
             <p>{errorMessage}</p>
          </div>
        )}
        
        <button
          type="button"
          onClick={captureFace}
          disabled={!isModelsLoaded || status === 'scanning' || status === 'success'}
          className="w-full bg-secondary text-on-secondary py-3 rounded text-label-md font-bold hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">
            {status === 'success' ? 'done_all' : 'photo_camera'}
          </span>
          {status === 'success' ? 'Wajah Berhasil Direkam' : status === 'scanning' ? 'Memindai...' : 'Ambil Data Wajah'}
        </button>
        
        {status === 'success' && (
          <button 
            type="button"
            onClick={() => setStatus('idle')}
            className="w-full mt-2 text-primary text-label-md hover:underline"
          >
            Ulangi Pengambilan
          </button>
        )}
      </div>
    </div>
  );
}
