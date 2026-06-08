import { useEffect, useState, useRef } from 'react';
import * as faceapi from 'face-api.js';

export function useFaceDetection() {
  const [isModelsLoaded, setIsModelsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadModels() {
      try {
        const MODEL_URL = '/models';
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ]);
        setIsModelsLoaded(true);
      } catch (err) {
        console.error('Error loading face-api models:', err);
        setError('Failed to load face detection models.');
      }
    }
    loadModels();
  }, []);

  const detectFace = async (videoElement: HTMLVideoElement) => {
    if (!isModelsLoaded) return null;
    
    try {
      const detection = await faceapi
        .detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();
      return detection || null;
    } catch (err) {
      console.error('Face detection error:', err);
      return null;
    }
  };

  return { isModelsLoaded, error, detectFace };
}
