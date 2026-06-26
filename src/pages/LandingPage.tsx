import { useEffect, useRef } from "react";
import hero1 from "../assets/hero1.jpg";
import footer from "../assets/footer.jpg";
import Navbar from "../components/Navbar"; // 👈 Import the new component (adjust path if needed)

interface StartupCard {
  id: number;
  name: string;
  tagline: string;
  description: string;
  image: string;
  category: string;
}

const STARTUP_CARDS: StartupCard[] = [
  { 
    id: 1, 
    name: "Voltix", 
    tagline: "Powering the future",
    description: "Sustainable energy solutions",
    category: "Clean Energy",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop"
  },
  { 
    id: 2, 
    name: "MediCore", 
    tagline: "Healthcare reimagined",
    description: "AI-powered diagnostics",
    category: "HealthTech",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop"
  },
  { 
    id: 3, 
    name: "FinFlow", 
    tagline: "Banking simplified",
    description: "Next-gen financial platform",
    category: "FinTech",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop"
  },
  { 
    id: 4, 
    name: "EduBridge", 
    tagline: "Learning without limits",
    description: "Personalized education AI",
    category: "EdTech",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=300&fit=crop"
  },
  { 
    id: 5, 
    name: "GreenCart", 
    tagline: "Sustainable shopping",
    description: "Eco-friendly marketplace",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop"
  },
  { 
    id: 6, 
    name: "DataPulse", 
    tagline: "Insights that matter",
    description: "Real-time analytics platform",
    category: "Data & AI",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
  },
];

function Hero() {
  return (
    <section className="hero">
      <img src={hero1} alt="" aria-hidden="true" className="hero__bg" />
      <div className="hero__overlay" aria-hidden="true" />
      {/* Hero content animates on page LOAD with 2s duration */}
      <div className="hero__content reveal-on-load fade-up load-delay-400">
        <h1 className="hero__title">
          Show Investors Why Your Startup
          <br />
          Deserves Their Funding.
        </h1>
        <p className="hero__subtitle">
          Submit your pitch, financials, and business model. Our AI evaluates
          them against real incubator and investment criteria, then gives you
          an instant, data-backed readiness score.
        </p>
        <a href="/submit" className="btn btn--pill btn--solid-green">
          Submit Your Startup
        </a>
      </div>
    </section>
  );
}

function StartupCardItem({ card }: { card: StartupCard }) {
  return (
    <div className="startup-card">
      <div className="startup-card__image-wrap">
        <img src={card.image} alt={card.name} className="startup-card__image" />
        <div className="startup-card__category">{card.category}</div>
      </div>
      <div className="startup-card__star">★</div>
      <h3 className="startup-card__name">{card.name}</h3>
      <div className="startup-card__divider" />
      <p className="startup-card__tagline">{card.tagline}</p>
      <p className="startup-card__description">{card.description}</p>
    </div>
  );
}

function StartupsCarousel() {
  const loopCards = [...STARTUP_CARDS, ...STARTUP_CARDS];
  return (
    <section className="startups reveal fade-up" id="destinations">
      <div className="startups__heading-wrap reveal fade-up" data-delay="100">
        <h2 className="startups__heading">
          STARTUPS INVENTED
          <span className="startups__heading-underline" />
        </h2>
      </div>
      <div className="startups__sparkle startups__sparkle--top reveal fade-in" data-delay="200">✦</div>
      <div className="marquee reveal slide-in-left" data-delay="300">
        <div className="marquee__track marquee__track--rtl">
          {loopCards.map((card, i) => (
            <StartupCardItem key={`rtl-${card.id}-${i}`} card={card} />
          ))}
        </div>
      </div>
      <div className="marquee reveal slide-in-right" data-delay="400">
        <div className="marquee__track marquee__track--ltr">
          {loopCards.map((card, i) => (
            <StartupCardItem key={`ltr-${card.id}-${i}`} card={card} />
          ))}
        </div>
      </div>
      <div className="startups__sparkle startups__sparkle--bottom reveal fade-in" data-delay="500">✦</div>
    </section>
  );
}

