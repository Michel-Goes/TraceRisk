/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserSession, ViewMode } from './types';
import { LoginView } from './components/LoginView';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { SimulatorView } from './components/SimulatorView';
import { LogsView } from './components/LogsView';
import { PoliciesView } from './components/PoliciesView';
import { SettingsView } from './components/SettingsView';

export default function App() {
  // A primeira tela é a de Login, (para logar)
  const [session, setSession] = useState<UserSession | null>(null);

  // A segunda tela é a Dashboard
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    setSession(null);
    setCurrentView('dashboard');
  };

  // Se não estiver logado, exibe a primeira tela (Login)
  if (!session) {
    return (
      <LoginView
        onLoginSuccess={(newSession) => {
          setSession(newSession);
          setCurrentView('dashboard');
        }}
      />
    );
  }

  // Uma vez logado, exibe a estrutura idêntica aos mockups com a Sidebar, Header e a View ativa
  return (
    <div className="bg-surface-container-lowest text-on-surface antialiased selection:bg-primary-container/20 selection:text-primary-container min-h-screen">
      {/* Sidebar idêntica às imagens */}
      <Sidebar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onLogout={handleLogout}
      />

      <div className="pl-64 flex flex-col min-h-screen">
        {/* Header fixo idêntico às imagens */}
        <Header
          user={session}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onLogout={handleLogout}
        />

        {/* Área Principal de Conteúdo idêntica às imagens */}
        <main className="pt-16 flex-1 p-space-lg max-w-7xl w-full mx-auto flex flex-col gap-space-lg">
          {currentView === 'dashboard' && <DashboardView onNavigate={(view) => setCurrentView(view)} />}
          {currentView === 'simulador' && <SimulatorView />}
          {currentView === 'logs' && <LogsView />}
          {currentView === 'politicas' && <PoliciesView />}
          {currentView === 'configuracoes' && <SettingsView />}
        </main>
      </div>
    </div>
  );
}
