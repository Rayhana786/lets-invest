import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import bgGlow from "../assets/bg-glow.png";

const colors = {
  pageBg: "#0B120D",
  panelBg: "#0E1813",
  inputBg: "#0B130E",
  inputBorder: "rgba(255, 255, 255, 0.10)",
  sectionLabel: "#5ED29C",
  fieldLabel: "#7E9089",
  fieldText: "#F0FAF580",
  dropzoneText: "#F0FAF5",
  dropzoneSubtext: "#7E9089",
  button: "#4E8B46",
  buttonText: "#F0FAF5",
};

interface PitchFormData {
  startupName: string;
  sector: string;
  founderName: string;
  email: string;
  fundingRequest: string;
  teamSize: string;
  targetMarket: string;
  revenueProjection: string;
  executiveSummary: string;
}

const initialFormData: PitchFormData = {
  startupName: "",
  sector: "",
  founderName: "",
  email: "",
  fundingRequest: "",
  teamSize: "",
  targetMarket: "",
  revenueProjection: "",
  executiveSummary: "",
};

export default function PitchSubmissionPage() {
  const [formData, setFormData] = useState<PitchFormData>(initialFormData);
  const [pitchDeck, setPitchDeck] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false); // 👈 Added hover state
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBrowseClick = () => fileInputRef.current?.click();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPitchDeck(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === "application/pdf") setPitchDeck(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting pitch:", { ...formData, pitchDeck });
  };

  return (
    <>
      <div style={styles.navbarWrap}>
        <Navbar />
      </div>

      <div style={styles.page}>
        <div style={styles.bgLayer}>
          <img src={bgGlow} alt="" style={styles.bgImage} />
        </div>

        <style>{`
          .pitchform-input::placeholder,
          .pitchform-textarea::placeholder { color: ${colors.fieldText}; }
          .pitchform-input,
          .pitchform-textarea { color: ${colors.fieldText}; }
          .pitchform-input:focus,
          .pitchform-textarea:focus { outline: none; border-color: ${colors.sectionLabel}; }
          .pitchform-dropzone:hover { border-color: ${colors.sectionLabel}; }
        `}</style>

        <div style={styles.formStack}>
          <section style={styles.panelCard}>
            <h3 style={styles.sectionLabel}>Company Info</h3>

            <div style={styles.row}>
              <Field label="Startup Name">
                <input
                  className="pitchform-input"
                  style={styles.input}
                  name="startupName"
                  value={formData.startupName}
                  onChange={handleChange}
                  placeholder="e.g. AgriAI"
                />
              </Field>
              <Field label="Sector">
                <input
                  className="pitchform-input"
                  style={styles.input}
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                />
              </Field>
            </div>

            <div style={styles.row}>
              <Field label="Founder Name">
                <input
                  className="pitchform-input"
                  style={styles.input}
                  name="founderName"
                  value={formData.founderName}
                  onChange={handleChange}
                  placeholder="e.g. Sarah Chen"
                />
              </Field>
              <Field label="Email Address">
                <input
                  className="pitchform-input"
                  style={styles.input}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="founder@startup.com"
                />
              </Field>
            </div>
          </section>

          <section style={styles.panelCard}>
            <h3 style={styles.sectionLabel}>Deal Terms</h3>

            <div style={styles.row}>
              <Field label="Funding Request (USD)">
                <input
                  className="pitchform-input"
                  style={styles.input}
                  name="fundingRequest"
                  value={formData.fundingRequest}
                  onChange={handleChange}
                  placeholder="500000"
                />
              </Field>
              <Field label="Team Size">
                <input
                  className="pitchform-input"
                  style={styles.input}
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleChange}
                  placeholder="4"
                />
              </Field>
            </div>

            <Field label="Target Market" fullWidth>
              <input
                className="pitchform-input"
                style={styles.input}
                name="targetMarket"
                value={formData.targetMarket}
                onChange={handleChange}
                placeholder="e.g. North Africa, 2.4M smallholder farmers"
              />
            </Field>

            <Field label="Year-1 Revenue Projection" fullWidth>
              <input
                className="pitchform-input"
                style={styles.input}
                name="revenueProjection"
                value={formData.revenueProjection}
                onChange={handleChange}
                placeholder="e.g. $240K ARR by month 18"
              />
            </Field>
          </section>

          <form onSubmit={handleSubmit} style={styles.panelCard}>
            <h3 style={styles.sectionLabel}>Your Pitch</h3>

            <Field label="Executive Summary" fullWidth>
              <textarea
                className="pitchform-textarea"
                style={styles.textarea}
                name="executiveSummary"
                value={formData.executiveSummary}
                onChange={handleChange}
                placeholder="Describe your product, business model, competitive advantage, and why now..."
                rows={4}
              />
            </Field>

            <div style={{ marginTop: 24 }}>
              <label style={styles.fieldLabel}>Pitch Deck (PDF)</label>
              <div
                className="pitchform-dropzone"
                style={{
                  ...styles.dropzone,
                  borderColor: isDragging ? colors.sectionLabel : colors.inputBorder,
                }}
                onClick={handleBrowseClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileSelect}
                  style={{ display: "none" }}
                />
                <div style={styles.dropzoneIconWrap}>
                  <UploadIcon />
                </div>
                <p style={styles.dropzoneText}>
                  {pitchDeck ? pitchDeck.name : "Drop your pitch deck here"}
                </p>
                <p style={styles.dropzoneSubtext}>PDF up to 20MB · click to browse</p>
              </div>
            </div>

            {/* 👇 Updated button with hover state */}
            <button
              type="submit"
              className="pitchform-submit"
              style={isHovering ? { ...styles.submitButton, ...styles.submitButtonHover } : styles.submitButton}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              SUBMIT TO COMMITTEE
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                width={16}
                height={16}
                style={{
                  marginLeft: 8,
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
    </>
  );
}

