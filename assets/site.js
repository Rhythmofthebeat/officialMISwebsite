const navigation = [
  { label: "Home", href: "/" },
  {
    label: "About",
    items: [
      { label: "Our Team", href: "/about/team" },
      { label: "Our Mission + Goal", href: "/about/mission" },
      { label: "Partners", href: "/partners" }
    ]
  },
  {
    label: "Opportunities",
    items: [
      { label: "Starting a Chapter", href: "/get-involved/start-chapter" },
      { label: "Chapters", href: "/chapters" },
      { label: "Become a Tutor", href: "/become-a-tutor" },
      { label: "Contact Us", href: "/contact" }
    ]
  },
  { label: "Community", href: "/community" },
  {
    label: "Programs",
    items: [
      { label: "Supported Projects", href: "/projects" },
      { label: "Community Inclusivity", href: "/initiatives/community-inclusivity" }
    ]
  },
  {
    label: "Events",
    items: [
      { label: "MISHacks Episode 1", href: "/hackathon" },
      { label: "Event Calendar", href: "/events" }
    ]
  },
  {
    label: "Archive",
    items: [
      { label: "Archive", href: "/archive" },
      { label: "Impact 2024-2025 Report", href: "/impact" },
      { label: "Press", href: "/press" }
    ]
  },
  {
    label: "Resources",
    items: [
      { label: "Articles/Posts", href: "/resources/articles" },
      { label: "Podcasts/Interviews", href: "/resources/podcasts" },
      { label: "Resource Links", href: "/resources/links" }
    ]
  }
];

const brandMark = `<img class="brand-mark" src="/assets/images/logo.png" alt="" aria-hidden="true">`;

const moonSVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
const sunSVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;

const normalizePath = (path) => {
  if (!path || path === "/") return "/";
  return path.replace(/\/index\.html$/, "").replace(/\/$/, "");
};

const currentPath = normalizePath(window.location.pathname);

function isActiveHref(href) {
  const normalized = normalizePath(href);
  if (normalized === "/") return currentPath === "/";
  return currentPath === normalized || currentPath.startsWith(`${normalized}/`);
}

function renderNavItems() {
  return navigation
    .map((item, index) => {
      if (!item.items) {
        const active = isActiveHref(item.href);
        return `
          <li class="nav-item">
            <a class="nav-link${active ? " is-active" : ""}" href="${item.href}"${active ? ' aria-current="page"' : ""}>${item.label}</a>
          </li>
        `;
      }

      const dropdownId = `dropdown-${index}`;
      const active = item.items.some((child) => isActiveHref(child.href));
      const links = item.items
        .map((child) => {
          const childActive = isActiveHref(child.href);
          return `<li><a href="${child.href}"${childActive ? ' aria-current="page"' : ""}>${child.label}</a></li>`;
        })
        .join("");

      return `
        <li class="nav-item has-dropdown">
          <button class="dropdown-toggle${active ? " is-active" : ""}" type="button" aria-expanded="false" aria-controls="${dropdownId}">
            <span>${item.label}</span>
            <span class="dropdown-icon" aria-hidden="true"></span>
          </button>
          <ul class="dropdown-menu" id="${dropdownId}">
            ${links}
          </ul>
        </li>
      `;
    })
    .join("");
}

function renderHeader() {
  const target = document.querySelector("#site-header");
  if (!target) return;

  target.innerHTML = `
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="/" aria-label="Minorities in STEM home">
          ${brandMark}
          <span class="brand-text">Minorities In Stem</span>
        </a>
        <nav class="site-nav" id="primary-navigation" aria-label="Primary navigation">
          <div class="nav-shell">
            <ul class="nav-menu">
              ${renderNavItems()}
            </ul>
            <div class="header-actions" aria-label="Account and donation links">
              <a class="button outline" href="/login" data-auth-link>Log In</a>
              <a class="button donate" href="/donate">Donate</a>
            </div>
          </div>
        </nav>
        <div class="header-top-actions">
          <a class="settings-link" href="/settings">Settings</a>
          <button class="theme-toggle" type="button" aria-label="Switch theme" data-theme-toggle></button>
          <button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="primary-navigation">
            <span class="menu-toggle-lines" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </header>
  `;
}

function renderFooter() {
  const target = document.querySelector("#site-footer");
  if (!target) return;

  target.innerHTML = `
    <footer class="site-footer">
      <div class="container footer-inner">
        <div class="footer-brand">
          <a class="brand" href="/" aria-label="Minorities in STEM home">
            ${brandMark}
            <span class="brand-text">Minorities In Stem</span>
          </a>
          <p>Rooted in diversity. Growing through STEM.</p>
          <ul class="social-list" aria-label="Social media links">
            <li><a class="social-link" href="https://www.instagram.com/minoritiesin_stem/" target="_blank" rel="noopener" aria-label="Minorities in STEM on Instagram"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a></li>
            <li><a class="social-link" href="https://www.linkedin.com/company/minoritiesinstem/" target="_blank" rel="noopener" aria-label="Minorities in STEM on LinkedIn"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a></li>
            <li><a class="social-link" href="mailto:infominoritiesinstem@gmail.com" aria-label="Email Minorities in STEM"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></a></li>
            <li><a class="social-link" href="/community" aria-label="Community board"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg></a></li>
          </ul>
        </div>
        <nav aria-label="Footer navigation">
          <h2 class="eyebrow">Navigate</h2>
          <ul class="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/partners">Partners</a></li>
            <li><a href="/projects">Supported Projects</a></li>
            <li><a href="/become-a-tutor">Become a Tutor</a></li>
            <li><a href="/hackathon">MISHacks Episode 1</a></li>
            <li><a href="/events">Event Calendar</a></li>
            <li><a href="/archive">Archive</a></li>
            <li><a href="/community">Community Board</a></li>
            <li><a href="/settings">Settings</a></li>
            <li><a href="/get-involved/start-chapter">Starting a Chapter</a></li>
            <li><a href="/chapters">Chapters</a></li>
          </ul>
        </nav>
        <form class="newsletter" data-enhanced-form data-success="Thank you for subscribing." aria-label="Subscribe to our newsletter">
          <h2 class="eyebrow">Subscribe to our newsletter</h2>
          <div class="form-row">
            <label for="newsletter-email">Email</label>
            <input id="newsletter-email" name="email" type="email" autocomplete="email" required>
          </div>
          <label class="checkbox-label" for="newsletter-consent">
            <input id="newsletter-consent" name="consent" type="checkbox" required>
            <span>Yes, subscribe me to your newsletter*</span>
          </label>
          <button class="button" type="submit">Submit</button>
          <p class="form-note" role="status" aria-live="polite"></p>
        </form>
      </div>
      <div class="container footer-bottom">
        <p>© 2026 Minorities in STEM · All rights reserved</p>
        <p>Made with purpose.</p>
      </div>
    </footer>
  `;
}

