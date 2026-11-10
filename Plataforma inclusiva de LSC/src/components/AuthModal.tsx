import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { Icon } from "./Icons";
import type { LscRole } from "../types/auth";

export function AuthModal() {
  const {
    authModalOpen,
    authModalMode,
    closeAuthModal,
    setAuthModalMode,
    login,
    loginAsDemo,
    register,
  } = useAuth();

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regRole, setRegRole] = useState<LscRole>("oyente");
  const [regLevel, setRegLevel] = useState<"Nivel inicial" | "Nivel intermedio" | "Nivel avanzado">(
    "Nivel inicial",
  );
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  // UI state
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Reset errors and fields on mode switch or open
  useEffect(() => {
    setError(null);
    setForgotSent(false);
    if (authModalOpen) {
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 50);
    }
  }, [authModalOpen, authModalMode]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && authModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [authModalOpen, closeAuthModal]);

  if (!authModalOpen) return null;

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { level: 0, text: "" };
    if (pwd.length < 6) return { level: 1, text: "Muy corta", color: "#ef896f" };
    const hasLetters = /[a-zA-Z]/.test(pwd);
    const hasNumbers = /[0-9]/.test(pwd);
    const hasSpecial = /[^a-zA-Z0-9]/.test(pwd);
    const score = (hasLetters ? 1 : 0) + (hasNumbers ? 1 : 0) + (hasSpecial ? 1 : 0);

    if (pwd.length >= 8 && score >= 2) {
      return { level: 3, text: "Segura", color: "#6fd7b5" };
    }
    return { level: 2, text: "Aceptable", color: "#f7bf53" };
  };

  const pwdStrength = getPasswordStrength(regPassword);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!loginEmail.trim()) {
      setError("Por favor ingresa tu correo electrónico.");
      return;
    }
    if (!loginPassword) {
      setError("Por favor ingresa tu contraseña.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const result = login(loginEmail, loginPassword);
      setIsLoading(false);
      if (!result.success) {
        setError(result.error || "Error al iniciar sesión.");
      } else {
        setSuccessToast("¡Bienvenido/a de nuevo a Manos con Sentido!");
      }
    }, 400);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!regName.trim()) {
      setError("Por favor escribe tu nombre completo.");
      return;
    }
    if (!regEmail.trim() || !regEmail.includes("@")) {
      setError("Por favor ingresa un correo electrónico válido.");
      return;
    }
    if (regPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setError("Las contraseñas no coinciden. Verifícalas.");
      return;
    }
    if (!acceptTerms) {
      setError("Debes aceptar los términos y el compromiso de la comunidad inclusiva.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const result = register({
        name: regName,
        email: regEmail,
        password: regPassword,
        role: regRole,
        level: regLevel,
      });
      setIsLoading(false);
      if (!result.success) {
        setError(result.error || "Error al crear la cuenta.");
      } else {
        setSuccessToast("¡Cuenta creada exitosamente! Bienvenido/a a la comunidad.");
      }
    }, 450);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim() || !forgotEmail.includes("@")) {
      setError("Ingresa un correo electrónico válido para enviar el enlace.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setForgotSent(true);
    }, 500);
  };

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
    >
      <div
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        ref={modalRef}
      >
        <button
          className="modal-close-button"
          onClick={closeAuthModal}
          aria-label="Cerrar ventana de autenticación"
        >
          <Icon name="x" size={20} />
        </button>

        {/* Modal Header */}
        <div className="auth-modal-header">
          <div className="auth-brand-badge" aria-hidden="true">
            <span className="brand-mark small">
              <svg viewBox="0 0 40 40">
                <path d="M10.8 18.8c1.4-1.2 3-1.3 4.5-.2V9.2c0-2.9 4.3-2.8 4.3.1v6.4-9.1c0-2.9 4.3-2.8 4.3.1v9-7.2c0-2.8 4.2-2.7 4.2.1v8.7-5.4c0-2.6 4-2.5 4 .2v9c0 7-4.8 12.1-11.4 12.1-4.7 0-7.4-2.6-9.9-6.1l-3.4-4.8c-1.8-2.6 1.1-5.4 3.4-3.5Z" />
              </svg>
            </span>
          </div>
          <h2 id="auth-modal-title">
            {authModalMode === "login" && "Iniciar Sesión"}
            {authModalMode === "register" && "Crear una Cuenta"}
            {authModalMode === "forgot" && "Recuperar Contraseña"}
          </h2>
          <p className="auth-modal-subtitle">
            {authModalMode === "login" &&
              "Accede a tus lecciones, glosario interactivo y progreso en LSC."}
            {authModalMode === "register" &&
              "Únete a nuestra plataforma inclusiva y aprende señas a tu ritmo."}
            {authModalMode === "forgot" &&
              "Te enviaremos un enlace accesible para recuperar tu acceso."}
          </p>
        </div>

        {/* Mode Switcher Tabs (Hidden during forgot password) */}
        {authModalMode !== "forgot" && (
          <div className="auth-tabs" role="tablist" aria-label="Opciones de acceso">
            <button
              type="button"
              role="tab"
              aria-selected={authModalMode === "login"}
              className={`auth-tab ${authModalMode === "login" ? "active" : ""}`}
              onClick={() => {
                setAuthModalMode("login");
                setError(null);
              }}
            >
              <Icon name="user" size={17} />
              <span>Iniciar Sesión</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={authModalMode === "register"}
              className={`auth-tab ${authModalMode === "register" ? "active" : ""}`}
              onClick={() => {
                setAuthModalMode("register");
                setError(null);
              }}
            >
              <Icon name="user-plus" size={17} />
              <span>Registrarse</span>
            </button>
          </div>
        )}

        {/* Error notification alert */}
        {error && (
          <div className="auth-alert error" role="alert">
            <Icon name="alert" size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Success notification */}
        {successToast && (
          <div className="auth-alert success" role="status">
            <Icon name="check" size={18} />
            <span>{successToast}</span>
          </div>
        )}

        {/* ======================= LOGIN VIEW ======================= */}
        {authModalMode === "login" && (
          <form onSubmit={handleLoginSubmit} className="auth-form" noValidate>
            {/* Quick Demo Login Pill Button */}
            <div className="demo-box">
              <div className="demo-copy">
                <strong>¿Quieres probar la plataforma al instante?</strong>
                <p>Ingresa como Valentina con 1 solo clic y mira todo en acción.</p>
              </div>
              <button
                type="button"
                className="demo-button"
                onClick={loginAsDemo}
                title="Acceso rápido con usuario de demostración"
              >
                <Icon name="sparkles" size={16} /> Entrar como Valentina
              </button>
            </div>

            <div className="auth-divider">
              <span>o con tus credenciales</span>
            </div>

            <div className="form-group">
              <label htmlFor="login-email">Correo Electrónico</label>
              <div className="input-wrapper">
                <span className="input-icon" aria-hidden="true">
                  <Icon name="mail" size={18} />
                </span>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="ejemplo@correo.com"
                  ref={firstInputRef}
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-row">
                <label htmlFor="login-password">Contraseña</label>
                <button
                  type="button"
                  className="text-link-small"
                  onClick={() => {
                    setAuthModalMode("forgot");
                    setError(null);
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="input-wrapper">
                <span className="input-icon" aria-hidden="true">
                  <Icon name="lock" size={18} />
                </span>
                <input
                  id="login-password"
                  type={showLoginPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Tu contraseña secreta"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  aria-label={showLoginPassword ? "Ocultar contraseña" : "Ver contraseña"}
                  title={showLoginPassword ? "Ocultar contraseña" : "Ver contraseña"}
                >
                  <Icon name={showLoginPassword ? "eye-off" : "eye"} size={18} />
                </button>
              </div>
            </div>

            <div className="form-checkbox-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Recordar mi sesión en este navegador</span>
              </label>
            </div>

            <button type="submit" className="auth-submit-button" disabled={isLoading}>
              {isLoading ? (
                <span className="btn-spinner" />
              ) : (
                <>
                  <span>Iniciar Sesión</span>
                  <Icon name="arrow" size={18} />
                </>
              )}
            </button>

            {/* Social mock login */}
            <button
              type="button"
              className="social-auth-button"
              onClick={loginAsDemo}
              title="Continuar con tu cuenta de Google"
            >
              <Icon name="google" size={18} />
              <span>Continuar con Google</span>
            </button>

            <div className="auth-switch-footer">
              <span>¿No tienes una cuenta aún?</span>{" "}
              <button
                type="button"
                className="text-link"
                onClick={() => {
                  setAuthModalMode("register");
                  setError(null);
                }}
              >
                Regístrate gratis aquí
              </button>
            </div>
          </form>
        )}

        {/* ======================= REGISTER VIEW ======================= */}
        {authModalMode === "register" && (
          <form onSubmit={handleRegisterSubmit} className="auth-form" noValidate>
            <div className="form-group">
              <label htmlFor="reg-name">Nombre Completo</label>
              <div className="input-wrapper">
                <span className="input-icon" aria-hidden="true">
                  <Icon name="user" size={18} />
                </span>
                <input
                  id="reg-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Ej. Valentina Ruiz Gómez"
                  ref={firstInputRef}
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reg-email">Correo Electrónico</label>
              <div className="input-wrapper">
                <span className="input-icon" aria-hidden="true">
                  <Icon name="mail" size={18} />
                </span>
                <input
                  id="reg-email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu.correo@ejemplo.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Inclusive Community Role */}
            <div className="form-group">
              <label htmlFor="reg-role">¿Cuál es tu relación con la LSC?</label>
              <div className="select-wrapper">
                <select
                  id="reg-role"
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value as LscRole)}
                >
                  <option value="oyente">👤 Persona oyente aprendiendo LSC</option>
                  <option value="sordo">🤟 Persona sorda o con pérdida auditiva</option>
                  <option value="educador">🏫 Familiar, docente o educador</option>
                  <option value="interprete">🎓 Intérprete o estudiante de interpretación</option>
                  <option value="otro">✨ Entusiasta / Aprendizaje general</option>
                </select>
                <span className="select-chevron" aria-hidden="true">
                  ⌄
                </span>
              </div>
              <small className="field-hint">
                Esto nos ayuda a sugerir las mejores lecciones y herramientas de apoyo para ti.
              </small>
            </div>

            {/* Starting Level */}
            <div className="form-group">
              <label>¿Cuál es tu nivel de partida en LSC?</label>
              <div className="level-radio-group">
                {[
                  { id: "Nivel inicial", label: "Principiante", desc: "Desde cero o saludos" },
                  { id: "Nivel intermedio", label: "Intermedio", desc: "Puedo comunicarme" },
                  { id: "Nivel avanzado", label: "Avanzado", desc: "Fluidez y gramática" },
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`level-radio-card ${regLevel === item.id ? "selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="regLevel"
                      value={item.id}
                      checked={regLevel === item.id}
                      onChange={() =>
                        setRegLevel(
                          item.id as "Nivel inicial" | "Nivel intermedio" | "Nivel avanzado",
                        )
                      }
                    />
                    <span className="radio-title">{item.label}</span>
                    <span className="radio-desc">{item.desc}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="reg-password">Contraseña</label>
                <div className="input-wrapper">
                  <span className="input-icon" aria-hidden="true">
                    <Icon name="lock" size={18} />
                  </span>
                  <input
                    id="reg-password"
                    type={showRegPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Mínimo 6 caracteres"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    aria-label={showRegPassword ? "Ocultar contraseña" : "Ver contraseña"}
                  >
                    <Icon name={showRegPassword ? "eye-off" : "eye"} size={18} />
                  </button>
                </div>
                {regPassword && (
                  <div className="strength-bar-container">
                    <div
                      className="strength-bar-fill"
                      style={{
                        width: `${(pwdStrength.level / 3) * 100}%`,
                        backgroundColor: pwdStrength.color,
                      }}
                    />
                    <span className="strength-text" style={{ color: pwdStrength.color }}>
                      Seguridad: {pwdStrength.text}
                    </span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="reg-confirm-password">Confirmar Contraseña</label>
                <div className="input-wrapper">
                  <span className="input-icon" aria-hidden="true">
                    <Icon name="lock" size={18} />
                  </span>
                  <input
                    id="reg-confirm-password"
                    type={showRegPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Repite la contraseña"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {regConfirmPassword && (
                  <small
                    className="field-hint"
                    style={{
                      color: regPassword === regConfirmPassword ? "#6fd7b5" : "#ef896f",
                    }}
                  >
                    {regPassword === regConfirmPassword
                      ? "✓ Las contraseñas coinciden"
                      : "✕ No coinciden aún"}
                  </small>
                )}
              </div>
            </div>

            <div className="form-checkbox-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                />
                <span>
                  Acepto los términos de uso y el compromiso de respeto a la cultura sorda e
                  inclusión.
                </span>
              </label>
            </div>

            <button type="submit" className="auth-submit-button" disabled={isLoading}>
              {isLoading ? (
                <span className="btn-spinner" />
              ) : (
                <>
                  <span>Crear mi Cuenta Gratis</span>
                  <Icon name="arrow" size={18} />
                </>
              )}
            </button>

            <div className="auth-switch-footer">
              <span>¿Ya tienes una cuenta?</span>{" "}
              <button
                type="button"
                className="text-link"
                onClick={() => {
                  setAuthModalMode("login");
                  setError(null);
                }}
              >
                Inicia sesión aquí
              </button>
            </div>
          </form>
        )}

        {/* ======================= FORGOT PASSWORD VIEW ======================= */}
        {authModalMode === "forgot" && (
          <div className="auth-form">
            {forgotSent ? (
              <div className="forgot-success-box">
                <div className="success-icon-badge">
                  <Icon name="check" size={30} />
                </div>
                <h3>¡Correo de recuperación enviado!</h3>
                <p>
                  Hemos simulado el envío de un enlace de recuperación seguro a{" "}
                  <strong>{forgotEmail}</strong>. Revisa tu bandeja de entrada.
                </p>
                <button
                  type="button"
                  className="auth-submit-button"
                  onClick={() => {
                    setAuthModalMode("login");
                    setForgotSent(false);
                    setError(null);
                  }}
                >
                  Volver al Inicio de Sesión
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit}>
                <div className="form-group">
                  <label htmlFor="forgot-email">Correo Electrónico Registrado</label>
                  <div className="input-wrapper">
                    <span className="input-icon" aria-hidden="true">
                      <Icon name="mail" size={18} />
                    </span>
                    <input
                      id="forgot-email"
                      type="email"
                      autoComplete="email"
                      placeholder="tu.correo@ejemplo.com"
                      ref={firstInputRef}
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                  <small className="field-hint">
                    Enviaremos un correo con un enlace temporal para que puedas restablecerla.
                  </small>
                </div>

                <button type="submit" className="auth-submit-button" disabled={isLoading}>
                  {isLoading ? (
                    <span className="btn-spinner" />
                  ) : (
                    <>
                      <span>Enviar Enlace de Recuperación</span>
                      <Icon name="arrow" size={18} />
                    </>
                  )}
                </button>

                <div className="auth-switch-footer">
                  <button
                    type="button"
                    className="text-link"
                    onClick={() => {
                      setAuthModalMode("login");
                      setError(null);
                    }}
                  >
                    ← Volver a Iniciar Sesión
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
