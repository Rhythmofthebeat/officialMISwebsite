import dynamic from "next/dynamic";

const ChapterMap = dynamic(() => import("./ChapterMapClient"), {
  ssr: false,
  loading: () => (
    <div className="chapter-map-card">
      <div className="leaflet-chapter-map map-empty-state">
        <p>Loading chapter map...</p>
      </div>
    </div>
  )
});

export default ChapterMap;
