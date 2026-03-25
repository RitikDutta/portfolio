import { useEffect, useRef } from "react";
import heroImage from "../hero.webp";
import heroPoster from "../hero-poster.webp";

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
  "Centered full-screen animated WebP",
  "Responsive layout for mobile and desktop",
  "Scroll-controlled frames instead of autoplay",
];

export default function App() {
  const heroSectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const heroSection = heroSectionRef.current;
    const canvas = canvasRef.current;

    if (!heroSection || !canvas) {
      return undefined;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return undefined;
    }

    let frameId = 0;
    let sectionStart = 0;
    let scrollRange = 1;
    let targetProgress = 0;
    let currentProgress = 0;
    let decoder = null;
    let frameCount = 1;
    let mounted = true;
    let activeFrameIndex = -1;
    let requestedFrameIndex = -1;

    const frameCache = new Map();
    const pendingFrames = new Map();
    const maxCachedFrames = 10;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

    const trimFrameCache = (focusIndex) => {
      if (frameCache.size <= maxCachedFrames) {
        return;
      }

      const keepIndexes = new Set(
        [...frameCache.keys()]
          .sort((left, right) => {
            return Math.abs(left - focusIndex) - Math.abs(right - focusIndex);
          })
          .slice(0, maxCachedFrames),
      );

      for (const [index, frame] of frameCache.entries()) {
        if (keepIndexes.has(index)) {
          continue;
        }

        frame.close?.();
        frameCache.delete(index);
      }
    };

    const drawFrame = (frame) => {
      const bounds = canvas.getBoundingClientRect();
      const devicePixelRatio = window.devicePixelRatio || 1;
      const width = Math.max(1, Math.round(bounds.width * devicePixelRatio));
      const height = Math.max(1, Math.round(bounds.height * devicePixelRatio));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      const sourceWidth =
        frame.displayWidth || frame.codedWidth || frame.width || 1;
      const sourceHeight =
        frame.displayHeight || frame.codedHeight || frame.height || 1;
      const scale = Math.max(width / sourceWidth, height / sourceHeight);
      const drawWidth = sourceWidth * scale;
      const drawHeight = sourceHeight * scale;
      const offsetX = (width - drawWidth) / 2;
      const offsetY = (height - drawHeight) / 2;

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#03070d";
      context.fillRect(0, 0, width, height);
      context.drawImage(frame, offsetX, offsetY, drawWidth, drawHeight);
    };

    const decodeFrame = (frameIndex) => {
      if (!decoder) {
        return Promise.resolve(null);
      }

      if (frameCache.has(frameIndex)) {
        return Promise.resolve(frameCache.get(frameIndex));
      }

      if (pendingFrames.has(frameIndex)) {
        return pendingFrames.get(frameIndex);
      }

      const task = decoder
        .decode({
          completeFramesOnly: true,
          frameIndex,
        })
        .then(({ image }) => {
          pendingFrames.delete(frameIndex);

          if (!mounted) {
            image.close?.();
            return null;
          }

          frameCache.set(frameIndex, image);
          trimFrameCache(frameIndex);
          return image;
        })
        .catch(() => {
          pendingFrames.delete(frameIndex);
          return null;
        });

      pendingFrames.set(frameIndex, task);
      return task;
    };

    const warmNearbyFrames = (frameIndex) => {
      [frameIndex - 1, frameIndex + 1]
        .filter((index) => index >= 0 && index < frameCount)
        .forEach((index) => {
          if (!frameCache.has(index) && !pendingFrames.has(index)) {
            void decodeFrame(index);
          }
        });
    };

    const renderVisibleFrame = () => {
      if (!decoder || frameCount < 1) {
        return;
      }

      const nextFrameIndex = clamp(
        Math.round(currentProgress * (frameCount - 1)),
        0,
        frameCount - 1,
      );

      if (nextFrameIndex === requestedFrameIndex) {
        return;
      }

      requestedFrameIndex = nextFrameIndex;

      void decodeFrame(nextFrameIndex).then((frame) => {
        if (!mounted || !frame || requestedFrameIndex !== nextFrameIndex) {
          return;
        }

        activeFrameIndex = nextFrameIndex;
        heroSection.dataset.decoderReady = "true";
        drawFrame(frame);
        warmNearbyFrames(nextFrameIndex);
      });
    };

    const renderFrame = () => {
      frameId = 0;

      const easing = reducedMotionQuery.matches ? 1 : 0.12;
      currentProgress += (targetProgress - currentProgress) * easing;

      if (Math.abs(targetProgress - currentProgress) <= 0.0004) {
        currentProgress = targetProgress;
      }

      heroSection.style.setProperty(
        "--scroll-progress",
        currentProgress.toFixed(4),
      );

      renderVisibleFrame();

      const shouldContinue = Math.abs(targetProgress - currentProgress) > 0.0004;

      if (shouldContinue) {
        frameId = window.requestAnimationFrame(renderFrame);
      }
    };

    const syncToScroll = () => {
      targetProgress = clamp(
        (window.scrollY - sectionStart) / scrollRange,
        0,
        1,
      );

      if (!frameId) {
        frameId = window.requestAnimationFrame(renderFrame);
      }
    };

    const updateBounds = () => {
      const sectionTop = heroSection.getBoundingClientRect().top + window.scrollY;
      sectionStart = sectionTop;
      scrollRange = Math.max(heroSection.offsetHeight - window.innerHeight, 1);

      if (activeFrameIndex >= 0 && frameCache.has(activeFrameIndex)) {
        drawFrame(frameCache.get(activeFrameIndex));
      }

      syncToScroll();
    };

    const initializeDecoder = async () => {
      const ImageDecoderClass = window.ImageDecoder;

      heroSection.dataset.decoderReady = "false";

      if (!ImageDecoderClass) {
        return;
      }

      try {
        const supportsWebP =
          typeof ImageDecoderClass.isTypeSupported === "function"
            ? await ImageDecoderClass.isTypeSupported("image/webp")
            : true;

        if (!supportsWebP || !mounted) {
          return;
        }

        const response = await fetch(heroImage);
        const imageBuffer = await response.arrayBuffer();

        if (!mounted) {
          return;
        }

        decoder = new ImageDecoderClass({
          data: imageBuffer,
          type: "image/webp",
        });

        if (decoder.tracks?.ready) {
          await decoder.tracks.ready;
        }

        if (!mounted) {
          return;
        }

        frameCount = decoder.tracks?.selectedTrack?.frameCount ?? 1;

        const firstFrame = await decodeFrame(0);

        if (!mounted || !firstFrame) {
          return;
        }

        activeFrameIndex = 0;
        requestedFrameIndex = 0;
        heroSection.dataset.decoderReady = "true";
        drawFrame(firstFrame);
        warmNearbyFrames(0);
        syncToScroll();
      } catch (error) {
        console.error("Failed to decode animated WebP frames.", error);
      }
    };

    window.addEventListener("resize", updateBounds);
    window.addEventListener("scroll", syncToScroll, { passive: true });
    currentProgress = 0;
    targetProgress = 0;
    updateBounds();
    void initializeDecoder();

    return () => {
      mounted = false;
      window.removeEventListener("resize", updateBounds);
      window.removeEventListener("scroll", syncToScroll);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      for (const frame of frameCache.values()) {
        frame.close?.();
      }

      frameCache.clear();
      pendingFrames.clear();
      decoder?.close?.();
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
        <section
          className="hero-scroll"
          data-decoder-ready="false"
          ref={heroSectionRef}
        >
          <div className="hero-pin">
            <canvas
              aria-hidden="true"
              className="hero-media hero-canvas"
              ref={canvasRef}
            />
            <img
              alt="Full-screen hero artwork"
              className="hero-media hero-fallback"
              decoding="async"
              fetchPriority="high"
              loading="eager"
              src={heroPoster}
            />

            <div className="hero-overlay">
              <p className="eyebrow">Scroll Trigger Hero</p>
              <h1>Animated WebP frames now move only when you scroll.</h1>
              <p className="hero-text">
                The hero uses `hero.webp` as a frame source and renders it onto
                a canvas, so scroll position controls the animation instead of
                letting the browser autoplay the image.
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
                <span>Scroll to move through the scene</span>
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
              The hero is centered and full screen, with animated WebP frames
              decoded into a canvas so the motion stays tied to scroll instead
              of autoplaying on its own.
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