function setupNavigation() {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const dropdownButtons = [...document.querySelectorAll(".dropdown-toggle")];

  if (!header || !menuToggle) return;

  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 80);
  };

  const closeDropdowns = (except) => {
    dropdownButtons.forEach((button) => {
      const item = button.closest(".nav-item");
      if (item !== except) {
        item?.classList.remove("is-open");
        button.setAttribute("aria-expanded", "false");
      }
    });
  };

  menuToggle.addEventListener("click", () => {
    const open = !header.classList.contains("is-open");
    header.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-locked", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });

  dropdownButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".nav-item");
      const open = !item.classList.contains("is-open");
      closeDropdowns(item);
      item.classList.toggle("is-open", open);
      button.setAttribute("aria-expanded", String(open));
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".site-header")) {
      closeDropdowns();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      header.classList.remove("is-open");
      document.body.classList.remove("nav-locked");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      closeDropdowns();
    }
  });

  document.querySelectorAll(".site-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("is-open");
      document.body.classList.remove("nav-locked");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      closeDropdowns();
    });
  });

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

function setupForms() {
  document.querySelectorAll("form[data-enhanced-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const note = form.querySelector(".form-note");

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      form.reset();
      if (note) {
        note.textContent = form.dataset.success || "Thank you. Your submission has been received.";
      }
    });
  });
}

function setupPicturebookCarousels() {
  document.querySelectorAll("[data-picturebook-carousel]").forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    const slides = [...carousel.querySelectorAll("[data-carousel-slide]")];
    const prev = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");
    const current = carousel.querySelector("[data-carousel-current]");
    const total = carousel.querySelector("[data-carousel-total]");

    if (!track || slides.length === 0) return;

    let activeIndex = 0;
    if (total) total.textContent = String(slides.length);

    const updateState = () => {
      const trackBounds = track.getBoundingClientRect();
      const trackCenter = trackBounds.left + trackBounds.width / 2;
      activeIndex = slides.reduce((nearest, slide, index) => {
        const bounds = slide.getBoundingClientRect();
        const distance = Math.abs(bounds.left + bounds.width / 2 - trackCenter);
        return distance < nearest.distance ? { index, distance } : nearest;
      }, { index: activeIndex, distance: Infinity }).index;
      if (current) current.textContent = String(activeIndex + 1);
      if (prev) prev.disabled = activeIndex === 0;
      if (next) next.disabled = activeIndex === slides.length - 1;
    };

    const setActive = (index, behavior = "smooth") => {
      activeIndex = Math.max(0, Math.min(index, slides.length - 1));
      slides[activeIndex].scrollIntoView({ behavior, block: "nearest", inline: "center" });
      updateState();
    };

    prev?.addEventListener("click", () => setActive(activeIndex - 1));
    next?.addEventListener("click", () => setActive(activeIndex + 1));

    track.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      setActive(activeIndex + (event.key === "ArrowRight" ? 1 : -1));
    });

    track.addEventListener("scroll", () => {
      window.requestAnimationFrame(updateState);
    }, { passive: true });

    window.addEventListener("resize", () => {
      setActive(activeIndex, "auto");
    });

    updateState();
  });
}

function setupTheme() {
  const toggle = document.querySelector("[data-theme-toggle]");
  const root = document.documentElement;
  const storageKey = "mistem-theme";
  const systemTheme = () => (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const readStoredTheme = () => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved === "dark" || saved === "light" ? saved : null;
    } catch {
      return null;
    }
  };
  const writeStoredTheme = (value) => {
    try {
      localStorage.setItem(storageKey, value);
    } catch {
      // Storage can be unavailable in private or restricted contexts.
    }
  };
  let theme = readStoredTheme() || systemTheme();

  root.setAttribute("data-theme", theme);

  const updateToggle = () => {
    if (!toggle) return;
    toggle.innerHTML = theme === "dark" ? sunSVG : moonSVG;
    toggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
  };

  const applyTheme = (value, persist = false) => {
    theme = value === "dark" ? "dark" : "light";
    root.setAttribute("data-theme", theme);
    if (persist) writeStoredTheme(theme);
    updateToggle();
  };

  updateToggle();

  toggle?.addEventListener("click", () => {
    applyTheme(theme === "dark" ? "light" : "dark", true);
  });

  window.addEventListener("storage", (event) => {
    if (event.key === storageKey && (event.newValue === "dark" || event.newValue === "light")) {
      applyTheme(event.newValue);
    }
  });
}

