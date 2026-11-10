import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AuthModal } from "./components/AuthModal";
import { UserProfileModal } from "./components/UserProfileModal";
import { UserNavControls } from "./components/UserNavControls";
import { CategoryVideoList } from "./components/CategoryVideoList";
import { Icon, type IconName } from "./components/Icons";
import { CATEGORIES, VIDEO_LESSONS, type VideoLesson, type Category } from "./data/categoriesData";

type View = "home" | "category" | "lesson" | "glossary" | "practice";

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand" aria-label="Manos con Sentido">
      <span className="brand-mark">
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path d="M10.8 18.8c1.4-1.2 3-1.3 4.5-.2V9.2c0-2.9 4.3-2.8 4.3.1v6.4-9.1c0-2.9 4.3-2.8 4.3.1v9-7.2c0-2.8 4.2-2.7 4.2.1v8.7-5.4c0-2.6 4-2.5 4 .2v9c0 7-4.8 12.1-11.4 12.1-4.7 0-7.4-2.6-9.9-6.1l-3.4-4.8c-1.8-2.6 1.1-5.4 3.4-3.5Z" />
        </svg>
      </span>
      {!compact && (
        <span>
          Manos <strong>con Sentido</strong>
        </span>
      )}
    </div>
  );
}

function Navbar({
  view,
  setView,
  dark,
  setDark,
}: {
  view: View;
  setView: (view: View) => void;
  dark: boolean;
  setDark: (value: boolean) => void;
}) {
  const links: { label: string; view: View; icon: IconName }[] = [
    { label: "Inicio", view: "home", icon: "home" },
    { label: "Aprender", view: "category", icon: "book" },
    { label: "Glosario", view: "glossary", icon: "search" },
    { label: "Práctica", view: "practice", icon: "target" },
  ];
  return (
    <header className="navbar">
      <button className="logo-button" onClick={() => setView("home")} aria-label="Ir al inicio">
        <Logo />
      </button>
      <nav aria-label="Navegación principal">
        {links.map((link) => {
          const isActive =
            view === link.view ||
            (link.view === "category" && (view === "category" || view === "lesson"));
          return (
            <button
              key={link.view}
              className={isActive ? "nav-link active" : "nav-link"}
              onClick={() => setView(link.view)}
            >
              <Icon name={link.icon} size={19} />
              <span>{link.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="nav-actions">
        <button
          className="icon-button"
          onClick={() => setDark(!dark)}
          aria-label={dark ? "Activar tema claro" : "Activar tema oscuro"}
          title={dark ? "Tema claro" : "Tema oscuro"}
        >
          <Icon name={dark ? "sun" : "moon"} size={20} />
        </button>
        <UserNavControls />
      </div>
    </header>
  );
}

function ProgressRing({ percent = 68 }: { percent?: number }) {
  const safePercent = Math.min(100, Math.max(0, percent));
  return (
    <div
      className="progress-ring"
      role="img"
      aria-label={`Progreso semanal: ${safePercent} por ciento`}
    >
      <svg viewBox="0 0 100 100">
        <circle className="ring-track" cx="50" cy="50" r="42" />
        <circle
          className="ring-fill"
          cx="50"
          cy="50"
          r="42"
          pathLength="100"
          style={{ strokeDashoffset: 100 - safePercent }}
        />
      </svg>
      <span>
        <strong>{safePercent}%</strong>
        <small>semanal</small>
      </span>
    </div>
  );
}

function Dashboard({
  onOpenCategory,
  onOpenVideo,
}: {
  onOpenCategory: (catId: "conversacion" | "canciones" | "historias") => void;
  onOpenVideo: (video: VideoLesson) => void;
}) {
  const { currentUser, openAuthModal } = useAuth();

  const weeklyPercent = currentUser
    ? Math.round((currentUser.stats.weeklyCompleted / currentUser.stats.weeklyGoal) * 100)
    : 0;

  return (
    <main>
      <section className="welcome-section">
        {!currentUser && (
          <div className="guest-banner">
            <div className="guest-banner-copy">
              <span className="guest-banner-icon">
                <Icon name="sparkles" size={24} />
              </span>
              <div>
                <strong>¿Nuevo en Manos con Sentido?</strong>
                <p>
                  Regístrate o inicia sesión para guardar tu avance, ajustar la accesibilidad y
                  aprender LSC a tu ritmo.
                </p>
              </div>
            </div>
            <div className="guest-banner-actions">
              <button
                type="button"
                className="guest-banner-btn ghost"
                onClick={() => openAuthModal("login")}
              >
                Iniciar sesión
              </button>
              <button
                type="button"
                className="guest-banner-btn"
                onClick={() => openAuthModal("register")}
              >
                <Icon name="user-plus" size={16} /> Crear cuenta
              </button>
            </div>
          </div>
        )}

        <div className="eyebrow">
          <Icon name="sparkles" size={16} /> Tu espacio de aprendizaje
        </div>
        <div className="welcome-grid">
          <div>
            <h1>
              {currentUser ? `¡Hola, ${currentUser.name.split(" ")[0]}!` : "Aprende LSC Inclusiva"}
            </h1>
            <p className="lead">
              {currentUser
                ? "Cada seña abre una nueva forma de conectar. Selecciona una categoría para explorar sus videos."
                : "Plataforma accesible de Lengua de Señas Colombiana con videos, glosas y ejercicios interactivos."}
            </p>
          </div>
          <div className="weekly-card">
            <ProgressRing percent={currentUser ? weeklyPercent : 0} />
            <div>
              <span className="mini-label">
                {currentUser ? "Tu progreso esta semana" : "Comienza hoy"}
              </span>
              <strong>
                {currentUser
                  ? `${currentUser.stats.weeklyCompleted} de ${currentUser.stats.weeklyGoal} lecciones`
                  : "0 de 5 lecciones"}
              </strong>
              <p>
                {currentUser
                  ? "¡Sigue así! Estás muy cerca de tu meta."
                  : "Inicia sesión para registrar tu progreso."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid - Clicking opens video catalog for that category */}
      <section className="content-section" aria-labelledby="category-title">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Catálogo de videos</span>
            <h2 id="category-title">Explora por categorías</h2>
          </div>
          <p>Haz clic en cualquier categoría para ver su lista completa de lecciones en video.</p>
        </div>
        <div className="category-grid">
          {CATEGORIES.map((category) => (
            <button
              className={`category-card ${category.color}`}
              key={category.id}
              onClick={() => onOpenCategory(category.id)}
            >
              <span className="category-top">
                <span className="category-icon">
                  <Icon name={category.icon} size={32} />
                </span>
                <span className="arrow-circle">
                  <Icon name="arrow" size={20} />
                </span>
              </span>
              <span className="category-copy">
                <strong>{category.title}</strong>
                <span>{category.subtitle}</span>
              </span>
              <span className="category-meta">
                <span>
                  <Icon name="video" size={15} /> {category.totalLessons} videos
                </span>
                <span className="progress-label">Explorar lista →</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Continue Section */}
      <section className="continue-section" aria-labelledby="continue-title">
        <div className="section-heading compact">
          <div>
            <span className="section-kicker">Continúa donde quedaste</span>
            <h2 id="continue-title">Tu próxima lección recomendada</h2>
          </div>
        </div>
        <article className="continue-card">
          <div className="continue-visual">
            <img src={VIDEO_LESSONS[0].thumbnail} alt={VIDEO_LESSONS[0].title} />
            <span className="lesson-number">Video #1</span>
          </div>
          <div className="continue-copy">
            <span className="lesson-category">Conversación básica</span>
            <h3>{VIDEO_LESSONS[0].title}</h3>
            <p>{VIDEO_LESSONS[0].subtitle}</p>
            <div className="lesson-stats">
              <span>
                <Icon name="clock" size={17} /> {VIDEO_LESSONS[0].duration}
              </span>
              <span>
                <Icon name="check" size={17} /> 4 de {VIDEO_LESSONS[0].signsCount} señas
              </span>
            </div>
          </div>
          <button className="primary-button" onClick={() => onOpenVideo(VIDEO_LESSONS[0])}>
            Continuar lección <Icon name="arrow" size={20} />
          </button>
        </article>
      </section>
    </main>
  );
}

function Lesson({
  video,
  onBackToCategory,
  onSelectVideo,
}: {
  video: VideoLesson;
  onBackToCategory: () => void;
  onSelectVideo: (video: VideoLesson) => void;
}) {
  const [playing, setPlaying] = useState(false);
  const [loop, setLoop] = useState(true);
  const [speed, setSpeed] = useState("0.75x");
  const [progress, setProgress] = useState(38);

  const currentCategory: Category =
    CATEGORIES.find((c) => c.id === video.categoryId) || CATEGORIES[0];

  const categoryVideos = VIDEO_LESSONS.filter((v) => v.categoryId === video.categoryId);
  const currentIndex = categoryVideos.findIndex((v) => v.id === video.id);

  const prevVideo = currentIndex > 0 ? categoryVideos[currentIndex - 1] : null;
  const nextVideo =
    currentIndex < categoryVideos.length - 1 ? categoryVideos[currentIndex + 1] : null;

  return (
    <main className="lesson-page">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <button onClick={onBackToCategory} className="breadcrumb-btn">
          {currentCategory.title}
        </button>
        <Icon name="chevron" size={15} />
        <span>{video.title}</span>
      </div>

      <div className="lesson-heading">
        <div>
          <div
            className="lesson-heading-top"
            style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}
          >
            <span className="lesson-chip">
              Video #{video.lessonNumber} de {categoryVideos.length}
            </span>
            <span className={`level-badge-pill ${video.level.toLowerCase()}`}>{video.level}</span>
          </div>
          <h1>{video.title}</h1>
          <p>{video.subtitle}</p>
        </div>

        <div className="lesson-progress">
          <span>
            <strong>Seña 4</strong> de {video.signsCount}
          </span>
          <div className="steps" aria-label={`Progreso: 4 de ${video.signsCount}`}>
            {Array.from({ length: Math.min(9, video.signsCount) }).map((_, i) => (
              <i key={i} className={i < 3 ? "done" : i === 3 ? "current" : ""} />
            ))}
          </div>
        </div>
      </div>

      <div className="lesson-layout">
        <section className="video-column" aria-label="Reproductor de la lección">
          <div className="video-player">
            <img src={video.thumbnail} alt={`Instructora mostrando la seña ${video.currentSign}`} />
            <div className="video-shade" />
            <button
              className="big-play"
              onClick={() => setPlaying(!playing)}
              aria-label={playing ? "Pausar video" : "Reproducir video"}
            >
              <Icon name={playing ? "pause" : "play"} size={34} />
            </button>
            <span className="video-label">{video.videoLabel}</span>
            <div className="video-controls">
              <input
                aria-label="Progreso del video"
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(event) => setProgress(Number(event.target.value))}
                style={{ "--progress": `${progress}%` } as React.CSSProperties}
              />
              <div className="control-row">
                <div>
                  <button
                    onClick={() => setPlaying(!playing)}
                    aria-label={playing ? "Pausar" : "Reproducir"}
                  >
                    <Icon name={playing ? "pause" : "play"} size={21} />
                  </button>
                  <button aria-label="Volumen">
                    <Icon name="volume" size={21} />
                  </button>
                  <span className="time">0:08 / 0:21</span>
                </div>
                <div>
                  <button
                    className={loop ? "active-control" : ""}
                    onClick={() => setLoop(!loop)}
                    aria-pressed={loop}
                    aria-label="Repetir video"
                  >
                    <Icon name="repeat" size={20} />
                    <span>Bucle</span>
                  </button>
                  <div className="speed-selector" aria-label="Velocidad de reproducción">
                    {["0.5x", "0.75x", "1x"].map((option) => (
                      <button
                        key={option}
                        className={speed === option ? "selected" : ""}
                        onClick={() => setSpeed(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <button aria-label="Pantalla completa">
                    <Icon name="expand" size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p className="video-tip">
            <span>
              <Icon name="sparkles" size={17} />
            </span>
            <strong>Consejo LSC:</strong> reproduce el video varias veces observando la posición
            espacial de las manos y practica frente a un espejo.
          </p>
        </section>

        {/* Gloss Panel */}
        <aside className="gloss-panel">
          <div className="gloss-header">
            <span>Seña clave</span>
            <span className="verified">
              <Icon name="check" size={14} /> Verificada
            </span>
          </div>
          <div className="gloss-main">
            <span className="gloss-label">Glosa LSC</span>
            <h2>{video.currentSign}</h2>
            <p>{video.currentSignDesc}</p>
          </div>
          <div className="movement">
            <span className="gloss-label">Cómo realizarla paso a paso</span>
            <ol>
              {video.steps.map((step, idx) => (
                <li key={idx}>
                  <span>{idx + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="gloss-note">
            <strong>Expresión facial indispensable</strong>
            <p>{video.facialExpressionNote}</p>
          </div>
        </aside>
      </div>

      {/* Lesson Navigation Controls */}
      <div className="lesson-navigation">
        {prevVideo ? (
          <button className="secondary-button" onClick={() => onSelectVideo(prevVideo)}>
            <span className="back-arrow">←</span>
            <span>
              <small>Video anterior</small>
              <strong>{prevVideo.title}</strong>
            </span>
          </button>
        ) : (
          <button className="secondary-button" onClick={onBackToCategory}>
            <span className="back-arrow">←</span>
            <span>
              <small>Volver a la lista</small>
              <strong>{currentCategory.title}</strong>
            </span>
          </button>
        )}

        {nextVideo ? (
          <button className="next-button" onClick={() => onSelectVideo(nextVideo)}>
            <span>
              <small>Siguiente video</small>
              <strong>{nextVideo.title}</strong>
            </span>
            <Icon name="arrow" size={23} />
          </button>
        ) : (
          <button className="next-button" onClick={onBackToCategory}>
            <span>
              <small>Completaste la categoría</small>
              <strong>Ver más videos</strong>
            </span>
            <Icon name="arrow" size={23} />
          </button>
        )}
      </div>

      {/* Playlist Section: Other videos in this category */}
      <section className="lesson-playlist-section">
        <div className="playlist-header-row">
          <div>
            <h2>Más videos en {currentCategory.title}</h2>
            <p style={{ color: "var(--muted)", fontSize: "14px", margin: "4px 0 0" }}>
              Explora los demás videos de este módulo sin salir de la lección.
            </p>
          </div>
          <button className="secondary-button" onClick={onBackToCategory}>
            Ver catálogo completo ({categoryVideos.length})
          </button>
        </div>

        <div className="playlist-scroll">
          {categoryVideos.map((item) => (
            <div
              key={item.id}
              className={`playlist-item-card ${item.id === video.id ? "current" : ""}`}
              onClick={() => onSelectVideo(item)}
              role="button"
              tabIndex={0}
            >
              <div className="playlist-item-thumb">
                <img src={item.thumbnail} alt={item.title} />
              </div>
              <div className="playlist-item-copy">
                <strong>{item.title}</strong>
                <span>
                  {item.duration} · {item.signsCount} señas
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function Placeholder({ view, openCategory }: { view: View; openCategory: () => void }) {
  const data = {
    glossary: [
      "Glosario visual LSC",
      "Encuentra rápidamente cualquier seña con su respectiva glosa y demostración.",
    ],
    practice: [
      "Práctica interactiva",
      "Repasa y pon a prueba tus señas favoritas con ejercicios visuales cortos.",
    ],
  }[view as "glossary" | "practice"] ?? [
    "Manos con Sentido",
    "Aprende LSC de forma visual y accesible.",
  ];
  return (
    <main className="placeholder-page">
      <div className="placeholder-icon">
        <Icon name={view === "glossary" ? "search" : "target"} size={42} />
      </div>
      <span className="section-kicker">Manos con Sentido</span>
      <h1>{data[0]}</h1>
      <p>{data[1]}</p>
      <button className="primary-button" onClick={openCategory}>
        Explorar catálogo de videos <Icon name="arrow" size={20} />
      </button>
    </main>
  );
}

function AppContent() {
  const [view, setView] = useState<View>("home");
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    "conversacion" | "canciones" | "historias"
  >("conversacion");
  const [selectedVideo, setSelectedVideo] = useState<VideoLesson>(VIDEO_LESSONS[0]);
  const [dark, setDark] = useState(
    () => window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false,
  );

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  const handleOpenCategory = (catId: "conversacion" | "canciones" | "historias") => {
    setSelectedCategoryId(catId);
    setView("category");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenVideo = (video: VideoLesson) => {
    setSelectedVideo(video);
    setSelectedCategoryId(video.categoryId);
    setView("lesson");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-shell">
      <Navbar view={view} setView={setView} dark={dark} setDark={setDark} />

      {view === "home" ? (
        <Dashboard onOpenCategory={handleOpenCategory} onOpenVideo={handleOpenVideo} />
      ) : view === "category" ? (
        <CategoryVideoList
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={(catId) => setSelectedCategoryId(catId)}
          onSelectVideo={handleOpenVideo}
          onBackHome={() => setView("home")}
        />
      ) : view === "lesson" ? (
        <Lesson
          video={selectedVideo}
          onBackToCategory={() => setView("category")}
          onSelectVideo={handleOpenVideo}
        />
      ) : (
        <Placeholder
          view={view}
          openCategory={() => {
            setSelectedCategoryId("conversacion");
            setView("category");
          }}
        />
      )}

      <footer>
        <Logo />
        <span>Aprender también es conectar.</span>
        <span>© 2025 · Diseñado con accesibilidad para la comunidad sorda</span>
      </footer>

      {/* Accessible Authentication and Profile Modals */}
      <AuthModal />
      <UserProfileModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
