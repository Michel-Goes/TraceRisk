import React from 'react';
import { ViewMode } from '../types';

interface SidebarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, onLogout }) => {
  const items: { id: ViewMode; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'simulador', label: 'Simulador', icon: 'science' },
    { id: 'logs', label: 'Logs', icon: 'terminal' },
    { id: 'politicas', label: 'Políticas', icon: 'policy' },
    { id: 'configuracoes', label: 'Configurações', icon: 'settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest border-r border-outline-variant/30 backdrop-blur-xl z-40 flex flex-col justify-between p-space-md">
      <div className="flex flex-col gap-space-lg">
        {/* Logo / Header */}
        <div className="flex items-center gap-space-sm px-space-xs pt-space-xs">
          <div className="w-8 h-8 rounded-lg bg-primary-container/10 border border-primary-container/30 flex items-center justify-center text-primary-container shadow-[0_0_12px_rgba(0,240,255,0.25)]">
            <span className="material-symbols-outlined text-[18px]">shield_locked</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-headline-sm text-label-ui uppercase tracking-widest text-on-surface font-bold">
              TRACERISK
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container shadow-[0_0_6px_#00f0ff]"></span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-space-xs">
          {items.map((it) => {
            const isActive = currentView === it.id;
            return (
              <button
                key={it.id}
                type="button"
                onClick={() => onNavigate(it.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-label-ui text-label-ui text-left ${
                  isActive
                    ? 'bg-primary-container/10 text-primary-container border border-primary-container/20 font-semibold shadow-[0_0_15px_rgba(0,240,255,0.06)]'
                    : 'text-outline hover:text-on-surface hover:bg-surface-container-low border border-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-[18px] flex-shrink-0">
                  {it.icon}
                </span>
                <span>{it.label}</span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-outline hover:text-error hover:bg-error-container/20 transition-colors font-label-ui text-label-ui border border-transparent hover:border-error/30 group text-left cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] flex-shrink-0 transition-transform group-hover:translate-x-0.5">
              logout
            </span>
            <span>Sair</span>
          </button>
        </nav>
      </div>

      {/* Cluster Footer */}
      <div className="px-3 py-2 rounded-lg bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#4edea3] flex-shrink-0"></span>
          <span className="font-label-code text-label-badge text-on-surface-variant uppercase">
            CLUSTER 01
          </span>
        </div>
        <span className="font-label-code text-label-badge text-secondary font-semibold">
          SYNC
        </span>
      </div>
    </aside>
  );
};
