import React, { useState } from "react";
import loginImage from "../assets/login.jpg";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isBackHovering, setIsBackHovering] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // wire up auth logic here
    console.log({ email, password });
  };

  return (
    <div style={styles.page}>
      <div style={styles.panel}>
        <div style={styles.hero}>
          <img src={loginImage} alt="Abstract green 3D ribbon shapes" style={styles.heroImg} />
        </div>

        <div style={styles.formSide}>
          <div style={styles.formInner}>
            <a
              href="/"
              style={isBackHovering ? { ...styles.backLink, ...styles.backLinkHover } : styles.backLink}
              onMouseEnter={() => setIsBackHovering(true)}
              onMouseLeave={() => setIsBackHovering(false)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                width={16}
                height={16}
                style={{
                  transform: isBackHovering ? "translateX(-3px)" : "translateX(0)",
                  transition: "transform 0.2s ease",
                }}
              >
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
              Back to home
            </a>

            <h1 style={styles.title}>Enter your account</h1>
            <p style={styles.subtitle}>
              Access your dashboard ,check what we recommend anytime anywhere
              and keep everything flowing in one place
            </p>

            <form onSubmit={handleSubmit} style={styles.form}>
              <label htmlFor="email" style={styles.fieldLabel}>
                EMAIL ADDRESS
              </label>
              <div style={styles.fieldWrap}>
                <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path d="M3 6.5h18v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Z" />
                  <path d="M3.5 6.8 12 13l8.5-6.2" />
                </svg>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                />
              </div>

              <label htmlFor="password" style={styles.fieldLabel}>
                PASSWORD
              </label>
              <div style={styles.fieldWrap}>
                <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <rect x="5" y="10.5" width="14" height="9" rx="1.8" />
                  <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={styles.toggleEye}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} width={18} height={18}>
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>

              <button
                type="submit"
                style={isHovering ? { ...styles.continueBtn, ...styles.continueBtnHover } : styles.continueBtn}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Continue
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  width={16}
                  height={16}
                  style={{
                    transform: isHovering ? "translateX(4px)" : "translateX(0)",
                    transition: "transform 0.25s ease",
                  }}
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    margin: 0,
    padding: "48px 24px",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#FFFFFF",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    boxSizing: "border-box",
  },
  panel: {
    background: "#F4FFF6",
    borderRadius: 28,
    width: "100%",
    maxWidth: 1080,
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
    gap: 48,
    padding: 32,
    alignItems: "stretch",
    boxSizing: "border-box",
  },
  hero: {
    borderRadius: 20,
    overflow: "hidden",
    minHeight: 600,
  },
  heroImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  formSide: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "24px 32px",
  },
  formInner: {
    width: "100%",
    maxWidth: 440,
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    fontWeight: 500,
    color: "#5b6b5e",
    textDecoration: "none",
    marginBottom: 28,
    transition: "color 0.2s ease",
  },
  backLinkHover: {
    color: "#2f5d3a",
  },
  title: {
    fontSize: 42,
    fontWeight: 500,
    color: "#1f2a22",
    margin: "0 0 16px 0",
    letterSpacing: "-0.5px",
    lineHeight: 1.1,
  },
  subtitle: {
    fontSize: 15,
    color: "#5b6b5e",
    lineHeight: 1.5,
    margin: "0 0 36px 0",
    maxWidth: 400,
  },
  form: {
    width: "100%",
  },
  fieldLabel: {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#1f2a22",
    marginBottom: 8,
  },
  fieldWrap: {
    position: "relative",
    marginBottom: 24,
  },
  icon: {
    position: "absolute",
    left: 16,
    top: "50%",
    transform: "translateY(-50%)",
    width: 18,
    height: 18,
    color: "#B5AA96",
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    background: "#FDFAF3",
    border: "1px solid #ded5bd",
    borderRadius: 14,
    padding: "16px 16px 16px 44px",
    fontSize: 15,
    color: "#7d735e",
    outline: "none",
    boxSizing: "border-box",
  },
  toggleEye: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: "translateY(-50%)",
    width: 18,
    height: 18,
    color: "#B5AA96",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  continueBtn: {
    width: "100%",
    border: "2px solid transparent",
    borderRadius: 14,
    padding: "17px 18px",
    fontSize: 15,
    fontWeight: 600,
    color: "#f1fbf2",
    background: "linear-gradient(180deg, #5b9a5e 0%, #2f6b39 100%)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 12,
    boxShadow: "0 8px 18px rgba(47, 107, 57, 0.28)",
    transition: "background 0.25s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
    transform: "translateY(0)",
  },
  continueBtnHover: {
    background: "#F4FFF6",
    color: "#2f6b39",
    border: "2px solid #2f6b39",
    boxShadow: "0 8px 18px rgba(47, 107, 57, 0.18)",
    transform: "translateY(-2px)",
  },
};