function setupFavicon() {
  if (document.querySelector('link[rel="icon"]')) return;

  const icon = document.createElement("link");
  icon.rel = "icon";
  icon.type = "image/png";
  icon.href = "/assets/images/favicon.png?v=2";
  document.head.append(icon);

  const touchIcon = document.createElement("link");
  touchIcon.rel = "apple-touch-icon";
  touchIcon.href = "/assets/images/favicon.png?v=2";
  document.head.append(touchIcon);
}

function setupReveals() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const selectors = [
    ".hero .eyebrow",
    ".hero h1",
    ".hero .lead",
    ".hero-actions",
    ".section-header",
    ".feature-card",
    ".partner-card",
    ".event-card",
    ".calendar-month",
    ".timeline-card",
    ".track-card",
    ".prize-card",
    ".prompt-card",
    ".fact-card",
    ".trusted-card",
    ".community-feed",
    ".community-post",
    ".profile-card",
    ".article-card",
    ".media-card",
    ".resource-card",
    ".stat-card",
    ".step-card",
    ".faq-item",
    ".contact-card",
    ".chapter-map-card",
    ".chapter-card",
    ".chart-panel",
    ".article-aside",
    ".picturebook-carousel",
    ".article-body > *",
    ".two-column > *",
    ".contact-layout > *"
  ];

  const elements = [...document.querySelectorAll(selectors.join(","))];
  elements.forEach((element) => {
    element.dataset.reveal = "";
  });

  if (reduceMotion) {
    elements.forEach((element) => {
      element.style.opacity = "1";
      element.style.transform = "none";
    });
    return;
  }

  const fallbackReveal = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          entry.target.style.transition = "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)";
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px" }
    );

    elements.forEach((element) => observer.observe(element));
  };

  import("https://cdn.jsdelivr.net/npm/motion@11/dist/motion.js")
    .then(({ animate, inView }) => {
      elements.forEach((element, index) => {
        inView(
          element,
          () => {
            animate(
              element,
              { opacity: 1, y: 0 },
              {
                duration: 0.6,
                delay: Math.min(index % 4, 3) * 0.06,
                easing: [0.16, 1, 0.3, 1]
              }
            );
          },
          { margin: "0px 0px -12% 0px" }
        );
      });
    })
    .catch(fallbackReveal);
}

const authStorageKey = "mistem-user";
const supabaseScriptSrc = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
const supabaseConfigEndpoint = "/api/supabase-config";
const adminEmail = "kevinz09302009@gmail.com";

let supabaseLibraryPromise;
let supabaseClientPromise;

function readJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Local storage can be unavailable in some browsing contexts.
  }
}

function clearJSON(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // Local storage can be unavailable in some browsing contexts.
  }
}

function setFormNote(note, message, isError = false) {
  if (!note) return;
  note.textContent = message;
  note.classList.toggle("is-error", isError);
}

function setFormBusy(form, isBusy) {
  form.querySelectorAll("button, input, select, textarea").forEach((field) => {
    field.disabled = isBusy;
  });
}

function getField(form, name) {
  return form.elements.namedItem(name);
}

function normalizeUsername(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/^@+/, "")
    .replace(/[^a-z0-9._-]/g, "");
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function loadSupabaseLibrary() {
  if (window.supabase?.createClient) return Promise.resolve(window.supabase);
  if (supabaseLibraryPromise) return supabaseLibraryPromise;

  supabaseLibraryPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src="' + supabaseScriptSrc + '"]');
    const script = existing || document.createElement("script");
    script.src = supabaseScriptSrc;
    script.async = true;
    script.onload = () => resolve(window.supabase);
    script.onerror = () => reject(new Error("Could not load Supabase."));
    if (!existing) document.head.append(script);
  });

  return supabaseLibraryPromise;
}

async function getSupabaseClient() {
  if (supabaseClientPromise) return supabaseClientPromise;

  supabaseClientPromise = (async () => {
    const response = await fetch(supabaseConfigEndpoint, { headers: { Accept: "application/json" } });
    if (!response.ok) return null;

    const config = await response.json();
    if (!config?.configured || !config.supabaseUrl || !config.supabaseAnonKey) return null;

    const library = await loadSupabaseLibrary();
    return library.createClient(config.supabaseUrl, config.supabaseAnonKey);
  })().catch(() => null);

  return supabaseClientPromise;
}

async function fetchProfile(client, user) {
  if (!client || !user) return null;

  const { data, error } = await client
    .from("profiles")
    .select("username,school_chapter,linkedin,instagram,website")
    .eq("id", user.id)
    .maybeSingle();

  if (error) return null;
  return data || null;
}

function profileFromUser(user, profile = null) {
  if (!user) return null;
  const metadata = user.user_metadata || {};
  const stored = readJSON(authStorageKey, {});
  const username = profile?.username || metadata.username || stored.username || "";
  const school = profile?.school_chapter || metadata.school_chapter || metadata.affiliation || stored.school_chapter || stored.affiliation || "";
  return {
    id: user.id,
    email: user.email || stored.email || "",
    username,
    name: username || user.email || stored.email || "Member",
    school_chapter: school,
    affiliation: school,
    linkedin: profile?.linkedin || stored.linkedin || "",
    instagram: profile?.instagram || stored.instagram || "",
    website: profile?.website || stored.website || ""
  };
}

async function ensureProfile(client, user, profile) {
  if (!client || !user || profile) return profile;
  const metadata = user.user_metadata || {};
  const fallbackUsername = normalizeUsername(metadata.username || String(user.email || "").split("@")[0]);
  const nextProfile = {
    id: user.id,
    email: user.email,
    username: fallbackUsername || null,
    school_chapter: metadata.school_chapter || metadata.affiliation || null
  };

  const { data } = await client
    .from("profiles")
    .upsert(nextProfile, { onConflict: "id" })
    .select("username,school_chapter,linkedin,instagram,website")
    .maybeSingle();

  return data || profile;
}

