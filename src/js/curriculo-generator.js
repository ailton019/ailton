/**
 * Gerador de Currículo Profissional em PDF (curriculo.pdf)
 * 
 * Sincronizado dinamicamente com as informações do portfólio (DOM, localStorage e certificados).
 * Otimizado para recrutadores e sistemas ATS com foco em:
 * - Desenvolvedor Júnior
 * - QA / Analista de Testes & Automação
 * - Analista de Banco de Dados / Sustentação N2
 */

(function () {
    'use strict';

    // Modelos de objetivo profissional direcionados
    const objetivos = {
        geral: "Engenheiro da Computação com sólida experiência em sustentação N2 de sistemas ERP e integrações na Linx (Stone Co.). Atuação diária em análise e leitura de código-fonte, diagnóstico e resolução de incidentes de causa raiz (RCA), testes e validação de APIs via Postman e homologação de correções em parceria direta com equipes de P&D/Desenvolvimento. Prática em automação de testes com Robot Framework, modelagem e queries avançadas em SQL Server, além de desenvolvimento de aplicações com JavaScript (ES6+), HTML5, CSS3, React e C# (.NET). Perfil analítico e colaborativo, preparado para gerar valor imediato como Desenvolvedor Júnior, QA / Analista de Testes ou Analista de Banco de Dados.",
        
        dev: "Graduado em Engenharia da Computação com forte base em lógica, arquitetura de software e desenvolvimento web. Experiência na Linx (Stone Co.) em análise e debug de código, homologação de correções em produção/homologação e consumo/validação de REST APIs via Postman. Conhecimento prático em JavaScript (ES6+), React, HTML5, CSS3, C# (.NET), SQL Server e versionamento Git/GitHub. Foco no desenvolvimento de soluções limpas, interfaces responsivas, padrões modernos e entrega contínua.",
        
        qa: "Engenheiro da Computação com atuação prática em garantia de qualidade (QA), homologação de software e suporte N2 na Linx (Stone Co.). Especialista em diagnóstico de causa raiz (RCA), elaboração e execução de cenários de teste, validação de contratos e endpoints via Postman, e automação de testes com Robot Framework. Experiência direta com times de Engenharia/P&D para prevenção de regressões, documentação técnica de runbooks e garantia de confiabilidade de produto.",
        
        database: "Engenheiro da Computação com profunda vivência em sustentação de sistemas ERP, análise relacional e resolução de incidentes críticos N2 na Linx (Stone Co.). Domínio de SQL Server para diagnóstico e resolução de anomalias de causa raiz (RCA), construção de consultas complexas (JOINs, DML, DDL), manutenção de integridade referencial e auditoria de fluxos transacionais. Foco em estabilidade, precisão de dados e otimização de rotinas operacionais."
    };

    const titulos = {
        geral: "Analista de Sustentação N2 | Desenvolvedor Júnior | QA & Automação | Banco de Dados",
        dev: "Desenvolvedor de Software Júnior (Front-End / Back-End)",
        qa: "Analista de Qualidade de Software (QA) | Testes & Automação",
        database: "Analista de Banco de Dados / Sustentação N2 (SQL Server & ERP)"
    };

    /**
     * Coleta as informações em tempo real da página para manter a cópia fiel e sempre atualizada
     */
    function coletarDadosAtuais(foco = 'geral') {
        // Dados pessoais do DOM
        const nomeEl = document.querySelector('.hero .name');
        const nome = nomeEl ? nomeEl.textContent.trim() : 'Ailton Rocha Cordeiro';

        // Contatos
        const emailEl = document.querySelector('#email') || document.querySelector('.contact a[href^="mailto:"]');
        const email = emailEl ? emailEl.textContent.trim() : (localStorage.getItem('currículo_email') || 'arc48388528@gmail.com');

        const linkedinEl = document.querySelector('.contact a[href*="linkedin"]');
        const linkedinUrl = linkedinEl ? linkedinEl.href : 'https://www.linkedin.com/in/ailton-rocha-b32206172/';
        const linkedinText = linkedinEl ? linkedinEl.textContent.replace(/^https?:\/\//, '').replace('www.', '').trim() : 'linkedin.com/in/ailton-rocha-b32206172';

        const githubEl = document.querySelector('.contact a[href*="github.com/ailton019"]');
        const githubUrl = githubEl ? githubEl.href : 'https://github.com/ailton019';
        const githubText = githubEl ? githubEl.textContent.replace(/^https?:\/\//, '').replace('www.', '').trim() : 'github.com/ailton019';

        const localizacaoEl = document.querySelector('.contact-item span');
        const localizacao = localizacaoEl ? localizacaoEl.textContent.trim() : 'São Paulo, SP - Brasil';

        const telefone = localStorage.getItem('currículo_phone') || '';

        // Experiências profissionais extraídas dinamicamente do DOM
        const experiencias = [];
        const expItems = document.querySelectorAll('.exp-item');
        expItems.forEach(item => {
            const cargo = item.querySelector('.exp-header h4')?.textContent?.trim() || '';
            const periodo = item.querySelector('.exp-header .date')?.textContent?.trim() || '';
            const empresa = item.querySelector('.company')?.textContent?.trim() || '';
            const bullets = [];
            item.querySelectorAll('ul li').forEach(li => {
                bullets.push(li.textContent.trim());
            });

            if (cargo && empresa) {
                experiencias.push({ cargo, empresa, periodo, bullets });
            }
        });

        // Caso o DOM não tenha carregado as experiências por algum motivo, mantém padrão fiel
        if (experiencias.length === 0) {
            experiencias.push(
                {
                    cargo: "Analista de Sustentação N2 / ERP - Integrações",
                    empresa: "Linx (Stone Co.)",
                    periodo: "2022 - Atual",
                    bullets: [
                        "Leitura e análise minuciosa de código-fonte e queries SQL para diagnóstico e resolução de incidentes de causa raiz (RCA).",
                        "Homologação e validação de correções de bugs em ambientes de homologação e produção em colaboração direta com P&D/Desenvolvimento.",
                        "Validação técnica de requisições, endpoints e payloads via Postman em integrações de sistemas ERP.",
                        "Automação de rotinas de teste e documentação de runbooks técnicos para agilizar a resolução de problemas."
                    ]
                },
                {
                    cargo: "Gerente Geral",
                    empresa: "City Distribuidora de Bebidas",
                    periodo: "2020 - 2022",
                    bullets: [
                        "Liderança de equipes operacionais e implementação de estratégias comerciais orientadas a processos.",
                        "Gestão de estoque, controle de custos, conferência de relatórios e treinamento contínuo de colaboradores."
                    ]
                }
            );
        }

        // Projetos de destaque (conquistas Gold)
        const projetos = [];
        const trophyCards = document.querySelectorAll('.trophy-card.gold-tier');
        trophyCards.forEach(card => {
            const titulo = card.querySelector('h4')?.textContent?.trim() || '';
            const desc = card.querySelector('p')?.textContent?.trim() || '';
            const link = card.querySelector('a')?.href || '';
            if (titulo) {
                projetos.push({ titulo, desc, link });
            }
        });

        // Certificações (extraídas dinamicamente de window.portfolioCertificates ou lista padrão)
        let totalCertificados = 57;
        let certificadosDestaque = [
            { titulo: "Graduação em Engenharia da Computação", instituicao: "Bacharelado", periodo: "2018 - 2023" },
            { titulo: "Automação de Testes com Robot Framework (QA)", instituicao: "Certificado Técnico", periodo: "2025 - 2026" },
            { titulo: "SQL Server & Banco de Dados Relacional", instituicao: "Certificado Especialista", periodo: "2025" },
            { titulo: "Web Development Front-End (HTML5, CSS3, JavaScript)", instituicao: "Certificado", periodo: "2024 - 2025" },
            { titulo: "Versionamento de Código com Git e GitHub", instituicao: "DIO", periodo: "2025 - 2026" },
            { titulo: "Introduction to IoT & Redes de Computadores", instituicao: "Cisco Networking Academy", periodo: "Certificado" },
            { titulo: "Programação C# (.NET)", instituicao: "Certificado", periodo: "2024 - 2025" }
        ];

        if (window.portfolioCertificates && Array.isArray(window.portfolioCertificates)) {
            totalCertificados = window.portfolioCertificates.length;
            const coreCerts = window.portfolioCertificates.filter(c => c.category === 'core' || c.status === 'Bacharel');
            if (coreCerts.length > 0) {
                certificadosDestaque = coreCerts.map(c => ({
                    titulo: c.desc || c.title,
                    instituicao: c.status || 'Certificado',
                    periodo: c.ribbon || ''
                }));
            }
        }

        return {
            nome,
            tituloPrincipal: titulos[foco] || titulos.geral,
            objetivo: objetivos[foco] || objetivos.geral,
            contatos: {
                localizacao,
                email,
                telefone,
                linkedinUrl,
                linkedinText,
                githubUrl,
                githubText,
                portfolioUrl: "https://ailton019.github.io/ailton"
            },
            experiencias,
            projetos,
            totalCertificados,
            certificadosDestaque
        };
    }

    /**
     * Monta o documento HTML limpo, A4 e ATS-friendly para o currículo
     */
    function gerarTemplateCurriculoHTML(dados) {
        return `
        <div id="curriculo-a4-document" style="
            font-family: 'Plus Jakarta Sans', Arial, Helvetica, sans-serif;
            color: #1e293b;
            background: #ffffff;
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            padding: 24px 28px;
            box-sizing: border-box;
            line-height: 1.45;
            font-size: 13.5px;
        ">
            <!-- CABEÇALHO PROFISSIONAL -->
            <header style="border-bottom: 2px solid #2563eb; padding-bottom: 12px; margin-bottom: 14px;">
                <h1 style="
                    font-family: 'Outfit', Arial, sans-serif;
                    font-size: 24px;
                    font-weight: 800;
                    color: #0f172a;
                    margin: 0 0 4px 0;
                    letter-spacing: -0.5px;
                    text-transform: uppercase;
                ">${dados.nome}</h1>
                
                <div style="
                    font-size: 13.5px;
                    font-weight: 700;
                    color: #2563eb;
                    margin-bottom: 8px;
                ">${dados.tituloPrincipal}</div>

                <div style="
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px 16px;
                    font-size: 11.5px;
                    color: #475569;
                ">
                    <span><strong>Localização:</strong> ${dados.contatos.localizacao}</span>
                    <span><strong>E-mail:</strong> <a href="mailto:${dados.contatos.email}" style="color: #2563eb; text-decoration: none;">${dados.contatos.email}</a></span>
                    ${dados.contatos.telefone ? `<span><strong>Telefone:</strong> ${dados.contatos.telefone}</span>` : ''}
                    <span><strong>LinkedIn:</strong> <a href="${dados.contatos.linkedinUrl}" target="_blank" style="color: #2563eb; text-decoration: none;">${dados.contatos.linkedinText}</a></span>
                    <span><strong>GitHub:</strong> <a href="${dados.contatos.githubUrl}" target="_blank" style="color: #2563eb; text-decoration: none;">${dados.contatos.githubText}</a></span>
                    <span><strong>Portfólio:</strong> <a href="${dados.contatos.portfolioUrl}" target="_blank" style="color: #2563eb; text-decoration: none;">ailton019.github.io/ailton</a></span>
                </div>
            </header>

            <!-- RESUMO PROFISSIONAL / OBJETIVO -->
            <section style="margin-bottom: 14px;">
                <h2 style="
                    font-family: 'Outfit', Arial, sans-serif;
                    font-size: 13px;
                    font-weight: 800;
                    color: #0f172a;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin: 0 0 6px 0;
                    border-bottom: 1px solid #e2e8f0;
                    padding-bottom: 3px;
                ">Resumo Profissional & Objetivo</h2>
                <p style="margin: 0; text-align: justify; color: #334155; font-size: 12.5px; line-height: 1.45;">
                    ${dados.objetivo}
                </p>
            </section>

            <!-- COMPETÊNCIAS TÉCNICAS (HARD SKILLS ESTRUTURADAS) -->
            <section style="margin-bottom: 14px;">
                <h2 style="
                    font-family: 'Outfit', Arial, sans-serif;
                    font-size: 13px;
                    font-weight: 800;
                    color: #0f172a;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin: 0 0 6px 0;
                    border-bottom: 1px solid #e2e8f0;
                    padding-bottom: 3px;
                ">Competências Técnicas (Hard Skills)</h2>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px 16px; font-size: 12px;">
                    <div style="background: #f8fafc; padding: 6px 10px; border-radius: 6px; border-left: 3px solid #3b82f6;">
                        <strong style="color: #1e3a8a; display: block; margin-bottom: 2px;">Desenvolvimento de Software:</strong>
                        <span>JavaScript (ES6+), HTML5, CSS3, React, C# (.NET), REST APIs, JSON, Git & GitHub.</span>
                    </div>

                    <div style="background: #f8fafc; padding: 6px 10px; border-radius: 6px; border-left: 3px solid #10b981;">
                        <strong style="color: #065f46; display: block; margin-bottom: 2px;">Qualidade & Testes (QA):</strong>
                        <span>Robot Framework (Automação), Testes de API (Postman), Testes Funcionais, Análise de Causa Raiz (RCA), Homologação com P&D.</span>
                    </div>

                    <div style="background: #f8fafc; padding: 6px 10px; border-radius: 6px; border-left: 3px solid #06b6d4;">
                        <strong style="color: #155e75; display: block; margin-bottom: 2px;">Banco de Dados & Dados:</strong>
                        <span>SQL Server (Queries complexas, JOINs, DML, DDL, integridade de dados, RCA em incidentes), Modelagem Relacional.</span>
                    </div>

                    <div style="background: #f8fafc; padding: 6px 10px; border-radius: 6px; border-left: 3px solid #8b5cf6;">
                        <strong style="color: #5b21b6; display: block; margin-bottom: 2px;">Sistemas ERP & Ferramentas:</strong>
                        <span>ERP Microvix, TOTVS, Postman, VS Code, Redes de Computadores / Cisco, Runbooks Técnicos.</span>
                    </div>
                </div>
            </section>

            <!-- EXPERIÊNCIA PROFISSIONAL -->
            <section style="margin-bottom: 14px;">
                <h2 style="
                    font-family: 'Outfit', Arial, sans-serif;
                    font-size: 13px;
                    font-weight: 800;
                    color: #0f172a;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin: 0 0 8px 0;
                    border-bottom: 1px solid #e2e8f0;
                    padding-bottom: 3px;
                ">Experiência Profissional</h2>

                ${dados.experiencias.map(exp => `
                    <div style="margin-bottom: 10px; page-break-inside: avoid;">
                        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                            <div>
                                <span style="font-weight: 700; color: #0f172a; font-size: 13px;">${exp.cargo}</span>
                                <span style="color: #475569; font-weight: 600; font-size: 12.5px;"> — ${exp.empresa}</span>
                            </div>
                            <span style="font-size: 11.5px; color: #64748b; font-weight: 600; white-space: nowrap;">${exp.periodo}</span>
                        </div>
                        <ul style="margin: 3px 0 0 16px; padding: 0; color: #334155; font-size: 12px; line-height: 1.4;">
                            ${exp.bullets.map(b => `<li style="margin-bottom: 2px;">${b}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </section>

            <!-- FORMAÇÃO ACADÊMICA & CERTIFICAÇÕES -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 12px; page-break-inside: avoid;">
                
                <!-- FORMAÇÃO -->
                <div>
                    <h2 style="
                        font-family: 'Outfit', Arial, sans-serif;
                        font-size: 13px;
                        font-weight: 800;
                        color: #0f172a;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        margin: 0 0 6px 0;
                        border-bottom: 1px solid #e2e8f0;
                        padding-bottom: 3px;
                    ">Formação Acadêmica</h2>
                    
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 6px;">
                        <div style="font-weight: 700; color: #0f172a; font-size: 12.5px;">Bacharelado em Engenharia da Computação</div>
                        <div style="font-size: 11.5px; color: #475569;">Graduação Concluída • 2018 - 2023</div>
                        <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Foco em lógica, estrutura de dados, redes e engenharia de software.</div>
                    </div>
                </div>

                <!-- CERTIFICAÇÕES EM DESTAQUE -->
                <div>
                    <h2 style="
                        font-family: 'Outfit', Arial, sans-serif;
                        font-size: 13px;
                        font-weight: 800;
                        color: #0f172a;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        margin: 0 0 6px 0;
                        border-bottom: 1px solid #e2e8f0;
                        padding-bottom: 3px;
                    ">Certificações de Destaque (${dados.totalCertificados}+ no Portfólio)</h2>
                    
                    <ul style="margin: 0 0 0 14px; padding: 0; font-size: 11.5px; color: #334155; line-height: 1.35;">
                        <li><strong>Robot Framework (QA):</strong> Automação de Testes e Qualidade</li>
                        <li><strong>SQL Server:</strong> Banco de Dados Relacional e Consultas</li>
                        <li><strong>Web Development:</strong> HTML5, CSS3 e JavaScript (ES6+)</li>
                        <li><strong>Git & GitHub:</strong> Versionamento de Projetos e Fluxos CI</li>
                        <li><strong>Cisco Networking:</strong> Introdução ao IoT e Infraestrutura</li>
                        <li><strong>Linx Academy & TOTVS:</strong> Sustentação ERP e Integrações</li>
                    </ul>
                </div>
            </div>

            <!-- PROJETOS TÉCNICOS & CONQUISTAS -->
            <section style="page-break-inside: avoid;">
                <h2 style="
                    font-family: 'Outfit', Arial, sans-serif;
                    font-size: 13px;
                    font-weight: 800;
                    color: #0f172a;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin: 0 0 6px 0;
                    border-bottom: 1px solid #e2e8f0;
                    padding-bottom: 3px;
                ">Principais Projetos & Conquistas</h2>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px 12px; font-size: 11.5px;">
                    <div style="border-left: 2px solid #e2e8f0; padding-left: 8px;">
                        <strong style="color: #0f172a;">Explorando Conhecimento:</strong>
                        <p style="margin: 1px 0; color: #475569;">Plataforma completa de aprendizado com módulos técnicos (HTML, CSS, JS, SQL, Git e IA).</p>
                        <a href="https://ailton019.github.io/explorando_conhecimento/" target="_blank" style="color: #2563eb; text-decoration: none; font-size: 11px;">github.io/explorando_conhecimento</a>
                    </div>

                    <div style="border-left: 2px solid #e2e8f0; padding-left: 8px;">
                        <strong style="color: #0f172a;">Original Eletrônico:</strong>
                        <p style="margin: 1px 0; color: #475569;">Interface e sistema para controle, validação e autenticidade segura de documentos digitais.</p>
                        <a href="https://ailton019.github.io/original-eletronico/" target="_blank" style="color: #2563eb; text-decoration: none; font-size: 11px;">github.io/original-eletronico</a>
                    </div>

                    <div style="border-left: 2px solid #e2e8f0; padding-left: 8px;">
                        <strong style="color: #0f172a;">ERP Microvix – Rotinas:</strong>
                        <p style="margin: 1px 0; color: #475569;">Facilitador e guia interativo para rotinas críticas e consultas de sustentação de ERP.</p>
                        <a href="https://ailton019.github.io/r99/" target="_blank" style="color: #2563eb; text-decoration: none; font-size: 11px;">github.io/r99</a>
                    </div>

                    <div style="border-left: 2px solid #e2e8f0; padding-left: 8px;">
                        <strong style="color: #0f172a;">Clinicalle:</strong>
                        <p style="margin: 1px 0; color: #475569;">Aplicação web para área clínica com agendamento intuitivo e experiência responsiva.</p>
                        <a href="https://ailton019.github.io/clinicalle/" target="_blank" style="color: #2563eb; text-decoration: none; font-size: 11px;">github.io/clinicalle</a>
                    </div>
                </div>
            </section>
        </div>
        `;
    }

    /**
     * Executa a geração do PDF utilizando html2pdf.js com parâmetros profissionais
     */
    function baixarCurriculoPdf(foco = 'geral') {
        const modal = document.getElementById('cvModal');
        if (modal) {
            modal.style.display = 'none';
        }

        // Criar indicador visual de download
        mostrarLoadingDownload(true);

        const dados = coletarDadosAtuais(foco);
        const htmlContent = gerarTemplateCurriculoHTML(dados);

        // Criar elemento container invisível na tela
        const container = document.createElement('div');
        container.id = 'curriculo-pdf-export-container';
        container.style.position = 'fixed';
        container.style.left = '-9999px';
        container.style.top = '0';
        container.style.width = '800px';
        container.style.zIndex = '-9999';
        container.innerHTML = htmlContent;
        document.body.appendChild(container);

        // Opções para html2pdf garantindo máxima fidelidade A4 e nitidez
        const opt = {
            margin: [8, 8, 8, 8], // Margens de 8mm
            filename: 'curriculo.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2, // 2x para nitidez em telas retina e impressão
                useCORS: true,
                letterRendering: true,
                logging: false,
                backgroundColor: '#ffffff'
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        const targetEl = container.firstElementChild;

        // Verificar disponibilidade da biblioteca
        if (typeof html2pdf === 'function') {
            html2pdf().set(opt).from(targetEl).save().then(() => {
                finalizarDownload(container, true);
            }).catch(err => {
                console.error("Erro na geração via html2pdf:", err);
                fallbackImpressaoNavegador(container);
            });
        } else {
            console.warn("Biblioteca html2pdf não encontrada. Tentando carregar ou acionando fallback de impressão.");
            fallbackImpressaoNavegador(container);
        }
    }

    /**
     * Fallback para impressão nativa do navegador caso biblioteca falhe
     */
    function fallbackImpressaoNavegador(container) {
        mostrarLoadingDownload(false);
        if (container && container.parentNode) {
            container.parentNode.removeChild(container);
        }
        
        // Abrir janela de impressão com o modelo formatado
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            const dados = coletarDadosAtuais('geral');
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>curriculo.pdf - Ailton Rocha Cordeiro</title>
                    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
                    <style>
                        @page { size: A4 portrait; margin: 8mm; }
                        body { margin: 0; padding: 0; background: #fff; }
                    </style>
                </head>
                <body>
                    ${gerarTemplateCurriculoHTML(dados)}
                    <script>
                        window.onload = function() {
                            setTimeout(function() {
                                window.print();
                            }, 500);
                        };
                    </script>
                </body>
                </html>
            `);
            printWindow.document.close();
        } else {
            alert("Por favor, habilite popups para visualizar e baixar o currículo.");
        }
    }

    function finalizarDownload(container, sucesso) {
        if (container && container.parentNode) {
            container.parentNode.removeChild(container);
        }
        mostrarLoadingDownload(false);
        if (sucesso) {
            mostrarToastFeedback("Currículo 'curriculo.pdf' baixado com sucesso!");
        }
    }

    /**
     * Exibe indicador de progresso
     */
    function mostrarLoadingDownload(ativo) {
        let loader = document.getElementById('cvDownloadLoader');
        if (ativo) {
            if (!loader) {
                loader = document.createElement('div');
                loader.id = 'cvDownloadLoader';
                loader.className = 'cv-download-loader';
                loader.innerHTML = `
                    <div class="cv-spinner"></div>
                    <div class="cv-loader-text">
                        <strong>Gerando curriculo.pdf...</strong>
                        <span>Formatando dados profissionais e certificações em padrão executivo.</span>
                    </div>
                `;
                document.body.appendChild(loader);
            }
            loader.style.display = 'flex';
        } else if (loader) {
            loader.style.display = 'none';
        }
    }

    function mostrarToastFeedback(msg) {
        if (typeof window.showToast === 'function') {
            window.showToast(msg);
        } else {
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
            toast.style.boxShadow = '0 10px 25px rgba(37,99,235,0.4)';
            toast.style.zIndex = '10005';
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2500);
        }
    }

    /**
     * Inicializa eventos e listeners dos botões de download
     */
    function init() {
        // Botão principal no Header / Hero
        const btnHero = document.getElementById('downloadCvBtn');
        const modal = document.getElementById('cvModal');

        if (btnHero) {
            btnHero.addEventListener('click', (e) => {
                e.preventDefault();
                if (modal) {
                    modal.style.display = 'flex';
                } else {
                    baixarCurriculoPdf('geral');
                }
            });
        }

        // Configurar opções do modal se existir
        if (modal) {
            const closeBtn = modal.querySelector('.close-cv-modal');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    modal.style.display = 'none';
                });
            }

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });

            // Botões de foco no modal
            modal.querySelectorAll('[data-cv-focus]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const foco = btn.getAttribute('data-cv-focus');
                    baixarCurriculoPdf(foco);
                });
            });
        }
    }

    // Expor funções globalmente para acesso direto
    window.baixarCurriculoPdf = baixarCurriculoPdf;
    window.coletarDadosCurriculo = coletarDadosAtuais;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
