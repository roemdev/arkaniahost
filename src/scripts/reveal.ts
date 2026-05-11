// Cualquier elemento con la clase js-reveal aparece con fade-in-up
// cuando entra en el viewport. Solo se activa una vez por elemento.

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.style.animation = "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards";
        el.style.opacity   = "1";
        observer.unobserve(el);
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll<HTMLElement>(".js-reveal").forEach((el) => {
    el.style.opacity = "0";
    observer.observe(el);
  });
});