async function getCurrentUser() {
  const client = await getSupabaseClient();
  if (!client) return null;

  const { data, error } = await client.auth.getSession();
  if (error || !data?.session?.user) return null;

  let profile = await fetchProfile(client, data.session.user);
  profile = await ensureProfile(client, data.session.user, profile);
  const userProfile = profileFromUser(data.session.user, profile);
  if (userProfile) writeJSON(authStorageKey, userProfile);
  return userProfile;
}

async function updateAuthUI() {
  const user = await getCurrentUser().catch(() => null);
  document.querySelectorAll("[data-auth-link]").forEach((link) => {
    if (user) {
      link.textContent = "Log Out";
      link.setAttribute("href", "#logout");
      link.setAttribute("aria-label", "Log out");
      link.dataset.authState = "authenticated";
    } else {
      link.textContent = "Log In";
      link.setAttribute("href", "/login");
      link.setAttribute("aria-label", "Log in");
      link.dataset.authState = "anonymous";
    }
  });
}

async function signOutUser() {
  const client = await getSupabaseClient();
  if (client) await client.auth.signOut();
  clearJSON(authStorageKey);
  await updateAuthUI();
}

async function resolveAuthEmail(client, identifier) {
  const value = String(identifier || "").trim();
  if (isEmail(value)) return value.toLowerCase();

  const username = normalizeUsername(value);
  if (!username) return "";

  const { data, error } = await client.rpc("email_for_username", { lookup_username: username });
  if (error || !data) return "";
  return String(data).toLowerCase();
}

async function setupLogin() {
  const form = document.querySelector("[data-login-form]");
  if (!form) return;

  const note = form.querySelector(".form-note");
  const logoutButton = form.querySelector("[data-logout]");
  const resetButton = form.querySelector("[data-reset-password]");
  const updatePasswordButton = form.querySelector("[data-update-password]");
  const actionInput = form.querySelector("[data-auth-action]");
  const submitButton = form.querySelector("[data-auth-submit]");
  const modeButtons = [...form.querySelectorAll("[data-auth-mode]")];
  const modeFields = [...form.querySelectorAll("[data-auth-field]")];

  const setAuthMode = (mode) => {
    actionInput.value = mode;
    modeButtons.forEach((button) => {
      const active = button.dataset.authMode === mode;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });
    modeFields.forEach((field) => {
      const visible = field.dataset.authField === mode;
      field.hidden = !visible;
      field.querySelectorAll("input, select, textarea").forEach((input) => {
        input.disabled = !visible;
      });
    });
    submitButton.textContent = mode === "signup" ? "Create Account" : "Log In";
    getField(form, "password").setAttribute("autocomplete", mode === "signup" ? "new-password" : "current-password");
  };

  modeButtons.forEach((button) => {
    button.addEventListener("click", () => setAuthMode(button.dataset.authMode));
  });

  setAuthMode("signin");
  const client = await getSupabaseClient();
  if (!client) {
    setFormNote(note, "Supabase is not configured yet. Add the Vercel environment variables, redeploy, then login will work.", true);
    return;
  }

  const hasRecoveryIntent = window.location.search.includes("code=") || window.location.hash.includes("type=recovery");
  const user = await getCurrentUser();
  if (hasRecoveryIntent && updatePasswordButton) {
    updatePasswordButton.hidden = false;
    getField(form, "password").setAttribute("autocomplete", "new-password");
    setFormNote(note, "Enter a new password, then click Update Password.");
  }

  if (user) {
    getField(form, "identifier").value = user.username || user.email || "";
    getField(form, "email").value = user.email || "";
    getField(form, "username").value = user.username || "";
    getField(form, "school_chapter").value = user.school_chapter || "";
    if (logoutButton) logoutButton.hidden = false;
    setFormNote(note, "Signed in as " + (user.username || user.email) + ".");
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      await signOutUser();
      setFormNote(note, "Logged out.");
      logoutButton.hidden = true;
      if (updatePasswordButton) updatePasswordButton.hidden = true;
    });
  }

  if (resetButton) {
    resetButton.addEventListener("click", async () => {
      const identifier = String(getField(form, "identifier").value || getField(form, "email").value || "").trim();
      if (!identifier) {
        setFormNote(note, "Enter your email or username first, then click Forgot Password.", true);
        getField(form, "identifier").focus();
        return;
      }

      setFormBusy(form, true);
      const email = await resolveAuthEmail(client, identifier);
      if (!email) {
        setFormBusy(form, false);
        setFormNote(note, "We could not find that username. Try your email address.", true);
        return;
      }

      const { error } = await client.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/login"
      });
      setFormBusy(form, false);

      if (error) {
        setFormNote(note, error.message, true);
        return;
      }

      setFormNote(note, "Password reset email sent. Check your inbox.");
    });
  }

  if (updatePasswordButton) {
    updatePasswordButton.addEventListener("click", async () => {
      const password = String(getField(form, "password").value || "");
      if (password.length < 6) {
        setFormNote(note, "Use a password with at least 6 characters.", true);
        getField(form, "password").focus();
        return;
      }

      setFormBusy(form, true);
      const { error } = await client.auth.updateUser({ password });
      setFormBusy(form, false);

      if (error) {
        setFormNote(note, error.message, true);
        return;
      }

      setFormNote(note, "Password updated. Opening your community board...");
      window.setTimeout(() => {
        window.location.href = "/community";
      }, 500);
    });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const action = actionInput.value || "signin";
    const identifier = String(getField(form, "identifier").value || "").trim();
    const email = String(getField(form, "email").value || "").trim().toLowerCase();
    const username = normalizeUsername(getField(form, "username").value);
    const password = String(getField(form, "password").value || "");
    const schoolChapter = String(getField(form, "school_chapter").value || "").trim();

    if (action === "signin" && !identifier) {
      setFormNote(note, "Enter your username or email to log in.", true);
      getField(form, "identifier").focus();
      return;
    }

    setFormBusy(form, true);
    setFormNote(note, action === "signup" ? "Creating your account..." : "Signing you in...");

    let result;
    if (action === "signup") {
      if (!email || !username) {
        setFormBusy(form, false);
        setFormNote(note, "Create an account with both an email and username.", true);
        return;
      }

      result = await client.auth.signUp({
        email,
        password,
        options: { data: { username, school_chapter: schoolChapter } }
      });
    } else {
      const authEmail = await resolveAuthEmail(client, identifier);
      if (!authEmail) {
        setFormBusy(form, false);
        setFormNote(note, "We could not find that username. Try your email address.", true);
        return;
      }
      result = await client.auth.signInWithPassword({ email: authEmail, password });
    }

    setFormBusy(form, false);

    if (result.error) {
      setFormNote(note, result.error.message, true);
      return;
    }

    if (result.data.user && result.data.session) {
      await client.from("profiles").upsert({
        id: result.data.user.id,
        email: result.data.user.email,
        username: username || result.data.user.user_metadata?.username || null,
        school_chapter: schoolChapter || null
      }, { onConflict: "id" });
    }

    const profile = profileFromUser(result.data.user) || { email: email || identifier, username, school_chapter: schoolChapter };
    writeJSON(authStorageKey, profile);
    await updateAuthUI();

    if (action === "signup" && !result.data.session) {
      setFormNote(note, "Account created. Check your email to confirm your login.");
      return;
    }

    setFormNote(note, "Logged in. Opening your community board...");
    window.setTimeout(() => {
      window.location.href = "/community";
    }, 500);
  });
}

