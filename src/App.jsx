import { useEffect, useRef } from "react";
import heroVideo from "../hero.mp4";

const featureCards = [
  {
    title: "Cinematic storytelling",
    text: "A homepage designed to feel more like an opening scene than a static layout.",
  },
  {
    title: "Performance-minded",
    text: "Clear structure, reusable sections, and a straightforward React setup for future expansion.",
  },
  {
    title: "Ready for your brand",
    text: "Copy, colors, links, and featured work can be swapped without redesigning the page.",
  },
];

const spotlightItems = [
  "Hero-led landing experience",
  "Responsive layout for mobile and desktop",
  "Video-integrated design with layered overlays",
];

export default function App() {
  const heroSectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const heroSection = heroSectionRef.current;
    const video = videoRef.current;

    if (!heroSection || !video) {
      return undefined;
    }

    let frameId = 0;
    let sectionStart = 0;
    let scrollRange = 1;
    let safeDuration = 0;
    let targetTime = 0;
    let videoReady = false;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

    const renderFrame = () => {
      frameId = 0;

      if (!videoReady || safeDuration <= 0) {
        return;
      }

      const nextTime = reducedMotionQuery.matches
        ? targetTime
        : video.currentTime + (targetTime - video.currentTime) * 0.2;

      if (Math.abs(targetTime - nextTime) <= 0.01) {
        video.currentTime = targetTime;
        return;
      }

      video.currentTime = nextTime;
      frameId = window.requestAnimationFrame(renderFrame);
    };

    const syncToScroll = () => {
      const progress = clamp(
        (window.scrollY - sectionStart) / scrollRange,
        0,
        1,
      );

      heroSection.style.setProperty("--scroll-progress", progress.toFixed(4));

      if (!videoReady || safeDuration <= 0) {
        return;
      }

      targetTime = progress * safeDuration;

      if (!frameId) {
        frameId = window.requestAnimationFrame(renderFrame);
      }
    };

    const updateBounds = () => {
      const sectionTop = heroSection.getBoundingClientRect().top + window.scrollY;
      sectionStart = sectionTop;
      scrollRange = Math.max(heroSection.offsetHeight - window.innerHeight, 1);
      syncToScroll();
    };

    const handleLoadedMetadata = () => {
      safeDuration = Math.max(video.duration - 0.1, 0);
      videoReady = safeDuration > 0;
      video.pause();
      video.currentTime = 0;
      updateBounds();
    };

    video.pause();

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    window.addEventListener("resize", updateBounds);
    window.addEventListener("scroll", syncToScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", updateBounds);
      window.removeEventListener("scroll", syncToScroll);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div className="page-shell">
      <header className="topbar">
        <a className="brand" href="#home">
          FrameCraft
        </a>
        <nav className="nav">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="home">
        <section className="hero-scroll" ref={heroSectionRef}>
          <div className="hero-pin">
            <video
              className="hero-video"
              muted
              playsInline
              preload="auto"
              ref={videoRef}
            >
              <source src={heroVideo} type="video/mp4" />
            </video>

            <div className="hero-overlay">
              <p className="eyebrow">Scroll Trigger Hero</p>
              <h1>Centered, full-screen video that scrubs with your scroll.</h1>
              <p className="hero-text">
                Scroll down to move the reel forward and scroll up to pull it
                backward. The hero stays pinned while the video follows your
                position.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#about">
                  View the layout
                </a>
                <a className="button button-secondary" href="#contact">
                  Use this homepage
                </a>
              </div>

              <ul className="spotlight-list">
                {spotlightItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="scrub-status" aria-hidden="true">
                <span>Scroll to scrub the timeline</span>
                <div className="progress-track">
                  <span className="progress-fill" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="content-shell">
          <section className="intro-panel" id="about">
            <p>
              The hero is now centered and full screen, with scroll position
              controlling video progress in both directions instead of autoplay.
            </p>
          </section>

          <section className="features" id="work">
            {featureCards.map((card, index) => (
              <article className="feature-card" key={card.title}>
                <p className="feature-index">0{index + 1}</p>
                <h2>{card.title}</h2>
                <p>{card.text}</p>
              </article>
            ))}
          </section>

          <section className="contact-panel" id="contact">
            <div>
              <p className="eyebrow">Next Step</p>
              <h2>Make this homepage your own.</h2>
            </div>
            <a
              className="button button-primary"
              href="mailto:hello@example.com"
            >
              hello@example.com
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}
