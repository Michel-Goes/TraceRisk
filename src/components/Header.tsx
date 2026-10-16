import React from 'react';
import { UserSession } from '../types';

interface HeaderProps {
  user: UserSession;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, searchQuery, onSearchChange, onLogout }) => {
  return (
    <header className="fixed top-0 right-0 left-64 z-30 bg-surface-container-lowest/80 backdrop-blur-md border-b border-outline-variant/30">
      <div className="h-16 px-space-lg flex items-center justify-between">
        <div className="flex items-center gap-space-md">
          <div className="relative flex items-center w-80">
            <span className="material-symbols-outlined absolute left-3 text-outline text-[18px]">
              search
            </span>
            <input
              className="w-full bg-surface-container-low text-on-surface text-body-sm pl-9 pr-space-sm py-1.5 rounded-lg border border-outline-variant/30 focus:border-primary-container focus:ring-1 focus:ring-primary-container focus:outline-none placeholder:text-outline font-body-sm transition-all"
              placeholder="Buscar telemetria, IP, hash, regra..."
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-space-md">
          <div
            onClick={onLogout}
            title="Clique para encerrar sessão"
            className="flex items-center gap-3 pl-3 py-1 pr-2 rounded-lg bg-surface-container-low/70 border border-outline-variant/30 hover:border-primary-container/30 transition-all cursor-pointer"
          >
            <div className="flex flex-col text-right">
              <div className="flex items-center justify-end gap-1.5">
                <span className="font-label-ui text-label-ui text-on-surface font-semibold">
                  Company S.A.
                </span>
              </div>
              <span className="font-label-code text-[10px] text-outline">
                <span
                  style={{
                    color: 'rgb(148, 163, 184)',
                    fontFamily: '"JetBrains Mono", monospace',
                    backgroundColor: 'rgba(7, 10, 16, 0.6)',
                  }}
                >
                  Plano Enterprise
                </span>
              </span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-primary-container/10 border border-primary-container/30 flex items-center justify-center text-primary-container shadow-[0_0_12px_rgba(0,240,255,0.25)] font-headline-sm text-label-ui font-bold">
              CC
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