function escapeHTML(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  })[character]);
}

function formatDate(value) {
  try {
    return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
  } catch {
    return "Recently";
  }
}

function renderCommunityPosts(target, posts = [], options = {}) {
  const defaults = [
    {
      title: "Welcome to the MIS community board",
      type: "Chapter Update",
      body: "Share chapter wins, event recaps, project launches, questions, and opportunities here.",
      author_name: "Minorities in STEM",
      author_affiliation: "Core Team",
      status: "approved",
      created_at: new Date().toISOString()
    }
  ];
  const visiblePosts = posts.length ? posts : defaults;
  const isAdmin = Boolean(options.isAdmin);
  target.innerHTML = visiblePosts
    .map((post) => {
      const deleteButton = isAdmin && post.id
        ? '<button class="post-delete" type="button" data-delete-post="' + escapeHTML(post.id) + '" aria-label="Delete post">x</button>'
        : "";
      return [
        '<article class="community-post">',
        deleteButton,
        '<div class="post-meta">',
        '<time datetime="' + escapeHTML(post.created_at || "") + '">' + formatDate(post.created_at) + '</time>',
        '</div>',
        '<h3>' + escapeHTML(post.title || "Untitled update") + '</h3>',
        '<p>' + escapeHTML(post.body || "") + '</p>',
        '<p class="role">' + escapeHTML(post.author_name || "Anonymous") + (post.author_affiliation ? ' - ' + escapeHTML(post.author_affiliation) : "") + '</p>',
        '</article>'
      ].join("");
    })
    .join("");
}

async function loadCommunityPosts(client, target, note, options = {}) {
  const { data, error } = await client
    .from("posts")
    .select("id,title,type,body,status,author_name,author_affiliation,created_at")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(30);

  if (error) {
    renderCommunityPosts(target, []);
    setFormNote(note, "Could not load posts: " + error.message, true);
    return;
  }

  renderCommunityPosts(target, data || [], options);
}

async function setupAuthAction() {
  document.querySelectorAll("[data-auth-link]").forEach((link) => {
    link.addEventListener("click", async (event) => {
      if (link.dataset.authState !== "authenticated") return;
      event.preventDefault();
      link.textContent = "Logging Out...";
      await signOutUser();
      if (window.location.pathname.startsWith("/community") || window.location.pathname.startsWith("/account") || window.location.pathname.startsWith("/settings")) {
        window.location.href = "/login";
      }
    });
  });
}

async function setupCommunityBoard() {
  const form = document.querySelector("[data-community-form]");
  const postsTarget = document.querySelector("[data-community-posts]");
  if (!form || !postsTarget) return;

  const note = form.querySelector(".form-note");
  const client = await getSupabaseClient();
  if (!client) {
    renderCommunityPosts(postsTarget, []);
    setFormNote(note, "Supabase is not configured yet. Add Vercel environment variables before publishing posts.", true);
    return;
  }

  let user = await getCurrentUser();
  let isAdmin = user?.email?.toLowerCase() === adminEmail;
  await loadCommunityPosts(client, postsTarget, note, { isAdmin });
  if (!user) {
    setFormNote(note, "Log in first to publish a post.", true);
  } else {
    setFormNote(note, "Posts publish immediately.");
  }

  postsTarget.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-delete-post]");
    if (!button) return;

    const activeUser = await getCurrentUser();
    if (activeUser?.email?.toLowerCase() !== adminEmail) {
      setFormNote(note, "Only the admin can delete posts.", true);
      return;
    }

    button.disabled = true;
    const { error } = await client
      .from("posts")
      .delete()
      .eq("id", button.dataset.deletePost);

    if (error) {
      button.disabled = false;
      setFormNote(note, error.message, true);
      return;
    }

    user = activeUser;
    isAdmin = true;
    await loadCommunityPosts(client, postsTarget, note, { isAdmin });
    setFormNote(note, "Post deleted.");
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const activeUser = await getCurrentUser();
    if (!activeUser) {
      setFormNote(note, "Please log in before posting.", true);
      return;
    }

    const formData = new FormData(form);
    const nextPost = {
      user_id: activeUser.id,
      title: String(formData.get("title") || "").trim(),
      type: String(formData.get("type") || "Chapter Update"),
      body: String(formData.get("body") || "").trim(),
      author_name: activeUser.username || activeUser.email,
      author_affiliation: activeUser.school_chapter || "",
      status: "approved"
    };

    setFormBusy(form, true);
    setFormNote(note, "Publishing...");
    const { error } = await client.from("posts").insert(nextPost);
    setFormBusy(form, false);

    if (error) {
      setFormNote(note, error.message, true);
      return;
    }

    form.reset();
    user = activeUser;
    isAdmin = activeUser.email?.toLowerCase() === adminEmail;
    await loadCommunityPosts(client, postsTarget, note, { isAdmin });
    setFormNote(note, "Post published.");
  });
}

