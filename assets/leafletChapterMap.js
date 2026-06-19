import { chapters } from "./chapters.js";

const leafletCss = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const leafletJs = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

function loadStylesheet(href) {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.append(link);
}

function loadLeaflet() {
  if (window.L) return Promise.resolve(window.L);
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${leafletJs}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(window.L), { once: true });
      existing.addEventListener("error", () => reject(new Error("Leaflet failed to load.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = leafletJs;
    script.async = true;
    script.onload = () => resolve(window.L);
    script.onerror = () => reject(new Error("Leaflet failed to load."));
    document.head.append(script);
  });
}

function escapeHTML(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  })[character] || character);
}

function popupHTML(chapter) {
  return [
    '<div class="map-info-window">',
    '<h3>' + escapeHTML(chapter.name) + '</h3>',
    '<p>' + escapeHTML(chapter.city + ", " + chapter.state) + '</p>',
    '<p><strong>Founder:</strong> ' + escapeHTML(chapter.founder) + '</p>',
    '<p>' + escapeHTML(chapter.description) + '</p>',
    '</div>'
  ].join("");
}

function renderChapterList(list, map, markers) {
  if (!list) return;
  list.innerHTML = chapters
    .map((chapter, index) => (
      '<button type="button" data-map-location-index="' + index + '">' +
      '<strong>' + escapeHTML(chapter.name) + '</strong>' +
      '<span>' + escapeHTML(chapter.city + ", " + chapter.state) + '</span>' +
      '<span>' + escapeHTML("Founder: " + chapter.founder) + '</span>' +
      '</button>'
    ))
    .join("");

  list.querySelectorAll("[data-map-location-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.mapLocationIndex || 0);
      const chapter = chapters[index];
      map.setView([chapter.lat, chapter.lng], Math.max(map.getZoom(), 5));
      markers[index].openPopup();
    });
  });
}

async function setupLeafletChapterMap() {
  const element = document.querySelector("[data-leaflet-chapter-map]");
  if (!element) return;

  const list = document.querySelector("[data-leaflet-chapter-map-list]");
  const status = document.querySelector("[data-leaflet-map-status]");

  try {
    loadStylesheet(leafletCss);
    const L = await loadLeaflet();

    element.innerHTML = "";
    const map = L.map(element, {
      center: [20, 0],
      zoom: 2,
      minZoom: 2,
      scrollWheelZoom: false,
      worldCopyJump: true
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const icon = L.divIcon({
      className: "chapter-leaflet-marker",
      html: '<span aria-hidden="true"></span>',
      iconSize: [28, 36],
      iconAnchor: [14, 34],
      popupAnchor: [0, -32]
    });

    const markers = chapters.map((chapter) => (
      L.marker([chapter.lat, chapter.lng], { icon, title: chapter.name })
        .addTo(map)
        .bindPopup(popupHTML(chapter))
    ));

    renderChapterList(list, map, markers);
    if (status) status.textContent = "";
  } catch (error) {
    element.innerHTML = '<div class="map-empty-state"><p>The chapter map could not load right now.</p></div>';
    if (status) status.textContent = error instanceof Error ? error.message : "The chapter map could not load.";
  }
}

setupLeafletChapterMap();
