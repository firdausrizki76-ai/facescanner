export default function ReportsPage() {
  const dummyReports = [
    { id: 1, title: 'Laporan Panen Harian - Divisi 1', date: '08 Jun 2026', type: 'PDF', size: '1.2 MB' },
    { id: 2, title: 'Laporan Panen Harian - Divisi 2', date: '08 Jun 2026', type: 'PDF', size: '1.4 MB' },
    { id: 3, title: 'Laporan Panen Harian - Divisi 3', date: '08 Jun 2026', type: 'PDF', size: '1.1 MB' },
    { id: 4, title: 'Rekap Upah Mingguan - Minggu 1 Jun', date: '05 Jun 2026', type: 'Excel', size: '2.5 MB' },
    { id: 5, title: 'Laporan Absensi Karyawan - Mei 2026', date: '01 Jun 2026', type: 'PDF', size: '3.8 MB' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-headline-lg text-primary">Laporan & Unduhan</h1>
          <p className="text-body-md text-on-surface-variant mt-1">Akses arsip laporan performa dan absensi.</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-on-primary px-4 py-2 rounded flex items-center gap-2 text-label-md transition-colors">
          <span className="material-symbols-outlined text-[18px]">download</span>
          Generate Laporan Baru
        </button>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container text-on-surface-variant text-label-md border-b border-outline-variant/20">
              <tr>
                <th className="p-4 font-semibold uppercase tracking-wider">Nama Laporan</th>
                <th className="p-4 font-semibold uppercase tracking-wider">Tanggal Dibuat</th>
                <th className="p-4 font-semibold uppercase tracking-wider">Format</th>
                <th className="p-4 font-semibold uppercase tracking-wider">Ukuran</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-body-md divide-y divide-outline-variant/10">
              {dummyReports.map((report) => (
                <tr key={report.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-4 font-medium text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      {report.type === 'PDF' ? 'picture_as_pdf' : 'table_view'}
                    </span>
                    {report.title}
                  </td>
                  <td className="p-4 text-on-surface-variant">{report.date}</td>
                  <td className="p-4 text-on-surface-variant">{report.type}</td>
                  <td className="p-4 text-on-surface-variant">{report.size}</td>
                  <td className="p-4 text-center">
                    <button className="text-primary hover:bg-primary/10 px-3 py-1 rounded text-label-md transition-colors">
                      Unduh
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
