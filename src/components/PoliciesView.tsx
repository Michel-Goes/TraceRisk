import React, { useState } from 'react';

export const PoliciesView: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);
  const [activeTab, setActiveTab] = useState<'blacklist' | 'whitelist' | 'devices' | 'thresholds'>('blacklist');
  const [searchFilter, setSearchFilter] = useState('');

  // Thresholds
  const [safeVal, setSafeVal] = useState(39);
  const [challengeVal, setChallengeVal] = useState(74);
  const [criticalVal, setCriticalVal] = useState(75);

  const [blacklistRows, setBlacklistRows] = useState([
    { ip: '185.220.101.45', geo: 'DE', motivo: 'Tor Exit Node', origin: 'Feed AlienVault', date: 'Hoje, 14:28:10', exp: 'Em 18h', perm: false, isDotPulse: true },
    { ip: '45.154.255.89', geo: 'RU', motivo: 'Brute-force detectado', origin: 'Heurística Automática', date: 'Hoje, 13:05:42', exp: 'Em 42h', perm: false, isDotPulse: false },
    { ip: '103.208.220.0/22', geo: 'VN', motivo: 'Credential Stuffing', origin: 'SecOps Manual', date: 'Ontem, 21:12:00', exp: 'Permanente', perm: true, isDotPulse: false },
    { ip: '194.26.29.112', geo: 'NL', motivo: 'Malware C2', origin: 'Feed AlienVault', date: '22/10, 08:30:19', exp: 'Permanente', perm: true, isDotPulse: false },
    { ip: '89.248.163.50', geo: 'SC', motivo: 'Scanner de Vulnerabilidade', origin: 'Heurística Automática', date: '21/10, 19:40:11', exp: 'Em 6h', perm: false, isDotPulse: false },
    { ip: '198.51.100.24', geo: 'US', motivo: 'Brute-force detectado', origin: 'SecOps Manual', date: '20/10, 11:15:02', exp: 'Em 72h', perm: false, isDotPulse: false },
  ]);

  const [newIp, setNewIp] = useState('');
  const [newReason, setNewReason] = useState('Brute-force detectado');
  const [newExp, setNewExp] = useState('12h');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIp) return;
    setBlacklistRows([
      {
        ip: newIp,
        geo: 'EXT',
        motivo: newReason,
        origin: 'SecOps Manual',
        date: 'Hoje, ' + new Date().toLocaleTimeString('pt-BR'),
        exp: newExp === 'perm' ? 'Permanente' : `Em ${newExp}`,
        perm: newExp === 'perm',
        isDotPulse: false,
      },
      ...blacklistRows,
    ]);
    setNewIp('');
    setModalOpen(false);
  };

  const handleSaveThresholds = () => {
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const filteredRows = blacklistRows.filter((r) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return r.ip.toLowerCase().includes(q) || r.motivo.toLowerCase().includes(q) || r.geo.toLowerCase().includes(q);
  });

  return (
    <div className="flex flex-col w-full">
      <div className="relative flex flex-col gap-space-lg">
        {/* Atmospheric Ambient Glows */}
        <div className="absolute -top-12 right-1/4 w-96 h-96 bg-primary-container/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

        {/* Header & Quick Actions */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md pb-space-sm">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-space-xs text-primary-container">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span className="font-label-badge text-label-badge tracking-widest uppercase">Zero Trust Governance</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Políticas &amp; Listas de Acesso
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              Gerenciamento de regras de proteção imediata, listas restritas e limiares Zero Trust.
            </p>
          </div>
          <div className="flex items-center gap-space-sm flex-wrap">
            <button className="group flex items-center gap-2 px-space-md py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-ui text-label-ui shadow-sm transition-all duration-200 cursor-pointer" type="button">
              <span className="material-symbols-outlined text-[18px] text-outline group-hover:text-primary-container transition-colors">cloud_download</span>
              <span>Importar Threat Intel</span>
            </button>
            <button
              className="flex items-center gap-2 px-space-md py-2.5 rounded-lg bg-primary-container hover:bg-primary-fixed-dim text-on-primary-fixed font-headline-sm text-label-ui shadow-md shadow-primary-container/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              id="open-add-modal"
              onClick={() => setModalOpen(true)}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] font-bold">add_moderator</span>
              <span className="font-bold">+ Adicionar IP à Blacklist</span>
            </button>
          </div>
        </header>

        {/* Top Telemetry Micro-Stat Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          {/* Metric 1 */}
          <div className="bg-surface-container-low/80 backdrop-blur-md rounded-xl p-space-md flex flex-col justify-between shadow-sm relative overflow-hidden group">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-error/60 via-error to-transparent"></div>
            <div className="flex items-center justify-between">
              <span className="font-label-ui text-label-ui text-on-surface-variant uppercase tracking-wider">Total IPs em Blacklist</span>
              <span className="p-1.5 rounded-lg bg-error-container/40 text-error flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">block</span>
              </span>
            </div>
            <div className="flex items-baseline gap-space-sm mt-3">
              <span className="font-headline-lg text-headline-lg font-bold text-on-surface">1.420</span>
              <span className="inline-flex items-center gap-0.5 font-label-badge text-label-badge text-error bg-error-container/30 px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                +38 hoje
              </span>
            </div>
            <div className="w-full bg-surface-container-highest h-1 rounded-full mt-3 overflow-hidden">
              <div className="bg-error h-full rounded-full" style={{ width: '74%' }}></div>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-surface-container-low/80 backdrop-blur-md rounded-xl p-space-md flex flex-col justify-between shadow-sm relative overflow-hidden group">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary-container/60 via-primary-container to-transparent"></div>
            <div className="flex items-center justify-between">
              <span className="font-label-ui text-label-ui text-on-surface-variant uppercase tracking-wider">Sincronização Threat Feed</span>
              <span className="p-1.5 rounded-lg bg-primary-container/10 text-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px] animate-spin" style={{ animationDuration: '8s' }}>sync</span>
              </span>
            </div>
            <div className="flex items-baseline gap-space-sm mt-3">
              <span className="font-headline-lg text-headline-lg font-bold text-on-surface">Há 12 min</span>
              <span className="inline-flex items-center gap-1 font-label-badge text-label-badge text-primary-container bg-primary-container/10 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                AlienVault OTX
              </span>
            </div>
            <span className="font-body-sm text-body-sm text-outline mt-3 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">done_all</span>
              18 feeds globais validados sem anomalias
            </span>
          </div>

          {/* Metric 3 */}
          <div className="bg-surface-container-low/80 backdrop-blur-md rounded-xl p-space-md flex flex-col justify-between shadow-sm relative overflow-hidden group">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-secondary/60 via-secondary to-transparent"></div>
            <div className="flex items-center justify-between">
              <span className="font-label-ui text-label-ui text-on-surface-variant uppercase tracking-wider">Modo de Bloqueio</span>
              <span className="p-1.5 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">bolt</span>
              </span>
            </div>
            <div className="flex items-baseline gap-space-sm mt-3">
              <span className="font-headline-lg text-headline-lg font-bold text-secondary">Instantâneo</span>
              <span className="font-label-code text-label-code text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">
                Drop &lt; 1.5ms
              </span>
            </div>
            <span className="font-body-sm text-body-sm text-outline mt-3 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-secondary">shield</span>
              Kernel eBPF inline packet filtering ativo
            </span>
          </div>
        </section>

        {/* Visual Segment / Context View Controls */}
        <div className="flex items-center justify-between border-b border-transparent">
          <nav aria-label="Tabs" className="flex items-center gap-space-xs p-1 rounded-xl bg-surface-container-low/90 backdrop-blur-md shadow-inner overflow-x-auto">
            <button
              className={`flex items-center gap-2 px-space-md py-2 rounded-lg font-label-ui text-label-ui transition-all cursor-pointer ${
                activeTab === 'blacklist' ? 'bg-surface-container-high text-primary-container shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
              onClick={() => setActiveTab('blacklist')}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">do_not_disturb_on</span>
              <span>Blacklist</span>
              <span className="px-2 py-0.5 rounded-full bg-primary-container/15 font-label-code text-label-badge text-primary-container font-semibold">1.420</span>
            </button>
            <button
              className={`flex items-center gap-2 px-space-md py-2 rounded-lg font-label-ui text-label-ui transition-all cursor-pointer ${
                activeTab === 'whitelist' ? 'bg-surface-container-high text-primary-container shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
              onClick={() => setActiveTab('whitelist')}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Whitelist de Confiança</span>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-highest font-label-code text-label-badge text-on-surface-variant">64</span>
            </button>
            <button
              className={`flex items-center gap-2 px-space-md py-2 rounded-lg font-label-ui text-label-ui transition-all cursor-pointer ${
                activeTab === 'devices' ? 'bg-surface-container-high text-primary-container shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
              onClick={() => setActiveTab('devices')}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">devices</span>
              <span>Dispositivos Aprovados</span>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-highest font-label-code text-label-badge text-on-surface-variant">812</span>
            </button>
            <button
              className={`flex items-center gap-2 px-space-md py-2 rounded-lg font-label-ui text-label-ui transition-all cursor-pointer ${
                activeTab === 'thresholds' ? 'bg-surface-container-high text-primary-container shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
              onClick={() => setActiveTab('thresholds')}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">tune</span>
              <span>Limiares de Decisão</span>
            </button>
          </nav>
          <div className="hidden md:flex items-center gap-2 font-label-code text-label-badge text-outline">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span>LIVE REPLICATING (EDGE-04)</span>
          </div>
        </div>

        {/* Main List Management Panel */}
        <section className="bg-surface-container-low/90 backdrop-blur-md rounded-xl shadow-xl flex flex-col overflow-hidden">
          {/* Toolbar & Query Filters */}
          <div className="p-space-md bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-sm flex-1 max-w-xl">
              <div className="relative w-full">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">filter_alt</span>
                <input
                  className="w-full bg-surface-container-lowest text-on-surface font-label-code text-body-sm pl-10 pr-space-md py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-container placeholder:text-outline/70 transition-all shadow-inner"
                  id="table-search"
                  placeholder="Filtrar por IP/CIDR, país de trânsito ou padrão de ataque..."
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container text-on-surface-variant font-label-ui text-label-ui cursor-pointer hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined text-[16px]">tune</span>
                <span>Origem: Todos</span>
              </div>
            </div>
            <div className="flex items-center gap-space-sm self-end md:self-auto">
              <div className="flex items-center gap-1 text-on-surface-variant font-label-code text-label-badge">
                <span className="text-primary-container font-bold">1-{filteredRows.length}</span> de 1.420 registros
              </div>
              <button className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" title="Recarregar" type="button">
                <span className="material-symbols-outlined text-[18px]">refresh</span>
              </button>
              <button className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" title="Exportar CSV" type="button">
                <span className="material-symbols-outlined text-[18px]">download</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left font-body-sm text-body-sm">
              <thead>
                <tr className="bg-surface-container-lowest text-outline font-label-ui text-label-ui tracking-wider uppercase">
                  <th className="py-3 px-space-md w-10" scope="col">
                    <input aria-label="Selecionar todos os IPs" className="rounded bg-surface-container-high text-primary-container focus:ring-0 focus:ring-offset-0 cursor-pointer" type="checkbox" />
                  </th>
                  <th className="py-3 px-space-md" scope="col">Endereço IP / CIDR</th>
                  <th className="py-3 px-space-md" scope="col">Motivo / Classificação</th>
                  <th className="py-3 px-space-md" scope="col">Origem da Regra</th>
                  <th className="py-3 px-space-md" scope="col">Data de Inclusão</th>
                  <th className="py-3 px-space-md" scope="col">Expiração</th>
                  <th className="py-3 px-space-md text-right" scope="col">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y-0" id="blacklist-rows">
                {filteredRows.map((r, idx) => (
                  <tr key={idx} className={`hover:bg-surface-container/60 transition-colors group ${idx % 2 === 0 ? 'bg-surface-container-low' : 'bg-surface-container-lowest/30'}`}>
                    <td className="py-3.5 px-space-md">
                      <input aria-label={`Selecionar IP ${r.ip}`} className="rounded bg-surface-container-high text-primary-container focus:ring-0 cursor-pointer" type="checkbox" />
                    </td>
                    <td className="py-3.5 px-space-md">
                      <div className="flex items-center gap-2">
                        <span className={`font-label-code text-label-code font-semibold ${r.ip.includes('/') ? 'text-primary-fixed' : 'text-on-surface'}`}>{r.ip}</span>
                        <span className="font-label-badge text-label-badge bg-surface-container-highest px-1.5 py-0.5 rounded text-outline uppercase">{r.geo}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-space-md">
                      <span className={`inline-flex items-center gap-1.5 font-label-badge text-label-badge px-2.5 py-1 rounded-full ${
                        r.perm && !r.motivo.includes('Malware')
                          ? 'text-tertiary-container bg-surface-container-highest'
                          : 'text-error bg-error-container/20'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${r.perm && !r.motivo.includes('Malware') ? 'bg-tertiary-container' : 'bg-error'} ${r.isDotPulse ? 'animate-pulse' : ''}`}></span>
                        {r.motivo}
                      </span>
                    </td>
                    <td className="py-3.5 px-space-md font-label-code text-label-code text-on-surface-variant">
                      {r.origin}
                    </td>
                    <td className="py-3.5 px-space-md text-on-surface-variant font-label-code text-label-badge">
                      {r.date}
                    </td>
                    <td className="py-3.5 px-space-md">
                      <span className={`font-label-code text-label-badge px-2 py-0.5 rounded ${r.perm ? 'text-error bg-error-container/30 font-bold' : 'text-on-surface-variant bg-surface-container'}`}>
                        {r.exp}
                      </span>
                    </td>
                    <td className="py-3.5 px-space-md text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded hover:bg-surface-container-highest text-outline hover:text-on-surface transition-colors cursor-pointer" title="Editar Expiração" type="button">
                          <span className="material-symbols-outlined text-[16px]">edit</span>
                        </button>
                        <button
                          className="p-1.5 rounded hover:bg-error-container/40 text-outline hover:text-error transition-colors cursor-pointer"
                          title="Remover da Blacklist"
                          type="button"
                          onClick={() => setBlacklistRows(blacklistRows.filter((row) => row.ip !== r.ip))}
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-space-sm bg-surface-container-lowest/80 px-space-md flex items-center justify-between font-label-ui text-label-ui">
            <span className="text-outline">Linhas sincronizadas em tempo real com o firewall perimetral.</span>
            <div className="flex items-center gap-1">
              <button className="px-2.5 py-1 rounded bg-surface-container text-outline hover:text-on-surface transition-colors cursor-pointer disabled:opacity-40" disabled type="button">Anterior</button>
              <span className="px-2 font-label-code text-label-badge text-primary-container">1 / 237</span>
              <button className="px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors cursor-pointer" type="button">Próxima</button>
            </div>
          </div>
        </section>

        {/* Bottom Configuration Panel: Limiares Zero Trust */}
        <section className="bg-surface-container-low/90 backdrop-blur-md rounded-xl p-space-lg shadow-xl relative overflow-hidden flex flex-col gap-space-md">
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary-container/5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container text-[20px]">tune</span>
                <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">Configuração dos Limiares Zero Trust</h2>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Defina as faixas de Risk Score (0-100) aplicadas nos nós de inspeção para mitigação automatizada.
              </p>
            </div>
            <button
              className="self-start sm:self-auto flex items-center gap-2 px-space-md py-2 rounded-lg bg-surface-container-high hover:bg-primary-container hover:text-on-primary-fixed text-on-surface font-label-ui text-label-ui shadow-sm transition-all duration-200 cursor-pointer"
              id="save-thresholds"
              onClick={handleSaveThresholds}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">{savedFeedback ? 'check' : 'save'}</span>
              <span>{savedFeedback ? 'Limiares Salvos' : 'Salvar Ajustes de Limiar'}</span>
            </button>
          </div>

          {/* Segmented Trust-Score Gradient Visualization Bar */}
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center justify-between font-label-code text-label-badge text-outline">
              <span>0 PTS (CONFIANÇA MÁXIMA)</span>
              <span>50 PTS (SUSPEITO)</span>
              <span>100 PTS (AMEAÇA CRÍTICA)</span>
            </div>
            <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden flex p-0.5 shadow-inner">
              <div className="bg-secondary h-full rounded-l-full" style={{ width: `${safeVal}%` }} title={`Faixa Segura: 0-${safeVal}`}></div>
              <div className="bg-primary-fixed-dim h-full" style={{ width: `${challengeVal - safeVal}%` }} title={`Faixa Desafio: ${safeVal + 1}-${challengeVal}`}></div>
              <div className="bg-error h-full rounded-r-full" style={{ width: `${100 - challengeVal}%` }} title={`Faixa Crítica: >=${criticalVal}`}></div>
            </div>
          </div>

          {/* Interactive 3-Tier Configuration Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md mt-1">
            {/* Tier 1 */}
            <div className="p-space-md rounded-xl bg-surface-container-lowest/80 flex flex-col justify-between shadow-sm relative group hover:bg-surface-container-lowest transition-all">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-secondary font-bold">Faixa Segura</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Acesso Direto Transparente</span>
                </div>
                <span className="p-1 rounded-md bg-secondary/10 text-secondary">
                  <span className="material-symbols-outlined text-[18px]">lock_open</span>
                </span>
              </div>
              <div className="my-4 flex items-baseline gap-2">
                <span className="font-headline-md text-headline-md font-bold text-on-surface">0 a {safeVal}</span>
                <span className="font-label-code text-label-badge text-secondary font-semibold">PTS</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between font-label-badge text-label-badge text-outline">
                  <span>Limiar Máximo</span>
                  <span className="font-label-code text-on-surface">{safeVal}</span>
                </div>
                <input
                  className="w-full accent-[#4edea3] bg-surface-container-high h-1.5 rounded-lg appearance-none cursor-pointer"
                  max="49"
                  min="10"
                  type="range"
                  value={safeVal}
                  onChange={(e) => setSafeVal(parseInt(e.target.value, 10))}
                />
              </div>
              <div className="mt-4 pt-3 flex items-center justify-between font-label-badge text-label-badge text-outline border-t border-transparent">
                <span>Ação: BYPASS AUTORIZADO</span>
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
              </div>
            </div>

            {/* Tier 2 */}
            <div className="p-space-md rounded-xl bg-surface-container-lowest/80 flex flex-col justify-between shadow-sm relative group hover:bg-surface-container-lowest transition-all">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-primary-fixed-dim font-bold">Faixa de Desafio</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Requer Step-up / 2FA Biométrico</span>
                </div>
                <span className="p-1 rounded-md bg-primary-container/10 text-primary-fixed-dim">
                  <span className="material-symbols-outlined text-[18px]">fingerprint</span>
                </span>
              </div>
              <div className="my-4 flex items-baseline gap-2">
                <span className="font-headline-md text-headline-md font-bold text-on-surface">{safeVal + 1} a {challengeVal}</span>
                <span className="font-label-code text-label-badge text-primary-fixed-dim font-semibold">PTS</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between font-label-badge text-label-badge text-outline">
                  <span>Limiar Intermediário</span>
                  <span className="font-label-code text-on-surface">{challengeVal}</span>
                </div>
                <input
                  className="w-full accent-[#00dbe9] bg-surface-container-high h-1.5 rounded-lg appearance-none cursor-pointer"
                  max="80"
                  min="50"
                  type="range"
                  value={challengeVal}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10);
                    setChallengeVal(v);
                    setCriticalVal(v + 1);
                  }}
                />
              </div>
              <div className="mt-4 pt-3 flex items-center justify-between font-label-badge text-label-badge text-outline border-t border-transparent">
                <span>Ação: STEP-UP OBRIGATÓRIO</span>
                <span className="w-2 h-2 rounded-full bg-primary-fixed-dim"></span>
              </div>
            </div>

            {/* Tier 3 */}
            <div className="p-space-md rounded-xl bg-surface-container-lowest/80 flex flex-col justify-between shadow-sm relative group hover:bg-surface-container-lowest transition-all">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-error font-bold">Faixa Crítica</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Bloqueio Automático em Borda</span>
                </div>
                <span className="p-1 rounded-md bg-error-container/40 text-error">
                  <span className="material-symbols-outlined text-[18px]">gpp_bad</span>
                </span>
              </div>
              <div className="my-4 flex items-baseline gap-2">
                <span className="font-headline-md text-headline-md font-bold text-on-surface">&gt;= {criticalVal}</span>
                <span className="font-label-code text-label-badge text-error font-semibold">PTS</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between font-label-badge text-label-badge text-outline">
                  <span>Gatilho de Drop Imediato</span>
                  <span className="font-label-code text-on-surface">{criticalVal}</span>
                </div>
                <input
                  className="w-full accent-[#ffb4ab] bg-surface-container-high h-1.5 rounded-lg appearance-none cursor-pointer"
                  max="95"
                  min="65"
                  type="range"
                  value={criticalVal}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10);
                    setCriticalVal(v);
                    setChallengeVal(v - 1);
                  }}
                />
              </div>
              <div className="mt-4 pt-3 flex items-center justify-between font-label-badge text-label-badge text-outline border-t border-transparent">
                <span>Ação: DROP &amp; LOG SOC</span>
                <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
              </div>
            </div>
          </div>
        </section>

        {/* Modal: Adicionar IP */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center p-space-md" id="add-ip-modal">
            <div className="bg-surface-container-low rounded-xl p-space-lg w-full max-w-lg shadow-2xl relative flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary-container">
                  <span className="material-symbols-outlined text-[20px]">add_moderator</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Adicionar Entrada na Blacklist</h3>
                </div>
                <button className="text-outline hover:text-on-surface transition-colors cursor-pointer" onClick={() => setModalOpen(false)} type="button">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
              <form className="flex flex-col gap-space-md" onSubmit={handleAddSubmit}>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-ui text-label-ui text-on-surface-variant uppercase">Endereço IP ou Sub-rede CIDR</label>
                  <input
                    className="bg-surface-container-lowest text-on-surface font-label-code text-body-sm px-space-md py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-container placeholder:text-outline/50"
                    placeholder="ex: 198.51.100.0/24 ou 203.0.113.19"
                    required
                    type="text"
                    value={newIp}
                    onChange={(e) => setNewIp(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-ui text-label-ui text-on-surface-variant uppercase">Motivo / Categoria de Risco</label>
                  <select
                    className="bg-surface-container-lowest text-on-surface font-body-sm text-body-sm px-space-md py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-container"
                    value={newReason}
                    onChange={(e) => setNewReason(e.target.value)}
                  >
                    <option value="Brute-force detectado">Brute-force detectado</option>
                    <option value="Tor Exit Node">Tor Exit Node</option>
                    <option value="Credential Stuffing">Credential Stuffing</option>
                    <option value="Malware C2">Malware C2</option>
                    <option value="Scanner de Vulnerabilidade">Scanner de Vulnerabilidade</option>
                    <option value="Intervenção Manual SecOps">Intervenção Manual SecOps</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-space-sm">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-ui text-label-ui text-on-surface-variant uppercase">Expiração</label>
                    <select
                      className="bg-surface-container-lowest text-on-surface font-body-sm text-body-sm px-space-md py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-container"
                      value={newExp}
                      onChange={(e) => setNewExp(e.target.value)}
                    >
                      <option value="12h">12 Horas</option>
                      <option value="24h">24 Horas</option>
                      <option value="7d">7 Dias</option>
                      <option value="perm">Permanente</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-ui text-label-ui text-on-surface-variant uppercase">Nível de Rigor</label>
                    <select className="bg-surface-container-lowest text-on-surface font-body-sm text-body-sm px-space-md py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-container">
                      <option value="drop">Drop Imediato (eBPF)</option>
                      <option value="tarpit">Tarpit / Delay TCP</option>
                      <option value="challenge">Desafio JS Contínuo</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-space-sm mt-space-sm pt-space-sm">
                  <button className="px-space-md py-2 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface font-label-ui text-label-ui transition-colors cursor-pointer" onClick={() => setModalOpen(false)} type="button">
                    Cancelar
                  </button>
                  <button className="px-space-md py-2 rounded-lg bg-primary-container text-on-primary-fixed hover:bg-primary-fixed-dim font-headline-sm text-label-ui font-bold shadow-md shadow-primary-container/20 transition-all cursor-pointer" type="submit">
                    Confirmar Bloqueio
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
