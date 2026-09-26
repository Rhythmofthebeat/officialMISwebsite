"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { chapters } from "../data/chapters";

const center: [number, number] = [20, 0];

delete (L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: unknown })._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

const chapterIcon = L.divIcon({
  className: "chapter-leaflet-marker",
  html: '<span aria-hidden="true"></span>',
  iconSize: [28, 36],
  iconAnchor: [14, 34],
  popupAnchor: [0, -32]
});

export default function ChapterMapClient() {
  return (
    <div className="chapter-map-card">
      <MapContainer
        center={center}
        zoom={2}
        minZoom={2}
        scrollWheelZoom={false}
        className="leaflet-chapter-map"
        worldCopyJump
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {chapters.map((chapter) => (
          <Marker key={chapter.id} position={[chapter.lat, chapter.lng]} icon={chapterIcon}>
            <Popup>
              <div className="map-info-window">
                <h3>{chapter.name}</h3>
                <p>
                  {chapter.city}, {chapter.state}
                </p>
                <p>
                  <strong>{chapter.role ?? "Founder"}:</strong> {chapter.founder}
                </p>
                <p>{chapter.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
