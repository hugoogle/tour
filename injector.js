(function () {
    // Definir passos do tour (personalize conforme necessário)
    const steps = [
        { selector: 'body', text: '🔍 Este é um tour guiado! Clique em "Próximo" para continuar.' },
        { selector: 'h1', text: 'Este é um cabeçalho importante!' },
        { selector: 'a', text: 'Este é um link. Cuidado ao clicar!' }
    ];

    let currentStep = 0;

    // Função para mostrar um passo do tour
    function showStep(stepIndex) {
        const step = steps[stepIndex];
        if (!step) return;

        const element = document.querySelector(step.selector);
        if (element) {
            const tooltip = document.createElement('div');
            tooltip.innerText = step.text;
            tooltip.style.position = 'absolute';
            tooltip.style.top = `${element.offsetTop + element.offsetHeight + 10}px`;
            tooltip.style.left = `${element.offsetLeft}px`;
            tooltip.style.padding = '8px';
            tooltip.style.background = '#333';
            tooltip.style.color = '#fff';
            tooltip.style.borderRadius = '5px';
            tooltip.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
            tooltip.style.zIndex = '9999';
            document.body.appendChild(tooltip);

            // Botão de próximo passo
            const nextBtn = document.createElement('button');
            nextBtn.innerText = 'Próximo';
            nextBtn.style.position = 'absolute';
            nextBtn.style.top = `${tooltip.offsetTop + tooltip.offsetHeight + 10}px`;
            nextBtn.style.left = `${tooltip.offsetLeft}px`;
            nextBtn.style.padding = '5px 10px';
            nextBtn.style.border = 'none';
            nextBtn.style.background = '#6200ea';
            nextBtn.style.color = '#fff';
            nextBtn.style.borderRadius = '5px';
            nextBtn.style.cursor = 'pointer';
            document.body.appendChild(nextBtn);

            nextBtn.onclick = function () {
                document.body.removeChild(tooltip);
                document.body.removeChild(nextBtn);
                showStep(++currentStep); // Passa para o próximo passo
            };
        }
    }

    // Iniciar o tour após 1 segundo (para garantir que a página carregou)
    setTimeout(() => showStep(currentStep), 1000);
})();
