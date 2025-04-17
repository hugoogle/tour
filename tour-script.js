(function () {
  if (window.__tour_loaded__) return;
  window.__tour_loaded__ = true;

  const steps = [];
  const button = document.createElement('button');
  button.innerText = '🧭 Criar Tour';
  Object.assign(button.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 9999,
    padding: '10px 15px',
    background: '#6200ea',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  });
  document.body.appendChild(button);

  const addStep = (el) => {
    const text = prompt('Texto para este passo do tour:');
    if (text) {
      steps.push({ element: el, text });
      el.style.outline = '2px solid red';
    }
  };

  let selecting = false;

  // Corrigindo a URL exibida ao clicar em editar
  const baseUrl = 'http://localhost:8080/erp-web'; // URL correta

  button.onclick = () => {
    selecting = !selecting;
    button.innerText = selecting ? 'Clique nos elementos...' : '🧭 Criar Tour';
    if (selecting) {
      document.body.addEventListener('click', handler, true);
    } else {
      document.body.removeEventListener('click', handler, true);
      startTour();
    }
  };

  function handler(e) {
    if (!selecting) return;
    e.preventDefault();
    e.stopPropagation();
    const el = e.target;
    addStep(el);
  }

  function startTour() {
    let i = 0;
    const next = () => {
      if (i >= steps.length) return alert('Tour finalizado!');
      const { element, text } = steps[i];
      const tooltip = document.createElement('div');
      tooltip.innerText = `${text}\nURL: ${baseUrl}`; // Adicionando a URL correta
      Object.assign(tooltip.style, {
        position: 'absolute',
        top: element.getBoundingClientRect().bottom + window.scrollY + 10 + 'px',
        left: element.getBoundingClientRect().left + window.scrollX + 'px',
        background: '#333',
        color: '#fff',
        padding: '8px 12px',
        borderRadius: '5px',
        zIndex: 10000,
        maxWidth: '200px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
      });

      const nextBtn = document.createElement('button');
      nextBtn.innerText = 'Próximo';
      Object.assign(nextBtn.style, {
        marginTop: '8px',
        display: 'block',
        background: '#fff',
        color: '#000',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '3px',
        cursor: 'pointer'
      });

      nextBtn.onclick = () => {
        document.body.removeChild(tooltip);
        i++;
        next();
      };

      tooltip.appendChild(nextBtn);
      document.body.appendChild(tooltip);
    };
    next();
  }

  function triggerEventInAllParentFrames(window, eventName) {
    try {
        // Verifica se a janela atual e a janela pai têm a mesma origem
        if (window.parent && window.location.origin === window.parent.location.origin) {
            var isTopFrame = window.document === window.parent.document;

            if (!isTopFrame) {
                window.parent.document.dispatchEvent(new CustomEvent(eventName));
                triggerEventInAllParentFrames(window.parent, eventName);
            }
        } else {
            console.warn("Cross-origin frame detected. Skipping event propagation.");
        }
debugger;
        if (window.opener && window.location.origin === window.opener.location.origin) {
            triggerEventInOpener(window, eventName);
        }
    } catch (e) {
        if (e instanceof DOMException && e.name === "SecurityError") {
            console.warn("Cross-origin access blocked: ", e.message);
        } else {
            throw e;
        }
    }
  }

  function injectTourScript(window) {
    const scriptContent = `
        (function() {
            if (window.__tour_loaded__) return;
            window.__tour_loaded__ = true;

            console.log('Script do tour carregado!');

            const steps = [];
            const button = document.createElement('button');
            button.innerText = '🧭 Criar Tour';
            Object.assign(button.style, {
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 9999,
                padding: '10px 15px',
                background: '#6200ea',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
            });
            document.body.appendChild(button);

            const addStep = (el) => {
                const text = prompt('Texto para este passo do tour:');
                if (text) {
                    steps.push({ element: el, text });
                    el.style.outline = '2px solid red';
                }
            };

            let selecting = false;

            button.onclick = () => {
                selecting = !selecting;
                button.innerText = selecting ? 'Clique nos elementos...' : '🧭 Criar Tour';
                if (selecting) {
                    document.body.addEventListener('click', handler, true);
                } else {
                    document.body.removeEventListener('click', handler, true);
                    startTour();
                }
            };

            function handler(e) {
                if (!selecting) return;
                e.preventDefault();
                e.stopPropagation();
                const el = e.target;
                addStep(el);
            }

            function startTour() {
                let i = 0;
                const next = () => {
                    if (i >= steps.length) return alert('Tour finalizado!');
                    const { element, text } = steps[i];
                    const tooltip = document.createElement('div');
                    tooltip.innerText = text;
                    Object.assign(tooltip.style, {
                        position: 'absolute',
                        top: element.getBoundingClientRect().bottom + window.scrollY + 10 + 'px',
                        left: element.getBoundingClientRect().left + window.scrollX + 'px',
                        background: '#333',
                        color: '#fff',
                        padding: '8px 12px',
                        borderRadius: '5px',
                        zIndex: 10000,
                        maxWidth: '200px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                    });

                    const nextBtn = document.createElement('button');
                    nextBtn.innerText = 'Próximo';
                    Object.assign(nextBtn.style, {
                        marginTop: '8px',
                        display: 'block',
                        background: '#fff',
                        color: '#000',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '3px',
                        cursor: 'pointer'
                    });

                    nextBtn.onclick = () => {
                        document.body.removeChild(tooltip);
                        i++;
                        next();
                    };

                    tooltip.appendChild(nextBtn);
                    document.body.appendChild(tooltip);
                };
                next();
            }
        })();
    `;

    const script = document.createElement('script');
    script.textContent = scriptContent;
    window.document.body.appendChild(script);
  }

  function injectUserGuidingScript(window) {
    const script = document.createElement('script');
    script.src = 'https://panel.userguiding.com/extension-trigger';
    script.async = true;
    script.onload = () => {
        console.log('UserGuiding script loaded successfully.');
    };
    script.onerror = () => {
        console.error('Failed to load UserGuiding script.');
    };
    window.document.body.appendChild(script);
  }
})();
