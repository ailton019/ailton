document.addEventListener('DOMContentLoaded', () => {
    // 1. Tab Navigation Logic
    const tabBtns = document.querySelectorAll('.cosmic-tab-btn');
    const tabPanes = document.querySelectorAll('.cosmic-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Toggle active buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Toggle active panes
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === targetTab) {
                    pane.classList.add('active');
                }
            });
        });
    });

    // 2. Dashboard Card Clicking Logic (scrolling to detailed interpretations)
    const numCards = document.querySelectorAll('.num-card');
    numCards.forEach(card => {
        card.addEventListener('click', () => {
            const targetId = card.getAttribute('data-target');
            
            // Switch to Interpretation Tab
            const interpretationBtn = document.querySelector('.cosmic-tab-btn[data-tab="interpretacao"]');
            if (interpretationBtn) {
                interpretationBtn.click();
            }

            // Scroll to the specific interpretation card
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Highlight effect
                    targetElement.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.4)';
                    targetElement.style.borderColor = 'var(--accent-purple)';
                    setTimeout(() => {
                        targetElement.style.boxShadow = '';
                        targetElement.style.borderColor = '';
                    }, 2000);
                }, 150);
            }
        });
    });

    // 3. Pythagorean Numerology Calculator Logic
    const pythagoreanTable = {
        'a': 1, 'j': 1, 's': 1,
        'b': 2, 'k': 2, 't': 2,
        'c': 3, 'l': 3, 'u': 3,
        'd': 4, 'm': 4, 'v': 4,
        'e': 5, 'n': 5, 'w': 5,
        'f': 6, 'o': 6, 'x': 6,
        'g': 7, 'p': 7, 'y': 7,
        'h': 8, 'q': 8, 'z': 8,
        'i': 9, 'r': 9
    };

    const numberTitles = {
        1: "A Imagem de Liderança / O Pioneiro",
        2: "O Diplomata / Parceria",
        3: "O Comunicador / Expressão Criativa",
        4: "O Construtor Interior / Estrutura",
        5: "O Agente da Liberdade e Mudança / Versatilidade",
        6: "O Conciliador / Cuidado e Família",
        7: "O Pensador Analítico / Sabedoria",
        8: "O Empreendedor / Realização Material",
        9: "O Humanitário / Fraternidade",
        11: "O Idealista Intuitivo (Número Mestre)",
        22: "O Grande Construtor (Número Mestre)",
        33: "O Mestre Professor (Número Mestre)"
    };

    const calcForm = document.getElementById('calcForm');
    const resultBox = document.getElementById('calcResults');

    if (calcForm) {
        calcForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const fullNameInput = document.getElementById('fullName').value;
            const birthDateInput = document.getElementById('birthDate').value;

            if (!fullNameInput || !birthDateInput) {
                alert('Por favor, preencha o nome e a data de nascimento.');
                return;
            }

            // Normalization
            const cleanName = fullNameInput
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/[^a-z]/g, '');

            const dateDigits = birthDateInput.replace(/\D/g, '').split('').map(Number);

            // Calculations
            // 1. Life Path
            let lpSum = dateDigits.reduce((a, b) => a + b, 0);
            let lpValue = reduceNumber(lpSum);

            // 2. Expression (All letters)
            let expSum = 0;
            for (let char of cleanName) {
                if (pythagoreanTable[char]) {
                    expSum += pythagoreanTable[char];
                }
            }
            let expValue = reduceNumber(expSum);

            // 3. Soul Urge (Vowels)
            const vowels = ['a', 'e', 'i', 'o', 'u'];
            let suSum = 0;
            for (let char of cleanName) {
                if (vowels.includes(char) && pythagoreanTable[char]) {
                    suSum += pythagoreanTable[char];
                }
            }
            let suValue = reduceNumber(suSum);

            // 4. Personality (Consonants)
            let pSum = 0;
            for (let char of cleanName) {
                if (!vowels.includes(char) && pythagoreanTable[char]) {
                    pSum += pythagoreanTable[char];
                }
            }
            let pValue = reduceNumber(pSum);

            // 5. Maturity (Life Path + Expression)
            let matSum = lpValue + expValue;
            let matValue = reduceNumber(matSum);

            // Render Results
            document.getElementById('resLifePath').textContent = lpValue;
            document.getElementById('titleLifePath').textContent = numberTitles[lpValue] || "Caminho de Vida";
            if (lpValue === 11 || lpValue === 22 || lpValue === 33) {
                document.getElementById('cardLifePath').classList.add('master-card');
            } else {
                document.getElementById('cardLifePath').classList.remove('master-card');
            }

            document.getElementById('resExpression').textContent = expValue;
            document.getElementById('titleExpression').textContent = numberTitles[expValue] || "Destino";
            if (expValue === 11 || expValue === 22 || expValue === 33) {
                document.getElementById('cardExpression').classList.add('master-card');
            } else {
                document.getElementById('cardExpression').classList.remove('master-card');
            }

            document.getElementById('resSoulUrge').textContent = suValue;
            document.getElementById('titleSoulUrge').textContent = numberTitles[suValue] || "Alma";
            if (suValue === 11 || suValue === 22 || suValue === 33) {
                document.getElementById('cardSoulUrge').classList.add('master-card');
            } else {
                document.getElementById('cardSoulUrge').classList.remove('master-card');
            }

            document.getElementById('resPersonality').textContent = pValue;
            document.getElementById('titlePersonality').textContent = numberTitles[pValue] || "Personalidade";
            if (pValue === 11 || pValue === 22 || pValue === 33) {
                document.getElementById('cardPersonality').classList.add('master-card');
            } else {
                document.getElementById('cardPersonality').classList.remove('master-card');
            }

            document.getElementById('resMaturity').textContent = matValue;
            document.getElementById('titleMaturity').textContent = numberTitles[matValue] || "Maturidade";
            if (matValue === 11 || matValue === 22 || matValue === 33) {
                document.getElementById('cardMaturity').classList.add('master-card');
            } else {
                document.getElementById('cardMaturity').classList.remove('master-card');
            }

            // Display results container
            resultBox.style.display = 'grid';
            setTimeout(() => {
                resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        });
    }

    // Helper function to reduce numerological numbers, honoring Master Numbers (11, 22, 33)
    function reduceNumber(num) {
        let current = num;
        while (current > 9) {
            if (current === 11 || current === 22 || current === 33) {
                return current;
            }
            current = current.toString().split('').map(Number).reduce((a, b) => a + b, 0);
        }
        return current;
    }
});
