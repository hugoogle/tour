document.addEventListener("DOMContentLoaded", function () {
  const steps = [
    { element: "#step1", message: "Este é o título da página." },
    { element: "#step2", message: "Clique neste botão para começar!" }
  ];

  let index = 0;

  function showStep(step) {
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

    el.addEventListener("click", () => {
      el.classList.remove("tour-highlight");
      tooltip.remove();
      index++;
      if (index < steps.length) {
        showStep(steps[index]);
      }
    });
  }

  showStep(steps[index]);
});
