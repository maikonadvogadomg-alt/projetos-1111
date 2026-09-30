// ============================================
// PARTE 15: DASHBOARD COM ESTATÍSTICAS
// ============================================

/**
 * SISTEMA DE DASHBOARD
 * 
 * Exibe estatísticas de uso, gráficos e análises
 * sobre os chats, memória e performance.
 * 
 * DEPENDÊNCIAS: PARTE 2 (ConfigManager), PARTE 4 (Interface)
 */

class GerenciadorDashboard {
    constructor() {
        this.dados = {
            totalChats: 0,
            totalMensagens: 0,
            totalMemoria: 0,
            modelosMaisUsados: {},
            horariosAtivos: {},
            tamanhoStorage: 0,
            performanceMetricas: {}
        };
    }

    // ============================================
    // Coletar Dados
    // ============================================

    coletarDados() {
        const chats = configManager.chats;
        const memoria = configManager.memoria;

        // Total de chats
        this.dados.totalChats = chats.length;

        // Total de mensagens
        this.dados.totalMensagens = chats.reduce((acc, chat) => acc + chat.mensagens.length, 0);

        // Total de registros de memória
        this.dados.totalMemoria = memoria.length;

        // Modelos mais usados
        this.dados.modelosMaisUsados = {
            [configManager.config.modelo]: this.dados.totalMensagens
        };

        // Horários ativos
        this.analisarHorarios(chats);

        // Tamanho do storage
        this.calcularTamanhoStorage();

        // Métricas de performance
        this.coletarPerformance();

        return this.dados;
    }

    // ============================================
    // Analisar Horários
    // ============================================

    analisarHorarios(chats) {
        const horarios = {};

        chats.forEach(chat => {
            chat.mensagens.forEach(msg => {
                const data = new Date(msg.timestamp);
                const hora = data.getHours();
                horarios[hora] = (horarios[hora] || 0) + 1;
            });
        });

        this.dados.horariosAtivos = horarios;
    }

    // ============================================
    // Calcular Tamanho do Storage
    // ============================================

    calcularTamanhoStorage() {
        let tamanho = 0;

        for (let i = 0; i < localStorage.length; i++) {
            const chave = localStorage.key(i);
            const valor = localStorage.getItem(chave);
            tamanho += new Blob([valor]).size;
        }

        this.dados.tamanhoStorage = tamanho;
    }

    // ============================================
    // Coletar Performance
    // ============================================

    coletarPerformance() {
        const perf = performance.getEntriesByType('navigation')[0];

        this.dados.performanceMetricas = {
            tempoCarregamento: perf ? perf.loadEventEnd - perf.loadEventStart : 0,
            tempoDOM: perf ? perf.domContentLoadedEventEnd - perf.domContentLoadedEventStart : 0,
            memoriaUsada: performance.memory ? performance.memory.usedJSHeapSize : 0,
            memoriaTotal: performance.memory ? performance.memory.totalJSHeapSize : 0
        };
    }

    // ============================================
    // Gerar Gráfico de Barras (ASCII)
    // ============================================

    gerarGraficoBarras(dados, titulo, maxLargura = 50) {
        let grafico = `\n${titulo}\n${'='.repeat(titulo.length)}\n`;

        const maxValor = Math.max(...Object.values(dados));

        Object.entries(dados).forEach(([label, valor]) => {
            const largura = Math.round((valor / maxValor) * maxLargura);
            const barra = '█'.repeat(largura);
            grafico += `${label.padEnd(10)} │ ${barra} ${valor}\n`;
        });

        return grafico;
    }

    // ============================================
    // Gerar Relatório de Estatísticas
    // ============================================

