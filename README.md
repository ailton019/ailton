# Portfólio Profissional & Gerador de Currículo ATS

Portfólio técnico e gerador dinâmico de currículos em PDF otimizados para triagem humana e sistemas **ATS (Applicant Tracking System)**. Hospedado no GitHub Pages em [ailton019.github.io/ailton](https://ailton019.github.io/ailton/).

Construído em **HTML5, CSS3 e JavaScript puro**, 100% estático, sem necessidade de build ou dependências de runtime de servidor, garantindo performance instantânea, acessibilidade (WCAG AA) e compatibilidade total com o GitHub Pages.

---

## 🎯 Posicionamento e Objetivo Profissional

- **Profissional:** Ailton Rocha Cordeiro
- **Formação:** Bacharel em Engenharia da Computação | Pós-graduado em Banco de Dados
- **Trajetória:** 4 anos de atuação na Linx (Stone Co.), com progressão de Suporte Júnior a Analista de Sustentação N2 Pleno
- **Focos de Atuação:**
  1. **Analista de Banco de Dados / Sustentação N2 (SQL Server)**
  2. **Analista de Qualidade de Software (QA) & Automação de Testes**
  3. **Analista de Sistemas ERP (Microvix / TOTVS)**

---

## 🚀 Funcionalidades Principais

1. **Apresentação Técnica Alinhada:**
   - Destaque para incidentes críticos de ERP, RCA (análise de causa raiz), consultas complexas em SQL Server, validação de APIs REST via Postman e homologação técnica com P&D.
   - Front-end posicionado como competência de apoio/complementar.

2. **Gerador de Currículo PDF ATS-Friendly:**
   - **Coluna única (Single Column):** Sem tabelas, sem caixas coloridas, sem ícones e com cabeçalhos padrão (`Resumo`, `Experiência`, `Competências`, `Projetos`, `Formação`, `Idiomas`).
   - **Texto Selecionável (Vetorial):** Gerado diretamente via motor de texto `jsPDF`, garantindo que recrutadores e softwares ATS consigam selecionar, copiar e indexar cada palavra (zero rasterização).
   - **Exatamente 1 Página A4:** Diagramação milimétrica com proporções executivas que impedem quebras indesejadas de página.
   - **Seletor de Foco com 4 Versões:**
     - `Banco de Dados / Sustentação N2` (Recomendado)
     - `QA & Automação de Testes`
     - `Analista de Sistemas ERP`
     - `Desenvolvedor Júnior` (Opção Secundária)
   - **Nomenclatura Padronizada do Arquivo:** `Ailton_Rocha_Cordeiro_[foco].pdf`.

3. **Validação Automática Anti-Placeholder:**
   - O sistema inspeciona ativamente os dados antes da emissão do PDF oficial.
   - Caso qualquer marcador provisório como `[PREENCHER: ...]` ou dados de exemplo permaneçam, o download oficial é bloqueado e uma janela de alerta detalha exatamente quais campos precisam ser completados.

4. **Curadoria de Projetos:**
   - Exibição enxuta de 6 projetos prioritários na página principal (banco de dados, automação de testes, ERP Microvix, controle financeiro, checklist operacional e documentos digitais), com link discreto para o acervo completo no GitHub.

5. **Design Sóbrio, Acessível e Responsivo:**
   - Suporte nativo a modo escuro e modo claro via `prefers-color-scheme`.
   - Contraste em conformidade com WCAG AA.
   - Foco visual acessível para navegação via teclado (`Tab`/`Enter`).

---

## 📂 Estrutura de Pastas

```text
ailton/
├── data/
│   ├── curriculo.json          # Fonte única da verdade de todos os dados do currículo
│   └── curriculo.js            # Espelho de dados para suporte offline / protocolo file://
├── certificados/               # Comprovantes e imagens de certificados técnicos
├── src/
│   ├── css/
│   │   ├── style.css           # Estilos do portfólio (responsivo, acessível, light/dark)
│   │   └── numerologia.css     # Estilos preservados da página complementar
│   ├── img/
│   │   ├── homem-de-terno-e-gravata.png # Favicon
│   │   └── profile.png         # Foto de perfil profissional
│   └── js/
│       ├── jspdf.umd.min.js    # Motor vetorial de geração de PDF ATS
│       ├── curriculo-generator.js # Lógica do PDF, seletores e validação anti-placeholder
│       ├── certificados.js     # Renderização de certificados, filtros e modal
│       └── script.js           # Sincronização de dados e interações do portfólio
├── index.html                  # Página principal do portfólio profissional
├── numerologia.html            # Página complementar (sem links a partir do portfólio)
└── README.md                   # Documentação oficial do projeto
```

---

## 🔄 Como Atualizar o Conteúdo no Futuro

Para evitar divergência entre as informações exibidas no site e o conteúdo emitido nos arquivos PDF, **todos os dados do currículo estão concentrados em um único arquivo de dados:**

📁 **`data/curriculo.json`**

### Passos para atualizar:
1. Abra o arquivo `data/curriculo.json` no seu editor (VS Code, Notepad, etc.).
2. Localize a seção desejada:
   - **`perfil`:** E-mail profissional, links de contato, idiomas e níveis.
   - **`experiencias`:** Cargos, períodos, métricas de chamados/mês, SLA e runbooks.
   - **`formacao`:** Instituição da pós-graduação e graduação.
   - **`competencias`:** Itens e tecnologias por categoria técnica.
   - **`projetos`:** Nomes, descrições de problemas, stacks e links de demo/código.
   - **`versoes_curriculo`:** Ajustes de resumos e títulos para cada direcionamento.
3. Salve o arquivo. Tanto a página web quanto o gerador de PDF lerão imediatamente os novos valores.
4. *(Opcional para uso offline local via protocolo `file:///`)*: Copie os mesmos valores atualizados para `data/curriculo.js` no objeto `window.CURRICULO_DATA`.

---

## 💻 Como Rodar e Testar Localmente

Por ser 100% estático, nenhuma instalação de dependências ou build é necessária:

1. **Via Navegador Direto:**
   - Dê um duplo clique no arquivo `index.html`. O site abrirá imediatamente com todas as interações e estilos.

2. **Via Servidor Local Simples (Recomendado):**
   ```bash
   # Com Python:
   python -m http.server 8000
   # Ou com Node.js (npx serve):
   npx serve .
   ```
   Acesse `http://localhost:8000`.

---

## 📄 Licença e Direitos

Projeto pessoal e profissional desenvolvido por **Ailton Rocha Cordeiro**. Código-fonte aberto para fins de portfólio e avaliação técnica.
