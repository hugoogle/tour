document.addEventListener("DOMContentLoaded", () => {
  const steps = [
    { element: "#openModalBtn", message: "Clique aqui para abrir o modal." },
    { element: "#modalContent", message: "Este é o conteúdo do modal." }
  ];

  let current = 0;

  function showStep(stepIndex) {
    const step = steps[stepIndex];
    const el = document.querySelector(step.element);
    if (!el) return;

    el.classList.add("tour-highlight");

    const tooltip = document.createElement("div");
    tooltip.className = "tour-tooltip";
    tooltip.innerText = step.message;
    document.body.appendChild(tooltip);

    const rect = el.getBoundingClientRect();
    tooltip.style.top = `${rect.bottom + window.scrollY + 10}px`;
    tooltip.style.left = `${rect.left + window.scrollX}px`;

    const next = () => {
      el.classList.remove("tour-highlight");
      tooltip.remove();
      current++;
      if (current < steps.length) {
        showStep(current);
      }
    };

    el.addEventListener("click", next, { once: true });
  }

  showStep(current);
});
