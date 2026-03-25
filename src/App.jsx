import { useEffect, useRef } from "react";
import heroImage from "../hero.webp";
import heroPoster from "../hero-poster.webp";
import brainModelUrl from "../brain.glb?url";

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
  "Three.js brain handoff using a GLB asset",
  "Responsive layout for mobile and desktop",
  "Scroll-controlled frames instead of autoplay",
];

export default function App() {
  const heroSectionRef = useRef(null);
  const canvasRef = useRef(null);
  const brainMountRef = useRef(null);

  useEffect(() => {
    const heroSection = heroSectionRef.current;
    const canvas = canvasRef.current;
    const mainElement = heroSection?.parentElement;

    if (!heroSection || !canvas || !(mainElement instanceof HTMLElement)) {
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
    const playbackEndProgress = 0.68;
    const zoomStartProgress = playbackEndProgress;
    const brainMotionStart = zoomStartProgress;
    const brainPinnedEnd = 0.92;
    const brainReleaseStart = brainMotionStart;
    const brainReleaseEnd = 0.8;
    const brainTravelStart = brainPinnedEnd;
    const brainTravelEnd = 1;
    const brainDockStart = 0.96;
    const screenDropStart = brainPinnedEnd;
    const screenDropEnd = 1;
    const brainFullscreenStart = brainMotionStart;
    const brainFullscreenEnd = brainPinnedEnd;
    const brainSpinStart = brainMotionStart;
    const brainSpinEnd = 1;

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
      const extraVerticalCrop = Math.max(drawHeight - height, 0);
      const verticalShiftStrength = 0.24;
      const offsetX = (width - drawWidth) / 2;
      const offsetY =
        (height - drawHeight) / 2 +
        extraVerticalCrop * verticalShiftStrength * currentProgress;

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

      const playbackProgress = clamp(
        currentProgress / playbackEndProgress,
        0,
        1,
      );
      const nextFrameIndex = clamp(
        Math.round(playbackProgress * (frameCount - 1)),
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
      mainElement.style.setProperty(
        "--scroll-progress",
        currentProgress.toFixed(4),
      );
      mainElement.style.setProperty(
        "--hero-zoom",
        clamp((currentProgress - zoomStartProgress) / 0.16, 0, 1).toFixed(4),
      );
      mainElement.style.setProperty(
        "--brain-release",
        clamp(
          (currentProgress - brainReleaseStart) /
            (brainReleaseEnd - brainReleaseStart),
          0,
          1,
        ).toFixed(4),
      );
      mainElement.style.setProperty(
        "--brain-travel",
        clamp(
          (currentProgress - brainTravelStart) /
            (brainTravelEnd - brainTravelStart),
          0,
          1,
        ).toFixed(4),
      );
      mainElement.style.setProperty(
        "--brain-dock",
        clamp((currentProgress - brainDockStart) / 0.04, 0, 1).toFixed(4),
      );
      mainElement.style.setProperty(
        "--screen-drop",
        clamp(
          (currentProgress - screenDropStart) / (screenDropEnd - screenDropStart),
          0,
          1,
        ).toFixed(4),
      );
      mainElement.style.setProperty(
        "--brain-fullscreen",
        clamp(
          (currentProgress - brainFullscreenStart) /
            (brainFullscreenEnd - brainFullscreenStart),
          0,
          1,
        ).toFixed(4),
      );
      mainElement.style.setProperty(
        "--brain-spin",
        clamp(
          (currentProgress - brainSpinStart) / (brainSpinEnd - brainSpinStart),
          0,
          1,
        ).toFixed(4),
      );

      if (activeFrameIndex >= 0 && frameCache.has(activeFrameIndex)) {
        drawFrame(frameCache.get(activeFrameIndex));
      }

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

  useEffect(() => {
    const mountNode = brainMountRef.current;
    const mainElement = heroSectionRef.current?.parentElement;

    if (!mountNode || !(mainElement instanceof HTMLElement)) {
      return undefined;
    }

    let disposeScene = () => {};
    let cancelled = false;
    let syncFrameId = 0;
    let styleObserver = null;

    const initializeBrainScene = async () => {
      try {
        const [{ GLTFLoader }, { MeshoptDecoder }, THREE] = await Promise.all([
          import("three/examples/jsm/loaders/GLTFLoader.js"),
          import("three/examples/jsm/libs/meshopt_decoder.module.js"),
          import("three"),
        ]);

        if (cancelled) {
          return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });
        const root = new THREE.Group();
        const pivot = new THREE.Group();
        const loader = new GLTFLoader();

        let resizeObserver = null;
        let brainModel = null;
        let disposed = false;

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.08;
        renderer.domElement.className = "brain-canvas";
        mountNode.appendChild(renderer.domElement);
        loader.setMeshoptDecoder(MeshoptDecoder);

        scene.add(root);
        root.add(pivot);
        camera.position.set(0, 0, 5.6);

        const ambientLight = new THREE.HemisphereLight(0xfff1dc, 0x210811, 1.9);
        const keyLight = new THREE.DirectionalLight(0xffd4a0, 3.2);
        const fillLight = new THREE.PointLight(0xd36f3e, 18, 14, 2);
        const rimLight = new THREE.DirectionalLight(0x7b1b33, 2.4);

        keyLight.position.set(2.4, 1.6, 5);
        fillLight.position.set(-2, -1.4, 3.2);
        rimLight.position.set(-4.2, 1.2, -3);

        scene.add(ambientLight, keyLight, fillLight, rimLight);

        const renderScene = () => {
          camera.lookAt(0, 0, 0);
          renderer.render(scene, camera);
        };

        const resizeScene = () => {
          const width = Math.max(mountNode.clientWidth, 1);
          const height = Math.max(mountNode.clientHeight, 1);

          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.position.z = 5.6;

          if (brainModel) {
            const bounds = new THREE.Box3().setFromObject(brainModel);
            const sphere = bounds.getBoundingSphere(new THREE.Sphere());
            const radius = Math.max(sphere.radius, 0.1);
            const verticalFov = THREE.MathUtils.degToRad(camera.fov);
            const horizontalFov =
              2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);
            const fitFov = Math.min(verticalFov, horizontalFov);
            const distance = radius / Math.tan(fitFov / 2);

            camera.position.z = distance * 1.12;
            camera.near = Math.max(distance / 100, 0.01);
            camera.far = distance * 10;
          }

          camera.updateProjectionMatrix();
          renderScene();
        };

        const disposeMaterial = (material) => {
          for (const value of Object.values(material)) {
            if (value && typeof value === "object" && "isTexture" in value) {
              value.dispose();
            }
          }

          material.dispose();
        };

        const syncSceneToScroll = () => {
          if (!brainModel) {
            return;
          }

          const styles = window.getComputedStyle(mainElement);
          const brainSpin =
            Number.parseFloat(styles.getPropertyValue("--brain-spin")) || 0;
          const brainFullscreen =
            Number.parseFloat(styles.getPropertyValue("--brain-fullscreen")) || 0;

          pivot.rotation.x = THREE.MathUtils.lerp(0.24, 0.04, brainFullscreen);
          pivot.rotation.y = brainSpin * Math.PI * 1.75;
          pivot.rotation.z = THREE.MathUtils.lerp(-0.12, 0, brainFullscreen);
          renderScene();
        };

        const requestScrollSync = () => {
          if (syncFrameId) {
            return;
          }

          syncFrameId = window.requestAnimationFrame(() => {
            syncFrameId = 0;
            syncSceneToScroll();
          });
        };

        loader.load(
          brainModelUrl,
          (gltf) => {
            if (disposed) {
              return;
            }

            const model = gltf.scene;
            const targetSize = 2.7;

            model.scale.setScalar(1);
            model.rotation.set(0, 0, 0);
            model.position.set(0, 0, 0);
            model.updateMatrixWorld(true);

            const bounds = new THREE.Box3().setFromObject(model);
            const size = bounds.getSize(new THREE.Vector3());
            const maxDimension = Math.max(size.x, size.y, size.z) || 1;
            const scale = targetSize / maxDimension;

            model.scale.setScalar(scale);
            model.updateMatrixWorld(true);

            const centeredBounds = new THREE.Box3().setFromObject(model);
            const centeredPosition = centeredBounds.getCenter(new THREE.Vector3());

            model.position.set(
              -centeredPosition.x,
              -centeredPosition.y,
              -centeredPosition.z,
            );
            model.updateMatrixWorld(true);

            model.traverse((child) => {
              if (!child.isMesh && !child.isPoints) {
                return;
              }

              child.castShadow = false;
              child.receiveShadow = false;
            });

            pivot.add(model);
            brainModel = model;

            resizeScene();
            requestScrollSync();
          },
          undefined,
          (error) => {
            console.error("Failed to load brain.glb.", error);
          },
        );

        root.position.set(0, 0, 0);
        root.rotation.set(0, 0, 0);
        pivot.position.set(0, 0, 0);
        pivot.rotation.set(0, 0, 0);

        resizeScene();

        if (typeof ResizeObserver === "function") {
          resizeObserver = new ResizeObserver(resizeScene);
          resizeObserver.observe(mountNode);
        } else {
          window.addEventListener("resize", resizeScene);
        }

        styleObserver = new MutationObserver(requestScrollSync);
        styleObserver.observe(mainElement, {
          attributes: true,
          attributeFilter: ["style"],
        });

        requestScrollSync();

        disposeScene = () => {
          disposed = true;

          if (syncFrameId) {
            window.cancelAnimationFrame(syncFrameId);
          }

          if (resizeObserver) {
            resizeObserver.disconnect();
          } else {
            window.removeEventListener("resize", resizeScene);
          }

          styleObserver?.disconnect();

          if (brainModel) {
            brainModel.traverse((child) => {
              if (!child.isMesh && !child.isPoints) {
                return;
              }

              child.geometry?.dispose();

              if (Array.isArray(child.material)) {
                child.material.forEach(disposeMaterial);
              } else if (child.material) {
                disposeMaterial(child.material);
              }
            });
          }
          renderer.dispose();

          if (renderer.domElement.parentNode === mountNode) {
            mountNode.removeChild(renderer.domElement);
          }
        };
      } catch (error) {
        console.error("Failed to initialize the Three.js brain scene.", error);
      }
    };

    void initializeBrainScene();

    return () => {
      cancelled = true;
      disposeScene();
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
        <div className="brain-transfer" aria-hidden="true">
          <span className="brain-trail" />
          <div className="brain-stage" ref={brainMountRef} />
        </div>

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
              <h1>
                The playback holds the head at center, then releases the next
                idea into the section below.
              </h1>
              <p className="hero-text">
                As the scene reaches its end, a 3D brain model lifts out from
                the center of the playback and drops into the next section
                while the page continues scrolling.
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
            <div className="intro-receiver" aria-hidden="true">
              <span className="receiver-ring receiver-ring-outer" />
              <span className="receiver-ring receiver-ring-middle" />
              <span className="receiver-ring receiver-ring-inner" />
              <span className="receiver-core" />
            </div>
            <div className="intro-copy">
              <p className="eyebrow">Neural Transfer</p>
              <h2>The extracted thought lands in the next section.</h2>
              <p>
                Once the playback finishes, the brain model leaves the head
                area, drops through the transition, and settles into this panel
                as the page moves on.
              </p>
            </div>
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