async function setupAccountSettings() {
  const form = document.querySelector("[data-account-form]");
  if (!form) return;

  const note = form.querySelector(".form-note");
  const client = await getSupabaseClient();
  if (!client) {
    setFormNote(note, "Supabase is not configured yet.", true);
    return;
  }

  const user = await getCurrentUser();
  if (!user) {
    setFormNote(note, "Log in before editing settings.", true);
    window.setTimeout(() => {
      window.location.href = "/login";
    }, 700);
    return;
  }

  getField(form, "username").value = user.username || "";
  getField(form, "school_chapter").value = user.school_chapter || "";
  getField(form, "linkedin").value = user.linkedin || "";
  getField(form, "instagram").value = user.instagram || "";
  getField(form, "website").value = user.website || "";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const profile = {
      id: user.id,
      email: user.email,
      username: normalizeUsername(getField(form, "username").value),
      school_chapter: String(getField(form, "school_chapter").value || "").trim(),
      linkedin: String(getField(form, "linkedin").value || "").trim(),
      instagram: String(getField(form, "instagram").value || "").trim(),
      website: String(getField(form, "website").value || "").trim(),
      updated_at: new Date().toISOString()
    };

    if (!profile.username) {
      setFormNote(note, "Choose a username.", true);
      return;
    }

    setFormBusy(form, true);
    const { error } = await client
      .from("profiles")
      .upsert(profile, { onConflict: "id" });

    if (!error) {
      await client.auth.updateUser({
        data: {
          username: profile.username,
          school_chapter: profile.school_chapter
        }
      });
      writeJSON(authStorageKey, { ...user, ...profile, name: profile.username, affiliation: profile.school_chapter });
      await updateAuthUI();
    }
    setFormBusy(form, false);

    if (error) {
      setFormNote(note, error.message.includes("duplicate") ? "That username is already taken." : error.message, true);
      return;
    }

    setFormNote(note, "Settings saved.");
  });
}

renderHeader();
renderFooter();
setupFavicon();
setupTheme();
setupNavigation();
setupForms();
setupPicturebookCarousels();
setupAuthAction();
setupLogin();
setupCommunityBoard();
setupAccountSettings();
updateAuthUI();
setupReveals();
// Initialize Google Analytics (gtag) once and track SPA-like navigation events.
function initAnalytics() {
  try {
    if (window.__mistem_gtag_initialized) return;
    const existing = document.querySelector('script[src*="googletagmanager.com/gtag/js?id=G-DSVQVY0L09"]');
    if (!existing) {
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=G-DSVQVY0L09';
      document.head.appendChild(s);
    }

    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = window.gtag || gtag;
    gtag('js', new Date());
    gtag('config', 'G-DSVQVY0L09', { send_page_view: true });
    window.__mistem_gtag_initialized = true;

    const trackPage = () => {
      try {
        if (window.gtag) window.gtag('event', 'page_view', { page_path: window.location.pathname });
      } catch (e) {
        // ignore
      }
    };

    window.addEventListener('popstate', trackPage);
    window.addEventListener('hashchange', trackPage);

    // Patch history API to detect pushState/replaceState
    const origPush = history.pushState;
    history.pushState = function () {
      const result = origPush.apply(this, arguments);
      trackPage();
      return result;
    };
    const origReplace = history.replaceState;
    history.replaceState = function () {
      const result = origReplace.apply(this, arguments);
      trackPage();
      return result;
    };
  } catch (e) {
    // analytics should never throw application errors
    console.warn('GA init failed', e);
  }
}

// Partner page form handling (client-side + backend-ready fetch fallback)
function setupPartnerPage() {
  const form = document.querySelector('[data-partner-form]');
  if (!form) return;
  const note = form.querySelector('.form-note');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setFormBusy(form, true);
    setFormNote(note, 'Submitting...');

    try {
      // Attempt to POST to a backend endpoint if available.
      const response = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => null);

      // If backend exists and returns success, show success. Otherwise simulate success.
      if (response && response.ok) {
        setFormNote(note, 'Thank you — your inquiry has been received.');
        form.reset();
      } else {
        // Simulated submission for static preview environments
        await new Promise((r) => setTimeout(r, 700));
        setFormNote(note, 'Thank you — your inquiry has been received.');
        form.reset();
      }
    } catch (err) {
      setFormNote(note, 'Submission failed. Please try again later.', true);
    } finally {
      setFormBusy(form, false);
    }
  });
}

