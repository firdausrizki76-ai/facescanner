'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import FaceRegistration from '@/components/admin/FaceRegistration';
import { createClient } from '@/lib/supabase/client';

export default function RegisterEmployeePage() {
  const router = useRouter();
  const supabase = createClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [faceDescriptor, setFaceDescriptor] = useState<number[] | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!faceDescriptor) {
      alert('Tolong ambil data wajah terlebih dahulu!');
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    const newEmployee = {
      employee_number: formData.get('employee_number') as string,
      name: formData.get('name') as string,
      department: formData.get('department') as string,
      position: formData.get('position') as string,
      phone: formData.get('phone') as string,
      join_date: formData.get('join_date') as string,
      base_wage: parseFloat(formData.get('base_wage') as string) || 0,
      wage_per_kg: parseFloat(formData.get('wage_per_kg') as string) || 0,
      face_descriptor: faceDescriptor,
      is_active: true
    };

    try {
      const { error } = await supabase.from('employees').insert(newEmployee);
      
      if (error) {
        throw error;
      }
      
      alert('Karyawan berhasil didaftarkan!');
      router.push('/admin/employees');
    } catch (err: any) {
      console.error('Error registering employee:', err);
      alert('Gagal mendaftar karyawan: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <button onClick={() => router.back()} className="hover:bg-surface-container p-1 rounded-full transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <h1 className="text-headline-lg text-primary">Pendaftaran Karyawan Baru</h1>
        </div>
        <p className="text-body-md text-on-surface-variant ml-9">Masukkan biodata dan rekam struktur wajah untuk absensi cerdas.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Kolom Kiri: Form Biodata */}
        <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 shadow-sm">
          <h2 className="text-body-lg font-bold text-primary mb-6 border-b border-outline-variant/20 pb-2">Biodata Karyawan</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label htmlFor="employee_number" className="text-label-md text-on-surface uppercase">NIK (Nomor Induk)</label>
              <input required id="employee_number" name="employee_number" placeholder="Contoh: 001245" className="w-full bg-surface-container text-on-surface rounded border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary p-2 text-body-md" />
            </div>

            <div className="space-y-2">
              <label htmlFor="name" className="text-label-md text-on-surface uppercase">Nama Lengkap</label>
              <input required id="name" name="name" placeholder="Sesuai KTP" className="w-full bg-surface-container text-on-surface rounded border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary p-2 text-body-md" />
            </div>

            <div className="space-y-2">
              <label htmlFor="department" className="text-label-md text-on-surface uppercase">Divisi / Departemen</label>
              <input required id="department" name="department" placeholder="Contoh: Divisi 3" className="w-full bg-surface-container text-on-surface rounded border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary p-2 text-body-md" />
            </div>

            <div className="space-y-2">
              <label htmlFor="position" className="text-label-md text-on-surface uppercase">Jabatan</label>
              <input required id="position" name="position" placeholder="Contoh: Pemanen" className="w-full bg-surface-container text-on-surface rounded border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary p-2 text-body-md" />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-label-md text-on-surface uppercase">Nomor HP</label>
              <input id="phone" name="phone" placeholder="08..." className="w-full bg-surface-container text-on-surface rounded border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary p-2 text-body-md" />
            </div>

            <div className="space-y-2">
              <label htmlFor="join_date" className="text-label-md text-on-surface uppercase">Tanggal Bergabung</label>
              <input required id="join_date" name="join_date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full bg-surface-container text-on-surface rounded border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary p-2 text-body-md" />
            </div>

            <div className="space-y-2">
              <label htmlFor="base_wage" className="text-label-md text-on-surface uppercase">Upah Pokok Harian (Rp)</label>
              <input required id="base_wage" name="base_wage" type="number" defaultValue="150000" className="w-full bg-surface-container text-on-surface rounded border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary p-2 text-body-md" />
            </div>

            <div className="space-y-2">
              <label htmlFor="wage_per_kg" className="text-label-md text-on-surface uppercase">Upah Per Kg (Rp)</label>
              <input required id="wage_per_kg" name="wage_per_kg" type="number" defaultValue="150" className="w-full bg-surface-container text-on-surface rounded border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary p-2 text-body-md" />
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Perekaman Wajah */}
        <div className="lg:col-span-5 bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 shadow-sm flex flex-col h-full">
          <h2 className="text-body-lg font-bold text-primary mb-6 border-b border-outline-variant/20 pb-2 flex items-center justify-between">
            <span>Rekam Wajah</span>
            {faceDescriptor && <span className="material-symbols-outlined text-primary">check_circle</span>}
          </h2>
          
          <div className="flex-1 flex flex-col items-center justify-center">
             <FaceRegistration onDescriptorCaptured={(desc) => setFaceDescriptor(desc)} />
          </div>
          
          <div className="mt-8 pt-6 border-t border-outline-variant/20">
            <button 
              type="submit" 
              disabled={isSubmitting || !faceDescriptor}
              className="w-full bg-primary text-on-primary py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-label-lg shadow-md"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[20px]">refresh</span>
                  Menyimpan...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">save</span>
                  Daftarkan Karyawan
                </>
              )}
            </button>
            {!faceDescriptor && (
              <p className="text-[11px] text-error text-center mt-2 font-label-md">* Anda harus merekam wajah sebelum dapat menyimpan data</p>
            )}
          </div>
        </div>

      </form>
    </div>
  );
}
