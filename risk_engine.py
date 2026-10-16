# -*- coding: utf-8 -*-
"""
TraceRisk — Motor de Análise de Risco Zero Trust em Python
Baseado em Teoria dos Conjuntos, Relações Binárias e Lógica Proposicional Booleana.
"""

import sys
import json
import argparse
import time

class SistemaAnaliseRisco:
    def __init__(self, ips_bloqueados_custom=None, limiar_mfa=40, limiar_bloqueio=75):
        # 1) CONJUNTOS (Utilizando set para busca eficiente O(1))
        self.usuarios_cadastrados = {"alice", "bob", "charlie", "carlos.mendes", "mariana.silva", "admin.root"}
        self.ips_confiaveis = {"192.168.1.5", "200.100.50.1", "189.28.14.99", "10.244.18.2"}
        
        # Lista padrão de IPs bloqueados (expansível via parâmetros ou regras dinâmicas)
        default_bloqueados = {
            "45.227.254.10", 
            "185.220.101.5", 
            "185.220.101.45", 
            "45.154.255.89", 
            "194.26.29.112", 
            "89.248.163.50",
            "198.51.100.24"
        }
        if ips_bloqueados_custom:
            self.ips_bloqueados = set(ips_bloqueados_custom)
        else:
            self.ips_bloqueados = default_bloqueados

        self.dispositivos_conhecidos = {
            "alice": {"iPhone13", "MacBook-Pro"},
            "bob": {"Notebook-Dell"},
            "charlie": {"ThinkPad-X1"},
            "carlos.mendes": {"MacOS Sonoma / Chrome", "MacBook-Pro"},
            "mariana.silva": {"Win 11 / Edge"},
            "admin.root": {"Linux-Terminal"}
        }

        self.limiar_mfa = limiar_mfa
        self.limiar_bloqueio = limiar_bloqueio
        
    # 2) RELAÇÕES & 3) FUNÇÕES
    def calcular_score_risco(self, usuario, ip, dispositivo, falhas_consecutivas, horario_incomum):
        """
        Calcula a pontuação contínua de risco R(x) no intervalo [0, 100].
        Retorna (score, decomposicao_fatores).
        """
        # Se o IP pertence ao conjunto de bloqueados, risco é máximo
        if ip in self.ips_bloqueados:
            return 100, {
                "falhas": 0,
                "ip_nao_confiavel": 0,
                "dispositivo_desconhecido": 0,
                "horario_incomum": 0,
                "ip_bloqueado": 100
            }
            
        score = 0
        
        # Penalidade por tentativas malsucedidas acumuladas (min de falhas * 15, max 45)
        pts_falhas = min(falhas_consecutivas * 15, 45)
        score += pts_falhas
        
        # Pertinência aos conjuntos de IPs confiáveis (ip not in self.ips_confiaveis)
        pts_ip = 25 if ip not in self.ips_confiaveis else 0
        score += pts_ip
            
        # Relação Usuário -> Dispositivo
        dispositivos_usuario = self.dispositivos_conhecidos.get(usuario, set())
        pts_disp = 20 if dispositivo not in dispositivos_usuario else 0
        score += pts_disp
            
        # Fator temporal
        pts_horario = 10 if horario_incomum else 0
        score += pts_horario
            
        fatores = {
            "falhas": pts_falhas,
            "ip_nao_confiavel": pts_ip,
            "dispositivo_desconhecido": pts_disp,
            "horario_incomum": pts_horario,
            "ip_bloqueado": 0
        }
        return min(score, 100), fatores

    # 4) PROPOSIÇÕES / LÓGICA BOOLEANA
    def analisar_acesso(self, usuario, ip, dispositivo, falhas, horario_incomum):
        """
        Aplica a lógica proposicional estruturada e faixas de decisão Zero Trust.
        """
        log_steps = []
        log_steps.append(f"Iniciando verificação de identidade para u='{usuario}'")

        # Validação inicial de existência do usuário no conjunto U
        if usuario not in self.usuarios_cadastrados:
            log_steps.append(f"FALHA: Usuário '{usuario}' NÃO PERTENCE ao conjunto U de usuários cadastrados.")
            return {
                "decisao": "BLOQUEADO - Usuário não existe no sistema",
                "score": 100,
                "status": "Bloqueado",
                "proposicoes": {
                    "p": False,
                    "q": bool(horario_incomum),
                    "r": True,
                    "s": False,
                    "expressao": True,
                    "detalhes": "Usuário não cadastrado"
                },
                "fatores": {"falhas": 0, "ip_nao_confiavel": 0, "dispositivo_desconhecido": 0, "horario_incomum": 0, "ip_bloqueado": 100},
                "logs": log_steps
            }
            
        score, fatores = self.calcular_score_risco(usuario, ip, dispositivo, falhas, horario_incomum)
        
        # Definição das variáveis proposicionais
        p = falhas > 5
        q = bool(horario_incomum)
        r = ip not in self.ips_confiaveis
        s = ip in self.ips_bloqueados
        
        # Expressão lógica estruturada: (p AND q AND r) OR s
        acesso_suspeito = (p and q and r) or s

        log_steps.append(f"Conjunto de IPs Confiáveis: {'Pertence' if not r else 'Não pertence (+25)'}")
        log_steps.append(f"Conjunto de Dispositivos de {usuario}: {'Reconhecido' if fatores['dispositivo_desconhecido'] == 0 else 'Novo/Desconhecido (+20)'}")
        log_steps.append(f"Proposições avaliadas: p(falhas>5)={p}, q(horario)={q}, r(ip_incomum)={r}, s(ip_blacklist)={s}")
        log_steps.append(f"Expressão booleana ((p ∧ q ∧ r) ∨ s) = {acesso_suspeito}")
        log_steps.append(f"Pontuação de Risco R(x) calculada = {score}/100")
        
        # Análise de resultados e classificação de decisão
        if acesso_suspeito or score >= self.limiar_bloqueio:
            decisao = "VERMELHO (Acesso Bloqueado por Alto Risco)"
            status = "Bloqueado"
            badge = "Bloqueio Total"
        elif score >= self.limiar_mfa:
            decisao = "AMARELO (Alerta - Exigir Duplo Fator de Autenticação / MFA)"
            status = "2FA Requerido"
            badge = "Desafio 2FA"
        else:
            decisao = "VERDE (Acesso Liberado / Baixo Risco)"
            status = "Liberado"
            badge = "Sem Atrito"

        log_steps.append(f"Decisão final gerada: {decisao}")

        return {
            "usuario": usuario,
            "ip": ip,
            "dispositivo": dispositivo,
            "decisao": decisao,
            "status": status,
            "badge": badge,
            "score": score,
            "fatores": fatores,
            "proposicoes": {
                "p": p,
                "q": q,
                "r": r,
                "s": s,
                "expressao": acesso_suspeito,
                "formula": "((falhas > 5) ∧ horario_incomum ∧ ip ∉ confiaveis) ∨ (ip ∈ bloqueados)"
            },
            "logs": log_steps
        }

