/**
 * Gerador de Currículo Profissional em PDF (ATS-Friendly, Coluna Única, Vetorial)
 * 
 * Modelo Único Estratégico:
 * Analista de Sistemas Júnior | Banco de Dados (SQL) | QA e Testes de Software
 * 
 * Regras:
 * - 100% Texto selecionável e indexável (vetorial via jsPDF, zero rasterização)
 * - Layout em coluna única, sem tabelas, sem caixas coloridas, sem ícones
 * - Cabeçalhos padrão ATS: Resumo, Experiência, Competências, Projetos, Formação, Idiomas & Certificações
 * - Exatamente 1 página A4
 * - Arquivo gerado: Ailton_Rocha_Cordeiro_Curriculo.pdf
 */

(function () {
    'use strict';

    function obterDadosCurriculo() {
        if (window.CURRICULO_DATA && typeof window.CURRICULO_DATA === 'object') {
            return window.CURRICULO_DATA;
        }
        return null;
    }

    /**
     * Validador contra placeholders e marcadores [PREENCHER]
     */
    function verificarPendenciasPreenchimento(dados) {
        const pendencias = [];

        function verificarTexto(texto, campoNome) {
            if (!texto || typeof texto !== 'string') return;
            if (texto.includes('[PREENCHER') || /\[PREENCHER:[^\]]+\]/i.test(texto)) {
                const match = texto.match(/\[PREENCHER:[^\]]+\]/i);
                pendencias.push({
                    campo: campoNome,
                    valor: match ? match[0] : '[PREENCHER: ...]'
                });
            } else if (
                texto.includes('seu.email@exemplo.com') ||
                texto.includes('exemplo.com') ||
                texto.includes('seu-perfil') ||
                texto.includes('seuusuario') ||
                texto.includes('(11) 99999-9999')
            ) {
                pendencias.push({
                    campo: campoNome,
                    valor: 'Dado de exemplo / placeholder detectado'
                });
            }
        }

        const perfil = dados.perfil || {};
        verificarTexto(perfil.email, 'E-mail profissional');
        if (perfil.idiomas && Array.isArray(perfil.idiomas)) {
            perfil.idiomas.forEach(i => {
                verificarTexto(i.nivel, `Nível de idioma (${i.idioma})`);
            });
        }

        const exps = dados.experiencias || [];
        exps.forEach(exp => {
            verificarTexto(exp.periodo, `Período em ${exp.empresa} (${exp.cargo})`);
            if (exp.bullets && Array.isArray(exp.bullets)) {
                exp.bullets.forEach((b, bIdx) => {
                    verificarTexto(b, `Métrica em ${exp.empresa} (${exp.cargo} item ${bIdx + 1})`);
                });
            }
        });

        const forms = dados.formacao || [];
        forms.forEach(f => {
            verificarTexto(f.instituicao, `Instituição (${f.curso})`);
            verificarTexto(f.periodo, `Período (${f.curso})`);
        });

        return pendencias;
    }

    /**
     * Modal de aviso caso ainda existissem pendências
     */
    function exibirModalAvisoPendencias(pendencias, callbackGerarMesmoAssim) {
        let modal = document.getElementById('pendingValidationModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'pendingValidationModal';
            modal.className = 'modal cv-alert-modal';
            modal.innerHTML = `
                <div class="cv-alert-modal-content">
                    <span class="close close-alert-modal">&times;</span>
                    <div class="alert-icon-header">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h3>Atenção: Informações Pendentes de Preenchimento</h3>
                    </div>
                    <p class="alert-intro">
                        O gerador identificou marcadores provisórios no currículo. O download é protegido para garantir sua apresentação profissional.
                    </p>
                    <div class="alert-list-container">
                        <strong>Campos que aguardam preenchimento:</strong>
                        <ul id="alertPendingList"></ul>
                    </div>
                    <div class="alert-actions">
                        <button type="button" class="btn-cancel-alert" id="btnFecharAlert">Fechar e Preencher</button>
                        <button type="button" class="btn-force-draft" id="btnForcarRascunho">
                            <i class="fas fa-file-export"></i> Gerar Rascunho para Teste
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            const fechar = () => { modal.style.display = 'none'; };
            modal.querySelector('.close-alert-modal').addEventListener('click', fechar);
            modal.querySelector('#btnFecharAlert').addEventListener('click', fechar);
            modal.addEventListener('click', (e) => { if (e.target === modal) fechar(); });
        }

        const listEl = modal.querySelector('#alertPendingList');
        if (listEl) {
            listEl.innerHTML = pendencias.map(p => `<li><strong>${p.campo}:</strong> <code>${p.valor}</code></li>`).join('');
        }

        const forceBtn = modal.querySelector('#btnForcarRascunho');
        if (forceBtn) {
            forceBtn.onclick = () => {
                modal.style.display = 'none';
                if (typeof callbackGerarMesmoAssim === 'function') callbackGerarMesmoAssim();
            };
        }

        modal.style.display = 'flex';
    }

    /**
     * Geração do Currículo Único em 1 Página A4 via jsPDF (100% texto vetorial)
     */
    function gerarCurriculoUnicoPdf(dados, forcarRascunho = false) {
        if (!window.jspdf || !window.jspdf.jsPDF) {
            console.warn("jsPDF não carregado. Acionando fallback de impressão.");
            fallbackImpressaoNavegador(dados);
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ format: 'a4', unit: 'pt' });

        const perfil = dados.perfil;
        const pageWidth = 595.28;
        const marginX = 36;
        const contentWidth = pageWidth - (marginX * 2);
        let y = 32;

        // Cabeçalho - Nome
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(15);
        doc.setTextColor(15, 23, 42); // #0f172a
        doc.text(perfil.nome.toUpperCase(), marginX, y);
        y += 14;

        // Título Único Estratégico
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.8);
        doc.setTextColor(37, 99, 235); // #2563eb
        doc.text(perfil.titulo, marginX, y);
        y += 12;

        // Informações de Contato em Linha Única (ATS Friendly)
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.2);
        doc.setTextColor(71, 85, 105);
        const contactLine = `${perfil.localizacao} | Tel: ${perfil.telefone} | ${perfil.email} | ${perfil.linkedinDisplay} | ${perfil.githubDisplay}`;
        doc.text(contactLine, marginX, y);
        y += 9;

        // Divisor Sutil
        doc.setDrawColor(203, 213, 225);
        doc.setLineWidth(0.75);
        doc.line(marginX, y, marginX + contentWidth, y);
        y += 11;

        // Função para cabeçalhos de seção ATS
        function addSectionHeader(title) {
            y += 2;
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(9.2);
            doc.setTextColor(15, 23, 42);
            doc.text(title.toUpperCase(), marginX, y);
            y += 3;
            doc.setDrawColor(226, 232, 240);
            doc.setLineWidth(0.5);
            doc.line(marginX, y, marginX + contentWidth, y);
            y += 9;
        }

        // 1. RESUMO PROFISSIONAL
        addSectionHeader('Resumo Profissional');
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.2);
        doc.setTextColor(51, 65, 85);
        const resumoLines = doc.splitTextToSize(perfil.objetivo, contentWidth);
        doc.text(resumoLines, marginX, y);
        y += (resumoLines.length * 10) + 3;

        // 2. EXPERIÊNCIA PROFISSIONAL
        addSectionHeader('Experiência Profissional');
        const exps = dados.experiencias || [];
        exps.forEach(exp => {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.6);
            doc.setTextColor(15, 23, 42);
            doc.text(`${exp.cargo} - ${exp.empresa}`, marginX, y);

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.2);
            doc.setTextColor(100, 116, 139);
            const dateWidth = doc.getTextWidth(exp.periodo);
            doc.text(exp.periodo, marginX + contentWidth - dateWidth, y);
            y += 10;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8.0);
            doc.setTextColor(51, 65, 85);
            if (exp.bullets && Array.isArray(exp.bullets)) {
                exp.bullets.forEach(bullet => {
                    const bLines = doc.splitTextToSize(bullet, contentWidth - 6);
                    doc.text(bLines, marginX + 3, y);
                    y += (bLines.length * 9.5);
                });
            }
            y += 3;
        });

        // 3. COMPETÊNCIAS TÉCNICAS
        addSectionHeader('Competências Técnicas');
        const compKeys = Object.keys(dados.competencias || {});
        compKeys.forEach(k => {
            const c = dados.competencias?.[k];
            if (!c) return;

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.2);
            doc.setTextColor(30, 41, 59);
            const label = `${c.nome}: `;
            doc.text(label, marginX, y);
            const labelWidth = doc.getTextWidth(label);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7.9);
            doc.setTextColor(51, 65, 85);
            const text = c.itens.join(' | ');
            const lines = doc.splitTextToSize(text, contentWidth - labelWidth);
            if (lines.length === 1) {
                doc.text(lines[0], marginX + labelWidth, y);
                y += 9.5;
            } else {
                doc.text(lines[0], marginX + labelWidth, y);
                y += 9.2;
                for (let i = 1; i < lines.length; i++) {
                    doc.text(lines[i], marginX + 6, y);
                    y += 9.2;
                }
                y += 1;
            }
        });

        // 4. PROJETOS EM DESTAQUE
        addSectionHeader('Projetos em Destaque');
        const projetos = (dados.projetos || []).slice(0, 3);
        projetos.forEach(proj => {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.2);
            doc.setTextColor(15, 23, 42);
            doc.text(`${proj.nome} (${proj.stack})`, marginX, y);
            y += 9.2;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7.9);
            doc.setTextColor(71, 85, 105);
            const pDesc = `${proj.problema} [Código: ${proj.codigo} | Demo: ${proj.demo}]`;
            const pLines = doc.splitTextToSize(pDesc, contentWidth - 4);
            doc.text(pLines, marginX + 3, y);
            y += (pLines.length * 9.2) + 2;
        });

        // 5. FORMAÇÃO ACADÊMICA
        addSectionHeader('Formação Acadêmica');
        const formacoes = dados.formacao || [];
        formacoes.forEach(f => {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.2);
            doc.setTextColor(15, 23, 42);
            doc.text(`${f.curso} – ${f.instituicao}`, marginX, y);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8.0);
            doc.setTextColor(100, 116, 139);
            const perWidth = doc.getTextWidth(f.periodo);
            doc.text(f.periodo, marginX + contentWidth - perWidth, y);
            y += 9.5;
        });

        // 6. IDIOMAS & CERTIFICAÇÕES
        addSectionHeader('Idiomas & Certificações');
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.0);
        doc.setTextColor(51, 65, 85);
        const idiomasText = perfil.idiomas.map(i => `${i.idioma}: ${i.nivel}`).join('   |   ');
        doc.text(`Idiomas: ${idiomasText}`, marginX, y);
        y += 9.5;

        if (dados.certificacoes_destaque && Array.isArray(dados.certificacoes_destaque)) {
            const certText = dados.certificacoes_destaque.map(c => c.ano ? `${c.nome} – ${c.emissor} – ${c.ano}` : `${c.nome} – ${c.emissor}`).join(' | ');
            const certLines = doc.splitTextToSize(`Certificações & Cursos: ${certText}`, contentWidth);
            doc.text(certLines, marginX, y);
            y += (certLines.length * 9.2) + 2;
        }

        const nomeArquivo = 'Ailton_Rocha_Cordeiro_Curriculo.pdf';
        doc.save(nomeArquivo);

        mostrarToastFeedback(`Currículo único '${nomeArquivo}' baixado com sucesso!`);
    }

    /**
     * Fallback de impressão nativa
     */
    function fallbackImpressaoNavegador(dados) {
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert("Por favor, habilite popups para imprimir o currículo.");
            return;
        }
        const perfil = dados.perfil;
        const html = `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <title>Ailton_Rocha_Cordeiro_Curriculo.pdf</title>
                <style>
                    @page { size: A4 portrait; margin: 12mm 15mm; }
                    body { font-family: Arial, Helvetica, sans-serif; color: #1e293b; background: #ffffff; line-height: 1.4; font-size: 10pt; margin: 0; padding: 0; }
                    h1 { font-size: 16pt; margin: 0 0 4px 0; color: #0f172a; text-transform: uppercase; }
                    .title { font-size: 10.5pt; font-weight: bold; color: #2563eb; margin-bottom: 4px; }
                    .contact { font-size: 8.5pt; color: #475569; margin-bottom: 10px; }
                    hr { border: none; border-top: 1px solid #cbd5e1; margin: 8px 0; }
                    h2 { font-size: 10pt; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin: 10px 0 5px 0; color: #0f172a; }
                    p { margin: 0 0 5px 0; font-size: 9pt; }
                    .item-header { display: flex; justify-content: space-between; font-weight: bold; font-size: 9.5pt; margin-top: 5px; }
                    ul { margin: 2px 0 5px 16px; padding: 0; font-size: 8.8pt; }
                    li { margin-bottom: 2px; }
                </style>
            </head>
            <body>
                <h1>${perfil.nome}</h1>
                <div class="title">${perfil.titulo}</div>
                <div class="contact">${perfil.localizacao} | Tel: ${perfil.telefone} | ${perfil.email} | ${perfil.linkedinDisplay} | ${perfil.githubDisplay}</div>
                <hr>
                <h2>Resumo Profissional</h2>
                <p>${perfil.objetivo}</p>
                <h2>Experiência Profissional</h2>
                ${dados.experiencias.map(e => `
                    <div class="item-header"><span>${e.cargo} - ${e.empresa}</span><span>${e.periodo}</span></div>
                    <ul>${e.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
                `).join('')}
                <h2>Competências Técnicas</h2>
                ${Object.values(dados.competencias || {}).map(c => `<p><strong>${c.nome}:</strong> ${c.itens.join(' | ')}</p>`).join('')}
                <h2>Formação Acadêmica</h2>
                ${dados.formacao.map(f => `<p><strong>${f.curso}</strong> – ${f.instituicao} (${f.periodo})</p>`).join('')}
                <h2>Idiomas & Certificações</h2>
                <p>Idiomas: ${perfil.idiomas.map(i => `${i.idioma}: ${i.nivel}`).join(' | ')}</p>
                ${dados.certificacoes_destaque ? `<p>Certificações: ${dados.certificacoes_destaque.map(c => `${c.nome} – ${c.emissor} – ${c.ano}`).join(' | ')}</p>` : ''}
                <script>window.onload = function() { window.print(); };</script>
            </body>
            </html>
        `;
        printWindow.document.write(html);
        printWindow.document.close();
    }

    /**
     * Ponto de entrada chamado ao clicar no botão de download
     */
    function baixarCurriculoPdf() {
        const modal = document.getElementById('cvModal');
        if (modal) modal.style.display = 'none';

        const dados = obterDadosCurriculo();
        if (!dados) {
            alert("Erro ao carregar dados do currículo.");
            return;
        }

        const pendencias = verificarPendenciasPreenchimento(dados);
        if (pendencias.length > 0) {
            exibirModalAvisoPendencias(pendencias, () => {
                gerarCurriculoUnicoPdf(dados, true);
            });
            return;
        }

        gerarCurriculoUnicoPdf(dados, false);
    }

    function mostrarToastFeedback(msg) {
        if (typeof window.showToast === 'function') {
            window.showToast(msg);
            return;
        }
        const toast = document.createElement('div');
        toast.textContent = msg;
        toast.style.position = 'fixed';
        toast.style.bottom = '24px';
        toast.style.right = '24px';
        toast.style.background = '#2563eb';
        toast.style.color = '#ffffff';
        toast.style.padding = '0.9rem 1.4rem';
        toast.style.borderRadius = '12px';
        toast.style.fontWeight = '600';
        toast.style.zIndex = '10005';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2800);
    }

    function init() {
        const btnHero = document.getElementById('downloadCvBtn');
        const modal = document.getElementById('cvModal');

        if (btnHero) {
            btnHero.addEventListener('click', (e) => {
                e.preventDefault();
                // Baixa diretamente o currículo único oficial
                baixarCurriculoPdf();
            });
        }

        if (modal) {
            const closeBtn = modal.querySelector('.close-cv-modal');
            if (closeBtn) closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
            modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
            
            const btnDirect = modal.querySelector('#btnDownloadCvUnico');
            if (btnDirect) {
                btnDirect.addEventListener('click', (e) => {
                    e.preventDefault();
                    baixarCurriculoPdf();
                });
            }
        }
    }

    window.baixarCurriculoPdf = baixarCurriculoPdf;
    window.gerarCurriculoUnicoPdf = gerarCurriculoUnicoPdf;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
