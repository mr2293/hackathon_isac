// --- Mobile nav toggle ---
const toggleBtn = document.querySelector(".nav__toggle");
const navLinks = document.getElementById("navLinks");

if (toggleBtn && navLinks) {
  toggleBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    toggleBtn.setAttribute("aria-expanded", String(open));
  });
}

// --- Active nav link on click (simple) ---
document.querySelectorAll(".nav__link").forEach(a => {
  a.addEventListener("click", () => {
    document.querySelectorAll(".nav__link").forEach(x => x.classList.remove("is-active"));
    a.classList.add("is-active");
    // close mobile menu after click
    navLinks?.classList.remove("is-open");
    toggleBtn?.setAttribute("aria-expanded", "false");
  });
});

// --- Projects modal interactivity ---
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalUrl = document.getElementById("modalUrl");
const modalOpen = document.getElementById("modalOpen");
const modalCopy = document.getElementById("modalCopy");
const toast = document.getElementById("toast");

let currentUrl = "";

function openModal(title, url) {
  currentUrl = url;
  modalTitle.textContent = title;
  modalUrl.textContent = url;
  modalOpen.href = url;
  toast.textContent = "";
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  toast.textContent = "";
}

document.querySelectorAll(".project__btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const title = btn.dataset.title || "Proyecto";
    const url = btn.dataset.url || "#";
    openModal(title, url);
  });
});

// Close modal on backdrop/X click
modal.addEventListener("click", (e) => {
  const target = e.target;
  if (target && target.dataset && target.dataset.close === "true") {
    closeModal();
  }
});

// ESC to close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) {
    closeModal();
  }
});

// Copy link
modalCopy.addEventListener("click", async () => {
  if (!currentUrl) return;
  try {
    await navigator.clipboard.writeText(currentUrl);
    toast.textContent = "Link copiado ✅";
  } catch {
    // Fallback
    const tmp = document.createElement("textarea");
    tmp.value = currentUrl;
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand("copy");
    document.body.removeChild(tmp);
    toast.textContent = "Link copiado ✅";
  }
});

// --- Search filter for projects ---
const search = document.getElementById("projectSearch");
const projectsList = document.getElementById("projectsList");

if (search && projectsList) {
  search.addEventListener("input", () => {
    const q = search.value.trim().toLowerCase();
    projectsList.querySelectorAll(".project__btn").forEach(btn => {
      const text = (btn.dataset.title || btn.textContent).toLowerCase();
      btn.closest(".project").style.display = text.includes(q) ? "" : "none";
    });
  });
}

// --- “Expand” button: opens first 3 projects in modal one by one (fun demo) ---
const expandAll = document.getElementById("expandAll");
if (expandAll) {
  expandAll.addEventListener("click", () => {
    const items = [...document.querySelectorAll(".project__btn")].slice(0, 3);
    if (!items.length) return;
    const first = items[0];
    openModal(first.dataset.title, first.dataset.url);
  });
}
