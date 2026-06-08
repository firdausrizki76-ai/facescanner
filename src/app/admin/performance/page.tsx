export default function PerformancePage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-headline-lg text-primary">Input Performa</h1>
          <p className="text-body-md text-on-surface-variant mt-1">Catat hasil panen harian karyawan secara manual.</p>
        </div>
        <button className="border-2 border-primary text-primary hover:bg-primary hover:text-on-primary px-4 py-2 rounded flex items-center gap-2 text-label-md transition-colors">
          <span className="material-symbols-outlined text-[18px]">upload</span>
          Bulk Upload CSV
        </button>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-outline-variant/20 bg-surface-container-low/50">
          <h2 className="text-headline-md text-primary font-semibold">Form Input Manual</h2>
        </div>
        <div className="p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="employee" className="text-label-md text-on-surface uppercase">Karyawan</label>
                <select id="employee" className="w-full bg-surface-container text-on-surface rounded border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary p-2 text-body-md">
                  <option value="">Pilih karyawan...</option>
                  <option value="1">001234 - Andi Firmansyah</option>
                  <option value="2">001235 - Budi Santoso</option>
                  <option value="3">001236 - Candra Wijaya</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="date" className="text-label-md text-on-surface uppercase">Tanggal</label>
                <input id="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full bg-surface-container text-on-surface rounded border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary p-2 text-body-md" />
              </div>

              <div className="space-y-2">
                <label htmlFor="kg" className="text-label-md text-on-surface uppercase">Kg Sawit Diangkat</label>
                <input id="kg" type="number" placeholder="0" className="w-full bg-surface-container text-on-surface rounded border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary p-2 text-body-md" />
              </div>

              <div className="space-y-2">
                <label htmlFor="bunches" className="text-label-md text-on-surface uppercase">Jumlah Tandan</label>
                <input id="bunches" type="number" placeholder="0" className="w-full bg-surface-container text-on-surface rounded border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary p-2 text-body-md" />
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="text-label-md text-on-surface uppercase">Lokasi / Blok Panen</label>
                <input id="location" placeholder="Misal: Blok B - Divisi 3" className="w-full bg-surface-container text-on-surface rounded border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary p-2 text-body-md" />
              </div>

              <div className="space-y-2">
                <label htmlFor="bonus" className="text-label-md text-on-surface uppercase">Bonus Tambahan (Rp)</label>
                <input id="bonus" type="number" placeholder="0" className="w-full bg-surface-container text-on-surface rounded border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary p-2 text-body-md" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="notes" className="text-label-md text-on-surface uppercase">Catatan</label>
              <textarea id="notes" placeholder="Catatan opsional..." rows={3} className="w-full bg-surface-container text-on-surface rounded border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary p-2 text-body-md"></textarea>
            </div>

            <div className="flex justify-end pt-6 border-t border-outline-variant/20">
              <button className="bg-primary hover:bg-primary/90 text-on-primary px-6 py-3 rounded flex items-center gap-2 text-label-md transition-colors w-full md:w-auto justify-center">
                <span className="material-symbols-outlined text-[18px]">save</span>
                Simpan Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