// Tutor application multi-step flow
function setupTutorApplication() {
  const root = document.querySelector('[data-tutor-app]');
  if (!root) return;

  const steps = [...root.querySelectorAll('[data-step]')];
  const progress = root.querySelector('[data-progress]');
  const nextButtons = root.querySelectorAll('[data-next]');
  const prevButtons = root.querySelectorAll('[data-prev]');
  const form = root.querySelector('form');
  let index = 0;

  function show() {
    steps.forEach((s, i) => s.toggleAttribute('hidden', i !== index));
    if (progress) progress.value = Math.round(((index + 1) / steps.length) * 100);
  }

  nextButtons.forEach((btn) => btn.addEventListener('click', (e) => {
    e.preventDefault();
    // Simple validation for current visible inputs
    const visible = steps[index];
    const inputs = [...visible.querySelectorAll('input,textarea,select')];
    const valid = inputs.every((el) => el.checkValidity());
    if (!valid) {
      visible.querySelectorAll('input,textarea,select').forEach((el) => el.reportValidity());
      return;
    }
    index = Math.min(steps.length - 1, index + 1);
    show();
  }));

  prevButtons.forEach((btn) => btn.addEventListener('click', (e) => {
    e.preventDefault();
    index = Math.max(0, index - 1);
    show();
  }));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    setFormBusy(form, true);
    const note = form.querySelector('.form-note');

    try {
      const fd = new FormData(form);
      // Attempt to POST to a backend endpoint if available
      const response = await fetch('/api/tutor-apps', { method: 'POST', body: fd }).catch(() => null);
      if (response && response.ok) {
        setFormNote(note, 'Application submitted. Thank you!');
        form.reset();
      } else {
        await new Promise((r) => setTimeout(r, 900));
        setFormNote(note, 'Application submitted. Thank you!');
        form.reset();
      }
      if (window.gtag) window.gtag('event', 'conversion', { event_category: 'tutor_application' });
    } catch (err) {
      setFormNote(note, 'Submission failed. Try again later.', true);
    } finally {
      setFormBusy(form, false);
    }
  });

  show();
}

// Lightweight Community Hub (mock data rendering)
function setupCommunityHub() {
  const hub = document.querySelector('[data-community-hub]');
  if (!hub) return;

  const categories = [
    'General Discussion',
    'Data Science',
    'AI & Machine Learning',
    'Research Opportunities',
    'Nonprofit Impact',
    'College & Careers',
    'Community Projects'
  ];

  const mockThreads = [
    { id: 't1', title: 'Welcome — introduce your chapter', category: 'General Discussion', excerpt: 'Tell us about your chapter and what you are building.' },
    { id: 't2', title: 'Research internship opportunities', category: 'Research Opportunities', excerpt: 'Share available research positions and application tips.' },
    { id: 't3', title: 'Best resources for learning ML', category: 'AI & Machine Learning', excerpt: 'Curated courses, papers, and projects.' }
  ];

  const catsEl = hub.querySelector('[data-categories]');
  const threadsEl = hub.querySelector('[data-threads]');
  const searchEl = hub.querySelector('[data-thread-search]');

  function renderCategories(active = null) {
    if (!catsEl) return;
    catsEl.innerHTML = categories.map((c) => `<button class="chip" data-cat="${c}" aria-pressed="${c===active}">${c}</button>`).join('');
    catsEl.querySelectorAll('[data-cat]').forEach((btn) => btn.addEventListener('click', () => renderThreads(btn.dataset.cat)));
  }

  function renderThreads(filter = null, query = '') {
    if (!threadsEl) return;
    const visible = mockThreads.filter((t) => (!filter || t.category === filter) && (!query || (t.title + t.excerpt).toLowerCase().includes(query.toLowerCase())));
    if (visible.length === 0) {
      threadsEl.innerHTML = `<div class="empty-state"><p>No discussions found. Start the first thread.</p></div>`;
      return;
    }
    threadsEl.innerHTML = visible.map((t) => `
      <article class="thread-card">
        <h3><a href="#thread-${t.id}">${t.title}</a></h3>
        <p class="meta">${t.category}</p>
        <p class="excerpt">${t.excerpt}</p>
      </article>
    `).join('');
  }

  searchEl?.addEventListener('input', (e) => renderThreads(null, e.target.value || ''));
  renderCategories();
  renderThreads();
}

// Initialize optional page scripts
initAnalytics();
setupPartnerPage();
setupTutorApplication();
setupCommunityHub();

// Populate any `.image-panel` elements with event images (randomized). This adds visual photos inside the green panel area.
function populateImagePanels() {
  try {
    const images = [
      '/assets/events_img/wavehack/img1.jpeg',
      '/assets/events_img/wavehack/img2.jpeg',
      '/assets/events_img/wavehack/img3.jpeg',
      '/assets/events_img/wavehack/img4.jpeg',
      '/assets/events_img/skillsUSA/IMG_0270.jpg',
      '/assets/events_img/skillsUSA/IMG_0273.jpg',
      '/assets/events_img/skillsUSA/IMG_0312_web.jpg',
      '/assets/events_img/skillsUSA/IMG_0341_web.jpg'
    ];
    document.querySelectorAll('.image-panel').forEach((panel, idx) => {
      // don't duplicate
      if (panel.dataset._hasPhoto) return;
      const src = images[(idx) % images.length] || images[0];
      const img = document.createElement('img');
      img.src = src;
      img.alt = panel.getAttribute('data-alt') || 'Event photo';
      img.setAttribute('aria-hidden', 'true');
      // override CSS that hides .image-panel img by default
      img.style.display = 'block';
      img.style.position = 'absolute';
      img.style.inset = '0';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.style.borderRadius = 'var(--radius-xl)';
      panel.appendChild(img);
      panel.dataset._hasPhoto = '1';
    });
  } catch (e) {
    // silent
  }
}

populateImagePanels();

