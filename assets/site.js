const navigation = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    items: [
      { label: "Our Team", href: "/about/team" },
      { label: "Our Mission + Goal", href: "/about/mission" }
    ]
  },
  {
    label: "Get Involved",
    items: [
      { label: "Starting a Chapter", href: "/get-involved/start-chapter" },
      { label: "Partners", href: "/#partners" },
      { label: "Community Board", href: "/community" },
      { label: "Contact Us", href: "/contact" }
    ]
  },
  {
    label: "Initiatives",
    items: [{ label: "Community Inclusivity", href: "/initiatives/community-inclusivity" }]
  },
  {
    label: "Events",
    items: [
      { label: "MISHacks Episode 1", href: "/hackathon" },
      { label: "Event Calendar", href: "/events" }
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
            <li><a class="social-link" href="https://www.instagram.com/minoritiesin_stem/" target="_blank" rel="noopener" aria-label="Minorities in STEM on Instagram">Ig</a></li>
            <li><a class="social-link" href="https://www.linkedin.com/company/minoritiesinstem/" target="_blank" rel="noopener" aria-label="Minorities in STEM on LinkedIn">in</a></li>
            <li><a class="social-link" href="mailto:hello@minoritiesinstem.org" aria-label="Email Minorities in STEM">@</a></li>
            <li><a class="social-link" href="/community" aria-label="Community board">B</a></li>
          </ul>
        </div>
        <nav aria-label="Footer navigation">
          <h2 class="eyebrow">Navigate</h2>
          <ul class="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/hackathon">MISHacks Episode 1</a></li>
            <li><a href="/events">Event Calendar</a></li>
            <li><a href="/community">Community Board</a></li>
            <li><a href="/get-involved/start-chapter">Starting a Chapter</a></li>
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
    ".contact-card",
    ".chart-panel",
    ".article-aside",
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

function profileFromUser(user) {
  if (!user) return null;
  const metadata = user.user_metadata || {};
  const stored = readJSON(authStorageKey, {});
  return {
    id: user.id,
    email: user.email || stored.email || "",
    name: metadata.full_name || stored.name || user.email || "Member",
    affiliation: metadata.affiliation || stored.affiliation || ""
  };
}

async function getCurrentUser() {
  const client = await getSupabaseClient();
  if (!client) return null;

  const { data, error } = await client.auth.getSession();
  if (error || !data?.session?.user) return null;

  const profile = profileFromUser(data.session.user);
  if (profile) writeJSON(authStorageKey, profile);
  return profile;
}

async function updateAuthUI() {
  const user = await getCurrentUser().catch(() => null);
  document.querySelectorAll("[data-auth-link]").forEach((link) => {
    if (user) {
      link.textContent = "Workspace";
      link.setAttribute("href", "/community");
      link.setAttribute("aria-label", "Open " + (user.name || "your") + " workspace");
    } else {
      link.textContent = "Log In";
      link.setAttribute("href", "/login");
      link.setAttribute("aria-label", "Log in");
    }
  });
}

async function setupLogin() {
  const form = document.querySelector("[data-login-form]");
  if (!form) return;

  const note = form.querySelector(".form-note");
  const logoutButton = form.querySelector("[data-logout]");
  const client = await getSupabaseClient();
  if (!client) {
    setFormNote(note, "Supabase is not configured yet. Add the Vercel environment variables, redeploy, then login will work.", true);
    return;
  }

  const user = await getCurrentUser();
  if (user) {
    getField(form, "name").value = user.name || "";
    getField(form, "email").value = user.email || "";
    getField(form, "affiliation").value = user.affiliation || "";
    if (logoutButton) logoutButton.hidden = false;
    setFormNote(note, "Signed in as " + (user.name || user.email) + ".");
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      await client.auth.signOut();
      clearJSON(authStorageKey);
      await updateAuthUI();
      setFormNote(note, "Logged out.");
      logoutButton.hidden = true;
    });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const action = event.submitter?.value || "signin";
    const email = String(getField(form, "email").value || "").trim();
    const password = String(getField(form, "password").value || "");
    const name = String(getField(form, "name").value || "").trim();
    const affiliation = String(getField(form, "affiliation").value || "").trim();

    if (action === "signup" && !name) {
      setFormNote(note, "Add your name before creating an account.", true);
      return;
    }

    setFormBusy(form, true);
    setFormNote(note, action === "signup" ? "Creating your account..." : "Signing you in...");

    const result = action === "signup"
      ? await client.auth.signUp({
          email,
          password,
          options: { data: { full_name: name, affiliation } }
        })
      : await client.auth.signInWithPassword({ email, password });

    setFormBusy(form, false);

    if (result.error) {
      setFormNote(note, result.error.message, true);
      return;
    }

    const profile = profileFromUser(result.data.user) || { email, name, affiliation };
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

function renderCommunityPosts(target, posts = []) {
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
  target.innerHTML = visiblePosts
    .map((post) => {
      const status = post.status && post.status !== "approved" ? '<span class="tag muted-tag">' + escapeHTML(post.status) + '</span>' : "";
      return [
        '<article class="community-post">',
        '<div class="post-meta">',
        '<span class="tag">' + escapeHTML(post.type || "Update") + '</span>',
        status,
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

async function loadCommunityPosts(client, target, note) {
  const { data, error } = await client
    .from("posts")
    .select("id,title,type,body,status,author_name,author_affiliation,created_at")
    .order("created_at", { ascending: false })
    .limit(30);

  if (error) {
    renderCommunityPosts(target, []);
    setFormNote(note, "Could not load posts: " + error.message, true);
    return;
  }

  renderCommunityPosts(target, data || []);
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

  await loadCommunityPosts(client, postsTarget, note);
  const user = await getCurrentUser();
  if (!user) {
    setFormNote(note, "Log in first to publish a post.", true);
  }

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
      author_name: activeUser.name || activeUser.email,
      author_affiliation: activeUser.affiliation || "",
      status: "pending"
    };

    setFormBusy(form, true);
    setFormNote(note, "Submitting for approval...");
    const { error } = await client.from("posts").insert(nextPost);
    setFormBusy(form, false);

    if (error) {
      setFormNote(note, error.message, true);
      return;
    }

    form.reset();
    await loadCommunityPosts(client, postsTarget, note);
    setFormNote(note, "Post submitted. It will appear publicly after approval.");
  });
}

renderHeader();
renderFooter();
setupFavicon();
setupTheme();
setupNavigation();
setupForms();
setupLogin();
setupCommunityBoard();
updateAuthUI();
setupReveals();