    gerarRelatorioEstatisticas() {
        this.coletarDados();

        const relatorio = `
╔════════════════════════════════════════════════════════════════╗
║           DASHBOARD DE ESTATÍSTICAS - CHAT IA                 ║
╚════════════════════════════════════════════════════════════════╝

📊 RESUMO GERAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total de Chats: ${this.dados.totalChats}
Total de Mensagens: ${this.dados.totalMensagens}
Média por Chat: ${(this.dados.totalMensagens / Math.max(this.dados.totalChats, 1)).toFixed(1)}
Registros de Memória: ${this.dados.totalMemoria}
Espaço Usado: ${(this.dados.tamanhoStorage / 1024).toFixed(2)} KB

💾 STORAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tamanho Total: ${(this.dados.tamanhoStorage / 1024).toFixed(2)} KB
Limite do Navegador: 5000 KB
Uso: ${((this.dados.tamanhoStorage / 5242880) * 100).toFixed(2)}%
Status: ${this.dados.tamanhoStorage < 4194304 ? '✓ Normal' : '⚠️ Alto'}

⏱️ PERFORMANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tempo de Carregamento: ${this.dados.performanceMetricas.tempoCarregamento.toFixed(0)}ms
Tempo DOM: ${this.dados.performanceMetricas.tempoDOM.toFixed(0)}ms
Memória Usada: ${(this.dados.performanceMetricas.memoriaUsada / 1048576).toFixed(2)} MB
Memória Total: ${(this.dados.performanceMetricas.memoriaTotal / 1048576).toFixed(2)} MB

${this.gerarGraficoBarras(this.dados.horariosAtivos, '⏰ ATIVIDADE POR HORA')}

📈 MODELOS MAIS USADOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${Object.entries(this.dados.modelosMaisUsados)
    .map(([modelo, uso]) => `${modelo}: ${uso} mensagens`)
    .join('\n')}

📅 ÚLTIMOS CHATS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${configManager.chats
    .slice(-5)
    .reverse()
    .map(chat => `${chat.titulo}: ${chat.mensagens.length} mensagens`)
    .join('\n')}

🎯 RECOMENDAÇÕES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${this.gerarRecomendacoes()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Relatório gerado em: ${new Date().toLocaleString('pt-BR')}
        `;

        return relatorio;
    }

    // ============================================
    // Gerar Recomendações
    // ============================================

    gerarRecomendacoes() {
        const recomendacoes = [];

        if (this.dados.tamanhoStorage > 4194304) {
            recomendacoes.push('⚠️ Storage está próximo do limite - faça backup');
        }

        if (this.dados.totalChats > 50) {
            recomendacoes.push('💡 Considere arquivar chats antigos');
        }

        if (this.dados.totalMemoria < 15) {
            recomendacoes.push('ℹ️ Memória abaixo do mínimo recomendado');
        }

        if (this.dados.performanceMetricas.tempoCarregamento > 3000) {
            recomendacoes.push('⚡ Performance baixa - limpe cache');
        }

        if (recomendacoes.length === 0) {
            recomendacoes.push('✓ Sistema funcionando normalmente');
        }

        return recomendacoes.map(r => `• ${r}`).join('\n');
    }

    // ============================================
    // Exportar Dashboard
    // ============================================

