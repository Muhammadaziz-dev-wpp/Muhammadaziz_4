const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const searchToggle = document.querySelector(".search-toggle");
const searchPanel = document.querySelector(".search-panel");
const searchClose = document.querySelector(".search-close");
const searchInput = document.querySelector("#site-search");
const searchStatus = document.querySelector(".search-status");

function setMenuOpen(open) {
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  navMenu.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

navMenu.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenuOpen(false);
  }
});

searchToggle.addEventListener("click", () => {
  const open = searchToggle.getAttribute("aria-expanded") !== "true";
  searchToggle.setAttribute("aria-expanded", String(open));
  searchPanel.classList.toggle("is-open", open);
  searchStatus.textContent = "";
  if (open) {
    searchInput.focus();
  }
});

searchPanel.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    searchStatus.textContent = "Enter a product name to search.";
    return;
  }

  const match = productCatalog.find((collection) =>
    collection.keywords.some((keyword) => keyword.includes(query) || query.includes(keyword))
  );

  if (!match) {
    const examples = productCatalog.map((product) => product.name).join(", ");
    searchStatus.textContent = `No match. Try: ${examples}.`;
    return;
  }

  window.location.href = `product.html?product=${encodeURIComponent(match.id)}`;
});

searchClose.addEventListener("click", () => {
  searchToggle.setAttribute("aria-expanded", "false");
  searchPanel.classList.remove("is-open");
  searchStatus.textContent = "";
  searchToggle.focus();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
    searchToggle.setAttribute("aria-expanded", "false");
    searchPanel.classList.remove("is-open");
  }
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
