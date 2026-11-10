import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Icon } from "./Icons";

export function UserNavControls() {
  const { currentUser, isAuthenticated, openAuthModal, openProfileModal, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropdownOpen]);

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="auth-nav-buttons">
        <button type="button" className="nav-auth-login-btn" onClick={() => openAuthModal("login")}>
          <Icon name="user" size={17} />
          <span>Iniciar sesión</span>
        </button>
        <button
          type="button"
          className="nav-auth-register-btn"
          onClick={() => openAuthModal("register")}
        >
          <Icon name="user-plus" size={17} />
          <span>Registrarse</span>
        </button>
      </div>
    );
  }

  return (
    <div className="user-dropdown-container" ref={menuRef}>
      <button
        type="button"
        className="profile-button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
        aria-label={`Menú de usuario de ${currentUser.name}`}
      >
        <span className="avatar" style={{ backgroundColor: currentUser.avatarBg || "#f0ae7f" }}>
          {currentUser.initials}
        </span>
        <span className="profile-copy">
          <strong>{currentUser.name.split(" ")[0]}</strong>
          <small>{currentUser.level}</small>
        </span>
        <span className={`profile-chevron ${dropdownOpen ? "rotate" : ""}`}>⌄</span>
      </button>

      {dropdownOpen && (
        <div className="user-dropdown-menu" role="menu">
          <div className="user-dropdown-header">
            <strong>{currentUser.name}</strong>
            <span className="user-dropdown-email">{currentUser.email}</span>
            <span className="user-role-pill">{currentUser.roleLabel}</span>
          </div>

          <div className="user-dropdown-divider" />

          <button
            type="button"
            className="user-dropdown-item"
            role="menuitem"
            onClick={() => {
              setDropdownOpen(false);
              openProfileModal();
            }}
          >
            <Icon name="user" size={16} />
            <span>Mi Perfil y Progreso</span>
          </button>

          <button
            type="button"
            className="user-dropdown-item"
            role="menuitem"
            onClick={() => {
              setDropdownOpen(false);
              openProfileModal();
            }}
          >
            <Icon name="shield" size={16} />
            <span>
              Accesibilidad (
              {currentUser.accessibility.subtitles ? "Subtítulos Activos" : "Estándar"})
            </span>
          </button>

          <div className="user-dropdown-divider" />

          <button
            type="button"
            className="user-dropdown-item danger"
            role="menuitem"
            onClick={() => {
              setDropdownOpen(false);
              logout();
            }}
          >
            <Icon name="log-out" size={16} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      )}
    </div>
  );
}