    exportarDashboard() {
        const relatorio = this.gerarRelatorioEstatisticas();
        const blob = new Blob([relatorio], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dashboard-${Date.now()}.txt`;
        a.click();
    }
}

// ============================================
// MODAL DE DASHBOARD
// ============================================

function adicionarModalDashboard() {
    const html = `
    <div class="modal" id="modalDashboard">
        <div class="modal-content" style="max-width: 800px;">
            <div class="modal-header">
                <h2>📊 Dashboard de Estatísticas</h2>
                <button class="btn-fechar" onclick="fecharModal('modalDashboard')">✕</button>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                <div style="
                    padding: 15px;
                    background: var(--bg-dark);
                    border-radius: 8px;
                    border-left: 3px solid var(--primary);
                ">
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 5px;">
                        Total de Chats
                    </div>
                    <div style="font-size: 24px; font-weight: bold;" id="dashTotalChats">
                        0
                    </div>
                </div>

                <div style="
                    padding: 15px;
                    background: var(--bg-dark);
                    border-radius: 8px;
                    border-left: 3px solid var(--success);
                ">
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 5px;">
                        Total de Mensagens
                    </div>
                    <div style="font-size: 24px; font-weight: bold;" id="dashTotalMensagens">
                        0
                    </div>
                </div>

                <div style="
                    padding: 15px;
                    background: var(--bg-dark);
                    border-radius: 8px;
                    border-left: 3px solid var(--accent);
                ">
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 5px;">
                        Espaço Usado
                    </div>
                    <div style="font-size: 24px; font-weight: bold;" id="dashEspacoUsado">
                        0 KB
                    </div>
                </div>

                <div style="
                    padding: 15px;
                    background: var(--bg-dark);
                    border-radius: 8px;
                    border-left: 3px solid var(--warning);
                ">
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 5px;">
                        Registros de Memória
                    </div>
                    <div style="font-size: 24px; font-weight: bold;" id="dashMemoria">
                        0
                    </div>
                </div>
            </div>

            <div style="
                padding: 15px;
                background: var(--bg-dark);
                border-radius: 8px;
                max-height: 300px;
                overflow-y: auto;
                margin-bottom: 15px;
                font-size: 12px;
                line-height: 1.6;
                white-space: pre-wrap;
                font-family: monospace;
            " id="dashRecomendacoes">
                Carregando...
            </div>

            <div style="display: flex; gap: 10px;">
                <button class="btn-salvar" onclick="atualizarDashboard()" style="flex: 1;">
                    🔄 Atualizar
                </button>
                <button class="btn-control" onclick="exportarDashboard()" style="flex: 1;">
                    📥 Exportar
                </button>
            </div>
        </div>
    </div>
    `;

    const container = document.body;
    const modal = document.createElement('div');
    modal.innerHTML = html;
    container.appendChild(modal.firstElementChild);
}

function abrirModalDashboard() {
    document.getElementById('modalDashboard').classList.add('ativo');
    atualizarDashboard();
}

function atualizarDashboard() {
    const dashboard = new GerenciadorDashboard();
    const dados = dashboard.coletarDados();

    document.getElementById('dashTotalChats').innerText = dados.totalChats;
    document.getElementById('dashTotalMensagens').innerText = dados.totalMensagens;
    document.getElementById('dashEspacoUsado').innerText = `${(dados.tamanhoStorage / 1024).toFixed(2)} KB`;
    document.getElementById('dashMemoria').innerText = dados.totalMemoria;

    const recomendacoes = dashboard.gerarRecomendacoes();
    document.getElementById('dashRecomendacoes').innerText = recomendacoes;
}

function exportarDashboard() {
    const dashboard = new GerenciadorDashboard();
    dashboard.exportarDashboard();
    mostrarNotificacao('Dashboard exportado!', 'sucesso');
}

// ============================================
// INICIALIZAR
// ============================================

const gerenciadorDashboard = new GerenciadorDashboard();

document.addEventListener('DOMContentLoaded', () => {
    adicionarModalDashboard();

    // Adicionar botão ao sidebar
    const footer = document.querySelector('.sidebar-footer');
    if (footer && !document.getElementById('btnDashboard')) {
        const btn = document.createElement('button');
        btn.id = 'btnDashboard';
        btn.className = 'btn-sidebar';
        btn.innerHTML = '📊 Dashboard';
        btn.title = 'Ver estatísticas';
        btn.onclick = abrirModalDashboard;
        footer.appendChild(btn);
    }
});

// Exportar para uso global
window.GerenciadorDashboard = GerenciadorDashboard;
window.gerenciadorDashboard = gerenciadorDashboard;
window.abrirModalDashboard = abrirModalDashboard;
window.atualizarDashboard = atualizarDashboard;
window.exportarDashboard = exportarDashboard;

console.log(`
╔════════════════════════════════════════════════════════════════╗
║            SISTEMA DE DASHBOARD CARREGADO                     ║
╚════════════════════════════════════════════════════════════════╝

📊 Comandos Disponíveis:
  - abrirModalDashboard() - Abrir dashboard
  - atualizarDashboard() - Atualizar dados
  - gerenciadorDashboard.gerarRelatorioEstatisticas()
  - exportarDashboard() - Baixar relatório

📈 Métricas Rastreadas:
  - Total de chats e mensagens
  - Uso de storage
  - Performance
  - Atividade por hora
  - Modelos mais usados
`);

## 3.2 Validar JavaScript

```bash
# Abra DevTools (F12)
# Verifique console para erros

# Teste cada objeto:
console.log(DOCUMENTACAO_PROJETO)
console.log(GUIA_RAPIDO_RECUPERACAO)
console.log(BRIEFING_TECNICO)
console.log(configManager)
console.log(gerenciadorIA)
console.log(gerenciadorTemas)
console.log(ValidadorIntegridade)
console.log(gerenciadorPWA)
console.log(gerenciadorCriptografia)
console.log(gerenciadorDashboard)