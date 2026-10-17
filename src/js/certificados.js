document.addEventListener('DOMContentLoaded', () => {
    // 1. Base de dados de certificações técnicas
    const certificates = [
        // 5 Certificações Relevantes em Destaque
        {
            title: "BANCO DE DADOS",
            desc: "SQL Server & Banco de Dados Relacional",
            ribbon: "2025 - 2026",
            status: "Especialização",
            category: "core",
            destaque: true,
            color: "teal",
            icon: "fa-database",
            image: null
        },
        {
            title: "AUTOMAÇÃO / QA",
            desc: "Automação de Testes com Robot Framework",
            ribbon: "2025 - 2026",
            status: "Certificado",
            category: "core",
            destaque: true,
            color: "darkblue",
            icon: "fa-robot",
            image: null
        },
        {
            title: "ERP & INTEGRAÇÕES",
            desc: "Sustentação ERP Microvix & TOTVS",
            ribbon: "2022 - Atual",
            status: "Linx Academy",
            category: "core",
            destaque: true,
            color: "gold",
            icon: "fa-cubes",
            image: null
        },
        {
            title: "CONTROLE DE VERSÃO",
            desc: "Versionamento de Código com Git e GitHub",
            ribbon: "2025 - 2026",
            status: "Certificado",
            category: "core",
            destaque: true,
            color: "purple",
            icon: "fa-code-branch",
            image: null
        },
        {
            title: "APIS & INTEGRAÇÃO",
            desc: "Validação de APIs REST com Postman",
            ribbon: "2024 - 2025",
            status: "Certificado",
            category: "core",
            destaque: true,
            color: "blue",
            icon: "fa-network-wired",
            image: null
        },
        {
            title: "BACKEND & C#",
            desc: "Programação C# (.NET)",
            ribbon: "2024 - 2025",
            status: "Certificado",
            category: "tech",
            destaque: false,
            color: "pink",
            icon: "fa-microsoft",
            image: null
        },
        {
            title: "FRONT-END",
            desc: "Web Development (HTML/CSS/JS)",
            ribbon: "2024 - 2025",
            status: "Certificado",
            category: "tech",
            destaque: false,
            color: "blue",
            icon: "fa-code",
            image: null
        },

        // Basic Technology Certificates (Images)
        {
            title: "INTRO TO IOT",
            desc: "Introduction to IoT (Cisco)",
            ribbon: "07/05/2022",
            status: "Cisco Academy",
            category: "tech",
            color: "orange",
            icon: "fa-globe",
            image: "certificados/ciscocert-iot.png"
        },
        {
            title: "COMUNICAÇÃO",
            desc: "Entendendo Comunicação Client x Server (DIO)",
            ribbon: "2 Horas",
            status: "DIO",
            category: "tech",
            color: "blue",
            icon: "fa-server",
            image: "certificados/diocert-client-server.png"
        },
        {
            title: "GIT / GITHUB",
            desc: "Versionamento de Código com Git e GitHub (DIO)",
            ribbon: "2 Horas",
            status: "DIO",
            category: "tech",
            color: "purple",
            icon: "fa-code-branch",
            image: "certificados/diocert-git-github.png"
        },
        {
            title: "INTRO GITHUB",
            desc: "Introdução ao GitHub",
            ribbon: "30/06/2026",
            status: "Módulo",
            category: "tech",
            color: "purple",
            icon: "fa-github",
            image: "certificados/diocert-intro-github.png"
        },
        {
            title: "ALGORITMOS",
            desc: "Algoritmos e Lógica de Programação",
            ribbon: "40 Horas",
            status: "Certificado",
            category: "tech",
            color: "blue",
            icon: "fa-brain",
            image: "certificados/ALGORITIMOS.png"
        },
        {
            title: "HTML5 & CSS3",
            desc: "HTML5 e CSS3: Módulos 1, 2 e 3",
            ribbon: "120 Horas",
            status: "Certificado",
            category: "tech",
            color: "blue",
            icon: "fa-html5",
            image: "certificados/HTMLS.png"
        },
        {
            title: "HTML5 & CSS3",
            desc: "HTML5 e CSS3: Módulo 4 de 5",
            ribbon: "40 Horas",
            status: "Certificado",
            category: "tech",
            color: "blue",
            icon: "fa-html5",
            image: "certificados/HTML.png"
        },
        {
            title: "HTML5 & CSS3",
            desc: "HTML5 e CSS3: Módulo 5 de 5",
            ribbon: "40 Horas",
            status: "Certificado",
            category: "tech",
            color: "blue",
            icon: "fa-html5",
            image: "certificados/HTML E CSS.png"
        },
        {
            title: "JAVASCRIPT",
            desc: "Linguagem Javascript",
            ribbon: "40 Horas",
            status: "Certificado",
            category: "tech",
            color: "blue",
            icon: "fa-js",
            image: "certificados/JS.png"
        },
        {
            title: "LINUX",
            desc: "Sistema Operacional Linux",
            ribbon: "40 Horas",
            status: "Certificado",
            category: "tech",
            color: "blue",
            icon: "fa-linux",
            image: "certificados/LINUX.png"
        },
        {
            title: "PYTHON",
            desc: "Python 3 - Mundo 1",
            ribbon: "40 Horas",
            status: "Certificado",
            category: "tech",
            color: "blue",
            icon: "fa-python",
            image: "certificados/PYTHON.png"
        },
        {
            title: "GIT / GITHUB",
            desc: "Git Training: Noções Básicas",
            ribbon: "69 min - Linx",
            status: "Certificado",
            category: "tech",
            color: "purple",
            icon: "fa-code-branch",
            image: "certificados/linxacademycert-28b2c43b-fa95-4075-96a8-56ffe5cfc86f-full (1).png"
        },

        // Linx Academy Core & Trilhas
        {
            title: "LINX MICROVIX",
            desc: "Trilha CLC - Linx Microvix",
            ribbon: "1453 min",
            status: "Trilha",
            category: "linx",
            color: "teal",
            icon: "fa-road",
            image: "certificados/linxacademycert-cd4030e2-3989-4d5e-848a-7eb6ff464d52-full (1).png"
        },
        {
            title: "LINX RESHOP",
            desc: "Trilha CLC - Linx Reshop (vl inativada)",
            ribbon: "1165 min",
            status: "Trilha",
            category: "linx",
            color: "teal",
            icon: "fa-road",
            image: "certificados/linxacademycert-738d6965-c6f3-4e4f-8aae-50573ec632ac-full.png"
        },
        {
            title: "LINX CORE",
            desc: "Case - Certificação Linx Core - Microvix",
            ribbon: "240 min",
            status: "Certificação",
            category: "linx",
            color: "teal",
            icon: "fa-file-shield",
            image: "certificados/linxacademycert-14d542cd-dacc-478c-a826-9bcaeb05edb3-full.png"
        },
        {
            title: "LINX MICROVIX",
            desc: "Avaliação - CLC Linx Microvix v2",
            ribbon: "300 min",
            status: "Avaliação",
            category: "linx",
            color: "teal",
            icon: "fa-clipboard-check",
            image: "certificados/linxacademycert-33fc0ce4-3b93-4b5f-b767-f7c4bd5232c1-full (1).png"
        },
        {
            title: "IMPLANTAÇÃO",
            desc: "Metodologia de Implantação - Microvix KA",
            ribbon: "62 min",
            status: "Metodologia",
            category: "linx",
            color: "orange",
            icon: "fa-gears",
            image: "certificados/linxacademycert-26a9d889-3113-457f-961d-587a2a4ebbb4-full.png"
        },
        {
            title: "IMPLANTAÇÃO",
            desc: "Metodologia de Implantação - Microvix SMB",
            ribbon: "36 min",
            status: "Metodologia",
            category: "linx",
            color: "orange",
            icon: "fa-gears",
            image: "certificados/linxacademycert-5fae6182-1e4c-4895-9063-f6654e8996b6-full.png"
        },
        {
            title: "X-MENTORIA",
            desc: "Programa X-Mentoria: Jornada Tech",
            ribbon: "4 Encontros",
            status: "Mentorado",
            category: "linx",
            color: "gold",
            icon: "fa-people-arrows",
            image: "certificados/linxacademycert-9cf38ff7-6682-4f52-affd-7efae9d72e9d-full (1).png"
        },

        // Linx Academy Modules & Support
        {
            title: "SQL & DATABASE",
            desc: "SQL: A linguagem dos Bancos de Dados",
            ribbon: "600 min",
            status: "Certificado",
            category: "tech",
            color: "teal",
            icon: "fa-database",
            image: "certificados/linxacademycert-4548e7d8-7f05-4070-9526-1dd2c1d44f6c-full.png"
        },
        {
            title: "COMMERCE SQL",
            desc: "Linx Commerce: Módulo Ferramenta SQL",
            ribbon: "105 min",
            status: "Especialista",
            category: "linx",
            color: "teal",
            icon: "fa-database",
            image: "certificados/linxacademycert-16591434-41ff-4ece-a0cc-2330f69aba0b-full.png"
        },
        {
            title: "WEBSERVICE",
            desc: "Webservice Microvix",
            ribbon: "90 min",
            status: "Especialista",
            category: "linx",
            color: "teal",
            icon: "fa-network-wired",
            image: "certificados/linxacademycert-9338286c-4be8-445a-b970-b713e4c43943-full.png"
        },
        {
            title: "WEBSERVICE B2C",
            desc: "Linx Microvix - Webservice B2C",
            ribbon: "60 min",
            status: "Especialista",
            category: "linx",
            color: "teal",
            icon: "fa-network-wired",
            image: "certificados/linxacademycert-d8616571-8d61-414a-97f4-831366e150a7-full.png"
        },
        {
            title: "RESHOP COMERCIAL",
            desc: "Linx Reshop - Visão Comercial",
            ribbon: "480 min",
            status: "Comercial",
            category: "linx",
            color: "orange",
            icon: "fa-shop",
            image: "certificados/linxacademycert-080f39f7-88ca-41db-91dc-69f6baf9486e-full.png"
        },
        {
            title: "MICROVIX CRM",
            desc: "Linx Microvix - Módulo CRM",
            ribbon: "120 min",
            status: "Especialista",
            category: "linx",
            color: "orange",
            icon: "fa-users-gear",
            image: "certificados/linxacademycert-6cbfd673-a1d4-4169-9c0b-a4739dcee047-full.png"
        },
        {
            title: "MICROVIX NF-E",
            desc: "Linx Microvix - Módulo NF-e",
            ribbon: "60 min",
            status: "Especialista",
            category: "linx",
            color: "orange",
            icon: "fa-file-invoice-dollar",
            image: "certificados/linxacademycert-4f3b88c5-60fd-483b-9c08-02fcfed02be1-full.png"
        },
        {
            title: "CONTA DIGITAL",
            desc: "Linx Conta Digital Integrada - Microvix",
            ribbon: "34 min",
            status: "Especialista",
            category: "linx",
            color: "orange",
            icon: "fa-credit-card",
            image: "certificados/linxacademycert-572252cd-1105-4e3a-be9e-d70b2622ecf7-full.png"
        },
        {
            title: "VENDA FÁCIL",
            desc: "Linx Microvix - Venda Fácil Mobile",
            ribbon: "70 min",
            status: "Especialista",
            category: "linx",
            color: "orange",
            icon: "fa-mobile-screen",
            image: "certificados/linxacademycert-fdb32b0f-c6dc-4a17-8d8c-5395320252b5-full.png"
        },
        {
            title: "PORTAIS ERP",
            desc: "Linx Microvix - Estrutura de Portais",
            ribbon: "60 min",
            status: "Especialista",
            category: "linx",
            color: "orange",
            icon: "fa-window-maximize",
            image: "certificados/linxacademycert-4cda8b0e-584b-427f-83c1-b20c99ef726a-full.png"
        },
        {
            title: "MICROVIX ERP",
            desc: "Linx Microvix - Conhecendo o ERP",
            ribbon: "60 min",
            status: "Especialista",
            category: "linx",
            color: "orange",
            icon: "fa-cubes",
            image: "certificados/linxacademycert-578a3d94-f9bd-4e3c-bce0-5eeffd46bbe6-full.png"
        },
        {
            title: "IMPORTAÇÃO",
            desc: "Linx Microvix - Rotinas de Importação",
            ribbon: "10 min",
            status: "Especialista",
            category: "linx",
            color: "orange",
            icon: "fa-file-import",
            image: "certificados/linxacademycert-1866b83a-d5e2-4bb3-898d-11bc43a0ae55-full.png"
        },
        {
            title: "MICROVIX ACESSOS",
            desc: "Linx Microvix - Módulo de Acessos",
            ribbon: "10 min",
            status: "Especialista",
            category: "linx",
            color: "orange",
            icon: "fa-key",
            image: "certificados/linxacademycert-a3e89f85-bce6-4df2-80dd-7131cc800feb-full.png"
        },
        {
            title: "PROCESSOS ERP",
            desc: "Linx Microvix - Processos Consultores",
            ribbon: "25 min",
            status: "Especialista",
            category: "linx",
            color: "orange",
            icon: "fa-person-chalkboard",
            image: "certificados/linxacademycert-81336eb6-7e3f-4ccf-923b-4031dee71063-full.png"
        },
        {
            title: "SUPORTE ERP",
            desc: "Linx Microvix - Ferramentas de Suporte",
            ribbon: "30 min",
            status: "Especialista",
            category: "linx",
            color: "orange",
            icon: "fa-wrench",
            image: "certificados/linxacademycert-08997542-112f-4394-94be-0df2cdd2d683-full.png"
        },
        {
            title: "VISION ERP",
            desc: "Microvix Vision - Funcionalidades v2",
            ribbon: "79 min",
            status: "Especialista",
            category: "linx",
            color: "orange",
            icon: "fa-eye",
            image: "certificados/linxacademycert-1b800dd5-9446-4de1-b661-a7b3ccedb68c-full.png"
        },
        {
            title: "FISCAL FLOW",
            desc: "Linx Bridge - Módulo Fiscal Flow",
            ribbon: "60 min",
            status: "Especialista",
            category: "linx",
            color: "orange",
            icon: "fa-arrow-right-arrow-left",
            image: "certificados/linxacademycert-d20c1142-8068-4f03-a072-cb7248c7c582-full.png"
        },
        {
            title: "PORTAL WEB",
            desc: "Linx Bridge - Portal Web 2.0",
            ribbon: "60 min",
            status: "Especialista",
            category: "linx",
            color: "orange",
            icon: "fa-circle-dot",
            image: "certificados/linxacademycert-810d0e38-c800-434e-b568-06bb36f5cc66-full.png"
        },
        {
            title: "TÉCNICO ERP",
            desc: "Linx Microvix - Técnico Avançado",
            ribbon: "240 min",
            status: "Técnico",
            category: "linx",
            color: "orange",
            icon: "fa-user-gear",
            image: "certificados/linxacademycert-df54ae26-5069-42f2-a65d-c858caf95810-full.png"
        },
        {
            title: "METODOLOGIA KCS",
            desc: "KCS - Da Teoria à Prática",
            ribbon: "142 min",
            status: "Especialista",
            category: "linx",
            color: "orange",
            icon: "fa-graduation-cap",
            image: "certificados/linxacademycert-24250b13-6698-46bd-b1b1-99955296e0bd-full.png"
        },
        {
            title: "ORÁCULO",
            desc: "Linx Oráculo - Navegação",
            ribbon: "70 min",
            status: "Especialista",
            category: "linx",
            color: "orange",
            icon: "fa-circle-question",
            image: "certificados/linxacademycert-34353ca2-b863-4136-b28c-63a3bb0dad6a-full.png"
        },
        {
            title: "REFORMA TRIBUTÁRIA",
            desc: "Reforma Tributária - Módulo Básico",
            ribbon: "60 min",
            status: "Especialista",
            category: "linx",
            color: "orange",
            icon: "fa-percent",
            image: "certificados/linxacademycert-962ff447-528b-4f51-85d6-3796e2ec2393-full (1).png"
        },
        {
            title: "REUNIÕES VIRTUAIS",
            desc: "Normativa de Reuniões Virtuais",
            ribbon: "35 min",
            status: "Especialista",
            category: "linx",
            color: "orange",
            icon: "fa-video",
            image: "certificados/linxacademycert-b7a3efde-8f78-4daa-adbd-f1da2c667ae9-full (1).png"
        },

        // Linx Academy / Stone - Institutional & Security
        {
            title: "SEGURANÇA",
            desc: "Segurança da Informação - Linx",
            ribbon: "30 min",
            status: "Segurança",
            category: "linx",
            color: "darkblue",
            icon: "fa-shield",
            image: "certificados/linxacademycert-8ba896e2-d261-48d3-be20-ae271392c408-full.png"
        },
        {
            title: "SEGURANÇA",
            desc: "Guardião da Nossa Segurança - Linx",
            ribbon: "40 min",
            status: "Segurança",
            category: "linx",
            color: "darkblue",
            icon: "fa-shield",
            image: "certificados/linxacademycert-d6832474-e2dc-47ad-93f7-9e3bbc2dd77f-full.png"
        },
        {
            title: "PRIVACIDADE",
            desc: "Guardião da Privacidade de Dados - 2025",
            ribbon: "80 min",
            status: "Segurança",
            category: "linx",
            color: "darkblue",
            icon: "fa-user-shield",
            image: "certificados/linxacademycert-1786e735-2078-4e3a-8ca1-e7a244433b28-full (1).png"
        },
        {
            title: "SEGURANÇA & DADOS",
            desc: "Privacidade e Segurança - Campanha 2025",
            ribbon: "120 min",
            status: "Segurança",
            category: "linx",
            color: "darkblue",
            icon: "fa-shield-halved",
            image: "certificados/linxacademycert-6a857f43-6fdd-4ef5-9243-fb077bb29f16-full (1).png"
        },
        {
            title: "LINX CORE",
            desc: "Apresentação da Certificação Linx Core",
            ribbon: "25 min",
            status: "Introdução",
            category: "linx",
            color: "teal",
            icon: "fa-certificate",
            image: "certificados/linxacademycert-7615181a-7757-4338-9b52-b7a5e7baa459-full.png"
        },
        {
            title: "ÉTICA E CONDUTA",
            desc: "Conduta e Ética Profissional - Linx",
            ribbon: "120 min",
            status: "Institucional",
            category: "linx",
            color: "darkblue",
            icon: "fa-gavel",
            image: "certificados/linxacademycert-c3d52ac8-c86b-4430-b3a1-2e7919d47d50-full.png"
        },
        {
            title: "ATENDIMENTO",
            desc: "Boas Práticas em Canais Escritos",
            ribbon: "33 min",
            status: "Atendimento",
            category: "linx",
            color: "orange",
            icon: "fa-pen-to-square",
            image: "certificados/linxacademycert-3a2ec82e-d3f2-47a9-afb9-c3085999bd67-full.png"
        },
        {
            title: "VAREJO",
            desc: "Por dentro do Varejo - Introdução",
            ribbon: "15 min",
            status: "Institucional",
            category: "linx",
            color: "orange",
            icon: "fa-store",
            image: "certificados/linxacademycert-42cc3c57-093f-47ff-afc6-8b1c5a175cce-full.png"
        },
        {
            title: "STONE CULTURE",
            desc: "5 Segundos: O Jeito Stone de Atender",
            ribbon: "60 min",
            status: "Atendimento",
            category: "linx",
            color: "orange",
            icon: "fa-gem",
            image: "certificados/linxacademycert-64dfeed9-6eae-4dfa-842a-c64cedb227cd-full.png"
        },
        {
            title: "ATENDIMENTO",
            desc: "Excelência no Atendimento ao Cliente",
            ribbon: "120 min",
            status: "Atendimento",
            category: "linx",
            color: "orange",
            icon: "fa-smile",
            image: "certificados/linxacademycert-e455c9f2-f092-4e2e-8fa0-8222be47ac31-full.png"
        },

        // TOTVS / Ahgora / Security
        {
            title: "ISO 27001",
            desc: "ISO 27001: SIG e Política de Segurança",
            ribbon: "45 min",
            status: "Ahgora",
            category: "totvs",
            color: "darkblue",
            icon: "fa-lock",
            image: "certificados/unitcert-16f0b498-ca5a-4cb3-ac17-2cc4d40322cd-full (1).png"
        },
        {
            title: "ÉTICA TOTVS",
            desc: "CODE - Código de Ética e Conduta TOTVS",
            ribbon: "2024",
            status: "TOTVS",
            category: "totvs",
            color: "darkblue",
            icon: "fa-handshake",
            image: "certificados/unitcert-5d0cd75f-0c4f-43f5-9f9a-7c44dc5c71a8-full.png"
        },
        {
            title: "DADOS & IA",
            desc: "Fundamentos de Dados e Inteligência Artificial",
            ribbon: "45 min",
            status: "TOTVS",
            category: "totvs",
            color: "pink",
            icon: "fa-brain",
            image: "certificados/unitcert-5e5868b3-54c2-4a0f-83b5-e5c2a24c21e1-full (1).png"
        },
        {
            title: "SEGURANÇA TOTVS",
            desc: "Segurança da Informação TOTVS",
            ribbon: "43 min",
            status: "TOTVS",
            category: "totvs",
            color: "darkblue",
            icon: "fa-key",
            image: "certificados/unitcert-77630e52-528a-49be-b08c-2924e3ac1407-full (1).png"
        }
    ];

    const shieldsGrid = document.getElementById('shieldsGrid');
    const certSearch = document.getElementById('certSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');

    const certModal = document.getElementById('certModal');
    const certModalTitle = document.getElementById('certModalTitle');
    const certModalImg = document.getElementById('certModalImg');
    const closeCertModal = document.getElementById('closeCertModal');

    let currentFilter = 'all';
    let searchQuery = '';
    let mostrarTodos = false;

    // Render function
    function renderCertificates() {
        if (!shieldsGrid) return;
        shieldsGrid.innerHTML = '';

        // Se o usuário estiver buscando ou filtrando, ativa exibição completa
        const emBuscaOuFiltro = searchQuery.trim() !== '' || currentFilter !== 'all';
        const deveMostrarTodos = mostrarTodos || emBuscaOuFiltro;
        
        let filteredCerts = certificates.filter(cert => {
            const matchesCategory = currentFilter === 'all' || cert.category === currentFilter;
            const matchesSearch = cert.desc.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 cert.status.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        // Por padrão sem filtro ativo e sem mostrarTodos, exibe apenas os 5 mais relevantes
        if (!deveMostrarTodos) {
            filteredCerts = filteredCerts.filter(c => c.destaque).slice(0, 5);
        }

        if (filteredCerts.length === 0) {
            shieldsGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 2.5rem; color: var(--text-muted);">
                    <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 0.8rem; display: block; opacity: 0.6;"></i>
                    <p>Nenhuma certificação encontrada para os critérios informados.</p>
                </div>
            `;
            return;
        }

        filteredCerts.forEach(cert => {
            const card = document.createElement('div');
            card.className = `cert-card ${cert.destaque ? 'cert-highlight' : ''}`;
            
            if (cert.image) {
                card.style.cursor = 'pointer';
                card.title = "Clique para visualizar o comprovante oficial";
                card.addEventListener('click', () => openModal(cert));
            }

            card.innerHTML = `
                <div class="cert-card-header">
                    <span class="cert-category-badge">${cert.title}</span>
                    <span class="cert-date-badge">${cert.ribbon}</span>
                </div>
                <div class="cert-card-body">
                    <div class="cert-icon-wrapper">
                        <i class="${cert.icon ? 'fas ' + cert.icon : 'fas fa-certificate'}"></i>
                    </div>
                    <div class="cert-info">
                        <h4>${cert.desc}</h4>
                        <div class="cert-issuer">
                            <span><i class="fas fa-award"></i> ${cert.status}</span>
                            ${cert.image ? '<span class="cert-view-link"><i class="fas fa-file-image"></i> Ver comprovante</span>' : ''}
                        </div>
                    </div>
                </div>
            `;

            shieldsGrid.appendChild(card);
        });

        atualizarBotaoToggle(deveMostrarTodos, emBuscaOuFiltro);
    }

    // Botão de expandir / recolher lista de certificações
    function atualizarBotaoToggle(estaMostrandoTodos, forcarEscondido = false) {
        let toggleContainer = document.getElementById('certToggleContainer');
        if (!toggleContainer) {
            toggleContainer = document.createElement('div');
            toggleContainer.id = 'certToggleContainer';
            toggleContainer.className = 'cert-toggle-container';
            shieldsGrid.parentNode.insertBefore(toggleContainer, shieldsGrid.nextSibling);
        }

        if (forcarEscondido) {
            toggleContainer.style.display = 'none';
            return;
        }

        toggleContainer.style.display = 'flex';
        toggleContainer.innerHTML = `
            <button type="button" id="btnToggleCerts" class="btn-toggle-certs">
                <i class="fas ${estaMostrandoTodos ? 'fa-chevron-up' : 'fa-chevron-down'}"></i>
                ${estaMostrandoTodos ? 'Exibir apenas as principais' : 'Ver todas as certificações'}
            </button>
        `;

        const btn = toggleContainer.querySelector('#btnToggleCerts');
        if (btn) {
            btn.onclick = () => {
                mostrarTodos = !mostrarTodos;
                renderCertificates();
            };
        }
    }

    // Modal Control Functions
    function openModal(cert) {
        if (!cert.image) return;
        certModalImg.src = cert.image;
        certModalTitle.textContent = cert.desc;
        certModal.style.display = 'flex';
    }

    function closeModal() {
        certModal.style.display = 'none';
        certModalImg.src = '';
        certModalTitle.textContent = '';
    }

    // Modal Events
    if (closeCertModal) {
        closeCertModal.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (e) => {
        if (e.target === certModal) {
            closeModal();
        }
    });

    // Filter Buttons Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            renderCertificates();
        });
    });

    // Search Logic
    if (certSearch) {
        certSearch.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderCertificates();
        });
    }

    // Initial render
    renderCertificates();
    window.portfolioCertificates = certificates;
});
