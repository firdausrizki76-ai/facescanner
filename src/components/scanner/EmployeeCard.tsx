import React from 'react';

interface EmployeeCardProps {
  employee: {
    name: string;
    employee_number: string;
    department: string;
  };
  performance: {
    kg_lifted: number;
    bunches_count: number;
    wage_amount: number;
    harvest_location: string;
  } | null;
  confidence: number;
  onConfirm: () => void;
}

export default function EmployeeCard({ employee, performance, confidence, onConfirm }: EmployeeCardProps) {
  return (
    <div className="bg-surface rounded-xl p-4 shadow-xl border border-outline-variant/20 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-fixed bg-surface-variant flex items-center justify-center">
             <span className="text-3xl">👤</span>
          </div>
          <div className="flex flex-col">
            <h2 className="text-headline-md font-bold text-on-surface">{employee.name}</h2>
            <p className="text-label-md text-on-surface-variant">NIK: {employee.employee_number}</p>
            <span className="inline-flex items-center gap-1 text-[12px] font-bold text-primary mt-1">
              <span className="material-symbols-outlined text-[14px]">location_on</span>
              {performance?.harvest_location || employee.department}
            </span>
          </div>
        </div>
        <div className="bg-surface-container-high px-3 py-2 rounded-lg flex items-center gap-2">
          <div className="flex gap-0.5 items-end h-4">
            <div className="voice-bar" style={{animationDelay: '0.1s'}}></div>
            <div className="voice-bar" style={{animationDelay: '0.3s'}}></div>
            <div className="voice-bar" style={{animationDelay: '0.2s'}}></div>
            <div className="voice-bar" style={{animationDelay: '0.4s'}}></div>
          </div>
          <span className="text-[10px] font-bold text-on-surface-variant uppercase">Voice Guidance</span>
        </div>
      </div>

      {performance ? (
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-surface-container-low p-2 rounded-lg border border-outline-variant/10">
            <p className="text-[10px] text-on-surface-variant font-label-md mb-1 uppercase">Berat</p>
            <p className="text-headline-md text-primary">{Number(performance.kg_lifted).toLocaleString('id-ID')} <span className="text-xs">Kg</span></p>
          </div>
          <div className="bg-surface-container-low p-2 rounded-lg border border-outline-variant/10">
            <p className="text-[10px] text-on-surface-variant font-label-md mb-1 uppercase">Tandan</p>
            <p className="text-headline-md text-secondary">{performance.bunches_count}</p>
          </div>
          <div className="bg-surface-container-low p-2 rounded-lg border border-outline-variant/10">
            <p className="text-[10px] text-on-surface-variant font-label-md mb-1 uppercase">Upah (Rp)</p>
            <p className="text-headline-md text-primary-container">{Number(performance.wage_amount).toLocaleString('id-ID')}</p>
          </div>
        </div>
      ) : (
        <div className="py-4 text-center text-on-surface-variant text-label-md">
          <p>Belum ada data performa hari ini.</p>
        </div>
      )}

      <button 
        onClick={onConfirm}
        className="w-full bg-primary text-on-primary py-3 rounded-full font-label-md text-label-md active:scale-95 transition-transform flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
        Confirm Attendance
      </button>
    </div>
  );
}
