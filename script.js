(function () {
    const yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  
    const toggle = document.getElementById("theme-toggle");
    const storedTheme = window.localStorage.getItem("profile-theme");
  
    function applyTheme(theme) {
      const isDark = theme === "dark";
      document.body.classList.toggle("theme-dark", isDark);
      if (toggle) {
        toggle.setAttribute("aria-pressed", String(isDark));
        toggle.textContent = isDark
          ? "Switch to light theme"
          : "Switch to dark theme";
      }
    }
  
    applyTheme(storedTheme === "dark" ? "dark" : "light");
  
    if (toggle) {
      toggle.addEventListener("click", function () {
        const next = document.body.classList.contains("theme-dark")
          ? "light"
          : "dark";
        window.localStorage.setItem("profile-theme", next);
        applyTheme(next);
      });
    }
  
    const navToggle = document.getElementById("nav-toggle");
    const siteNav = document.getElementById("site-nav");
  
    if (navToggle && siteNav) {
      navToggle.addEventListener("click", function () {
        const open = siteNav.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", String(open));
      });
  
      siteNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          siteNav.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  
    const searchInput = document.getElementById("project-search");
    const statusEl = document.getElementById("filter-status");
    const cards = Array.prototype.slice.call(
      document.querySelectorAll(".project-card")
    );
    const chips = Array.prototype.slice.call(
      document.querySelectorAll(".filter-chip")
    );
    let activeFilter = "all";
  
    function normalize(value) {
      return String(value || "")
        .toLowerCase()
        .trim();
    }
  
    function updateProjects() {
      const query = normalize(searchInput ? searchInput.value : "");
      let visible = 0;
  
      cards.forEach(function (card) {
        const name = normalize(card.getAttribute("data-name"));
        const tech = normalize(card.getAttribute("data-tech"));
        const haystack = name + " " + tech;
        const matchesQuery = !query || haystack.indexOf(query) !== -1;
        const matchesFilter =
          activeFilter === "all" || tech.indexOf(activeFilter) !== -1;
        const show = matchesQuery && matchesFilter;
        card.classList.toggle("is-hidden", !show);
        card.hidden = !show;
        if (show) {
          visible += 1;
        }
      });
  
      if (statusEl) {
        statusEl.textContent =
          visible === 0
            ? "No projects match this search or filter."
            : visible + " project" + (visible === 1 ? "" : "s") + " shown.";
      }
    }
  
    if (searchInput) {
      searchInput.addEventListener("input", updateProjects);
    }
  
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        activeFilter = normalize(chip.getAttribute("data-filter"));
        chips.forEach(function (item) {
          item.classList.toggle("is-active", item === chip);
        });
        updateProjects();
      });
    });
  
    updateProjects();
  
    document.querySelectorAll('a[href^="PLACEHOLDER"]').forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        window.alert(
          "This is a placeholder link. Replace it in index.html with the real URL when you have it.\n\n" +
            link.getAttribute("href")
        );
      });
    });
  })();
  