# --- CLI / JSON Interface ---
def main():
    parser = argparse.ArgumentParser(description="TraceRisk Python Risk Evaluation Engine")
    parser.add_argument("--eval", type=str, help="JSON input string com os parâmetros de acesso")
    parser.add_argument("--test", action="store_true", help="Executa a bateria de testes de demonstração")
    args = parser.parse_args()

    analisador = SistemaAnaliseRisco()

    if args.eval:
        try:
            params = json.loads(args.eval)
            u = params.get("usuario", "alice")
            ip = params.get("ip", "192.168.1.5")
            dev = params.get("dispositivo", "iPhone13")
            falhas = int(params.get("falhas", 0))
            horario = bool(params.get("horario_incomum", False))
            
            res = analisador.analisar_acesso(u, ip, dev, falhas, horario)
            print(json.dumps(res, ensure_ascii=False))
            sys.exit(0)
        except Exception as e:
            err = {"erro": str(e), "score": 100, "status": "Bloqueado", "decisao": "Erro na execução do script"}
            print(json.dumps(err, ensure_ascii=False))
            sys.exit(1)

    # Execução padrão dos cenários se nenhum argumento fornecido
    cenarios = [
        {"user": "alice", "ip": "192.168.1.5", "dev": "iPhone13", "falhas": 0, "horario": False, "desc": "Acesso Usual Seguro"},
        {"user": "bob", "ip": "198.51.100.42", "dev": "Notebook-Dell", "falhas": 2, "horario": True, "desc": "IP Novo fora do horário comercial"},
        {"user": "charlie", "ip": "198.51.100.99", "dev": "Aparelho-Desconhecido", "falhas": 6, "horario": True, "desc": "Ataque Força Bruta (Gatilho da Proposição)"},
        {"user": "alice", "ip": "45.227.254.10", "dev": "iPhone13", "falhas": 0, "horario": False, "desc": "Acesso via IP em Blacklist"}
    ]
    
    print("=== RESULTADOS DA ANÁLISE DE RISCO (TRACERISK ZERO TRUST PYTHON ENGINE) ===")
    for c in cenarios:
        resultado = analisador.analisar_acesso(c['user'], c['ip'], c['dev'], c['falhas'], c['horario'])
        print(f"Cenário: {c['desc']}")
        print(f" -> Score: {resultado['score']} | Decisão: {resultado['decisao']}")
        print(f" -> Fatores: {resultado['fatores']}")
        print(f" -> Proposições: p={resultado['proposicoes']['p']}, q={resultado['proposicoes']['q']}, r={resultado['proposicoes']['r']}, s={resultado['proposicoes']['s']}\n")

if __name__ == "__main__":
    main()
