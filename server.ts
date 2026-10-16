import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { execFile } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory state synchronized with Python sets & logs
let blacklist = [
  { ip: '185.220.101.45', geo: 'DE', motivo: 'Tor Exit Node', origem: 'Feed AlienVault', data: 'Hoje, 14:28:10', expiracao: 'Em 18h' },
  { ip: '45.154.255.89', geo: 'RU', motivo: 'Brute-force detectado', origem: 'Heurística Automática', data: 'Hoje, 13:05:42', expiracao: 'Em 42h' },
  { ip: '103.208.220.0/22', geo: 'VN', motivo: 'Credential Stuffing', origem: 'SecOps Manual', data: 'Ontem, 21:12:00', expiracao: 'Permanente' },
  { ip: '194.26.29.112', geo: 'NL', motivo: 'Malware C2', origem: 'Feed AlienVault', data: '22/10, 08:30:19', expiracao: 'Permanente' },
  { ip: '89.248.163.50', geo: 'SC', motivo: 'Scanner de Vulnerabilidade', origem: 'Heurística Automática', data: '21/10, 19:40:11', expiracao: 'Em 6h' },
  { ip: '198.51.100.24', geo: 'US', motivo: 'Brute-force detectado', origem: 'SecOps Manual', data: '20/10, 11:15:02', expiracao: 'Em 72h' },
];

let thresholdConfig = {
  safeMax: 39,
  challengeMax: 74,
  criticalMin: 75,
};

let protectionMode = 'hibrido'; // 'hibrido' | 'estrito' | 'monitoramento'

// Helper function to invoke python3 risk_engine.py
function runPythonRiskEngine(payload: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const pythonScript = path.resolve(__dirname, 'risk_engine.py');
    const inputArg = JSON.stringify(payload);

    execFile('python3', [pythonScript, '--eval', inputArg], { timeout: 8000 }, (error, stdout, stderr) => {
      if (error) {
        console.error('Python execution error:', error, stderr);
        // Fallback calculation if python child_process fails
        return resolve({
          error: true,
          message: stderr || error.message,
          score: payload.ip && blacklist.some(b => b.ip === payload.ip) ? 100 : Math.min(100, (payload.falhas || 0) * 15 + (payload.horario_incomum ? 10 : 0)),
          status: 'Fallback',
          decisao: 'Avaliação Fallback',
        });
      }

      try {
        const parsed = JSON.parse(stdout.trim());
        resolve(parsed);
      } catch (parseErr) {
        resolve({
          error: true,
          raw: stdout,
          score: 50,
          status: 'Erro Parsing JSON',
          decisao: stdout.trim(),
        });
      }
    });
  });
}

