import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Icon } from "./Icons";

export function UserProfileModal() {
  const { currentUser, profileModalOpen, closeProfileModal, logout, updateUserPreferences } =
    useAuth();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && profileModalOpen) {
        closeProfileModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [profileModalOpen, closeProfileModal]);

  if (!profileModalOpen || !currentUser) return null;

  const { stats, accessibility } = currentUser;

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeProfileModal();
      }}
    >
      <div
        className="auth-modal profile-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-modal-title"
      >
        <button
          className="modal-close-button"
          onClick={closeProfileModal}
          aria-label="Cerrar perfil"
        >
          <Icon name="x" size={20} />
        </button>

        {/* Profile Card Header */}
        <div className="profile-hero">
          <div
            className="profile-avatar-large"
            style={{ backgroundColor: currentUser.avatarBg || "#f0ae7f" }}
          >
            {currentUser.initials}
          </div>
          <div className="profile-hero-info">
            <h2 id="profile-modal-title">{currentUser.name}</h2>
            <p className="profile-hero-email">{currentUser.email}</p>
            <div className="profile-badges-row">
              <span className="user-role-badge">
                <Icon name="user" size={13} /> {currentUser.roleLabel}
              </span>
              <span className="user-level-badge">{currentUser.level}</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="profile-stats-grid">
          <div className="stat-card">
            <span className="stat-card-label">Lecciones hechas</span>
            <strong className="stat-card-value">
              {stats.completedLessons} <small>/ {stats.totalLessons}</small>
            </strong>
            <span className="stat-card-sub">Progreso constante</span>
          </div>
          <div className="stat-card">
            <span className="stat-card-label">Racha de estudio</span>
            <strong className="stat-card-value">
              {stats.streakDays} <small>días</small>
            </strong>
            <span className="stat-card-sub">¡Gran constancia!</span>
          </div>
          <div className="stat-card">
            <span className="stat-card-label">Señas dominadas</span>
            <strong className="stat-card-value">{stats.signsLearned}</strong>
            <span className="stat-card-sub">Glosario activo</span>
          </div>
          <div className="stat-card">
            <span className="stat-card-label">Meta semanal</span>
            <strong className="stat-card-value">
              {stats.weeklyCompleted} <small>/ {stats.weeklyGoal}</small>
            </strong>
            <span className="stat-card-sub">68% completado</span>
          </div>
        </div>

        {/* Accessibility Preferences */}
        <div className="profile-section">
          <h3>
            <Icon name="shield" size={18} /> Preferencias de Accesibilidad
          </h3>
          <div className="accessibility-toggles">
            <label className="toggle-item">
              <div className="toggle-copy">
                <strong>Subtítulos y glosas LSC automáticos</strong>
                <span>Muestra siempre la descripción textual y glosa en los videos.</span>
              </div>
              <input
                type="checkbox"
                checked={accessibility.subtitles}
                onChange={(e) => updateUserPreferences({ subtitles: e.target.checked })}
              />
            </label>

            <label className="toggle-item">
              <div className="toggle-copy">
                <strong>Avisos visuales reforzados</strong>
                <span>Efectos luminosos al completar lecciones y validar señas.</span>
              </div>
              <input
                type="checkbox"
                checked={accessibility.visualAlerts}
                onChange={(e) => updateUserPreferences({ visualAlerts: e.target.checked })}
              />
            </label>

            <label className="toggle-item">
              <div className="toggle-copy">
                <strong>Reducción de animaciones</strong>
                <span>Minimiza el movimiento para una navegación más cómoda.</span>
              </div>
              <input
                type="checkbox"
                checked={accessibility.reducedMotion}
                onChange={(e) => updateUserPreferences({ reducedMotion: e.target.checked })}
              />
            </label>
          </div>
        </div>

        {/* Footer actions */}
        <div className="profile-modal-footer">
          <button
            type="button"
            className="logout-button"
            onClick={() => {
              logout();
            }}
          >
            <Icon name="log-out" size={17} />
            <span>Cerrar Sesión</span>
          </button>
          <button type="button" className="auth-submit-button compact" onClick={closeProfileModal}>
            Listo
          </button>
        </div>
      </div>
    </div>
  );
}
