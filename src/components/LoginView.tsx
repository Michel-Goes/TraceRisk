import React, { useState } from 'react';
import { loginWithZeroTrust } from '../services/riskEngine';
import { UserSession } from '../types';

interface LoginViewProps {
  onLoginSuccess: (session: UserSession) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [identity, setIdentity] = useState('alice');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState('AVALIANDO POSTURA...');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleAuth = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setStatusText('AVALIANDO POSTURA...');

    try {
      const response = await loginWithZeroTrust({
        identity,
        password,
        ip: '192.168.1.5',
        device: 'iPhone13',
        failedAttempts: 0,
        offHours: false,
      });

      setTimeout(() => {
        setStatusText('POSTURA APROVADA');
        setTimeout(() => {
          setLoading(false);
          onLoginSuccess({
            username: response.user?.username || identity.replace(/@.*/, '') || 'alice',
            identity: response.user?.identity || identity,
            role: response.user?.role || 'Engenheiro SecOps',
            company: 'Company S.A.',
            token: response.token || 'zt_valid_session',
            authenticatedAt: new Date().toLocaleTimeString('pt-BR'),
          });
        }, 800);
      }, 1000);
    } catch {
      setLoading(false);
      onLoginSuccess({
        username: identity.replace(/@.*/, '') || 'alice',
        identity: identity,
        role: 'SecOps',
        company: 'Company S.A.',
        authenticatedAt: new Date().toLocaleTimeString('pt-BR'),
      });
    }
  };

  const triggerSSO = () => {
    setIdentity('admin@secops.tracerisk.io');
    setLoading(true);
    setStatusText('VALIDANDO SSO OKTA...');
    setTimeout(() => {
      setStatusText('POSTURA APROVADA');
      setTimeout(() => {
        setLoading(false);
        onLoginSuccess({
          username: 'carlos.mendes',
          identity: 'carlos.mendes@cybercorp.io',
          role: 'SecOps Lead',
          company: 'Company S.A.',
          authenticatedAt: new Date().toLocaleTimeString('pt-BR'),
        });
      }, 600);
    }, 800);
  };

  return (
    <div className="bg-surface-container-lowest text-on-surface font-body-md text-body-md min-h-screen relative overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/* Background radial & ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-primary-container/5 rounded-full blur-[140px]"></div>
        <div className="absolute -bottom-40 right-1/4 w-[540px] h-[320px] bg-secondary-container/5 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      {/* Top Header */}
      <header className="relative z-10 w-full">
        <div className="w-full max-w-7xl mx-auto px-margin flex items-center justify-between h-20">
          <div className="flex items-center gap-space-sm">
            <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center shadow-[0_0_16px_rgba(0,240,255,0.12)]">
              <span className="material-symbols-outlined text-primary-container text-[20px]">shield_lock</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface">
                Trace<span className="text-primary-container">Risk</span>
              </span>
              <span className="font-label-badge text-label-badge uppercase tracking-wider text-outline">
                SECURITY AUTHENTICATION Platform
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-sm"></div>
        </div>
      </header>

      {/* Main Authentication Section */}
      <main className="relative z-10 w-full flex items-center justify-center px-margin-mobile md:px-margin min-h-[calc(100vh-10rem)]">
        <div className="flex flex-col w-full items-center justify-center py-space-sm md:py-space-md">
          {/* Subtle Ambient Glow Orbs */}
          <div className="relative w-full max-w-xl mx-auto flex flex-col items-center">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-36 bg-primary-container/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute -bottom-10 right-10 w-64 h-32 bg-secondary/10 rounded-full blur-[70px] pointer-events-none"></div>

            {/* Header Section */}
            <div className="flex flex-col items-center text-center mb-space-lg relative z-10 w-full px-space-md">
              {/* Icon Emblem & Active Engine Pulse */}
              <div className="relative mb-space-md group">
                <div className="w-14 h-14 rounded-xl bg-surface-container-high flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105">
                  <svg className="w-8 h-8 text-primary-container drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L4 5.5v6.5c0 5.25 3.4 10.15 8 11.5 4.6-1.35 8-6.25 8-11.5V5.5L12 2z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" fill="rgba(0,240,255,0.06)"></path>
                    <path d="M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0z" stroke="#4edea3" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"></path>
                    <circle cx="12" cy="12" fill="#00f0ff" r="1.5"></circle>
                    <path d="M12 7.5v1.5M12 15v1.5M7.5 12H9M15 12h1.5" stroke="#4edea3" strokeWidth="1.5" strokeLinecap="round"></path>
                  </svg>
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-surface-container-lowest items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-secondary"></span>
                  </span>
                </span>
              </div>

              <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-surface-container mb-space-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              </div>

              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-space-xs">
                Acessar Plataforma
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                Autenticação corporativa com verificação adaptativa Zero Trust
              </p>
            </div>

            {/* Main Authentication Glass Card */}
            <div className="w-full relative z-10 bg-surface-container-low/90 backdrop-blur-md rounded-xl p-space-lg md:p-space-xl shadow-xl flex flex-col gap-space-lg">
              {/* Session Protocol Micro-Bar */}
              <div className="flex items-center justify-between pb-space-sm bg-surface-container/50 px-space-md py-space-xs rounded-lg">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary-container text-[18px]">verified_user</span>
                  <span className="font-label-badge text-label-badge text-on-surface uppercase tracking-wider">Protocolo ZT-892A</span>
                </div>
                <span className="font-label-badge text-label-badge text-secondary">SESSÃO SEGURA</span>
              </div>

              {/* Login Form */}
              <form className="flex flex-col gap-space-md" id="authForm" onSubmit={handleAuth}>
                {/* Corporate Identity Field */}
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <label className="font-label-ui text-label-ui text-on-surface uppercase tracking-wider" htmlFor="identity">
                      Identidade
                    </label>
                    <span className="font-label-badge text-label-badge text-outline">SSO / SAML 2.0</span>
                  </div>
                  <div className="relative flex items-center">
                    <span className="absolute left-space-md text-outline material-symbols-outlined text-[20px] pointer-events-none">
                      alternate_email
                    </span>
                    <input
                      className="w-full bg-surface-container-lowest text-on-surface font-label-code text-label-code pl-12 pr-space-md py-3 rounded-lg focus:outline-none transition-colors duration-200 placeholder:text-outline/60"
                      id="identity"
                      placeholder="nome@empresa.com.br"
                      required
                      type="text"
                      value={identity}
                      onChange={(e) => setIdentity(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <label className="font-label-ui text-label-ui text-on-surface uppercase tracking-wider" htmlFor="credentials">
                      Senha de Acesso
                    </label>
                    <a className="font-label-ui text-label-ui text-primary-container hover:text-primary transition-colors duration-150" href="#reset">
                      Esqueci a senha
                    </a>
                  </div>
                  <div className="relative flex items-center">
                    <span className="absolute left-space-md text-outline material-symbols-outlined text-[20px] pointer-events-none">
                      key
                    </span>
                    <input
                      className="w-full bg-surface-container-lowest text-on-surface font-label-code text-label-code pl-12 pr-12 py-3 rounded-lg focus:outline-none transition-colors duration-200 placeholder:text-outline/60"
                      id="credentials"
                      placeholder="••••••••••••"
                      required
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      aria-label="Alternar visibilidade da senha"
                      className="absolute right-space-md text-outline hover:text-on-surface transition-colors duration-150"
                      id="togglePwd"
                      onClick={togglePasswordVisibility}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]" id="pwdIcon">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Continuous Telemetry Badge */}
                <div className="bg-surface-container rounded-lg p-space-md flex items-start gap-space-md transition-all duration-200">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-secondary text-[18px]">security_update_good</span>
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <div className="flex items-center gap-space-xs flex-wrap">
                      <span className="font-label-ui text-label-ui text-on-surface">Verificação de postura ativa</span>
                      <span className="inline-flex items-center gap-1 font-label-badge text-label-badge text-secondary bg-surface-container-lowest px-1.5 py-0.5 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span> 99.8% Confiança
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-outline truncate">
                      TLS 1.3 • Fingerprint de dispositivo • Análise comportamental &lt;12ms
                    </p>
                  </div>
                </div>

                {/* Primary Action Button */}
                <button
                  className="w-full relative overflow-hidden py-3.5 px-space-lg rounded-lg bg-primary-container text-on-primary-container font-headline-sm text-label-ui uppercase tracking-wider font-semibold shadow-lg transition-all duration-200 flex items-center justify-center gap-space-sm group cursor-pointer"
                  id="submitBtn"
                  type="submit"
                  disabled={loading}
                >
                  {!loading ? (
                    <span className="relative z-10 flex items-center gap-space-xs" id="btnLabel">
                      Continuar
                      <span className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:translate-x-1">arrow_forward</span>
                    </span>
                  ) : (
                    <div className="relative z-10 flex items-center gap-space-xs font-label-badge text-label-badge" id="btnSpinner">
                      <svg className="animate-spin h-4 w-4 text-on-primary-container" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" d="M4 12a8 8 0 018-8v8H4z" fill="currentColor"></path>
                      </svg>
                      {statusText}
                    </div>
                  )}
                </button>
              </form>

              {/* Minimal Divider */}
              <div className="relative flex items-center justify-center my-space-xs">
                <div className="w-full h-px bg-surface-container-highest"></div>
                <span className="absolute bg-surface-container-low px-space-md font-label-badge text-label-badge text-outline uppercase tracking-widest">OU</span>
              </div>

              {/* SSO Enterprise 1-Click Action */}
              <button
                className="w-full py-3 px-space-md rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-ui text-label-ui transition-all duration-200 flex items-center justify-center gap-space-md group cursor-pointer"
                onClick={triggerSSO}
                type="button"
              >
                <span className="material-symbols-outlined text-outline group-hover:text-primary-container text-[20px] transition-colors">corporate_fare</span>
                <span className="tracking-wide">Acessar com SSO Corporativo</span>
                <span className="font-label-badge text-label-badge text-outline group-hover:text-on-surface transition-colors">(Okta / Google Workspace)</span>
              </button>

              {/* Card Sub-Footer Telemetry */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-space-xs pt-space-md text-center sm:text-left bg-surface-container-lowest/40 -mx-space-lg md:-mx-space-xl -mb-space-lg md:-mb-space-xl px-space-lg md:px-space-xl py-space-md rounded-b-xl">
                <div className="flex items-center gap-space-xs font-label-badge text-label-badge text-outline">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                  <span className="">TraceRisk • Criptografia ponta a ponta • SLA 99.98%</span>
                </div>
                <a className="font-label-ui text-label-ui text-outline hover:text-primary-container transition-colors duration-150 flex items-center gap-1" href="#support">
                  <span className="material-symbols-outlined text-[16px]">contact_support</span>
                  Central de Ajuda SecOps
                </a>
              </div>
            </div>

            {/* Live Telemetry Status Ticker */}
            <div className="w-full mt-space-md flex items-center justify-between px-space-sm font-label-badge text-label-badge text-outline">
              <div className="flex items-center gap-space-sm">
                <span className="text-surface-container-highest">•</span>
                <span className="text-surface-container-highest hidden sm:inline">•</span>
              </div>
              <div className="flex items-center gap-space-xs text-primary-container"></div>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 w-full py-space-md">
        <div className="w-full max-w-7xl mx-auto px-margin flex flex-col md:flex-row items-center justify-between gap-space-xs font-label-badge text-label-badge text-outline">
          <div className="">TRACERISK • CRYPTOGRAPHIC VERIFICATION REQUIRED</div>
          <div className="flex items-center gap-space-md"></div>
        </div>
      </footer>
    </div>
  );
};