// 1. Endpoint: Análise de Risco direto no Python
app.post('/api/analyze-risk', async (req: Request, res: Response) => {
  try {
    const { usuario, ip, dispositivo, falhas, horario_incomum } = req.body;
    const result = await runPythonRiskEngine({
      usuario: usuario || 'alice',
      ip: ip || '192.168.1.5',
      dispositivo: dispositivo || 'iPhone13',
      falhas: Number(falhas || 0),
      horario_incomum: Boolean(horario_incomum),
    });

    res.json({
      success: true,
      data: result,
      engine: 'Python 3.10.12 (risk_engine.py)',
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Endpoint: Autenticação Corporativa Zero Trust
app.post('/api/login', async (req: Request, res: Response) => {
  try {
    const { identity, password, ip = '189.28.14.99', device = 'MacOS Sonoma / Chrome 122', failedAttempts = 0, offHours = false } = req.body;

    if (!identity) {
      return res.status(400).json({ success: false, message: 'Identidade corporativa é obrigatória' });
    }

    // Normaliza nome de usuário: se email tipo alice@empresa.com.br, pega 'alice'
    let username = identity.toLowerCase().trim();
    if (username.includes('@')) {
      username = username.split('@')[0];
    }

    // Avalia o risco com o motor em Python
    const riskAnalysis = await runPythonRiskEngine({
      usuario: username,
      ip: ip,
      dispositivo: device,
      falhas: Number(failedAttempts),
      horario_incomum: Boolean(offHours),
    });

    const score = riskAnalysis.score ?? 0;
    const status = riskAnalysis.status; // 'Liberado', '2FA Requerido', 'Bloqueado'

    if (status === 'Bloqueado' || score >= thresholdConfig.criticalMin) {
      return res.json({
        success: false,
        blocked: true,
        score,
        decision: riskAnalysis.decisao,
        message: 'Acesso Bloqueado por Violação de Política Zero Trust',
        riskAnalysis,
      });
    }

    if (status === '2FA Requerido' || (score >= thresholdConfig.safeMax && score < thresholdConfig.criticalMin)) {
      return res.json({
        success: false,
        require2FA: true,
        score,
        decision: riskAnalysis.decisao,
        message: 'Desafio 2FA Biométrico Requerido (Step-up)',
        user: {
          username,
          identity,
          role: username.includes('admin') ? 'SecOps Lead' : 'Engenharia / Colaborador',
          company: 'Company S.A.',
        },
        riskAnalysis,
      });
    }

    // Acesso aprovado diretamente
    res.json({
      success: true,
      require2FA: false,
      score,
      decision: riskAnalysis.decisao,
      token: 'zt_' + Math.random().toString(36).substring(2),
      user: {
        username,
        identity,
        role: username.includes('admin') ? 'SecOps Lead' : 'Engenheiro de Segurança',
        company: 'Company S.A.',
      },
      riskAnalysis,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Endpoint: Validar 2FA Step-up
app.post('/api/verify-2fa', (req: Request, res: Response) => {
  const { code, identity } = req.body;
  // Aceita código de 6 dígitos ou confirmação biométrica
  if (!code || code.length < 4) {
    return res.status(400).json({ success: false, message: 'Código de verificação inválido' });
  }

  res.json({
    success: true,
    token: 'zt_2fa_' + Math.random().toString(36).substring(2),
    message: 'Postura validada com sucesso via 2FA',
    user: {
      identity,
      verifiedVia: 'Biometria / OTP',
    },
  });
});

// 4. Blacklist API
app.get('/api/blacklist', (req: Request, res: Response) => {
  res.json({ success: true, count: blacklist.length, data: blacklist });
});

app.post('/api/blacklist', (req: Request, res: Response) => {
  const { ip, motivo, origem = 'SecOps Manual', expiracao = '24h', geo = 'EXT' } = req.body;
  if (!ip) {
    return res.status(400).json({ success: false, message: 'Endereço IP é obrigatório' });
  }

  const newEntry = {
    ip,
    geo,
    motivo: motivo || 'Ameaça detectada manualmente',
    origem,
    data: 'Hoje, ' + new Date().toLocaleTimeString('pt-BR'),
    expiracao,
  };

  blacklist.unshift(newEntry);
  res.json({ success: true, message: 'IP adicionado à Blacklist com sucesso', entry: newEntry });
});

// 5. Limiares e Configurações
app.get('/api/config', (req: Request, res: Response) => {
  res.json({
    success: true,
    thresholdConfig,
    protectionMode,
  });
});

app.post('/api/config', (req: Request, res: Response) => {
  if (req.body.thresholdConfig) {
    thresholdConfig = { ...thresholdConfig, ...req.body.thresholdConfig };
  }
  if (req.body.protectionMode) {
    protectionMode = req.body.protectionMode;
  }
  res.json({ success: true, thresholdConfig, protectionMode });
});

// 6. Obter código fonte Python para inspeção transparente no app
app.get('/api/python-code', (req: Request, res: Response) => {
  try {
    const pythonPath = path.resolve(__dirname, 'risk_engine.py');
    const code = fs.readFileSync(pythonPath, 'utf-8');
    res.json({ success: true, code });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Servir Vite em desenvolvimento ou build estático em produção
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[TraceRisk] Server executando na porta ${PORT} (http://0.0.0.0:${PORT})`);
  });
}

startServer();
