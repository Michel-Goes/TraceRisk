import React, { useState } from 'react';

export const SimulatorView: React.FC = () => {
  const [f, setF] = useState(0); // Falhas de Login
  const [h, setH] = useState(0); // Horário Incomum
  const [i, setI] = useState(0); // Novo IP
  const [d, setD] = useState(0); // Dispositivo Desconhecido
  const [b, setB] = useState(0); // Blacklist

  const ptsF = 5 * f;
  const ptsH = 20 * h;
  const ptsI = 25 * i;
  const ptsD = 20 * d;
  const ptsB = 100 * b;

  const raw = ptsF + ptsH + ptsI + ptsD + ptsB;
  const score = Math.min(100, raw);

  // Gauge calculations
  const circumference = 314.15;
  const offset = circumference - (circumference * score) / 100;

  // Lógica de veredito
  const isBlocked = b === 1 || score >= 75;
  const isAdaptive = !isBlocked && score >= 40;

  let gaugeColor = '#10B981';
  let scoreClass = 'font-headline font-extrabold text-5xl text-emerald-neon tracking-tight leading-none my-1';
  let verdictCardClass = 'p-4 rounded-xl bg-emerald-neon/10 border border-emerald-neon/30 flex items-center justify-between transition-all';
  let verdictIconContainerClass = 'w-9 h-9 rounded-lg bg-emerald-neon/20 flex items-center justify-center text-emerald-neon shrink-0';
  let verdictIcon = 'verified_user';
  let verdictStatus = 'Acesso Liberado';
  let verdictStatusClass = 'font-headline font-bold text-sm text-emerald-neon truncate leading-tight';
  let verdictBadge = 'Sem atrito';
  let verdictBadgeClass = 'px-2.5 py-1 rounded-md bg-emerald-neon/20 font-mono text-xs text-emerald-neon font-semibold shrink-0 ml-2';

  if (isBlocked) {
    gaugeColor = '#EF4444';
    scoreClass = 'font-headline font-extrabold text-5xl text-rose-neon tracking-tight leading-none my-1';
    verdictCardClass = 'p-4 rounded-xl bg-rose-neon/10 border border-rose-neon/40 flex items-center justify-between transition-all';
    verdictIconContainerClass = 'w-9 h-9 rounded-lg bg-rose-neon/20 flex items-center justify-center text-rose-neon shrink-0';
    verdictIcon = 'block';
    verdictStatus = 'Acesso Bloqueado';
    verdictStatusClass = 'font-headline font-bold text-sm text-rose-neon truncate leading-tight';
    verdictBadge = 'Bloqueio total';
    verdictBadgeClass = 'px-2.5 py-1 rounded-md bg-rose-neon/20 font-mono text-xs text-rose-neon font-semibold shrink-0 ml-2';
  } else if (isAdaptive) {
    gaugeColor = '#F59E0B';
    scoreClass = 'font-headline font-extrabold text-5xl text-amber-neon tracking-tight leading-none my-1';
    verdictCardClass = 'p-4 rounded-xl bg-amber-neon/10 border border-amber-neon/40 flex items-center justify-between transition-all';
    verdictIconContainerClass = 'w-9 h-9 rounded-lg bg-amber-neon/20 flex items-center justify-center text-amber-neon shrink-0';
    verdictIcon = 'lock';
    verdictStatus = 'Desafio 2FA Requerido';
    verdictStatusClass = 'font-headline font-bold text-sm text-amber-neon truncate leading-tight';
    verdictBadge = 'Desafio 2FA';
    verdictBadgeClass = 'px-2.5 py-1 rounded-md bg-amber-neon/20 font-mono text-xs text-amber-neon font-semibold shrink-0 ml-2';
  }

  const applyScenario = (valF: number, valH: number, valI: number, valD: number, valB: number) => {
    setF(valF);
    setH(valH);
    setI(valI);
    setD(valD);
    setB(valB);
  };

  const handleReset = () => {
    applyScenario(0, 0, 0, 0, 0);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
      {/* TOP BAR / HERO */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-white/[0.04]">
        <div>
          <h1 className="font-headline font-bold text-2xl text-white tracking-tight">Simulador de Risco</h1>
          <p className="font-body text-xs text-slate-400 mt-1">Calibre os fatores de contexto e simule a decisão adaptativa em tempo real.</p>
        </div>
        {/* QUICK SCENARIOS 1-CLICK PILLS */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mr-1">CENÁRIOS:</span>
          <button
            className="px-2.5 py-1 rounded-md bg-[#0e1628] hover:bg-surface-elevated border border-white/[0.08] hover:border-emerald-neon/40 text-slate-300 hover:text-emerald-neon transition-all text-xs font-mono flex items-center gap-1.5 cursor-pointer"
            onClick={() => applyScenario(0, 0, 0, 0, 0)}
            type="button"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-neon"></span>
            Acesso Seguro
          </button>
          <button
            className="px-2.5 py-1 rounded-md bg-[#0e1628] hover:bg-surface-elevated border border-white/[0.08] hover:border-cyan-neon/40 text-slate-300 hover:text-cyan-neon transition-all text-xs font-mono flex items-center gap-1.5 cursor-pointer"
            onClick={() => applyScenario(0, 1, 0, 0, 0)}
            type="button"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-neon"></span>
            Fora de Horário
          </button>
          <button
            className="px-2.5 py-1 rounded-md bg-[#0e1628] hover:bg-surface-elevated border border-white/[0.08] hover:border-amber-neon/40 text-slate-300 hover:text-amber-neon transition-all text-xs font-mono flex items-center gap-1.5 cursor-pointer"
            onClick={() => applyScenario(6, 0, 0, 0, 0)}
            type="button"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-neon"></span>
            Tentativas Repetidas
          </button>
          <button
            className="px-2.5 py-1 rounded-md bg-[#0e1628] hover:bg-surface-elevated border border-white/[0.08] hover:border-rose-neon/40 text-slate-300 hover:text-rose-neon transition-all text-xs font-mono flex items-center gap-1.5 cursor-pointer"
            onClick={() => applyScenario(0, 0, 0, 0, 1)}
            type="button"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-neon"></span>
            Blacklist
          </button>
        </div>
      </div>

      {/* MAIN 2-COLUMN BALANCED GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* LEFT COLUMN: FATORES DE ACESSO */}
        <div className="p-6 rounded-2xl bg-surface-card/85 border border-white/[0.06] shadow-xl backdrop-blur-sm flex flex-col gap-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-cyan-neon text-lg">tune</span>
              <h2 className="font-headline font-semibold text-sm text-white">Fatores de Acesso</h2>
            </div>
            <button
              className="font-mono text-[11px] text-slate-400 hover:text-cyan-neon transition-colors flex items-center gap-1 cursor-pointer"
              id="btn-reset"
              onClick={handleReset}
              type="button"
            >
              <span className="material-symbols-outlined text-xs">restart_alt</span>
              Resetar
            </button>
          </div>

          {/* CONTROLE: FALHAS DE LOGIN (SLIDER) */}
          <div className="p-4 rounded-xl bg-[#090e1a] border border-white/[0.05] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-slate-400 text-lg">lock_clock</span>
                <span className="font-headline text-xs font-medium text-slate-200">Falhas de Login Consecutivas</span>
              </div>
              <span className="font-mono text-xs text-cyan-neon font-semibold px-2 py-0.5 rounded bg-cyan-neon/10 border border-cyan-neon/30 leading-normal" id="label-f-val">
                {f} falha{f === 1 ? '' : 's'} (+{ptsF})
              </span>
            </div>
            <div className="px-0.5 pt-1">
              <input
                className="w-full cursor-pointer accent-[#00F0FF]"
                id="input-f"
                max="10"
                min="0"
                step="1"
                type="range"
                value={f}
                onChange={(e) => setF(parseInt(e.target.value, 10))}
              />
              <div className="flex justify-between font-mono text-[10px] text-slate-500 mt-2">
                <span>0 (Normal)</span>
                <span>5 (Alerta)</span>
                <span>10 (Crítico)</span>
              </div>
            </div>
          </div>

          {/* TOGGLES */}
          <div className="flex flex-col gap-2.5">
            {/* TOGGLE: HORÁRIO INCOMUM */}
            <div className="p-3.5 rounded-xl bg-[#090e1a] border border-white/[0.05] hover:border-white/[0.08] transition-all flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center text-slate-300">
                  <span className="material-symbols-outlined text-base">schedule</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-headline text-xs font-medium text-slate-200">Horário Incomum</span>
                  <span className="font-mono text-[10px] text-slate-400 bg-white/[0.04] px-1.5 py-0.5 rounded leading-none">+20 pts</span>
                </div>
              </div>
              <button
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 cursor-pointer ${
                  h === 1 ? 'bg-cyan-neon' : 'bg-slate-800'
                }`}
                onClick={() => setH(h === 1 ? 0 : 1)}
                type="button"
              >
                <span
                  className={`w-5 h-5 rounded-full transition-transform transform ${
                    h === 1
                      ? 'bg-[#060911] translate-x-5 shadow-[0_0_10px_#00F0FF]'
                      : 'bg-slate-400 translate-x-0'
                  }`}
                ></span>
              </button>
            </div>

            {/* TOGGLE: NOVO IP */}
            <div className="p-3.5 rounded-xl bg-[#090e1a] border border-white/[0.05] hover:border-white/[0.08] transition-all flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center text-slate-300">
                  <span className="material-symbols-outlined text-base">public</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-headline text-xs font-medium text-slate-200">Novo IP</span>
                  <span className="font-mono text-[10px] text-slate-400 bg-white/[0.04] px-1.5 py-0.5 rounded leading-none">+25 pts</span>
                </div>
              </div>
              <button
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 cursor-pointer ${
                  i === 1 ? 'bg-cyan-neon' : 'bg-slate-800'
                }`}
                onClick={() => setI(i === 1 ? 0 : 1)}
                type="button"
              >
                <span
                  className={`w-5 h-5 rounded-full transition-transform transform ${
                    i === 1
                      ? 'bg-[#060911] translate-x-5 shadow-[0_0_10px_#00F0FF]'
                      : 'bg-slate-400 translate-x-0'
                  }`}
                ></span>
              </button>
            </div>

            {/* TOGGLE: DISPOSITIVO DESCONHECIDO */}
            <div className="p-3.5 rounded-xl bg-[#090e1a] border border-white/[0.05] hover:border-white/[0.08] transition-all flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center text-slate-300">
                  <span className="material-symbols-outlined text-base">devices</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-headline text-xs font-medium text-slate-200">Dispositivo Desconhecido</span>
                  <span className="font-mono text-[10px] text-slate-400 bg-white/[0.04] px-1.5 py-0.5 rounded leading-none">+20 pts</span>
                </div>
              </div>
              <button
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 cursor-pointer ${
                  d === 1 ? 'bg-cyan-neon' : 'bg-slate-800'
                }`}
                onClick={() => setD(d === 1 ? 0 : 1)}
                type="button"
              >
                <span
                  className={`w-5 h-5 rounded-full transition-transform transform ${
                    d === 1
                      ? 'bg-[#060911] translate-x-5 shadow-[0_0_10px_#00F0FF]'
                      : 'bg-slate-400 translate-x-0'
                  }`}
                ></span>
              </button>
            </div>

            {/* TOGGLE: IP EM BLACKLIST */}
            <div className="p-3.5 rounded-xl bg-rose-neon/[0.03] border border-rose-neon/20 hover:border-rose-neon/30 transition-all flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-rose-neon/10 flex items-center justify-center text-rose-neon">
                  <span className="material-symbols-outlined text-base">warning</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-headline text-xs font-semibold text-rose-300">IP em Blacklist</span>
                  <span className="font-mono text-[10px] text-rose-400 bg-rose-neon/10 px-1.5 py-0.5 rounded font-bold leading-none">+100 pts</span>
                </div>
              </div>
              <button
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 cursor-pointer ${
                  b === 1 ? 'bg-rose-neon' : 'bg-slate-800'
                }`}
                onClick={() => setB(b === 1 ? 0 : 1)}
                type="button"
              >
                <span
                  className={`w-5 h-5 rounded-full transition-transform transform ${
                    b === 1
                      ? 'bg-[#060911] translate-x-5 shadow-[0_0_10px_#EF4444]'
                      : 'bg-slate-400 translate-x-0'
                  }`}
                ></span>
              </button>
            </div>
          </div>

          {/* COMPACT THRESHOLD BAR */}
          <div className="pt-3 border-t border-white/[0.06] flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Limiares de Ação</span>
              <span className="text-slate-500">Faixas de Decisão</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div
                className={`p-2.5 rounded-lg bg-[#090e1a] text-center transition-all flex flex-col justify-center min-h-[52px] ${
                  !isBlocked && !isAdaptive
                    ? 'border border-emerald-neon/40 ring-1 ring-emerald-neon/40 opacity-100'
                    : 'border border-white/[0.05] opacity-40'
                }`}
                id="band-safe"
              >
                <span className="font-mono text-[11px] font-bold text-emerald-neon leading-tight">0 - 39 pts</span>
                <span className="text-[10px] text-slate-300 font-medium leading-tight mt-0.5">Liberado</span>
              </div>
              <div
                className={`p-2.5 rounded-lg bg-[#090e1a] text-center transition-all flex flex-col justify-center min-h-[52px] ${
                  isAdaptive
                    ? 'border border-amber-neon/40 ring-1 ring-amber-neon/40 opacity-100'
                    : 'border border-white/[0.05] opacity-40'
                }`}
                id="band-adaptive"
              >
                <span className="font-mono text-[11px] font-bold text-amber-neon leading-tight">40 - 74 pts</span>
                <span className="text-[10px] text-slate-300 font-medium leading-tight mt-0.5">Requer MFA</span>
              </div>
              <div
                className={`p-2.5 rounded-lg bg-[#090e1a] text-center transition-all flex flex-col justify-center min-h-[52px] ${
                  isBlocked
                    ? 'border border-rose-neon/40 ring-1 ring-rose-neon/40 opacity-100'
                    : 'border border-white/[0.05] opacity-40'
                }`}
                id="band-critical"
              >
                <span className="font-mono text-[11px] font-bold text-rose-neon leading-tight">≥ 75 pts</span>
                <span className="text-[10px] text-slate-300 font-medium leading-tight mt-0.5">Bloqueado</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: RESULTADO EM TEMPO REAL */}
        <div className="p-6 rounded-2xl bg-surface-card/85 border border-white/[0.06] shadow-xl backdrop-blur-sm flex flex-col gap-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-cyan-neon text-lg">insights</span>
              <h2 className="font-headline font-semibold text-sm text-white">Resultado em Tempo Real</h2>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400"></div>
          </div>

          {/* GAUGE CIRCULAR */}
          <div className="flex flex-col items-center justify-center pt-2">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                <circle cx="60" cy="60" fill="none" r="50" stroke="#131b2e" strokeWidth="8"></circle>
                <circle
                  className="transition-all duration-300 ease-out"
                  cx="60"
                  cy="60"
                  fill="none"
                  id="gauge-arc"
                  r="50"
                  stroke={gaugeColor}
                  strokeDasharray="314.15"
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  strokeWidth="8"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-semibold">RISCO</span>
                <span className={scoreClass} id="score-display">
                  {score}
                </span>
                <span className="font-mono text-[10px] text-slate-500 font-medium">DE 100</span>
              </div>
            </div>
          </div>

          {/* VERDICT CARD PROEMINENTE */}
          <div className={verdictCardClass} id="verdict-card">
            <div className="flex items-center gap-3 min-w-0">
              <div className={verdictIconContainerClass} id="verdict-icon-container">
                <span className="material-symbols-outlined text-xl" id="verdict-icon">
                  {verdictIcon}
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider leading-none mb-1">
                  DECISÃO ADAPTATIVA
                </span>
                <span className={verdictStatusClass} id="verdict-status">
                  {verdictStatus}
                </span>
              </div>
            </div>
            <span className={verdictBadgeClass} id="verdict-badge">
              {verdictBadge}
            </span>
          </div>

          {/* FACTOR BREAKDOWN BARS */}
          <div className="p-4 rounded-xl bg-[#090e1a] border border-white/[0.05] flex flex-col gap-3">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400">Composição do Score</span>
              <span className="text-slate-200 font-semibold" id="score-total-math">
                Total: {score} pts
              </span>
            </div>

            {/* Multi-Color Stack Bar */}
            <div className="w-full bg-[#131b2e] h-2 rounded-full overflow-hidden flex border border-white/[0.05]">
              <div className="h-full bg-cyan-neon transition-all duration-300" id="bar-f" style={{ width: `${Math.min(100, ptsF)}%` }}></div>
              <div className="h-full bg-sky-400 transition-all duration-300" id="bar-h" style={{ width: `${Math.min(100, ptsH)}%` }}></div>
              <div className="h-full bg-teal-400 transition-all duration-300" id="bar-i" style={{ width: `${Math.min(100, ptsI)}%` }}></div>
              <div className="h-full bg-indigo-400 transition-all duration-300" id="bar-d" style={{ width: `${Math.min(100, ptsD)}%` }}></div>
              <div className="h-full bg-rose-neon transition-all duration-300" id="bar-b" style={{ width: `${Math.min(100, ptsB)}%` }}></div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono pt-1 text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-neon shrink-0"></span>
                <span>Falhas: <strong className="text-slate-200" id="stat-f">+{ptsF}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0"></span>
                <span>Horário: <strong className="text-slate-200" id="stat-h">+{ptsH}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0"></span>
                <span>IP: <strong className="text-slate-200" id="stat-i">+{ptsI}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0"></span>
                <span>Disp: <strong className="text-slate-200" id="stat-d">+{ptsD}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-neon shrink-0"></span>
                <span>Blacklist: <strong className="text-slate-200" id="stat-b">+{ptsB}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
