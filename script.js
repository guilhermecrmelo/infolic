document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     NAVEGAÇÃO ENTRE PÁGINAS
  ========================= */
  document.getElementById("openBalcao")?.addEventListener("click", () => {
    window.location.href = "balcao.html";
  });

  document.getElementById("openAtendimento")?.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  /* =========================
     MENU LATERAL
  ========================= */
  const sidebar = document.querySelector(".sidebar");
  let hoverTimeout;

  sidebar?.addEventListener("mouseenter", () => {
    hoverTimeout = setTimeout(() => sidebar.classList.add("open"), 100);
  });

  sidebar?.addEventListener("mouseleave", () => {
    clearTimeout(hoverTimeout);
    sidebar.classList.remove("open");
  });

  /* =========================
     TOGGLE DARK / LIGHT (SIDEBAR)
  ========================= */
  const toggle = document.getElementById("themeToggle");
  const icon = document.querySelector(".theme-toggle .icon");

  if (toggle && sidebar && icon) {

    // carregar preferência salva
    if (localStorage.getItem("sidebarTheme") === "dark") {
      sidebar.classList.add("dark");
      toggle.checked = true;
      icon.textContent = "🌞";
    } else {
      icon.textContent = "🌙";
    }

    // ao clicar no switch
    toggle.addEventListener("change", () => {
      sidebar.classList.toggle("dark");

      const isDark = sidebar.classList.contains("dark");
      icon.textContent = isDark ? "🌞" : "🌙";
      localStorage.setItem("sidebarTheme", isDark ? "dark" : "light");
    });
  }

  /* =========================
     MODAIS (CONFIG / SUPORTE)
  ========================= */
  const configModal = document.getElementById("configModal");
  const supportModal = document.getElementById("supportModal");

  document.getElementById("openConfig")?.addEventListener("click", () => {
    configModal?.classList.add("active");
  });

  document.getElementById("openSupport")?.addEventListener("click", () => {
    supportModal?.classList.add("active");
  });

  [configModal, supportModal].forEach(modal => {
    if (!modal) return;

    modal.querySelector(".modal-close")?.addEventListener("click", () => {
      modal.classList.remove("active");
    });

    modal.addEventListener("click", e => {
      if (e.target === modal) modal.classList.remove("active");
    });
  });

  /* =========================
     COPIAR TEXTO + SOM + TOAST
  ========================= */
  const audio = document.getElementById("clickSound");
  const toast = document.getElementById("toast");

  document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      navigator.clipboard.writeText(btn.dataset.text);

      if (audio) {
        audio.currentTime = 0;
        audio.volume = 0.15;
        audio.play();
      }

      if (toast) {
        toast.style.display = "block";
        setTimeout(() => toast.style.display = "none", 2000);
      }
    });
  });

});
