'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const supabase = createClient();

  useEffect(() => {
    async function fetchEmployees() {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && !error) {
        setEmployees(data);
      }
      setIsLoading(false);
    }
    
    fetchEmployees();
  }, [supabase]);

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    emp.employee_number.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-headline-lg text-primary">Daftar Karyawan</h1>
          <p className="text-body-md text-on-surface-variant mt-1">Kelola data dan wajah karyawan.</p>
        </div>
        <a href="/admin/employees/register" className="bg-primary hover:bg-primary/90 text-on-primary px-4 py-2 rounded flex items-center gap-2 text-label-md transition-colors shadow-sm">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Tambah Karyawan
        </a>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low/50">
          <div className="relative w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
            <input 
              type="text" 
              placeholder="Cari NIK / Nama..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 h-9 bg-surface-container text-on-surface rounded border-none focus:ring-2 focus:ring-primary text-body-md"
            />
          </div>
          <div className="text-label-md text-on-surface-variant">Total: {filteredEmployees.length} Karyawan</div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container text-on-surface-variant text-label-md border-b border-outline-variant/20">
              <tr>
                <th className="p-4 font-semibold uppercase tracking-wider">NIK</th>
                <th className="p-4 font-semibold uppercase tracking-wider">Nama Lengkap</th>
                <th className="p-4 font-semibold uppercase tracking-wider">Departemen</th>
                <th className="p-4 font-semibold uppercase tracking-wider">Jabatan</th>
                <th className="p-4 font-semibold uppercase tracking-wider">Wajah Tersimpan</th>
                <th className="p-4 font-semibold uppercase tracking-wider">Status</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-body-md divide-y divide-outline-variant/10">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-on-surface-variant">
                    <span className="material-symbols-outlined animate-spin block text-4xl mb-2 text-primary">refresh</span>
                    Memuat data...
                  </td>
                </tr>
              ) : filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-on-surface-variant">
                    Belum ada karyawan.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="p-4 font-data-mono text-primary font-bold">{emp.employee_number}</td>
                    <td className="p-4 font-medium text-on-surface">{emp.name}</td>
                    <td className="p-4 text-on-surface-variant">{emp.department}</td>
                    <td className="p-4 text-on-surface-variant">{emp.position}</td>
                    <td className="p-4 text-on-surface-variant">
                      {emp.face_descriptor ? (
                        <span className="inline-flex items-center gap-1 text-primary text-[12px] bg-primary/10 px-2 py-1 rounded">
                          <span className="material-symbols-outlined text-[14px]">done</span> Ya
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-error text-[12px] bg-error/10 px-2 py-1 rounded">
                          <span className="material-symbols-outlined text-[14px]">close</span> Belum
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      {emp.is_active ? (
                        <span className="inline-flex items-center px-2 py-1 rounded bg-primary-container text-on-primary-container text-[10px] font-bold uppercase">
                          Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded bg-error-container text-on-error-container text-[10px] font-bold uppercase">
                          Non-Aktif
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center text-on-surface-variant">
                      <button className="hover:bg-surface-container p-1 rounded-full transition-colors">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