function FounderCTA() {
  return (
    <section className="founder-cta reveal fade-up" id="about">
      <div className="founder-cta__content-wrapper">
        <div className="founder-cta__content reveal slide-in-left" data-delay="200">
          <h2 className="founder-cta__heading">
            Are you a startup founder looking for funding?
          </h2>
          <p className="founder-cta__body">
            We will analyze your venture. Submit your pitch deck, financial
            projections, and business model to receive a comprehensive
            institutional-grade readiness report.
          </p>
          <a href="/submit" className="btn btn--pill btn--ghost-muted">
            Join
          </a>
        </div>
      </div>
      <div className="founder-cta__image-wrapper">
        <img src={footer} alt="" aria-hidden="true" className="founder-cta__bg" />
      </div>
    </section>
  );
}

export default function LandingPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1) Animate on LOAD elements (hero) — triggers immediately on mount
    const loadElements = document.querySelectorAll(".reveal-on-load");
    loadElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const delay = parseInt(htmlEl.dataset.loadDelay || htmlEl.classList.contains("load-delay-400") ? "400" : "0");
      setTimeout(() => {
        htmlEl.classList.add("is-visible");
      }, delay);
    });

    // 2) Animate on SCROLL elements (everything else)
    const scrollElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay || "0";
            setTimeout(() => {
              el.classList.add("is-visible");
            }, parseInt(delay));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    scrollElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="page" ref={pageRef}>
      <Navbar />
      <Hero />
      <StartupsCarousel />
      <FounderCTA />

      <style>{`
        :root {
          --bg-black: #07090a;
          --green-500: #3ddc73;
          --green-600: #2fb85f;
          --green-glow: rgba(61, 220, 115, 0.45);
          --text-white: #f5f7f6;
          --text-muted: #aab3ad;
          --card-border: rgba(61, 220, 115, 0.35);
          --card-bg: rgba(13, 22, 17, 0.85);
        }

        * { box-sizing: border-box; }

        .page {
          background: var(--bg-black);
          color: var(--text-white);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, sans-serif;
          overflow-x: hidden;
          width: 100%;
        }

        a { text-decoration: none; color: inherit; }

        /* ========== SCROLL REVEAL (for sections below hero) ========== */
        .reveal {
          opacity: 0;
          transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal.is-visible { opacity: 1; }

        .reveal.fade-up { transform: translateY(50px); }
        .reveal.fade-up.is-visible { transform: translateY(0); }

        .reveal.fade-in { transform: none; }

        .reveal.slide-in-left { transform: translateX(-60px); }
        .reveal.slide-in-left.is-visible { transform: translateX(0); }

        .reveal.slide-in-right { transform: translateX(60px); }
        .reveal.slide-in-right.is-visible { transform: translateX(0); }

        .reveal.scale-up { transform: scale(0.9); }
        .reveal.scale-up.is-visible { transform: scale(1); }

        /* ========== LOAD REVEAL (for hero — 2s duration) ========== */
        .reveal-on-load {
          opacity: 0;
          transition: opacity 2s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 2s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal-on-load.is-visible { opacity: 1; }

        .reveal-on-load.fade-up { transform: translateY(60px); }
        .reveal-on-load.fade-up.is-visible { transform: translateY(0); }

        .reveal-on-load.fade-in { transform: none; }

        .reveal-on-load.slide-in-left { transform: translateX(-80px); }
        .reveal-on-load.slide-in-left.is-visible { transform: translateX(0); }

        .reveal-on-load.slide-in-right { transform: translateX(80px); }
        .reveal-on-load.slide-in-right.is-visible { transform: translateX(0); }

        /* Load delay utilities */
        .load-delay-200 { transition-delay: 0.2s; }
        .load-delay-400 { transition-delay: 0.4s; }
        .load-delay-600 { transition-delay: 0.6s; }
        .load-delay-800 { transition-delay: 0.8s; }

        @media (prefers-reduced-motion: reduce) {
          .reveal,
          .reveal-on-load {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }

        /* ========== BUTTONS ========== */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.95rem;
          font-weight: 500;
          padding: 0.7rem 1.6rem;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
        }
        .btn--pill { border-radius: 999px; }

        .btn--solid-green {
          background: var(--green-600);
          color: #06150c;
          box-shadow: 0 0 0 rgba(61, 220, 115, 0);
        }
        .btn--solid-green:hover {
          background: var(--green-500);
          color: #041008;
          box-shadow: 0 0 20px rgba(61, 220, 115, 0.5),
                      0 0 40px rgba(61, 220, 115, 0.2);
          transform: translateY(-2px);
        }

        .btn--ghost-light {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.18);
          color: var(--text-white);
        }
        .btn--ghost-light:hover {
          background: rgba(61, 220, 115, 0.12);
          border-color: var(--green-500);
          color: var(--green-500);
          box-shadow: 0 0 15px rgba(61, 220, 115, 0.15);
          transform: translateY(-2px);
        }

        .btn--ghost-muted {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          color: var(--text-white);
        }
        .btn--ghost-muted:hover {
          background: rgba(61, 220, 115, 0.12);
          border-color: var(--green-500);
          color: var(--green-500);
          box-shadow: 0 0 15px rgba(61, 220, 115, 0.15);
          transform: translateY(-2px);
        }

        .btn--admin {
          background: rgba(61, 220, 115, 0.1);
          border: 1px solid rgba(61, 220, 115, 0.3);
          color: var(--green-500);
          font-size: 0.85rem;
          padding: 0.6rem 1.2rem;
          margin-right: 0.75rem;
        }
        .btn--admin:hover {
          background: rgba(61, 220, 115, 0.2);
          border-color: var(--green-500);
          box-shadow: 0 0 15px rgba(61, 220, 115, 0.25);
          transform: translateY(-2px);
        }

        /* ========== NAVBAR ========== */
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
        .navbar__links { display: flex; gap: 2rem; }
        .navbar__link {
          font-size: 0.9rem;
          color: #cfe8d8;
          transition: color 0.25s ease, text-shadow 0.25s ease;
          position: relative;
        }
        .navbar__link::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--green-500);
          transition: width 0.3s ease;
        }
        .navbar__link:hover {
          color: var(--green-500);
          text-shadow: 0 0 8px rgba(61, 220, 115, 0.4);
        }
        .navbar__link:hover::after { width: 100%; }
        
        .navbar__actions {
          display: flex;
          align-items: center;
        }
        
        @media (max-width: 768px) { 
          .navbar__links { display: none; }
          .btn--admin span { display: none; }
        }

        /* ========== HERO ========== */
        .hero {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 600px;
          max-height: 860px;
          overflow: hidden;
          background: var(--bg-black);
        }

        .hero__bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          pointer-events: none;
          z-index: 0;
        }

        .hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            transparent 45%,
            rgba(7,9,10,0.55) 70%,
            #07090a 100%
          );
          z-index: 1;
          pointer-events: none;
        }

        .hero__content {
          position: absolute;
          bottom: 8%;
          left: 0;
          z-index: 3;
          padding: 0 4rem;
          max-width: 520px;
        }

        .hero__title {
          font-size: clamp(1.6rem, 2.4vw, 2.2rem);
          font-weight: 600;
          line-height: 1.2;
          margin: 0 0 0.9rem;
        }

        .hero__subtitle {
          font-size: 0.85rem;
          line-height: 1.55;
          color: var(--text-muted);
          max-width: 420px;
          margin: 0 0 1.5rem;
        }

        @media (max-width: 900px) {
          .hero__content { max-width: 100%; padding: 0 1.5rem; }
        }

        /* ========== STARTUPS / CAROUSEL ========== */
        .startups {
          position: relative;
          padding: 4rem 0 0;
          background: radial-gradient(
            ellipse 80% 60% at 50% 30%,
            rgba(61,220,115,0.18) 0%,
            rgba(7,9,10,0) 70%
          );
        }
        .startups__heading-wrap {
          max-width: 1360px;
          margin: 0 auto 2.5rem;
          padding: 0 1.5rem;
        }
        .startups__heading {
          font-size: 1.9rem;
          font-weight: 400;
          letter-spacing: 0.02em;
          display: inline-block;
          margin: 0;
        }
        .startups__heading-underline {
          display: block;
          width: 70%;
          height: 2px;
          background: var(--text-white);
          margin-top: 0.4rem;
        }
        .startups__sparkle {
          text-align: center;
          color: var(--green-500);
          font-size: 1.3rem;
          opacity: 0.8;
        }
        .startups__sparkle--top { margin-bottom: 1rem; }
        .startups__sparkle--bottom { margin-top: 1rem; }

        .marquee {
          width: 100%;
          overflow: hidden;
          padding: 0.75rem 0;
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
        }
        .marquee__track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
        }
        .marquee__track--rtl { animation: scroll-rtl 28s linear infinite; }
        .marquee__track--ltr { animation: scroll-ltr 28s linear infinite; }
        .marquee:hover .marquee__track { animation-play-state: paused; }

        @keyframes scroll-rtl {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes scroll-ltr {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee__track--rtl,
          .marquee__track--ltr { animation: none; }
        }

        .startup-card {
          flex: 0 0 auto;
          width: 280px;
          min-height: 380px;
          border-radius: 18px;
          border: 1px solid var(--card-border);
          background: var(--card-bg);
          padding: 0;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          box-shadow: 0 0 24px rgba(61,220,115,0.06);
          transition: all 0.35s ease;
          overflow: hidden;
        }
        .startup-card:hover {
          border-color: var(--green-500);
          box-shadow: 0 0 30px rgba(61,220,115,0.2),
                      0 8px 32px rgba(0,0,0,0.3);
          transform: translateY(-4px);
          background: rgba(20, 35, 25, 0.9);
        }
        
        .startup-card__image-wrap {
          position: relative;
          width: 100%;
          height: 160px;
          overflow: hidden;
        }
        
        .startup-card__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.35s ease;
        }
        
        .startup-card:hover .startup-card__image {
          transform: scale(1.05);
        }
        
        .startup-card__category {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(61, 220, 115, 0.9);
          color: #06150c;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .startup-card__star { 
          color: var(--green-500); 
          font-size: 1.1rem; 
          margin: 1rem 0 0.5rem; 
        }
        
        .startup-card__name { 
          font-size: 1.6rem; 
          font-weight: 700; 
          margin: 0 0 0.4rem; 
        }
        
        .startup-card__divider { 
          width: 36px; 
          height: 2px; 
          background: rgba(61,220,115,0.7); 
          margin-bottom: 0.6rem; 
        }
        
        .startup-card__tagline { 
          font-size: 0.95rem; 
          color: var(--text-white); 
          margin: 0 0 0.4rem; 
          font-weight: 500;
        }
        
        .startup-card__description { 
          font-size: 0.8rem; 
          color: var(--text-muted); 
          margin: 0 1.5rem 1.5rem; 
          line-height: 1.5; 
        }

        /* ========== FOUNDER CTA ========== */
        .founder-cta {
          position: relative;
          padding: 8rem 2rem 0;
          overflow: hidden;
          min-height: 750px;
          display: flex;
          flex-direction: column;
        }

        .founder-cta__content-wrapper {
          position: relative;
          z-index: 2;
          width: 100%;
          display: flex;
          justify-content: flex-start;
          margin-bottom: 4rem;
        }

        .founder-cta__content {
          max-width: 700px;
          margin-left: 8%;
          text-align: left;
          padding: 2rem 0;
        }

        .founder-cta__heading {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 600;
          margin: 0 0 2rem 0;
          line-height: 1.2;
        }

        .founder-cta__body {
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--text-muted);
          max-width: 600px;
          margin: 0 0 3rem 0;
        }

        .founder-cta__image-wrapper {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          z-index: 1;
          margin-top: auto;
        }

        .founder-cta__bg {
          width: 100%;
          max-width: 850px;
          height: auto;
          object-fit: contain;
          object-position: bottom center;
          opacity: 0.95;
        }

        @media (max-width: 968px) {
          .founder-cta {
            padding: 8rem 2rem 0;
            min-height: 650px;
          }
          .founder-cta__content-wrapper {
            justify-content: center;
            margin-bottom: 0;
          }
          .founder-cta__content {
            margin-left: 0;
            max-width: 100%;
            text-align: center;
            padding: 1rem 0;
          }
          .founder-cta__body {
            margin-left: auto;
            margin-right: auto;
          }
          .founder-cta__image-wrapper {
            margin-top: 2rem;
          }
          .founder-cta__bg {
            max-width: 100%;
          }
          .startup-card {
            width: 240px;
            min-height: 340px;
          }
          .startup-card__image-wrap {
            height: 140px;
          }
        }
      `}</style>
    </div>
  );
}