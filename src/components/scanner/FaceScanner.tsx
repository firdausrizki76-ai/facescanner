'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import CameraFeed from './CameraFeed';
import EmployeeCard from './EmployeeCard';
import { useFaceDescriptors } from '@/hooks/useFaceDescriptors';
import { useVoiceOutput } from '@/hooks/useVoiceOutput';

export default function FaceScanner() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [matchResult, setMatchResult] = useState<{
    employee: any;
    performance: any;
    confidence: number;
  } | null>(null);
  
  const { matchFace, resetDelay } = useFaceDescriptors();
  const { speak } = useVoiceOutput();
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [timeStr, setTimeStr] = useState('');

  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  const enableAudio = () => {
    // Prime the speech engine on user interaction to bypass browser autoplay blocks
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(''));
    }
    setIsAudioEnabled(true);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    updateTime();
    const intv = setInterval(updateTime, 1000);
    return () => clearInterval(intv);
  }, []);

  const handleFaceDetected = useCallback(async (detection: faceapi.WithFaceDescriptor<any> | null) => {
    if (!detection || isProcessing || matchResult) return;

    setIsProcessing(true);

    try {
      const result = await matchFace(detection.descriptor);
      
      if (result) {
        setMatchResult(result);
        
        // Announce using Voice API
        let textToSpeak = `Halo, ${result.employee.name}. `;
        if (result.performance) {
          textToSpeak += `Tanggal ${new Date().toLocaleDateString('id-ID')}. Lokasi panen, ${result.performance.harvest_location}. Anda telah mengangkat ${result.performance.kg_lifted} kilogram sawit, sebanyak ${result.performance.bunches_count} tandan. Total upah estimasi, ${result.performance.wage_amount} rupiah.`;
        } else {
          textToSpeak += `Belum ada catatan panen untuk hari ini. Selamat bekerja!`;
        }
        speak(textToSpeak);

        // Auto reset
        if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = setTimeout(() => {
          setMatchResult(null);
          setIsProcessing(false);
        }, resetDelay);
      } else {
        setTimeout(() => setIsProcessing(false), 2000);
      }
    } catch (err) {
      console.error('Matching error', err);
      setIsProcessing(false);
    }
  }, [isProcessing, matchResult, matchFace, speak, resetDelay]);

  return (
    <div className="bg-background text-on-surface font-body-md overflow-hidden min-h-screen">
      {/* TopAppBar */}
      <header className="bg-surface dark:bg-surface-container-highest border-b border-outline-variant/10 flex justify-between items-center w-full px-margin-mobile h-12 z-50 fixed top-0 left-0">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim" style={{fontVariationSettings: "'FILL' 0"}}>agriculture</span>
          <h1 className="text-headline-md font-bold text-primary dark:text-primary-fixed-dim">Sawit Face Scanner</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-label-md text-on-surface-variant">{timeStr}</span>
          <span className="material-symbols-outlined text-on-surface-variant">signal_cellular_4_bar</span>
        </div>
      </header>

      {/* Main Scanner Area */}
      <main className="relative w-full h-screen pt-12 pb-20 bg-black flex flex-col items-center justify-center">
        <CameraFeed onFaceDetected={handleFaceDetected} isProcessing={isProcessing || !!matchResult || !isAudioEnabled} matchResult={matchResult} />

        {!isAudioEnabled && (
          <div className="absolute inset-0 z-40 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            <button 
              onClick={enableAudio} 
              className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold text-label-md hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors shadow-lg flex items-center gap-2 animate-[pulse_2s_infinite]"
            >
              <span className="material-symbols-outlined text-[24px]">volume_up</span>
              AKTIFKAN SUARA & SCAN
            </button>
            <p className="text-white/70 text-sm mt-4">Ketuk untuk mengaktifkan pemindai dan suara asisten</p>
          </div>
        )}

        {/* Slide-up Card */}
        {matchResult && (
          <section className="absolute bottom-24 left-margin-mobile right-margin-mobile z-30 animate-[slideUp_0.5s_ease-out]">
            <EmployeeCard employee={matchResult.employee} performance={matchResult.performance} confidence={matchResult.confidence} onConfirm={() => {
              setMatchResult(null);
              setIsProcessing(false);
              if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
            }}/>
          </section>
        )}
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center py-2 px-margin-mobile bg-surface dark:bg-surface-container-highest shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50 border-t border-outline-variant/10">
        <div className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 scale-90">
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>camera_front</span>
          <span className="text-label-md">Scanner</span>
        </div>
        <a href="/admin" className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high transition-colors">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-label-md">Admin</span>
        </a>
        <div className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high transition-colors">
          <span className="material-symbols-outlined">person</span>
          <span className="text-label-md">Profile</span>
        </div>
      </nav>
    </div>
  );
}