function Field({
  label,
  fullWidth,
  children,
}: {
  label: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ ...styles.field, ...(fullWidth ? { marginTop: 20 } : {}) }}>
      <label style={styles.fieldLabel}>{label}</label>
      {children}
    </div>
  );
}

function UploadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 16V4M12 4L7 9M12 4l5 5M5 20h14"
        stroke={colors.sectionLabel}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  navbarWrap: {
    position: "relative",
    zIndex: 10,
    background: colors.pageBg,
  },
  page: {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    background: colors.pageBg,
    display: "flex",
    justifyContent: "center",
    paddingTop: 96,
    paddingBottom: 96,
    paddingLeft: 24,
    paddingRight: 24,
    overflow: "hidden",
  },
  bgLayer: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    pointerEvents: "none",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "blur(110px)",
    opacity: 0.7,
  },
  formStack: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: 560,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  panelCard: {
    width: "100%",
    background: colors.panelBg,
    borderRadius: 0,
    padding: "32px 32px",
    boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
    display: "flex",
    flexDirection: "column",
  },
  sectionLabel: {
    margin: 0,
    marginBottom: 22,
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: colors.sectionLabel,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
    marginBottom: 20,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 9,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: colors.fieldLabel,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    background: colors.inputBg,
    border: `1px solid ${colors.inputBorder}`,
    borderRadius: 8,
    padding: "14px 16px",
    fontSize: 15,
    fontFamily: "inherit",
  },
  textarea: {
    width: "100%",
    boxSizing: "border-box",
    background: colors.inputBg,
    border: `1px solid ${colors.inputBorder}`,
    borderRadius: 8,
    padding: "14px 16px",
    fontSize: 15,
    fontFamily: "inherit",
    resize: "vertical",
  },
  dropzone: {
    marginTop: 8,
    border: `1px dashed ${colors.inputBorder}`,
    borderRadius: 8,
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textAlign: "center",
    transition: "border-color 0.15s ease",
  },
  dropzoneIconWrap: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "rgba(94, 210, 156, 0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  dropzoneText: {
    margin: 0,
    fontSize: 14,
    fontWeight: 600,
    color: colors.dropzoneText,
  },
  dropzoneSubtext: {
    margin: "4px 0 0 0",
    fontSize: 12,
    color: colors.dropzoneSubtext,
  },
  submitButton: {
    width: "100%",
    marginTop: 28,
    background: colors.button,
    color: colors.buttonText,
    border: "2px solid transparent",
    borderRadius: 999,
    padding: "16px 24px",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(78, 139, 70, 0.28)",
    transition: "background 0.25s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
    transform: "translateY(0)",
  },
  submitButtonHover: {
    background: "transparent",
    color: colors.sectionLabel,
    border: "2px solid #5ED29C",
    boxShadow: "0 8px 18px rgba(94, 210, 156, 0.18)",
    transform: "translateY(-2px)",
  },
};