'use client';

import React, { useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-24 md:pb-0">
      {/* Top App Bar */}
      <header className="bg-surface border-b border-outline-variant/10 flex justify-between items-center w-full px-margin-mobile h-12 z-50 fixed top-0">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">agriculture</span>
          <h1 className="text-headline-md font-bold text-primary">Sawit Face Scanner</h1>
        </div>
        <div className="flex gap-4">
          <button className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-low transition-colors p-2 rounded-full">notifications</button>
          <button 
            className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-low transition-colors p-2 rounded-full md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            menu
          </button>
        </div>
      </header>

      <div className="flex pt-12">
        {/* Sidebar Navigation (Desktop) */}
        <aside className={`fixed left-0 top-0 h-full w-[280px] z-[60] bg-surface border-r border-outline-variant/10 shadow-md transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out md:sticky md:top-12 md:h-[calc(100vh-48px)]`}>
          <div className="flex flex-col gap-2 py-4">
            <div className="px-6 py-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold overflow-hidden">
                <span className="material-symbols-outlined">person</span>
              </div>
              <div>
                <p className="text-body-md font-bold text-primary">Admin Manager</p>
                <p className="text-xs text-on-surface-variant">Estate Alpha • Supervisor</p>
              </div>
            </div>

            <nav className="mt-4 flex flex-col gap-1">
              <a href="/admin" className="bg-secondary-container text-on-secondary-container font-bold rounded-r-full flex items-center gap-4 px-6 py-3 transition-all">
                <span className="material-symbols-outlined">analytics</span>
                <span className="text-label-md">Dashboard</span>
              </a>
              <a href="/admin/employees" className="text-on-surface-variant px-6 py-3 flex items-center gap-4 hover:bg-surface-container-high transition-all rounded-r-full">
                <span className="material-symbols-outlined">group</span>
                <span className="text-label-md">Employee List</span>
              </a>
              <a href="/admin/performance" className="text-on-surface-variant px-6 py-3 flex items-center gap-4 hover:bg-surface-container-high transition-all rounded-r-full">
                <span className="material-symbols-outlined">history_edu</span>
                <span className="text-label-md">Performance Log</span>
              </a>
              <a href="/admin/reports" className="text-on-surface-variant px-6 py-3 flex items-center gap-4 hover:bg-surface-container-high transition-all rounded-r-full">
                <span className="material-symbols-outlined">description</span>
                <span className="text-label-md">Laporan</span>
              </a>
              <a href="/admin/settings" className="text-on-surface-variant px-6 py-3 flex items-center gap-4 hover:bg-surface-container-high transition-all rounded-r-full">
                <span className="material-symbols-outlined">settings</span>
                <span className="text-label-md">Settings</span>
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-margin-mobile md:p-margin-desktop max-w-[1280px] mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-2 px-margin-mobile bg-surface border-t border-outline-variant/10 shadow-lg z-50">
        <a href="/" className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high rounded-full">
          <span className="material-symbols-outlined">camera_front</span>
          <span className="text-[10px] font-label-md mt-1">Scanner</span>
        </a>
        <a href="/admin" className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 scale-110">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-label-md mt-1">Admin</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high rounded-full">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-label-md mt-1">Profile</span>
        </a>
      </nav>
    </div>
  );
}
