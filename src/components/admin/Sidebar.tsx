import Link from 'next/link';
import { Home, Users, Activity, FileText, Settings } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/admin' },
    { icon: Users, label: 'Karyawan', href: '/admin/employees' },
    { icon: Activity, label: 'Performa', href: '/admin/performance' },
    { icon: FileText, label: 'Laporan', href: '/admin/reports' },
    { icon: Settings, label: 'Pengaturan', href: '/admin/settings' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed top-0 left-0 border-r border-slate-800">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white tracking-tight">Sentient<span className="text-blue-500">Admin</span></h2>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="px-4 space-y-2">
          {menuItems.map((item, index) => (
            <Link 
              key={index} 
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-slate-800 hover:text-white"
            >
              <item.icon className="w-5 h-5 text-slate-400" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            A
          </div>
          <div>
            <div className="text-sm font-medium text-white">Admin Utama</div>
            <div className="text-xs text-slate-500">admin@sawit.com</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
