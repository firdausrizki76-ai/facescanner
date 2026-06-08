'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function PerformancePage() {
  const supabase = createClient();
  
  const [employees, setEmployees] = useState<any[]>([]);
  const [wagePerKg, setWagePerKg] = useState<number>(300); // Default fallback
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form State
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [recordDate, setRecordDate] = useState(new Date().toISOString().split('T')[0]);
  const [kgLifted, setKgLifted] = useState<string>('');
  const [bunchesCount, setBunchesCount] = useState<string>('');
  const [location, setLocation] = useState('');
  const [bonus, setBonus] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    async function loadData() {
      // 1. Fetch Active Employees
      const { data: emps } = await supabase
        .from('employees')
        .select('id, name, employee_number')
        .eq('is_active', true)
        .order('name');
        
      if (emps) setEmployees(emps);
      
      // 2. Fetch Wage Setting
      const { data: settings } = await supabase
        .from('app_settings')
        .select('wage_per_kg')
        .eq('id', 'global')
        .single();
        
      if (settings && settings.wage_per_kg !== null) {
        setWagePerKg(settings.wage_per_kg);
      }
      
      setIsLoading(false);
    }
    loadData();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee || !kgLifted || !bunchesCount) {
      alert("Mohon lengkapi data karyawan, Kg sawit, dan Jumlah Tandan!");
      return;
    }
    
    setIsSaving(true);
    setSuccessMsg('');
    
    const kg = parseFloat(kgLifted);
    const bonusAmount = parseFloat(bonus) || 0;
    
    // Auto-calculate wage
    const wageAmount = (kg * wagePerKg) + bonusAmount;

    try {
      const { error } = await supabase.from('performance_records').insert({
        employee_id: selectedEmployee,
        record_date: recordDate,
        kg_lifted: kg,
        bunches_count: parseInt(bunchesCount, 10),
        harvest_location: location,
        bonus_amount: bonusAmount,
        wage_amount: wageAmount,
        notes: notes
      });

      if (error) throw error;
      
      setSuccessMsg(`Data berhasil disimpan! Total Upah Terhitung: Rp ${wageAmount.toLocaleString('id-ID')}`);
      
      // Reset form partially
      setKgLifted('');
      setBunchesCount('');
      setBonus('');
      setNotes('');
      // location and date usually stay the same for bulk manual entry
      
    } catch (error: any) {
      console.error(error);
      alert('Gagal menyimpan data: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-headline-lg text-primary">Input Performa</h1>
          <p className="text-body-md text-on-surface-variant mt-1">Catat hasil panen harian karyawan secara manual.</p>
        </div>
        <button className="border-2 border-primary text-primary hover:bg-primary hover:text-on-primary px-4 py-2 rounded flex items-center gap-2 text-label-md transition-colors hidden sm:flex">
          <span className="material-symbols-outlined text-[18px]">upload</span>
          Bulk Upload CSV
        </button>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-outline-variant/20 bg-surface-container-low/50 flex justify-between items-center">
          <h2 className="text-headline-md text-primary font-semibold">Form Input Manual</h2>
          {!isLoading && (
            <span className="text-xs bg-primary-container text-on-primary-container px-2 py-1 rounded font-bold">
              Rate Saat Ini: Rp {wagePerKg.toLocaleString('id-ID')} / Kg
            </span>
          )}
        </div>
        <div className="p-6">
          {successMsg && (
            <div className="mb-6 p-4 bg-primary-container/30 text-primary-fixed-dim rounded border border-primary/20 text-body-md flex gap-2 items-center font-bold">
              <span className="material-symbols-outlined">check_circle</span>
              {successMsg}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="employee" className="text-label-md text-on-surface uppercase">Karyawan</label>
                <select 
                  id="employee" 
                  required
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  className="w-full bg-surface-container text-on-surface rounded border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary p-2 text-body-md"
                >
                  <option value="">Pilih karyawan...</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.employee_number} - {emp.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="date" className="text-label-md text-on-surface uppercase">Tanggal</label>
                <input 
                  id="date" 
                  type="date" 
                  required
                  value={recordDate}
                  onChange={(e) => setRecordDate(e.target.value)}
                  className="w-full bg-surface-container text-on-surface rounded border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary p-2 text-body-md" 
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="kg" className="text-label-md text-on-surface uppercase">Kg Sawit Diangkat</label>
                <input 
                  id="kg" 
                  type="number" 
                  step="0.01"
                  required
                  placeholder="0" 
                  value={kgLifted}
                  onChange={(e) => setKgLifted(e.target.value)}
                  className="w-full bg-surface-container text-on-surface rounded border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary p-2 text-body-md" 
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="bunches" className="text-label-md text-on-surface uppercase">Jumlah Tandan</label>
                <input 
                  id="bunches" 
                  type="number" 
                  required
                  placeholder="0" 
                  value={bunchesCount}
                  onChange={(e) => setBunchesCount(e.target.value)}
                  className="w-full bg-surface-container text-on-surface rounded border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary p-2 text-body-md" 
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="text-label-md text-on-surface uppercase">Lokasi / Blok Panen</label>
                <input 
                  id="location" 
                  placeholder="Misal: Blok B - Divisi 3" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-surface-container text-on-surface rounded border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary p-2 text-body-md" 
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="bonus" className="text-label-md text-on-surface uppercase">Bonus Tambahan (Rp)</label>
                <input 
                  id="bonus" 
                  type="number" 
                  placeholder="0" 
                  value={bonus}
                  onChange={(e) => setBonus(e.target.value)}
                  className="w-full bg-surface-container text-on-surface rounded border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary p-2 text-body-md" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="notes" className="text-label-md text-on-surface uppercase">Catatan</label>
              <textarea 
                id="notes" 
                placeholder="Catatan opsional..." 
                rows={3} 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-surface-container text-on-surface rounded border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary p-2 text-body-md"
              ></textarea>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-outline-variant/20">
              <div className="text-body-sm text-on-surface-variant max-w-[200px] md:max-w-xs">
                Total Upah (Rp) = (Kg &times; {wagePerKg}) + Bonus
              </div>
              <button 
                type="submit"
                disabled={isSaving || isLoading}
                className="bg-primary hover:bg-primary/90 text-on-primary px-6 py-3 rounded flex items-center gap-2 text-label-md transition-colors w-full md:w-auto justify-center disabled:opacity-50"
              >
                {isSaving ? (
                  <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                ) : (
                  <span className="material-symbols-outlined text-[18px]">save</span>
                )}
                Simpan Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
