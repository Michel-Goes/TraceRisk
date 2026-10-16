import React, { useState } from 'react';
import { ViewMode } from '../types';

interface DashboardViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const [activePeriod, setActivePeriod] = useState<'Hoje' | '7 dias' | '30 dias'>('Hoje');

  const exportReport = () => {
    const csv = `Horário,Usuário,IP / Localidade,Score,Regra Disparada,Status
14:32:08,admin.root,185.220.101.5 RU,100,IP em Blacklist (Tor Exit Node),BLOQUEADO
14:31:54,patricia.sec,177.18.230.12 BR,65,Horário Anômalo + Novo ASN,2FA CONCLUÍDO
14:30:12,devops.srv,201.86.45.99 BR,20,Fluxo Padrão / Fingerprint Válido,LIBERADO
14:28:40,lucas.costa,45.140.19.112 NL,85,5 Tentativas Falhas consecutivas,BLOQUEADO`;

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tracerisk-relatorio-${activePeriod.toLowerCase().replace(' ', '')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-primary-container rounded-full"></span>
            <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">
              Dashboard de Risco
            </h1>
          </div>
          <p className="font-body-sm text-body-sm text-outline">
            Métricas globais de telemetria e decisões em tempo real.
          </p>
        </div>
        <div className="flex items-center gap-space-sm flex-wrap">
          <div className="flex items-center bg-surface-container-low p-0.5 rounded-lg border border-outline-variant/30">
            {(['Hoje', '7 dias', '30 dias'] as const).map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => setActivePeriod(period)}
                className={`px-3 py-1 font-label-ui text-label-ui transition-all ${
                  activePeriod === period
                    ? 'text-on-surface bg-surface-container-highest rounded-DEFAULT'
                    : 'text-outline hover:text-on-surface'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={exportReport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-ui text-label-ui border border-outline-variant/30 hover:border-primary-container/40 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px] text-primary-container">
              ios_share
            </span>
            <span>Exportar Relatório</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        <div className="flex flex-col justify-between p-space-md rounded-lg bg-surface-container-low/70 border border-outline-variant/30 hover:border-primary-container/30 transition-all">
          <div className="flex items-start justify-between">
            <span className="font-label-ui text-label-ui text-outline uppercase tracking-wider">
              Total de Acessos
            </span>
            <span className="material-symbols-outlined text-[18px] text-primary-container">speed</span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-headline-lg text-headline-lg font-bold text-on-surface">24.892</span>
            <span className="font-label-code text-label-badge text-secondary flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[13px]">trending_up</span> +12.4%
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-outline font-label-code text-label-badge">
            <span>vs. 22.140 ontem</span>
            <span className="text-on-surface-variant">288 req/min</span>
          </div>
        </div>

        <div className="flex flex-col justify-between p-space-md rounded-lg bg-surface-container-low/70 border border-outline-variant/30 hover:border-secondary/30 transition-all">
          <div className="flex items-start justify-between">
            <span className="font-label-ui text-label-ui text-outline uppercase tracking-wider">
              Decisões sem Atrito
            </span>
            <span className="material-symbols-outlined text-[18px] text-secondary">verified_user</span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-headline-lg text-headline-lg font-bold text-secondary">88.4%</span>
            <span className="font-label-code text-label-badge text-secondary">22.004 reqs</span>
          </div>
          <div className="mt-3">
            <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
              <div className="bg-secondary h-full rounded-full" style={{ width: '88.4%' }}></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between p-space-md rounded-lg bg-surface-container-low/70 border border-outline-variant/30 hover:border-primary-container/30 transition-all">
          <div className="flex items-start justify-between">
            <span className="font-label-ui text-label-ui text-outline uppercase tracking-wider">
              Desafios 2FA
            </span>
            <span className="material-symbols-outlined text-[18px] text-primary-container">lock_reset</span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-headline-lg text-headline-lg font-bold text-on-surface">8.2%</span>
            <span className="font-label-code text-label-badge text-primary-container">2.041 verif.</span>
          </div>
          <div className="mt-3">
            <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
              <div className="bg-primary-container h-full rounded-full" style={{ width: '8.2%' }}></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between p-space-md rounded-lg bg-surface-container-low/70 border border-outline-variant/30 hover:border-error/30 transition-all">
          <div className="flex items-start justify-between">
            <span className="font-label-ui text-label-ui text-outline uppercase tracking-wider">
              Bloqueios Críticos
            </span>
            <span className="material-symbols-outlined text-[18px] text-error">gpp_bad</span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-headline-lg text-headline-lg font-bold text-error">3.4%</span>
            <span className="font-label-code text-label-badge text-error">846 vetados</span>
          </div>
          <div className="mt-3">
            <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
              <div className="bg-error h-full rounded-full" style={{ width: '3.4%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Grid: Trend 24h & Distribution Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
        {/* Trend Area */}
        <div className="lg:col-span-7 flex flex-col p-space-md rounded-lg bg-surface-container-low/70 border border-outline-variant/30">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary-container">monitoring</span>
              <h2 className="font-label-ui text-label-ui text-on-surface uppercase tracking-wider">
                Tendência de Risco & Eventos (24h)
              </h2>
            </div>
            <div className="flex items-center gap-3 font-label-badge text-label-badge">
              <span className="flex items-center gap-1.5 text-outline">
                <span className="w-2 h-0.5 bg-error"></span> 75 Bloqueio
              </span>
              <span className="flex items-center gap-1.5 text-outline">
                <span className="w-2 h-0.5 bg-primary-container"></span> 40 Desafio 2FA
              </span>
            </div>
          </div>
          <div className="relative w-full h-64 mt-4">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 700 240">
              <defs>
                <linearGradient id="riskGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.35"></stop>
                  <stop offset="60%" stopColor="#00f0ff" stopOpacity="0.05"></stop>
                  <stop offset="100%" stopColor="#00f0ff" stopOpacity="0"></stop>
                </linearGradient>
                <linearGradient id="strokeGradient" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#4edea3"></stop>
                  <stop offset="55%" stopColor="#00f0ff"></stop>
                  <stop offset="78%" stopColor="#ffb4ab"></stop>
                  <stop offset="100%" stopColor="#4edea3"></stop>
                </linearGradient>
              </defs>
              <line opacity="0.4" stroke="#ffb4ab" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="700" y1="60" y2="60"></line>
              <text fill="#ffb4ab" fontFamily="JetBrains Mono" fontSize="9" opacity="0.8" textAnchor="end" x="696" y="55">
                Score 75 (Crit)
              </text>
              <line opacity="0.3" stroke="#00f0ff" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="700" y1="130" y2="130"></line>
              <text fill="#00f0ff" fontFamily="JetBrains Mono" fontSize="9" opacity="0.8" textAnchor="end" x="696" y="125">
                Score 40 (2FA)
              </text>
              <line opacity="0.3" stroke="#3b494b" strokeWidth="1" x1="0" x2="700" y1="210" y2="210"></line>
              <path
                d="M 0 185
                   C 60 180, 100 170, 150 160
                   C 200 150, 240 195, 290 175
                   C 340 155, 380 90, 430 75
                   C 480 60, 520 40, 560 48
                   C 600 56, 640 150, 700 165
                   L 700 210 L 0 210 Z"
                fill="url(#riskGradient)"
              ></path>
              <path
                d="M 0 185
                   C 60 180, 100 170, 150 160
                   C 200 150, 240 195, 290 175
                   C 340 155, 380 90, 430 75
                   C 480 60, 520 40, 560 48
                   C 600 56, 640 150, 700 165"
                fill="none"
                stroke="url(#strokeGradient)"
                strokeWidth="2"
              ></path>
              <circle cx="560" cy="48" fill="#ffb4ab" r="4" stroke="#0a0e17" strokeWidth="2"></circle>
              <circle cx="560" cy="48" fill="none" opacity="0.6" r="8" stroke="#ffb4ab" strokeWidth="1"></circle>
              <circle cx="430" cy="75" fill="#00f0ff" r="3.5" stroke="#0a0e17" strokeWidth="2"></circle>
            </svg>
            <div className="absolute top-2 left-[74%] transform -translate-x-1/2 bg-surface-container-highest/90 border border-outline-variant/40 rounded px-2 py-1 text-center backdrop-blur-sm pointer-events-none">
              <div className="font-label-code text-label-badge text-error font-semibold">Pico: 14:32</div>
              <div className="font-label-code text-[10px] text-outline">Score 89 (IP Scan)</div>
            </div>
          </div>
          <div className="flex justify-between items-center pt-2 text-outline font-label-code text-label-badge border-t border-outline-variant/10">
            <span>00:00</span>
            <span>04:00</span>
            <span>08:00</span>
            <span>12:00</span>
            <span className="text-primary-container font-semibold">14:00 (Agora)</span>
            <span>18:00</span>
            <span>22:00</span>
          </div>
        </div>

        {/* Donut Distribution */}
        <div className="lg:col-span-5 flex flex-col p-space-md rounded-lg bg-surface-container-low/70 border border-outline-variant/30 justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary">pie_chart</span>
              <h2 className="font-label-ui text-label-ui text-on-surface uppercase tracking-wider">
                Distribuição de Decisões
              </h2>
            </div>
            <span className="font-label-code text-label-badge text-outline">Total 100%</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-space-lg my-2">
            <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-surface-container-highest"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                ></path>
                <path
                  className="text-secondary"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="88.4, 100"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                ></path>
                <path
                  className="text-primary-container"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="8.2, 100"
                  strokeDashoffset="-88.4"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                ></path>
                <path
                  className="text-error"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="3.4, 100"
                  strokeDashoffset="-96.6"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                ></path>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">24.8k</span>
                <span className="font-label-code text-[10px] text-outline tracking-wider">EVENTOS</span>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 w-full max-w-[200px]">
              <div className="flex items-center justify-between p-1.5 rounded bg-surface-container/50 border border-outline-variant/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="font-label-ui text-label-ui text-on-surface">Liberado</span>
                </div>
                <div className="text-right">
                  <span className="font-label-code text-label-ui font-semibold text-on-surface">88.4%</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-surface-container/50 border border-outline-variant/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                  <span className="font-label-ui text-label-ui text-on-surface">Desafio 2FA</span>
                </div>
                <div className="text-right">
                  <span className="font-label-code text-label-ui font-semibold text-on-surface">8.2%</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-surface-container/50 border border-outline-variant/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-error"></span>
                  <span className="font-label-ui text-label-ui text-on-surface">Bloqueio</span>
                </div>
                <div className="text-right">
                  <span className="font-label-code text-label-ui font-semibold text-error">3.4%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-2 text-right border-t border-outline-variant/10">
            <span className="font-label-code text-label-badge text-outline">
              Latência Média de Decisão: <strong className="text-on-surface">18ms</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Recent Incidents Table */}
      <div className="flex flex-col p-space-md rounded-lg bg-surface-container-low/70 border border-outline-variant/30 gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-error">warning</span>
            <h2 className="font-label-ui text-label-ui text-on-surface uppercase tracking-wider">
              Incidentes Recentes
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('logs')}
            className="flex items-center gap-1 font-label-ui text-label-ui text-primary-container hover:underline cursor-pointer"
          >
            <span>Ver todos os logs</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="font-label-ui text-label-ui text-outline uppercase tracking-wider border-b border-outline-variant/20">
                <th className="py-2.5 px-3 font-semibold">Horário</th>
                <th className="py-2.5 px-3 font-semibold">Usuário</th>
                <th className="py-2.5 px-3 font-semibold">IP / Localidade</th>
                <th className="py-2.5 px-3 font-semibold">Score</th>
                <th className="py-2.5 px-3 font-semibold">Regra Disparada</th>
                <th className="py-2.5 px-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 font-label-code text-label-code">
              <tr className="hover:bg-surface-container-high/40 transition-colors">
                <td className="py-2.5 px-3 text-outline">14:32:08</td>
                <td className="py-2.5 px-3 font-semibold text-on-surface">admin.root</td>
                <td className="py-2.5 px-3 text-on-surface-variant flex items-center gap-1.5">
                  <span>185.220.101.5</span>
                  <span className="font-label-badge text-[10px] text-outline px-1 rounded bg-surface-container-highest">
                    RU
                  </span>
                </td>
                <td className="py-2.5 px-3">
                  <span className="font-bold text-error">100</span>
                </td>
                <td className="py-2.5 px-3 font-body-sm text-body-sm text-on-surface-variant">
                  IP em Blacklist (Tor Exit Node)
                </td>
                <td className="py-2.5 px-3 text-right">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-error-container/20 border border-error/30 text-error font-label-badge text-label-badge uppercase font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                    Bloqueado
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-high/40 transition-colors">
                <td className="py-2.5 px-3 text-outline">14:31:54</td>
                <td className="py-2.5 px-3 font-semibold text-on-surface">patricia.sec</td>
                <td className="py-2.5 px-3 text-on-surface-variant flex items-center gap-1.5">
                  <span>177.18.230.12</span>
                  <span className="font-label-badge text-[10px] text-outline px-1 rounded bg-surface-container-highest">
                    BR
                  </span>
                </td>
                <td className="py-2.5 px-3">
                  <span className="font-bold text-primary-container">65</span>
                </td>
                <td className="py-2.5 px-3 font-body-sm text-body-sm text-on-surface-variant">
                  Horário Anômalo + Novo ASN
                </td>
                <td className="py-2.5 px-3 text-right">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary-container/10 border border-primary-container/30 text-primary-container font-label-badge text-label-badge uppercase font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                    2FA Concluído
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-high/40 transition-colors">
                <td className="py-2.5 px-3 text-outline">14:30:12</td>
                <td className="py-2.5 px-3 font-semibold text-on-surface">devops.srv</td>
                <td className="py-2.5 px-3 text-on-surface-variant flex items-center gap-1.5">
                  <span>201.86.45.99</span>
                  <span className="font-label-badge text-[10px] text-outline px-1 rounded bg-surface-container-highest">
                    BR
                  </span>
                </td>
                <td className="py-2.5 px-3">
                  <span className="font-bold text-secondary">20</span>
                </td>
                <td className="py-2.5 px-3 font-body-sm text-body-sm text-on-surface-variant">
                  Fluxo Padrão / Fingerprint Válido
                </td>
                <td className="py-2.5 px-3 text-right">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-secondary/10 border border-secondary/30 text-secondary font-label-badge text-label-badge uppercase font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    Liberado
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-high/40 transition-colors">
                <td className="py-2.5 px-3 text-outline">14:28:40</td>
                <td className="py-2.5 px-3 font-semibold text-on-surface">lucas.costa</td>
                <td className="py-2.5 px-3 text-on-surface-variant flex items-center gap-1.5">
                  <span>45.140.19.112</span>
                  <span className="font-label-badge text-[10px] text-outline px-1 rounded bg-surface-container-highest">
                    NL
                  </span>
                </td>
                <td className="py-2.5 px-3">
                  <span className="font-bold text-error">85</span>
                </td>
                <td className="py-2.5 px-3 font-body-sm text-body-sm text-on-surface-variant">
                  5 Tentativas Falhas consecutivas
                </td>
                <td className="py-2.5 px-3 text-right">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-error-container/20 border border-error/30 text-error font-label-badge text-label-badge uppercase font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                    Bloqueado
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
