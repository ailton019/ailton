// Dados editáveis com persistência local
const editableFields = {
    linkedin: { selector: '#linkedin-link', defaultValue: 'https://linkedin.com/in/seu-perfil' },
    github: { selector: '#github-link', defaultValue: 'https://github.com/seuusuario' },
    email: { selector: '#email', defaultValue: 'seu.email@exemplo.com' },
    phone: { selector: '#phone', defaultValue: '(11) 99999-9999' }
};

// Carregar dados salvos ou definir padrão
function loadSavedData() {
    for (const [key, field] of Object.entries(editableFields)) {
        const saved = localStorage.getItem(`currículo_${key}`);
        const element = document.querySelector(field.selector);
        if (saved && element) {
            if (element.tagName === 'A') {
                element.href = saved;
                element.textContent = saved.replace('https://', '');
            } else {
                element.textContent = saved;
            }
        } else if (element && field.defaultValue) {
            if (element.tagName === 'A') {
                element.href = field.defaultValue;
                element.textContent = field.defaultValue.replace('https://', '');
            } else {
                element.textContent = field.defaultValue;
            }
        }
    }
}

// Salvar dado específico
function saveField(key, value) {
    localStorage.setItem(`currículo_${key}`, value);
    const field = editableFields[key];
    const element = document.querySelector(field.selector);
    if (element) {
        if (element.tagName === 'A') {
            element.href = value;
            element.textContent = value.replace('https://', '');
        } else {
            element.textContent = value;
        }
    }
}

// Modal logic
let currentEditField = null;
const modal = document.getElementById('editModal');
const editInput = document.getElementById('editInput');
const saveBtn = document.getElementById('saveEdit');
const closeBtn = document.querySelector('.close');

// Abrir modal ao clicar em editar
document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const field = btn.getAttribute('data-field');
        currentEditField = field;
        const currentValue = (() => {
            const element = document.querySelector(editableFields[field].selector);
            if (element.tagName === 'A') return element.href;
            return element.textContent;
        })();
        editInput.value = currentValue;
        modal.style.display = 'flex';
    });
});

// Salvar edição
saveBtn.addEventListener('click', () => {
    if (currentEditField && editInput.value.trim()) {
        saveField(currentEditField, editInput.value.trim());
        modal.style.display = 'none';
        showToast('Informação atualizada!');
    }
});

// Fechar modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Toast simples
function showToast(msg) {
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.background = '#38bdf8';
    toast.style.color = '#0f172a';
    toast.style.padding = '0.8rem 1.2rem';
    toast.style.borderRadius = '12px';
    toast.style.fontWeight = 'bold';
    toast.style.zIndex = '1001';
    toast.style.animation = 'fadeInUp 0.3s ease';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

// Animar skill bars quando visíveis
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.skill-bar div');
            bars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = width;
            });
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skills').forEach(section => {
    observer.observe(section);
});

// Inicializar
loadSavedData();

// Ajustar links do LinkedIn e GitHub manualmente (exemplo)
// Altere manualmente no HTML ou use os botões de edição