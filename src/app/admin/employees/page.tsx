import { Plus, Search, MoreVertical } from 'lucide-react';

export default function EmployeesPage() {
  const mockEmployees = [
    { id: 1, name: 'Andi Firmansyah', nik: '001234', dept: 'Divisi 3', position: 'Pemanen', status: 'Aktif' },
    { id: 2, name: 'Budi Santoso', nik: '001235', dept: 'Divisi 2', position: 'Pemanen', status: 'Aktif' },
    { id: 3, name: 'Candra Wijaya', nik: '001236', dept: 'Divisi 3', position: 'Mandor', status: 'Aktif' },
    { id: 4, name: 'Siti Aminah', nik: '001237', dept: 'Divisi 1', position: 'Perawatan', status: 'Aktif' },
    { id: 5, name: 'Agus Prayogo', nik: '001238', dept: 'Divisi 2', position: 'Pemanen', status: 'Aktif' },
    { id: 6, name: 'Dewi Lestari', nik: '001239', dept: 'Divisi 1', position: 'Admin Gudang', status: 'Cuti' },
    { id: 7, name: 'Eko Wijaya', nik: '001240', dept: 'Divisi 3', position: 'Pemanen', status: 'Aktif' },
    { id: 8, name: 'Fajar Subekti', nik: '001241', dept: 'Divisi 2', position: 'Pemanen', status: 'Tidak Aktif' },
    { id: 9, name: 'Ani Mulyani', nik: '001242', dept: 'Divisi 1', position: 'Perawatan', status: 'Aktif' },
    { id: 10, name: 'Dedi Kurniawan', nik: '001243', dept: 'Divisi 3', position: 'Pemanen', status: 'Aktif' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-headline-lg text-primary">Daftar Karyawan</h1>
          <p className="text-body-md text-on-surface-variant mt-1">Kelola data dan wajah karyawan.</p>
        </div>
        <a href="/admin/employees/register" className="bg-primary hover:bg-primary/90 text-on-primary px-4 py-2 rounded flex items-center gap-2 text-label-md transition-colors">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Tambah Karyawan
        </a>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low/50">
          <div className="relative w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
            <input 
              type="text" 
              placeholder="Cari NIK / Nama..." 
              className="w-full pl-9 h-9 bg-surface-container text-on-surface rounded border-none focus:ring-2 focus:ring-primary text-body-md"
            />
          </div>
          <div className="text-label-md text-on-surface-variant">Total: 87 Karyawan</div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container text-on-surface-variant text-label-md border-b border-outline-variant/20">
              <tr>
                <th className="p-4 font-semibold uppercase tracking-wider">NIK</th>
                <th className="p-4 font-semibold uppercase tracking-wider">Nama Lengkap</th>
                <th className="p-4 font-semibold uppercase tracking-wider">Departemen</th>
                <th className="p-4 font-semibold uppercase tracking-wider">Jabatan</th>
                <th className="p-4 font-semibold uppercase tracking-wider">Status</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-body-md divide-y divide-outline-variant/10">
              {mockEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-4 font-data-mono text-primary">{emp.nik}</td>
                  <td className="p-4 font-medium text-on-surface">{emp.name}</td>
                  <td className="p-4 text-on-surface-variant">{emp.dept}</td>
                  <td className="p-4 text-on-surface-variant">{emp.position}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-primary-container text-on-primary-container text-[10px] font-bold uppercase">
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-4 text-center text-on-surface-variant">
                    <button className="hover:bg-surface-container p-1 rounded-full transition-colors">
                      <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