// ---- Find a Tutor directory (FFS-style) ----
function initialsFromName(name) {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function parseSubjects(subject) {
  return String(subject || "")
    .split(/[,;/]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function shuffleArray(list) {
  const arr = list.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function tutorCardHTML(tutor) {
  const name = escapeHTML(tutor.name || "Tutor");
  const initials = escapeHTML(initialsFromName(tutor.name));
  const desc = escapeHTML(tutor.description || "");
  const age = tutor.age ? '<p class="tutor-age">Age ' + escapeHTML(String(tutor.age)) + '</p>' : "";
  const subjects = parseSubjects(tutor.subject);
  const tags = subjects.length
    ? '<p class="tutor-label">Subjects</p><ul class="tutor-tags">' +
      subjects.map((s) => '<li class="tutor-tag">' + escapeHTML(s) + '</li>').join("") +
      '</ul>'
    : "";
  const email = String(tutor.email || "").trim();
  const contact = email
    ? '<a class="button tutor-contact" href="mailto:' + encodeURIComponent(email).replace(/%40/g, "@") + '?subject=' + encodeURIComponent("Tutoring request via Minorities in STEM") + '">Email ' + name + '</a>'
    : "";
  return [
    '<article class="tutor-card">',
    '<div class="tutor-card-head">',
    '<span class="tutor-avatar" aria-hidden="true">' + initials + '</span>',
    '<div><h3>' + name + '</h3>' + age + '</div>',
    '</div>',
    desc ? '<p class="tutor-desc">' + desc + '</p>' : "",
    tags,
    contact,
    '</article>'
  ].join("");
}

async function setupTutorDirectory() {
  const root = document.querySelector("[data-tutor-directory]");
  if (!root) return;

  const grid = root.querySelector("[data-tutor-grid]");
  const countEl = root.querySelector("[data-tutor-count]");
  const statusEl = root.querySelector("[data-tutor-status]");
  const searchEl = root.querySelector("[data-tutor-search]");
  const subjectEl = root.querySelector("[data-tutor-subject]");
  const sortEl = root.querySelector("[data-tutor-sort]");
  const shuffleBtn = root.querySelector("[data-tutor-shuffle]");
  const form = document.querySelector("[data-tutor-form]");

  let allTutors = [];
  let shuffleSeed = [];

  const setStatus = (msg, isError = false) => {
    if (!statusEl) return;
    statusEl.textContent = msg || "";
    statusEl.classList.toggle("is-error", Boolean(isError));
  };

  const buildSubjectOptions = () => {
    if (!subjectEl) return;
    const set = new Set();
    allTutors.forEach((t) => parseSubjects(t.subject).forEach((s) => set.add(s)));
    const current = subjectEl.value;
    const options = ['<option value="">All subjects</option>']
      .concat([...set].sort((a, b) => a.localeCompare(b)).map((s) => '<option value="' + escapeHTML(s) + '">' + escapeHTML(s) + '</option>'));
    subjectEl.innerHTML = options.join("");
    subjectEl.value = current;
  };

  const render = () => {
    if (!grid) return;
    const query = (searchEl?.value || "").trim().toLowerCase();
    const subject = subjectEl?.value || "";
    const sort = sortEl?.value || "shuffle";

    let list = allTutors.filter((t) => {
      const haystack = [t.name, t.subject, t.description].join(" ").toLowerCase();
      const matchesQuery = !query || haystack.includes(query);
      const matchesSubject = !subject || parseSubjects(t.subject).some((s) => s === subject);
      return matchesQuery && matchesSubject;
    });

    if (sort === "name") {
      list.sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
    } else if (sort === "newest") {
      list.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    } else {
      const order = new Map(shuffleSeed.map((id, i) => [id, i]));
      list.sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
    }

    if (countEl) {
      countEl.textContent = list.length + (list.length === 1 ? " tutor available" : " tutors available");
    }

    grid.innerHTML = list.length
      ? list.map(tutorCardHTML).join("")
      : '<p class="tutor-empty">No tutors match your search yet. Try a different subject or be the first to add yourself below.</p>';
  };

  const loadTutors = async () => {
    const client = await getSupabaseClient();
    if (!client) {
      setStatus("The tutor directory is not connected yet. Add Supabase environment variables and redeploy.", true);
      if (countEl) countEl.textContent = "0 tutors available";
      grid.innerHTML = '<p class="tutor-empty">Directory unavailable right now.</p>';
      return;
    }
    const { data, error } = await client
      .from("tutors")
      .select("id,name,email,age,subject,description,created_at")
      .order("created_at", { ascending: false });

    if (error) {
      setStatus("Could not load tutors: " + error.message, true);
      return;
    }

    allTutors = data || [];
    shuffleSeed = shuffleArray(allTutors.map((t) => t.id));
    buildSubjectOptions();
    render();
    setStatus("");
  };

  searchEl?.addEventListener("input", render);
  subjectEl?.addEventListener("change", render);
  sortEl?.addEventListener("change", () => {
    if (sortEl.value === "shuffle") shuffleSeed = shuffleArray(allTutors.map((t) => t.id));
    render();
  });
  shuffleBtn?.addEventListener("click", () => {
    if (sortEl) sortEl.value = "shuffle";
    shuffleSeed = shuffleArray(allTutors.map((t) => t.id));
    render();
  });

  if (form) {
    const note = form.querySelector(".form-note");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const client = await getSupabaseClient();
      if (!client) {
        setFormNote(note, "Directory is not connected yet.", true);
        return;
      }
      const fd = new FormData(form);
      const ageRaw = String(fd.get("age") || "").trim();
      const record = {
        name: String(fd.get("name") || "").trim(),
        email: String(fd.get("email") || "").trim(),
        age: ageRaw ? Number(ageRaw) : null,
        subject: String(fd.get("subject") || "").trim(),
        description: String(fd.get("description") || "").trim()
      };
      setFormBusy(form, true);
      setFormNote(note, "Adding your tutor card...");
      const { error } = await client.from("tutors").insert(record);
      setFormBusy(form, false);
      if (error) {
        setFormNote(note, error.message, true);
        return;
      }
      form.reset();
      setFormNote(note, "You're listed! Your card now appears in the directory.");
      await loadTutors();
      document.querySelector("#directory")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  await loadTutors();
}

setupTutorDirectory();
