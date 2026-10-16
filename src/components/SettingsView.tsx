import React, { useState } from 'react';

export const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'geral' | 'integracoes' | 'seguranca'>('geral');
  const [selectedMode, setSelectedMode] = useState<'hibrido' | 'estrito' | 'monitoramento'>('hibrido');

  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(true);
  const [toggle3, setToggle3] = useState(true);

  const [copiedKey, setCopiedKey] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('tr_live_••••••••9482');
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleSave = () => {
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  return (
    <div className="flex flex-col w-full gap-space-lg max-w-5xl mx-auto">
      {/* Header Simplificado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pb-2 border-b border-outline-variant/30">
        <div className="flex flex-col gap-1">
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
            Configurações
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Gerencie preferências do sistema, integrações essenciais e credenciais de acesso.
          </p>
        </div>
        <div className="flex items-center gap-space-sm">
          <button
            className="flex items-center gap-2 px-space-md py-2.5 rounded-lg bg-gradient-to-r from-primary-container to-primary-fixed-dim text-on-primary-container font-headline-sm text-label-ui uppercase font-bold tracking-wider hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-200 cursor-pointer"
            onClick={handleSave}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>{savedFeedback ? 'Salvo!' : 'Salvar Alterações'}</span>
          </button>
        </div>
      </div>

      {/* Navegação de 3 Abas Diretas */}
      <div className="flex items-center gap-2 border-b border-outline-variant/30 pb-3">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-label-ui text-label-ui transition-all cursor-pointer ${
            activeTab === 'geral'
              ? 'bg-surface-container-high text-primary-container shadow-[0_0_12px_rgba(0,240,255,0.15)] font-semibold'
              : 'bg-transparent hover:bg-surface-container hover:text-on-surface text-outline font-medium'
          }`}
          onClick={() => setActiveTab('geral')}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
          <span>Geral</span>
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-label-ui text-label-ui transition-all cursor-pointer ${
            activeTab === 'integracoes'
              ? 'bg-surface-container-high text-primary-container shadow-[0_0_12px_rgba(0,240,255,0.15)] font-semibold'
              : 'bg-transparent hover:bg-surface-container hover:text-on-surface text-outline font-medium'
          }`}
          onClick={() => setActiveTab('integracoes')}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">hub</span>
          <span>Integrações</span>
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-label-ui text-label-ui transition-all cursor-pointer ${
            activeTab === 'seguranca'
              ? 'bg-surface-container-high text-primary-container shadow-[0_0_12px_rgba(0,240,255,0.15)] font-semibold'
              : 'bg-transparent hover:bg-surface-container hover:text-on-surface text-outline font-medium'
          }`}
          onClick={() => setActiveTab('seguranca')}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">key</span>
          <span>Segurança &amp; Chaves</span>
        </button>
      </div>

      {/* Layout de Cards Limpos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
        {/* Card 1: Modo de Proteção Zero Trust */}
        <section className="md:col-span-2 flex flex-col gap-space-md p-space-lg rounded-xl bg-surface-container-low border border-outline-variant/30 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary-container shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                <span className="material-symbols-outlined text-[20px]">shield</span>
              </div>
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">
                  Modo de Proteção Zero Trust
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Defina como as requisições de risco são avaliadas pelo motor em tempo real.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            {/* Card Selecionado: Híbrido */}
            <div
              className={`flex flex-col gap-2 p-4 rounded-xl cursor-pointer transition-all ${
                selectedMode === 'hibrido'
                  ? 'bg-surface-container-high border-2 border-primary-container/40 shadow-[0_0_15px_rgba(0,240,255,0.1)]'
                  : 'bg-surface-container hover:bg-surface-container-high border border-outline-variant/30'
              }`}
              onClick={() => setSelectedMode('hibrido')}
            >
              <div className="flex items-center justify-between">
                <span className={`font-label-ui text-body-md font-semibold ${selectedMode === 'hibrido' ? 'text-primary-container' : 'text-on-surface'}`}>
                  Modo Híbrido
                </span>
                <span className={`material-symbols-outlined text-[20px] ${selectedMode === 'hibrido' ? 'text-primary-container' : 'text-outline'}`}>
                  {selectedMode === 'hibrido' ? 'radio_button_checked' : 'radio_button_unchecked'}
                </span>
              </div>
              <span className="font-label-badge text-label-badge px-2 py-0.5 rounded bg-primary-container/15 text-primary-container self-start font-semibold uppercase">
                Recomendado
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Intercepta riscos automaticamente e solicita autenticação step-up inteligente.
              </p>
            </div>

            {/* Card: Estrito */}
            <div
              className={`flex flex-col gap-2 p-4 rounded-xl cursor-pointer transition-all ${
                selectedMode === 'estrito'
                  ? 'bg-surface-container-high border-2 border-primary-container/40 shadow-[0_0_15px_rgba(0,240,255,0.1)]'
                  : 'bg-surface-container hover:bg-surface-container-high border border-outline-variant/30'
              }`}
              onClick={() => setSelectedMode('estrito')}
            >
              <div className="flex items-center justify-between">
                <span className={`font-label-ui text-body-md font-semibold ${selectedMode === 'estrito' ? 'text-primary-container' : 'text-on-surface'}`}>
                  Modo Estrito
                </span>
                <span className={`material-symbols-outlined text-[20px] ${selectedMode === 'estrito' ? 'text-primary-container' : 'text-outline'}`}>
                  {selectedMode === 'estrito' ? 'radio_button_checked' : 'radio_button_unchecked'}
                </span>
              </div>
              <span className="font-label-badge text-label-badge px-2 py-0.5 rounded bg-surface-container-highest text-outline self-start font-semibold uppercase">
                Alta Segurança
              </span>
              <p className="font-body-sm text-body-sm text-outline mt-1">
                Bloqueio preventivo imediato sob qualquer anomalia ou falha de timeout.
              </p>
            </div>

            {/* Card: Monitoramento */}
            <div
              className={`flex flex-col gap-2 p-4 rounded-xl cursor-pointer transition-all ${
                selectedMode === 'monitoramento'
                  ? 'bg-surface-container-high border-2 border-primary-container/40 shadow-[0_0_15px_rgba(0,240,255,0.1)]'
                  : 'bg-surface-container hover:bg-surface-container-high border border-outline-variant/30'
              }`}
              onClick={() => setSelectedMode('monitoramento')}
            >
              <div className="flex items-center justify-between">
                <span className={`font-label-ui text-body-md font-semibold ${selectedMode === 'monitoramento' ? 'text-primary-container' : 'text-on-surface'}`}>
                  Modo Monitoramento
                </span>
                <span className={`material-symbols-outlined text-[20px] ${selectedMode === 'monitoramento' ? 'text-primary-container' : 'text-outline'}`}>
                  {selectedMode === 'monitoramento' ? 'radio_button_checked' : 'radio_button_unchecked'}
                </span>
              </div>
              <span className="font-label-badge text-label-badge px-2 py-0.5 rounded bg-surface-container-highest text-outline self-start font-semibold uppercase">
                Audit Only
              </span>
              <p className="font-body-sm text-body-sm text-outline mt-1">
                Apenas registro de auditoria e telemetria sem interrupção de fluxo.
              </p>
            </div>
          </div>
        </section>

        {/* Card 2: Políticas de Acesso Rápido */}
        <section className="flex flex-col gap-space-md p-space-lg rounded-xl bg-surface-container-low border border-outline-variant/30 shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">
                Políticas de Acesso Rápido
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Regras imediatas de proteção do tráfego.</p>
            </div>
          </div>
          <div className="flex flex-col gap-2.5 pt-1">
            {/* Toggle 1 */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container">
              <div className="flex flex-col pr-3">
                <span className="font-body-sm text-body-sm font-semibold text-on-surface">Velocidade de Deslocamento</span>
                <span className="font-body-sm text-[12px] text-on-surface-variant">Geo-velocity check para acessos impossíveis.</span>
              </div>
              <button
                aria-pressed={toggle1}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  toggle1 ? 'bg-primary-container' : 'bg-surface-container-highest'
                }`}
                onClick={() => setToggle1(!toggle1)}
                type="button"
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-surface-container-lowest shadow-md ring-0 transition duration-200 ease-in-out mt-0.5 ${
                    toggle1 ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                ></span>
              </button>
            </div>

            {/* Toggle 2 */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container">
              <div className="flex flex-col pr-3">
                <span className="font-body-sm text-body-sm font-semibold text-on-surface">Inspeção TLS &amp; Fingerprint</span>
                <span className="font-body-sm text-[12px] text-on-surface-variant">Identificação JA3/JA4 contra bots mascarados.</span>
              </div>
              <button
                aria-pressed={toggle2}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  toggle2 ? 'bg-primary-container' : 'bg-surface-container-highest'
                }`}
                onClick={() => setToggle2(!toggle2)}
                type="button"
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-surface-container-lowest shadow-md ring-0 transition duration-200 ease-in-out mt-0.5 ${
                    toggle2 ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                ></span>
              </button>
            </div>

            {/* Toggle 3 */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container">
              <div className="flex flex-col pr-3">
                <span className="font-body-sm text-body-sm font-semibold text-on-surface">Notificar SecOps via Slack</span>
                <span className="font-body-sm text-[12px] text-on-surface-variant">Envio imediato de alertas em bloqueios críticos.</span>
              </div>
              <button
                aria-pressed={toggle3}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  toggle3 ? 'bg-primary-container' : 'bg-surface-container-highest'
                }`}
                onClick={() => setToggle3(!toggle3)}
                type="button"
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-surface-container-lowest shadow-md ring-0 transition duration-200 ease-in-out mt-0.5 ${
                    toggle3 ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </section>

        {/* Card 3: Integrações Principais */}
        <section className="flex flex-col gap-space-md p-space-lg rounded-xl bg-surface-container-low border border-outline-variant/30 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[20px]">hub</span>
              </div>
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">
                  Integrações Principais
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Canais de ingestão e envio de telemetria.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2.5 pt-1">
            {/* Integracao 1 */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#4edea3]"></span>
                <div className="flex flex-col">
                  <span className="font-body-sm text-body-sm font-semibold text-on-surface">AlienVault Threat Feed</span>
                  <span className="font-body-sm text-[12px] text-outline">Sync há 10m</span>
                </div>
              </div>
              <span className="font-label-badge text-label-badge px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-medium">
                CONECTADO
              </span>
            </div>

            {/* Integracao 2 */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#4edea3]"></span>
                <div className="flex flex-col">
                  <span className="font-body-sm text-body-sm font-semibold text-on-surface">SIEM Webhook (Splunk / Elastic)</span>
                  <span className="font-body-sm text-[12px] text-secondary">HTTP 200 OK</span>
                </div>
              </div>
              <span className="font-label-badge text-label-badge px-2 py-0.5 rounded-full bg-primary-container/15 text-primary-container font-medium">
                ATIVO
              </span>
            </div>

            {/* Ação Adicionar */}
            <button
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg border border-outline-variant/30 hover:border-primary-container/30 hover:bg-surface-container text-primary-container font-label-ui text-label-ui font-semibold transition-all mt-1 cursor-pointer"
              onClick={() => alert('Adicionar integração SIEM / Webhook')}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>+ Adicionar Integração</span>
            </button>
          </div>
        </section>

        {/* Card 4: Chaves de API & Acesso M2M */}
        <section className="md:col-span-2 flex flex-col gap-space-md p-space-lg rounded-xl bg-surface-container-low border border-outline-variant/30 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[20px]">key</span>
              </div>
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">
                  Chaves de API &amp; Acesso M2M
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Credenciais para automações seguras e microsserviços.</p>
              </div>
            </div>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-container/15 hover:bg-primary-container/25 text-primary-container font-label-ui text-label-ui font-semibold uppercase tracking-wider self-start sm:self-auto transition-all cursor-pointer"
              onClick={() => alert('Nova chave gerada: tr_live_83910f29')}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Gerar Nova Chave</span>
            </button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg bg-surface-container">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-outline text-[20px]">token</span>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-body-sm font-semibold text-on-surface">Chave de Produção Primária</span>
                  <span className="inline-flex items-center gap-1 font-label-badge text-label-badge px-2 py-0.5 rounded-full bg-secondary/15 text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    Ativa
                  </span>
                </div>
                <span className="font-label-code text-label-code text-outline">tr_live_••••••••9482</span>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-ui text-label-ui transition-colors cursor-pointer"
                onClick={handleCopy}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">{copiedKey ? 'check' : 'content_copy'}</span>
                <span>{copiedKey ? 'Copiada' : 'Copiar'}</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
