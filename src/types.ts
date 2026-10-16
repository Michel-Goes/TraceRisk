export type ViewMode = 'dashboard' | 'simulador' | 'logs' | 'politicas' | 'configuracoes';

export interface UserSession {
  username: string;
  identity: string;
  role: string;
  company: string;
  token?: string;
  authenticatedAt: string;
}

export interface RiskAnalysisFactors {
  falhas: number;
  ip_nao_confiavel: number;
  dispositivo_desconhecido: number;
  horario_incomum: number;
  ip_bloqueado: number;
}

export interface RiskAnalysisPropositions {
  p: boolean;
  q: boolean;
  r: boolean;
  s: boolean;
  expressao: boolean;
  formula: string;
  detalhes?: string;
}

export interface RiskAnalysisResponse {
  usuario: string;
  ip: string;
  dispositivo: string;
  decisao: string;
  status: 'Liberado' | '2FA Requerido' | 'Bloqueado';
  badge: string;
  score: number;
  fatores: RiskAnalysisFactors;
  proposicoes: RiskAnalysisPropositions;
  logs: string[];
  engine?: string;
  timestamp?: string;
}

export interface BlacklistEntry {
  ip: string;
  geo: string;
  motivo: string;
  origem: string;
  data: string;
  expiracao: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  department: string;
  ip: string;
  location: string;
  device: string;
  factors: string[];
  score: number;
  decision: 'Liberado' | '2FA Requerido' | 'Bloqueado';
  rawPayload: {
    auth_method: string;
    geo_distance_km: number;
    tls_ciphers: string;
    ja3_fingerprint: string;
    enforced_policy: string;
    quarantine_ttl: string;
  };
}

export interface ThresholdConfig {
  safeMax: number;
  challengeMax: number;
  criticalMin: number;
}
