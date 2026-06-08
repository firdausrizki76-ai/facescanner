export default function AdminDashboard() {
  return (
    <>
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-lg">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest border border-outline-variant/20 p-md rounded-xl flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-label-md text-on-surface-variant uppercase tracking-wider">Total Employees</span>
            <span className="material-symbols-outlined text-primary">badge</span>
          </div>
          <div className="mt-4">
            <h2 className="text-headline-lg text-primary">87</h2>
            <p className="text-xs text-on-surface-variant mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-primary">trending_up</span> 
              +4 New this month
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-surface-container-lowest border border-outline-variant/20 p-md rounded-xl flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-label-md text-on-surface-variant uppercase tracking-wider">Total Kg Today</span>
            <span className="material-symbols-outlined text-secondary">scale</span>
          </div>
          <div className="mt-4">
            <h2 className="text-headline-lg text-primary">108.450 <span className="text-body-md font-normal">Kg</span></h2>
            <p className="text-xs text-on-surface-variant mt-1">Updated 5 mins ago</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container-lowest border border-outline-variant/20 p-md rounded-xl flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-label-md text-on-surface-variant uppercase tracking-wider">Total Wages</span>
            <span className="material-symbols-outlined text-primary">payments</span>
          </div>
          <div className="mt-4">
            <h2 className="text-headline-lg text-primary">Rp 16.2M</h2>
            <p className="text-xs text-on-surface-variant mt-1">Pending distribution</p>
          </div>
        </div>
      </div>

      {/* Bento Grid Main */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Productivity Chart */}
        <div className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant/20 p-md rounded-xl">
          <div className="flex justify-between items-center mb-md">
            <h3 className="text-headline-md text-primary">Harvest Productivity</h3>
            <div className="flex gap-2">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">Last 7 Days</span>
            </div>
          </div>
          <div className="h-64 flex items-end gap-3 justify-between pb-2 border-b border-outline-variant/20">
            {/* Simulated Bar Chart */}
            <div className="flex flex-col items-center flex-1 group">
              <div className="w-full bg-primary-container/20 rounded-t-lg relative h-[40%] transition-all group-hover:bg-primary-container">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">92Kg</div>
              </div>
              <span className="text-[10px] mt-2 text-label-md text-on-surface-variant">Mon</span>
            </div>
            <div className="flex flex-col items-center flex-1 group">
              <div className="w-full bg-primary-container/20 rounded-t-lg relative h-[65%] transition-all group-hover:bg-primary-container">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">115Kg</div>
              </div>
              <span className="text-[10px] mt-2 text-label-md text-on-surface-variant">Tue</span>
            </div>
            <div className="flex flex-col items-center flex-1 group">
              <div className="w-full bg-primary-container/20 rounded-t-lg relative h-[50%] transition-all group-hover:bg-primary-container">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">101Kg</div>
              </div>
              <span className="text-[10px] mt-2 text-label-md text-on-surface-variant">Wed</span>
            </div>
            <div className="flex flex-col items-center flex-1 group">
              <div className="w-full bg-primary-container/20 rounded-t-lg relative h-[85%] transition-all group-hover:bg-primary-container">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">142Kg</div>
              </div>
              <span className="text-[10px] mt-2 text-label-md text-on-surface-variant">Thu</span>
            </div>
            <div className="flex flex-col items-center flex-1 group">
              <div className="w-full bg-primary-container/20 rounded-t-lg relative h-[70%] transition-all group-hover:bg-primary-container">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">128Kg</div>
              </div>
              <span className="text-[10px] mt-2 text-label-md text-on-surface-variant">Fri</span>
            </div>
            <div className="flex flex-col items-center flex-1 group">
              <div className="w-full bg-primary-container/20 rounded-t-lg relative h-[30%] transition-all group-hover:bg-primary-container">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">65Kg</div>
              </div>
              <span className="text-[10px] mt-2 text-label-md text-on-surface-variant">Sat</span>
            </div>
            <div className="flex flex-col items-center flex-1 group">
              <div className="w-full bg-secondary-container rounded-t-lg relative h-[75%] shadow-md">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-secondary-fixed text-on-secondary-fixed text-[10px] px-2 py-1 rounded opacity-100">108Kg</div>
              </div>
              <span className="text-[10px] mt-2 text-label-md text-secondary font-bold">Today</span>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="lg:col-span-4 bg-surface-container-lowest border border-outline-variant/20 p-md rounded-xl">
          <div className="flex justify-between items-center mb-md">
            <h3 className="text-body-md font-bold text-primary">Top 5 Performers</h3>
            <span className="material-symbols-outlined text-secondary-container" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Budi Santoso', kg: '1,240 Kg' },
              { name: 'Siti Aminah', kg: '1,185 Kg' },
              { name: 'Agus Prayogo', kg: '1,092 Kg' },
              { name: 'Dewi Lestari', kg: '1,050 Kg' },
              { name: 'Eko Wijaya', kg: '987 Kg' }
            ].map((emp, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center font-bold text-xs text-primary">{i + 1}</div>
                  <span className="text-label-md">{emp.name}</span>
                </div>
                <span className="text-data-mono text-primary font-bold">{emp.kg}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Required Section */}
        <div className="lg:col-span-12 bg-surface-container-highest/30 border border-error/20 p-md rounded-xl overflow-hidden mt-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-error">warning</span>
            <h3 className="text-body-md font-bold text-error">Action Required: Missing Logs (3)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Fajar Subekti', 'Ani Mulyani', 'Dedi Kurniawan'].map((name, i) => (
              <div key={i} className="bg-surface-container-lowest p-3 rounded-lg border-l-4 border-error flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-variant flex justify-center items-center">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <div className="flex-1">
                  <p className="text-label-md">{name}</p>
                  <p className="text-[10px] text-on-surface-variant">No check-in detected</p>
                </div>
                <button className="bg-error text-on-error px-3 py-1 rounded text-[10px] font-bold uppercase">Log Manual</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
