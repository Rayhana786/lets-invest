import logo from "../assets/logo.png";

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Destinations", href: "#destinations" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <div className="navbar__logo">
          <img src={logo} alt="Let's Invest Logo" className="navbar__logo-img" />
        </div>
        <nav className="navbar__links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="navbar__link">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="navbar__actions">
          <a href="/login" className="btn btn--pill btn--admin">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "6px" }}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Admin
          </a>
          <a href="#contact" className="btn btn--pill btn--ghost-light">
            Contact Us
          </a>
        </div>
      </div>

      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(6,10,8,0.85);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .navbar__inner {
          max-width: 1360px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.9rem 1.5rem;
        }
        .navbar__logo {
          display: flex;
          align-items: center;
        }
        .navbar__logo-img {
  height: 40px;           /* Base size - keeps navbar height stable */
  transform: scale(2);  /* 👈 CHANGE THIS VALUE! */
  transform-origin: left center;
}
        .navbar__links { 
          display: flex; 
          gap: 2rem; 
        }
        .navbar__link {
          font-size: 0.9rem;
          color: #cfe8d8;
          transition: color 0.25s ease, text-shadow 0.25s ease;
          position: relative;
          text-decoration: none;
        }
        .navbar__link::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: #3ddc73;
          transition: width 0.3s ease;
        }
        .navbar__link:hover {
          color: #3ddc73;
          text-shadow: 0 0 8px rgba(61, 220, 115, 0.4);
        }
        .navbar__link:hover::after { 
          width: 100%; 
        }
        .navbar__actions { 
          display: flex; 
          align-items: center; 
          gap: 0.75rem;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 500;
          padding: 0.6rem 1.2rem;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          text-decoration: none;
          border-radius: 999px;
        }
        .btn--admin {
          background: rgba(61, 220, 115, 0.1);
          border: 1px solid rgba(61, 220, 115, 0.3);
          color: #3ddc73;
        }
        .btn--admin:hover {
          background: rgba(61, 220, 115, 0.2);
          border-color: #3ddc73;
          box-shadow: 0 0 15px rgba(61, 220, 115, 0.25);
          transform: translateY(-2px);
        }
        .btn--ghost-light {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.18);
          color: #f5f7f6;
        }
        .btn--ghost-light:hover {
          background: rgba(61, 220, 115, 0.12);
          border-color: #3ddc73;
          color: #3ddc73;
          box-shadow: 0 0 15px rgba(61, 220, 115, 0.15);
          transform: translateY(-2px);
        }
        @media (max-width: 768px) { 
          .navbar__links { 
            display: none; 
          }
          .btn--admin span { 
            display: none; 
          }
        }
      `}</style>
    </header>
  );
}