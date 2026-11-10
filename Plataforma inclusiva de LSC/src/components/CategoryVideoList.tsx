import { useState, useMemo } from "react";
import { CATEGORIES, VIDEO_LESSONS, type Category, type VideoLesson } from "../data/categoriesData";
import { Icon } from "./Icons";

interface CategoryVideoListProps {
  selectedCategoryId: "conversacion" | "canciones" | "historias";
  onSelectCategory: (categoryId: "conversacion" | "canciones" | "historias") => void;
  onSelectVideo: (video: VideoLesson) => void;
  onBackHome: () => void;
}

export function CategoryVideoList({
  selectedCategoryId,
  onSelectCategory,
  onSelectVideo,
  onBackHome,
}: CategoryVideoListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<
    "Todos" | "Principiante" | "Intermedio" | "Avanzado"
  >("Todos");

  const activeCategory: Category = useMemo(() => {
    return CATEGORIES.find((cat) => cat.id === selectedCategoryId) || CATEGORIES[0];
  }, [selectedCategoryId]);

  // Filter videos for the current category, search query, and level filter
  const filteredVideos = useMemo(() => {
    return VIDEO_LESSONS.filter((vid) => {
      if (vid.categoryId !== selectedCategoryId) return false;

      if (levelFilter !== "Todos" && vid.level !== levelFilter) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = vid.title.toLowerCase().includes(query);
        const matchesDesc = vid.description.toLowerCase().includes(query);
        const matchesSign = vid.currentSign.toLowerCase().includes(query);
        const matchesSub = vid.subtitle.toLowerCase().includes(query);
        return matchesTitle || matchesDesc || matchesSign || matchesSub;
      }

      return true;
    });
  }, [selectedCategoryId, levelFilter, searchQuery]);

  return (
    <main className="category-catalog-page">
      {/* Breadcrumbs navigation */}
      <div className="breadcrumbs">
        <button onClick={onBackHome} className="breadcrumb-btn">
          Inicio
        </button>
        <Icon name="chevron" size={15} />
        <span className="breadcrumb-current">{activeCategory.title}</span>
      </div>

      {/* Category Hero Banner */}
      <section className={`category-hero ${activeCategory.color}`}>
        <div className="category-hero-content">
          <div className="category-hero-header">
            <span className="category-hero-icon">
              <Icon name={activeCategory.icon} size={36} />
            </span>
            <div>
              <span className="category-badge">Categoría de Aprendizaje</span>
              <h1>{activeCategory.title}</h1>
            </div>
          </div>
          <p className="category-hero-desc">{activeCategory.description}</p>

          <div className="category-hero-meta">
            <span className="meta-pill">
              <Icon name="video" size={16} />
              <strong>{activeCategory.totalLessons} videos</strong> disponibles
            </span>
            <span className="meta-pill">
              <Icon name="check" size={16} />
              <strong>100%</strong> accesible en LSC
            </span>
            <span className="meta-pill verified">
              <Icon name="sparkles" size={16} />
              Revisado por la comunidad sorda
            </span>
          </div>
        </div>
      </section>

      {/* Category Selector Tabs */}
      <nav className="category-tabs-bar" aria-label="Cambiar categoría">
        {CATEGORIES.map((cat) => {
          const isActive = cat.id === selectedCategoryId;
          return (
            <button
              key={cat.id}
              type="button"
              className={`category-tab-btn ${isActive ? "active " + cat.color : ""}`}
              onClick={() => {
                onSelectCategory(cat.id);
                setSearchQuery("");
                setLevelFilter("Todos");
              }}
            >
              <Icon name={cat.icon} size={18} />
              <span>{cat.title}</span>
              <small className="tab-count">{cat.totalLessons}</small>
            </button>
          );
        })}
      </nav>

      {/* Search and Filters Toolbar */}
      <div className="catalog-toolbar">
        <div className="search-box">
          <Icon name="search" size={18} className="search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Buscar videos o señas en ${activeCategory.title}...`}
            aria-label="Buscar en la categoría"
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchQuery("")}
              aria-label="Limpiar búsqueda"
            >
              <Icon name="x" size={16} />
            </button>
          )}
        </div>

        {/* Level Filters */}
        <div className="level-filters" role="group" aria-label="Filtrar por nivel">
          {(["Todos", "Principiante", "Intermedio", "Avanzado"] as const).map((lvl) => (
            <button
              key={lvl}
              type="button"
              className={`level-filter-chip ${levelFilter === lvl ? "active" : ""}`}
              onClick={() => setLevelFilter(lvl)}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Video Counter */}
      <div className="results-counter">
        <span>
          Mostrando <strong>{filteredVideos.length}</strong> de{" "}
          <strong>{activeCategory.totalLessons} videos</strong> en <em>{activeCategory.title}</em>
        </span>
      </div>

      {/* Video Grid */}
      {filteredVideos.length > 0 ? (
        <div className="videos-grid">
          {filteredVideos.map((video) => (
            <article
              key={video.id}
              className="video-card"
              onClick={() => onSelectVideo(video)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectVideo(video);
                }
              }}
            >
              {/* Thumbnail Container */}
              <div className="video-card-thumb">
                <img src={video.thumbnail} alt={video.title} loading="lazy" />
                <div className="thumb-overlay" />

                {/* Duration & Level Badges */}
                <div className="thumb-badges-top">
                  <span className={`level-badge-pill ${video.level.toLowerCase()}`}>
                    {video.level}
                  </span>
                  <span className="duration-pill">
                    <Icon name="clock" size={13} /> {video.duration}
                  </span>
                </div>

                {/* Hover Play Circle */}
                <div className="play-button-overlay" aria-hidden="true">
                  <Icon name="play" size={26} />
                </div>

                {/* Progress bar if present */}
                {video.progressPercent > 0 && (
                  <div
                    className="video-thumb-progress"
                    aria-label={`Progreso: ${video.progressPercent}%`}
                  >
                    <div
                      className="thumb-progress-fill"
                      style={{ width: `${video.progressPercent}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="video-card-body">
                <div className="card-top-row">
                  <span className="lesson-badge">Video #{video.lessonNumber}</span>
                  {video.completed && (
                    <span className="completed-tag">
                      <Icon name="check" size={13} /> Completado
                    </span>
                  )}
                  {video.verified && !video.completed && (
                    <span className="verified-tag">
                      <Icon name="sparkles" size={13} /> Verificado
                    </span>
                  )}
                </div>

                <h3 className="video-card-title">{video.title}</h3>
                <p className="video-card-desc">{video.subtitle}</p>

                <div className="video-card-footer">
                  <div className="signs-pill">
                    <Icon name="book" size={14} />
                    <span>{video.signsCount} señas</span>
                  </div>
                  <span className="play-cta-text">
                    Ver video <Icon name="arrow" size={16} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="no-videos-box">
          <div className="no-videos-icon">
            <Icon name="search" size={38} />
          </div>
          <h3>No se encontraron videos</h3>
          <p>No hay videos que coincidan con tus criterios de búsqueda en esta categoría.</p>
          <button
            type="button"
            className="clear-filters-button"
            onClick={() => {
              setSearchQuery("");
              setLevelFilter("Todos");
            }}
          >
            Limpiar filtros y ver todos los videos
          </button>
        </div>
      )}

      {/* Bottom Back Button */}
      <div className="catalog-bottom-nav">
        <button type="button" className="secondary-button" onClick={onBackHome}>
          <Icon name="arrow-left" size={18} />
          <span>Volver al inicio</span>
        </button>
      </div>
    </main>
  );
}
