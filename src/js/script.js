/**
 * Script Principal de Interação do Portfólio
 * Sincronizado com a fonte única de dados (data/curriculo.json / window.CURRICULO_DATA)
 */

(function () {
    'use strict';

    // Carregar dados salvos no localStorage ou utilizar dados oficiais
    function carregarDadosPerfil() {
        const dados = window.CURRICULO_DATA?.perfil;
        if (!dados) return;

        const emailEl = document.getElementById('email');
        if (emailEl) {
            const savedEmail = localStorage.getItem('curriculo_email');
            const emailFinal = savedEmail || dados.email;
            emailEl.textContent = emailFinal;
            emailEl.href = emailFinal.startsWith('mailto:') ? emailFinal : `mailto:${emailFinal}`;
        }

        const linkedinEl = document.getElementById('linkedin-link');
        if (linkedinEl) {
            const savedLinkedin = localStorage.getItem('curriculo_linkedin');
            const linkedinFinal = savedLinkedin || dados.linkedin;
            linkedinEl.href = linkedinFinal;
            linkedinEl.textContent = dados.linkedinDisplay || linkedinFinal.replace(/^https?:\/\//, '');
        }

        const githubEl = document.getElementById('github-link');
        if (githubEl) {
            const savedGithub = localStorage.getItem('curriculo_github');
            const githubFinal = savedGithub || dados.github;
            githubEl.href = githubFinal;
            githubEl.textContent = dados.githubDisplay || githubFinal.replace(/^https?:\/\//, '');
        }
    }

    // Modal simples para edição rápida (opcional)
    let currentEditField = null;
    const modal = document.getElementById('editModal');
    const editInput = document.getElementById('editInput');
    const saveBtn = document.getElementById('saveEdit');
    const closeBtn = modal ? modal.querySelector('.close') : null;

    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const field = btn.getAttribute('data-field');
            currentEditField = field;
            if (modal && editInput) {
                const element = document.getElementById(field);
                editInput.value = element ? element.textContent : '';
                modal.style.display = 'flex';
            }
        });
    });

    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            if (currentEditField && editInput && editInput.value.trim()) {
                const val = editInput.value.trim();
                localStorage.setItem(`curriculo_${currentEditField}`, val);
                const el = document.getElementById(currentEditField);
                if (el) el.textContent = val;
                if (modal) modal.style.display = 'none';
                showToast('Informação atualizada com sucesso!');
            }
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (modal && e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Feedback visual Toast
    window.showToast = function (msg) {
        const existingToast = document.querySelector('.cv-toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = 'cv-toast';
        toast.textContent = msg;
        toast.style.position = 'fixed';
        toast.style.bottom = '24px';
        toast.style.right = '24px';
        toast.style.background = '#2563eb';
        toast.style.color = '#ffffff';
        toast.style.padding = '0.9rem 1.4rem';
        toast.style.borderRadius = '12px';
        toast.style.fontWeight = '600';
        toast.style.fontSize = '0.9rem';
        toast.style.boxShadow = '0 10px 25px rgba(37,99,235,0.4)';
        toast.style.zIndex = '10005';
        toast.style.animation = 'fadeInUp 0.3s ease';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2800);
    };

    // Tentar sincronizar via fetch do curriculo.json se estiver rodando via HTTP/HTTPS
    if (window.location.protocol.startsWith('http')) {
        fetch('data/curriculo.json')
            .then(res => res.json())
            .then(data => {
                if (data && typeof data === 'object') {
                    window.CURRICULO_DATA = data;
                    carregarDadosPerfil();
                }
            })
            .catch(() => {
                // Silenciosamente mantém window.CURRICULO_DATA já carregado
            });
    }

    document.addEventListener('DOMContentLoaded', carregarDadosPerfil);
})();