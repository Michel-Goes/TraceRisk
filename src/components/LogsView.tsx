import React, { useState } from 'react';

interface AuditRow {
  id: string;
  time: string;
  user: string;
  dept: string;
  initials: string;
  ip: string;
  loc: string;
  dev: string;
  tag: string;
  score: string;
  scoreNum: number;
  decision: 'Liberado' | '2FA Requerido' | 'Bloqueado';
  tags: string[];
}

export const LogsView: React.FC = () => {
  const [selectedId, setSelectedId] = useState('LOG-948074');
  const [selectedUser, setSelectedUser] = useState('admin@external-gateway');
  const [selectedIp, setSelectedIp] = useState('194.26.29.112');
  const [selectedGeo, setSelectedGeo] = useState('Moscou, RU');
  const [selectedUa, setSelectedUa] = useState('Debian 11 / Python-requests');
  const [selectedScore, setSelectedScore] = useState('0.96');
  const [selectedDecision, setSelectedDecision] = useState<'Liberado' | '2FA Requerido' | 'Bloqueado'>('Bloqueado');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Blacklist Tor', 'Falhas (5x)', 'Brute-force Tentativa']);

  const [activeFilter, setActiveFilter] = useState<'Todos' | 'Liberados' | '2FA' | 'Bloqueados'>('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const rows: AuditRow[] = [
    {
      id: 'LOG-948102',
      time: '14:38:22.094',
      user: 'carlos.mendes@cybercorp.io',
      dept: 'Engenharia Sec',
      initials: 'CM',
      ip: '189.28.14.99',
      loc: 'São Paulo, BR',
      dev: 'MacOS Sonoma • Chrome',
      tag: 'TLS Válido',
      score: '0.12',
      scoreNum: 0.12,
      decision: 'Liberado',
      tags: ['Fingerprint Consistente', 'Certificado TLS Válido'],
    },
    {
      id: 'LOG-948099',
      time: '14:37:51.411',
      user: 'mariana.silva@cybercorp.io',
      dept: 'Finanças',
      initials: 'MS',
      ip: '201.86.110.15',
      loc: 'Curitiba, BR',
      dev: 'Win 11 • Edge',
      tag: 'Novo IP',
      score: '0.58',
      scoreNum: 0.58,
      decision: '2FA Requerido',
      tags: ['Novo IP', 'Desvio Geográfico'],
    },
    {
      id: 'LOG-948088',
      time: '14:36:18.902',
      user: 'svc_deployer_k8s',
      dept: 'M2M Service',
      initials: 'SK',
      ip: '10.244.18.2',
      loc: 'AWS us-east-1',
      dev: 'Linux • Go HttpClient',
      tag: 'mTLS',
      score: '0.04',
      scoreNum: 0.04,
      decision: 'Liberado',
      tags: ['Mtls Validated', 'Service Account'],
    },
    {
      id: 'LOG-948074',
      time: '14:35:01.817',
      user: 'admin@external-gateway',
      dept: 'Não Autorizado',
      initials: '!',
      ip: '194.26.29.112',
      loc: 'Moscou, RU',
      dev: 'Debian • Requests',
      tag: 'Blacklist',
      score: '0.96',
      scoreNum: 0.96,
      decision: 'Bloqueado',
      tags: ['Blacklist Tor', 'Falhas (5x)', 'Brute-force Tentativa'],
    },
    {
      id: 'LOG-948065',
      time: '14:33:45.109',
      user: 'lucas.ferreira@cybercorp.io',
      dept: 'DevOps Lead',
      initials: 'LF',
      ip: '177.136.240.8',
      loc: 'Belo Horizonte, BR',
      dev: 'Ubuntu • Firefox',
      tag: 'MDM Ativo',
      score: '0.22',
      scoreNum: 0.22,
      decision: 'Liberado',
      tags: ['Dispositivo Gerenciado', 'Certificado MDM'],
    },
    {
      id: 'LOG-948052',
      time: '14:31:12.784',
      user: 'beatriz.lima@cybercorp.io',
      dept: 'Jurídico',
      initials: 'BL',
      ip: '186.211.55.74',
      loc: 'Rio de Janeiro, BR',
      dev: 'iOS • Safari',
      tag: 'Horário Incomum',
      score: '0.64',
      scoreNum: 0.64,
      decision: '2FA Requerido',
      tags: ['Horário Incomum', 'Rede Desconhecida'],
    },
    {
      id: 'LOG-948041',
      time: '14:29:05.118',
      user: 'root@bastion-01',
      dept: 'Privileged Target',
      initials: '!',
      ip: '45.154.255.89',
      loc: 'Amsterdã, NL',
      dev: 'SSHv2 Daemon',
      tag: 'Escalação',
      score: '0.99',
      scoreNum: 0.99,
      decision: 'Bloqueado',
      tags: ['IP Reputação Baixa', 'Tentativa de Escalação Privilégio', 'Falhas (12x)'],
    },
    {
      id: 'LOG-948030',
      time: '14:26:44.620',
      user: 'rodrigo.santos@cybercorp.io',
      dept: 'Operações',
      initials: 'RS',
      ip: '187.19.12.101',
      loc: 'Campinas, BR',
      dev: 'MacOS • Safari',
      tag: 'Conforme',
      score: '0.08',
      scoreNum: 0.08,
      decision: 'Liberado',
      tags: ['Postura Conforme', 'Token Válido'],
    },
  ];

  const selectRow = (r: AuditRow) => {
    setSelectedId(r.id);
    setSelectedUser(r.user);
    setSelectedIp(r.ip);
    setSelectedGeo(r.loc);
    setSelectedUa(r.dev);
    setSelectedScore(r.score);
    setSelectedDecision(r.decision);
    setSelectedTags(r.tags);
  };

  const filtered = rows.filter((r) => {
    if (activeFilter === 'Liberados' && r.decision !== 'Liberado') return false;
    if (activeFilter === '2FA' && r.decision !== '2FA Requerido') return false;
    if (activeFilter === 'Bloqueados' && r.decision !== 'Bloqueado') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return r.user.toLowerCase().includes(q) || r.ip.toLowerCase().includes(q) || r.dev.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full flex flex-col gap-space-lg">
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-primary-container/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Section Header */}
        <section className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-1">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Logs de Acessos &amp; Auditoria
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Histórico detalhado de requisições e avaliação de postura de segurança em tempo real.
            </p>
          </div>
          <div className="flex items-center gap-space-sm self-start md:self-auto">
            <div className="flex items-center gap-2 px-space-sm py-1.5 rounded-full bg-surface-container-high text-secondary font-label-badge text-label-badge shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              <span className="font-semibold uppercase tracking-wider">Stream ao Vivo: Ativo</span>
            </div>
            <button
              className="flex items-center gap-1.5 px-space-sm py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-ui text-label-ui transition-all shadow-sm cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px] text-primary-container">file_download</span>
              <span>Exportar CSV</span>
            </button>
          </div>
        </section>

        {/* Section Micro-Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-md flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-ui text-label-ui text-outline uppercase tracking-wider">Ingestão Atual</span>
              <div className="p-1 rounded-md bg-primary-container/10 text-primary-container">
                <span className="material-symbols-outlined text-[18px]">speed</span>
              </div>
            </div>
            <div className="mt-space-md flex items-baseline justify-between">
              <span className="font-headline-md text-headline-md text-on-surface font-bold">
                1.240 <span className="font-label-code text-label-code font-normal text-on-surface-variant">req/min</span>
              </span>
              <div className="flex items-center text-secondary font-label-code text-label-badge gap-0.5">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                <span>+4.2%</span>
              </div>
            </div>
            <div className="mt-2 w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-primary-container rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-md flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-ui text-label-ui text-outline uppercase tracking-wider">Latência Média</span>
              <div className="p-1 rounded-md bg-secondary/10 text-secondary">
                <span className="material-symbols-outlined text-[18px]">timer</span>
              </div>
            </div>
            <div className="mt-space-md flex items-baseline justify-between">
              <span className="font-headline-md text-headline-md text-on-surface font-bold">
                1.2 <span className="font-label-code text-label-code font-normal text-on-surface-variant">ms</span>
              </span>
              <div className="flex items-center text-secondary font-label-code text-label-badge gap-0.5">
                <span className="material-symbols-outlined text-[14px]">bolt</span>
                <span>Estável</span>
              </div>
            </div>
            <div className="mt-2 w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-secondary rounded-full" style={{ width: '24%' }}></div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-md flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-ui text-label-ui text-outline uppercase tracking-wider">Taxa 2FA Sucesso</span>
              <div className="p-1 rounded-md bg-primary-container/10 text-primary-container">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
              </div>
            </div>
            <div className="mt-space-md flex items-baseline justify-between">
              <span className="font-headline-md text-headline-md text-on-surface font-bold">94.2%</span>
              <div className="flex items-center text-outline font-label-code text-label-badge gap-0.5">
                <span>512/543</span>
              </div>
            </div>
            <div className="mt-2 w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-secondary-container to-secondary rounded-full" style={{ width: '94.2%' }}></div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-md flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-ui text-label-ui text-outline uppercase tracking-wider">Violações Críticas</span>
              <div className="p-1 rounded-md bg-error/10 text-error">
                <span className="material-symbols-outlined text-[18px]">gpp_bad</span>
              </div>
            </div>
            <div className="mt-space-md flex items-baseline justify-between">
              <span className="font-headline-md text-headline-md text-error font-bold">
                19 <span className="font-label-code text-label-code font-normal text-on-surface-variant">hoje</span>
              </span>
              <div className="flex items-center text-error font-label-code text-label-badge gap-0.5">
                <span className="material-symbols-outlined text-[14px]">crisis_alert</span>
                <span>Bloqueadas</span>
              </div>
            </div>
            <div className="mt-2 w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-error rounded-full" style={{ width: '42%' }}></div>
            </div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="rounded-xl bg-surface-container-low p-space-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md shadow-sm">
          <div className="relative flex-1 max-w-lg flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-outline text-[18px]">search</span>
            <input
              className="w-full bg-surface-container-lowest text-on-surface font-label-code text-body-sm pl-10 pr-space-sm py-2 rounded-lg focus:outline-none placeholder:text-outline/70 transition-all"
              id="log-search-input"
              placeholder="Filtrar por usuário, IP ou dispositivo..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-3 hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface-container text-outline font-label-code text-label-badge">
              <span>⌘K</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="flex items-center gap-1.5 bg-surface-container-lowest px-2 py-1 rounded-lg">
              <span className="font-label-ui text-label-ui text-outline px-1.5">Status:</span>
              <div className="flex items-center gap-1" id="filter-status-group">
                {(['Todos', 'Liberados', '2FA', 'Bloqueados'] as const).map((filter) => (
                  <button
                    key={filter}
                    className={`px-2.5 py-1 rounded font-label-ui text-label-ui transition-all cursor-pointer ${
                      activeFilter === filter
                        ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                    }`}
                    onClick={() => setActiveFilter(filter)}
                    type="button"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1 bg-surface-container-lowest px-2 py-1 rounded-lg">
              <span className="material-symbols-outlined text-[16px] text-outline ml-1">date_range</span>
              <select className="bg-transparent text-on-surface font-label-ui text-label-ui py-1 pl-1 pr-6 focus:outline-none cursor-pointer">
                <option className="bg-surface-container-lowest" value="1h">Última hora</option>
                <option className="bg-surface-container-lowest" value="today">Hoje</option>
                <option className="bg-surface-container-lowest" value="7d">7 dias</option>
                <option className="bg-surface-container-lowest" value="30d">30 dias</option>
              </select>
            </div>
            <button
              className="p-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-outline hover:text-primary-container transition-colors shadow-sm cursor-pointer"
              title="Recarregar"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
            </button>
          </div>
        </section>

        {/* 12-Column Table & Inspector */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-md items-start">
          {/* Table */}
          <div className="xl:col-span-8 2xl:col-span-9 flex flex-col gap-space-sm">
            <div className="overflow-x-auto rounded-xl bg-surface-container-low shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-lowest/70 text-outline font-label-ui text-label-ui uppercase tracking-wider">
                    <th className="py-3 px-4">Data / Horário</th>
                    <th className="py-3 px-4">Identidade / Usuário</th>
                    <th className="py-3 px-4">Origem</th>
                    <th className="py-3 px-4">Dispositivo</th>
                    <th className="py-3 px-4">Fatores Detectados</th>
                    <th className="py-3 px-4">Score R(x)</th>
                    <th className="py-3 px-4">Decisão</th>
                    <th className="py-3 px-4 text-right">Inspecionar</th>
                  </tr>
                </thead>
                <tbody className="divide-y-0 text-body-sm font-label-code" id="audit-table-body">
                  {filtered.map((r) => {
                    const isSel = selectedId === r.id;
                    return (
                      <tr
                        key={r.id}
                        className={`group hover:bg-surface-container/60 transition-colors cursor-pointer ${
                          isSel ? 'bg-surface-container ring-1 ring-primary-container/50' : r.decision === 'Bloqueado' ? 'bg-error/5' : ''
                        }`}
                        onClick={() => selectRow(r)}
                      >
                        <td className={`py-3.5 px-4 whitespace-nowrap font-label-code text-label-code ${r.decision === 'Bloqueado' ? 'text-error' : 'text-on-surface-variant'}`}>
                          {r.time}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center font-label-badge font-bold ${
                              r.decision === 'Bloqueado'
                                ? 'bg-error-container text-error'
                                : r.decision === '2FA Requerido'
                                ? 'bg-surface-container-high text-secondary'
                                : 'bg-surface-container-high text-primary-container'
                            }`}>
                              {r.initials}
                            </div>
                            <div className="flex flex-col">
                              <span className={`font-body-sm text-body-sm font-medium leading-none ${r.decision === 'Bloqueado' ? 'text-error' : 'text-on-surface'}`}>
                                {r.user}
                              </span>
                              <span className={`font-label-badge text-label-badge ${r.decision === 'Bloqueado' ? 'text-error' : 'text-outline'}`}>
                                {r.dept}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className={`font-label-code text-label-code ${r.decision === 'Bloqueado' ? 'text-error' : 'text-on-surface'}`}>
                              {r.ip}
                            </span>
                            <span className={`font-body-sm text-body-sm flex items-center gap-1 ${r.decision === 'Bloqueado' ? 'text-error/80' : 'text-outline'}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${r.decision === 'Bloqueado' ? 'bg-error' : r.decision === '2FA Requerido' ? 'bg-primary-container' : 'bg-secondary'}`}></span>
                              {r.loc}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap text-on-surface-variant font-body-sm text-body-sm">
                          {r.dev}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1">
                            <span className={`px-2 py-0.5 rounded font-label-badge text-label-badge ${
                              r.decision === 'Bloqueado' ? 'bg-error/20 text-error' : 'bg-surface-container-high text-on-surface-variant'
                            }`}>
                              {r.tag}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${r.decision === 'Bloqueado' ? 'bg-error' : r.decision === '2FA Requerido' ? 'bg-primary-container' : 'bg-secondary'}`}
                                style={{ width: `${r.scoreNum * 100}%` }}
                              ></div>
                            </div>
                            <span className={`font-bold font-label-code text-label-code ${r.decision === 'Bloqueado' ? 'text-error' : r.decision === '2FA Requerido' ? 'text-primary-container' : 'text-secondary'}`}>
                              {r.score}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-badge text-label-badge font-semibold ${
                            r.decision === 'Bloqueado'
                              ? 'bg-error/10 text-error'
                              : r.decision === '2FA Requerido'
                              ? 'bg-primary-container/10 text-primary-container'
                              : 'bg-secondary/10 text-secondary'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${r.decision === 'Bloqueado' ? 'bg-error' : r.decision === '2FA Requerido' ? 'bg-primary-container animate-pulse' : 'bg-secondary'}`}></span>
                            {r.decision}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button className="p-1 rounded hover:bg-surface-container-highest text-outline group-hover:text-primary-container transition-colors" type="button">
                            <span className="material-symbols-outlined text-[18px]">terminal</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm px-2 py-2 text-on-surface-variant font-body-sm">
              <div className="flex items-center gap-2">
                <span className="font-label-code text-label-code text-outline">Exibindo</span>
                <span className="font-label-code text-label-code text-on-surface font-semibold">1-8</span>
                <span className="font-label-code text-label-code text-outline">de</span>
                <span className="font-label-code text-label-code text-on-surface font-semibold">14.892</span>
                <span className="font-label-code text-label-code text-outline">eventos avaliados</span>
              </div>
              <div className="flex items-center gap-1 font-label-ui text-label-ui">
                <button className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-outline hover:text-on-surface transition-colors shadow-sm disabled:opacity-40" disabled type="button">
                  Anterior
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-bold shadow-sm" type="button">1</button>
                <button className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors" type="button">2</button>
                <button className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors" type="button">3</button>
                <span className="px-1 text-outline">...</span>
                <button className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors" type="button">186</button>
                <button className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors shadow-sm" type="button">
                  Próximo
                </button>
              </div>
            </div>
          </div>

          {/* Right Inspection Drawer */}
          <div className="xl:col-span-4 2xl:col-span-3 rounded-xl bg-surface-container-low p-space-md flex flex-col gap-space-md shadow-sm sticky top-20">
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container text-[20px]">troubleshoot</span>
                <span className="font-label-ui text-label-ui text-on-surface uppercase tracking-wider font-bold">Inspeção Detalhada</span>
              </div>
              <span className="font-label-code text-label-badge px-2 py-0.5 rounded bg-surface-container-high text-primary-container" id="detail-log-id">
                {selectedId}
              </span>
            </div>

            <div className="flex flex-col gap-space-sm">
              <div className="rounded-lg bg-surface-container-lowest p-3 flex flex-col gap-1.5">
                <span className="font-label-ui text-label-badge text-outline uppercase tracking-wider">Assinatura de Risco &amp; Postura</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-label-code text-label-code text-on-surface truncate max-w-[170px]" id="detail-user">
                    {selectedUser}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded font-label-badge text-label-badge font-bold ${
                      selectedDecision === 'Bloqueado'
                        ? 'text-error bg-error/15'
                        : selectedDecision === '2FA Requerido'
                        ? 'text-primary-container bg-primary-container/15'
                        : 'text-secondary bg-secondary/15'
                    }`}
                    id="detail-decision"
                  >
                    {selectedDecision}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-label-code text-label-badge text-outline">Score R(x):</span>
                  <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        selectedDecision === 'Bloqueado' ? 'bg-error' : selectedDecision === '2FA Requerido' ? 'bg-primary-container' : 'bg-secondary'
                      }`}
                      id="detail-score-bar"
                      style={{ width: `${parseFloat(selectedScore) * 100}%` }}
                    ></div>
                  </div>
                  <span className={`font-label-code text-label-code font-bold ${selectedDecision === 'Bloqueado' ? 'text-error' : selectedDecision === '2FA Requerido' ? 'text-primary-container' : 'text-secondary'}`} id="detail-score-val">
                    {selectedScore}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-label-code font-label-code">
                <div className="p-2.5 rounded-lg bg-surface-container-lowest flex flex-col gap-0.5">
                  <span className="text-outline text-label-badge uppercase font-label-ui">IP Remoto</span>
                  <span className="text-on-surface" id="detail-ip">{selectedIp}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-lowest flex flex-col gap-0.5">
                  <span className="text-outline text-label-badge uppercase font-label-ui">Localização</span>
                  <span className="text-on-surface truncate" id="detail-geo">{selectedGeo}</span>
                </div>
                <div className="col-span-2 p-2.5 rounded-lg bg-surface-container-lowest flex flex-col gap-0.5">
                  <span className="text-outline text-label-badge uppercase font-label-ui">Agente / Fingerprint</span>
                  <span className="text-on-surface-variant truncate" id="detail-ua">{selectedUa}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-label-ui text-label-badge text-outline uppercase tracking-wider">Fatores Acionados</span>
                <div className="flex flex-wrap gap-1.5" id="detail-tags">
                  {selectedTags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded bg-surface-container-highest text-on-surface-variant font-label-badge text-label-badge"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-label-ui text-label-badge text-outline uppercase tracking-wider">Raw Payload Telemetry</span>
                  <span className="font-label-code text-label-badge text-outline">JSON (200B)</span>
                </div>
                <pre className="w-full p-3 rounded-lg bg-surface-container-lowest font-label-code text-label-badge text-primary-container/80 overflow-x-auto leading-relaxed shadow-inner">
<code>{`{
  "auth_method": "password",
  "geo_distance_km": 11400,
  "tls_ciphers": "TLS_AES_256",
  "ja3_fingerprint": "771,4865-4866",
  "enforced_policy": "POL-ZERO-STRICT",
  "quarantine_ttl": "3600s"
}`}</code>
                </pre>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  className="flex-1 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-ui text-label-ui transition-all text-center cursor-pointer"
                  onClick={() => alert(`IP ${selectedIp} adicionado à allowlist.`)}
                  type="button"
                >
                  Adicionar IP à Allowlist
                </button>
                <button
                  className="py-2 px-3 rounded-lg bg-error-container text-on-error font-label-ui text-label-ui transition-all cursor-pointer"
                  onClick={() => alert(`Origem ${selectedIp} isolada.`)}
                  title="Isolar Origem Definitiva"
                  type="button"
                >
                  Isolar IP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
