'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function SettingsPage() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    face_match_threshold: 0.50,
    scanner_reset_delay: 8000
  });

  useEffect(() => {
    async function loadSettings() {
      const { data, error } = await supabase
        .from('app_settings')
        .select('*')
        .eq('id', 'global')
        .single();
        
      if (data) {
        setSettings({
          face_match_threshold: data.face_match_threshold,
          scanner_reset_delay: data.scanner_reset_delay
        });
      }
      setIsLoading(false);
    }
    loadSettings();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    
    const formData = new FormData(e.currentTarget);
    const newSettings = {
      face_match_threshold: parseFloat(formData.get('face_match_threshold') as string),
      scanner_reset_delay: parseInt(formData.get('scanner_reset_delay') as string, 10),
      updated_at: new Date().toISOString()
    };

    try {
      const { error } = await supabase
        .from('app_settings')
        .update(newSettings)
        .eq('id', 'global');
        
      if (error) throw error;
      
      setSettings(newSettings);
      alert('Pengaturan berhasil disimpan!');
    } catch (err: any) {
      console.error('Failed to save settings:', err);
      alert('Gagal menyimpan pengaturan: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 flex justify-center"><span className="material-symbols-outlined animate-spin">refresh</span></div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-headline-lg text-primary">Pengaturan Sistem</h1>
        <p className="text-body-md text-on-surface-variant mt-1">Konfigurasi variabel global untuk Scanner dan Face Recognition.</p>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="face_match_threshold" className="text-label-md text-on-surface uppercase font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary">face</span>
                Face Match Threshold
              </label>
              <p className="text-xs text-on-surface-variant">Batas Euclidean Distance (0.00 - 1.00). Semakin kecil, semakin ketat pencocokannya. Default: 0.50.</p>
              <input 
                required 
                id="face_match_threshold" 
                name="face_match_threshold" 
                type="number" 
                step="0.01" 
                min="0.01" 
                max="1.00"
                defaultValue={settings.face_match_threshold}
                className="w-full bg-surface-container text-on-surface rounded border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary p-2 text-body-md" 
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="scanner_reset_delay" className="text-label-md text-on-surface uppercase font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary">timer</span>
                Scanner Reset Delay (ms)
              </label>
              <p className="text-xs text-on-surface-variant">Durasi pop-up karyawan tampil sebelum scanner me-reset (dalam milidetik). Default: 8000 (8 detik).</p>
              <input 
                required 
                id="scanner_reset_delay" 
                name="scanner_reset_delay" 
                type="number"
                min="1000"
                step="100"
                defaultValue={settings.scanner_reset_delay}
                className="w-full bg-surface-container text-on-surface rounded border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary p-2 text-body-md" 
              />
            </div>
          </div>
          
          <div className="pt-4 border-t border-outline-variant/20 flex justify-end">
            <button 
              type="submit" 
              disabled={isSaving}
              className="bg-primary text-on-primary px-6 py-2 rounded font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm"
            >
              {isSaving ? (
                <><span className="material-symbols-outlined animate-spin text-[18px]">refresh</span>Menyimpan...</>
              ) : (
                <><span className="material-symbols-outlined text-[18px]">save</span>Simpan Pengaturan</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
