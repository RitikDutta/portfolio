import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import heroImage from "../hero.webp";
import heroPoster from "../hero-poster.webp";
import impactPortraitImage from "../portrait.png";
import impactWideImage from "../wide.png";
import interviewVideo from "../media/interview.mp4";
import cwemVideo from "../media/cwem.mp4";
import brainModelUrl from "../brain_hologram.glb?url";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const spotlightItems = [
  "Three.js brain handoff using a GLB asset",
  "Responsive layout for mobile and desktop",
  "Scroll-controlled frames instead of autoplay",
];

const projectSequencePanels = [
  {
    number: "01",
    type: "text",
    eyebrow: "Section 04 / Selected Projects",
    title: ["Selected work.", "Built with intent."],
    summary:
      "A focused set of projects across immersive frontend, product interfaces, and AI workflows. Each one begins with a strong interaction idea and ends as something usable, precise, and ready to ship.",
    detail:
      "Motion systems, live surfaces, and product experiments shaped to feel cinematic in presentation and practical in use.",
  },
  {
    number: "02",
    type: "image",
    eyebrow: "Immersive Frontend",
    title: "Interview Ready",
    summary:
      "An edge-to-edge moment where scroll, framing, and atmosphere move as one continuous scene.",
    detail:
      "Three.js model handoff, image-led storytelling, and frictionless motion direction.",
    video: interviewVideo,
    poster: impactWideImage,
    image: impactWideImage,
    mobileImage: impactPortraitImage,
  },
  {
    number: "03",
    type: "text",
    eyebrow: "Section 04 / Sequence Three",
    ghost: "Precision",
    title: ["Products earn trust", "through pacing."],
    summary:
      "The interface should know when to stay quiet, when to surface pressure, and when to let the user decide without interruption.",
    detail:
      "Operational dashboards, AI workflows, and high-pressure tools shaped with editorial discipline.",
  },
  {
    number: "04",
    type: "image",
    eyebrow: "Final Frame",
    title: "Company work environment management",
    summary:
      "A company-facing system designed to organize workspace operations, keep teams aligned, and make everyday coordination easier to manage.",
    detail:
      "Operational visibility, workplace structure, and internal workflows presented through a calmer, more immersive final frame.",
    video: cwemVideo,
    poster: heroPoster,
    image: heroPoster,
  },
  {
    number: "05",
    type: "text",
    eyebrow: "Section 04 / Sequence Five",
    ghost: "Clarity",
    title: ["Work flows better", "when systems stay clear."],
    summary:
      "The strongest internal tools reduce friction across people, spaces, and routines. Good environment management should feel organized, visible, and easy to trust.",
    detail:
      "Workspace operations, team coordination, and structure designed to stay calm under daily pressure.",
  },
];

const mediaGalleryImages = Object.entries(
  import.meta.glob("../media/*.{png,webp,jpg,jpeg,avif}", {
    eager: true,
    import: "default",
  }),
)
  .sort(([leftPath], [rightPath]) =>
    leftPath.localeCompare(rightPath, undefined, { numeric: true }),
  )
  .map(([, source]) => source);

const projectNoticeBoardLayouts = {
  "01": [
    { top: "2%", left: "10%", width: "32%", aspectRatio: "0.86", rotation: "-8deg" },
    { top: "4%", left: "50%", width: "31%", aspectRatio: "1.18", rotation: "7deg" },
    { top: "32%", left: "0%", width: "36%", aspectRatio: "1.22", rotation: "-3deg" },
    { top: "38%", left: "43%", width: "37%", aspectRatio: "0.94", rotation: "6deg" },
    { top: "67%", left: "18%", width: "42%", aspectRatio: "1.04", rotation: "-5deg" },
  ],
  "03": [
    { top: "4%", left: "14%", width: "30%", aspectRatio: "1.14", rotation: "7deg" },
    { top: "8%", left: "48%", width: "34%", aspectRatio: "0.9", rotation: "-6deg" },
    { top: "35%", left: "2%", width: "34%", aspectRatio: "0.82", rotation: "4deg" },
    { top: "42%", left: "40%", width: "36%", aspectRatio: "1.2", rotation: "-4deg" },
    { top: "68%", left: "22%", width: "38%", aspectRatio: "1.02", rotation: "5deg" },
  ],
  "05": [
    { top: "3%", left: "8%", width: "31%", aspectRatio: "1.08", rotation: "-7deg" },
    { top: "9%", left: "50%", width: "33%", aspectRatio: "0.88", rotation: "6deg" },
    { top: "35%", left: "4%", width: "35%", aspectRatio: "1.18", rotation: "3deg" },
    { top: "43%", left: "44%", width: "34%", aspectRatio: "0.94", rotation: "-5deg" },
    { top: "70%", left: "18%", width: "40%", aspectRatio: "1.02", rotation: "4deg" },
  ],
};

const createNoticeBoard = (layoutKey, imageIndexes) =>
  projectNoticeBoardLayouts[layoutKey]
    .map((layout, index) => ({
      ...layout,
      source: mediaGalleryImages[imageIndexes[index]],
    }))
    .filter((item) => item.source);

const projectNoticeBoards = {
  "01": createNoticeBoard("01", [0, 1, 2, 3, 4]),
  "03": createNoticeBoard("03", [5, 6, 7, 8, 9]),
  "05": createNoticeBoard("05", [10, 1, 11, 6, 3]),
};

const processWordItems = [
  "love what you do",
  "create real impact",
  "never stop learning",
  "work smarter not harder",
];

const processWordMotionSpecs = [
  {
    enter: {
      x: -168,
      y: -96,
      rotation: -12,
      rotationX: 10,
      skewX: 18,
      scale: 0.72,
      opacity: 0,
      blur: 26,
      letterSpacing: "0.18em",
      trailX: -92,
      trailY: 18,
      trailScale: 1.1,
      trailOpacity: 0.3,
      trailBlur: 20,
      trailRotation: -8,
      numberY: -16,
    },
    settle: {
      x: -34,
      y: -30,
      rotation: -7,
      scale: 0.74,
      opacity: 0.18,
      blur: 4.8,
      letterSpacing: "0.04em",
      trailX: -20,
      trailY: 6,
      trailScale: 1.04,
      trailOpacity: 0.08,
      trailBlur: 12,
      trailRotation: -4,
      numberOpacity: 0.18,
    },
    compose: {
      x: -26,
      y: -24,
      rotation: -4,
      scale: 0.8,
      opacity: 0.32,
      blur: 1.6,
      letterSpacing: "0.015em",
      trailX: -8,
      trailY: 2,
      trailScale: 1,
      trailOpacity: 0.04,
      trailBlur: 8,
      trailRotation: -2,
      numberOpacity: 0.24,
    },
    overlay: {
      glow: 0.42,
      grid: 0.16,
      chaos: 0.22,
      resolve: 0.08,
    },
  },
  {
    enter: {
      x: 210,
      y: -54,
      rotation: 10,
      rotationY: -10,
      skewX: -14,
      scale: 0.78,
      opacity: 0,
      blur: 28,
      letterSpacing: "0.12em",
      trailX: 110,
      trailY: -14,
      trailScale: 0.96,
      trailOpacity: 0.34,
      trailBlur: 18,
      trailRotation: 8,
      numberY: -10,
    },
    settle: {
      x: 42,
      y: -18,
      rotation: 6,
      scale: 0.78,
      opacity: 0.22,
      blur: 4,
      letterSpacing: "0.02em",
      trailX: 18,
      trailY: -6,
      trailScale: 0.98,
      trailOpacity: 0.1,
      trailBlur: 10,
      trailRotation: 4,
      numberOpacity: 0.22,
    },
    compose: {
      x: 34,
      y: -18,
      rotation: 3,
      scale: 0.82,
      opacity: 0.38,
      blur: 1.2,
      letterSpacing: "0.005em",
      trailX: 10,
      trailY: -2,
      trailScale: 0.98,
      trailOpacity: 0.05,
      trailBlur: 7,
      trailRotation: 2,
      numberOpacity: 0.3,
    },
    overlay: {
      glow: 0.56,
      grid: 0.24,
      chaos: 0.34,
      resolve: 0.14,
    },
  },
  {
    enter: {
      x: -58,
      y: 146,
      rotation: -4,
      rotationX: 20,
      skewX: 8,
      scale: 0.66,
      opacity: 0,
      blur: 30,
      letterSpacing: "0.16em",
      trailX: -30,
      trailY: 58,
      trailScale: 1.18,
      trailOpacity: 0.36,
      trailBlur: 22,
      trailRotation: -2,
      numberY: 12,
    },
    settle: {
      x: -12,
      y: 34,
      rotation: -2,
      scale: 0.84,
      opacity: 0.28,
      blur: 3,
      letterSpacing: "0.03em",
      trailX: -8,
      trailY: 16,
      trailScale: 1.06,
      trailOpacity: 0.12,
      trailBlur: 12,
      trailRotation: -1,
      numberOpacity: 0.28,
    },
    compose: {
      x: -2,
      y: 18,
      rotation: -1,
      scale: 0.9,
      opacity: 0.46,
      blur: 0.8,
      letterSpacing: "0.01em",
      trailX: 0,
      trailY: 8,
      trailScale: 1.02,
      trailOpacity: 0.06,
      trailBlur: 8,
      trailRotation: 0,
      numberOpacity: 0.34,
    },
    overlay: {
      glow: 0.72,
      grid: 0.34,
      chaos: 0.48,
      resolve: 0.22,
    },
  },
  {
    enter: {
      x: 0,
      y: 170,
      rotation: 2,
      rotationX: 24,
      scale: 0.58,
      opacity: 0,
      blur: 34,
      letterSpacing: "0.22em",
      trailX: 0,
      trailY: 72,
      trailScale: 1.22,
      trailOpacity: 0.42,
      trailBlur: 28,
      trailRotation: 0,
      numberY: 16,
    },
    settle: {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1.08,
      opacity: 1,
      blur: 0,
      letterSpacing: "0em",
      trailX: 0,
      trailY: 12,
      trailScale: 1.06,
      trailOpacity: 0.16,
      trailBlur: 16,
      trailRotation: 0,
      numberOpacity: 0.92,
    },
    compose: {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1.04,
      opacity: 1,
      blur: 0,
      letterSpacing: "0em",
      trailX: 0,
      trailY: 8,
      trailScale: 1.02,
      trailOpacity: 0.12,
      trailBlur: 12,
      trailRotation: 0,
      numberOpacity: 0.92,
    },
    overlay: {
      glow: 1,
      grid: 0.5,
      chaos: 0.68,
      resolve: 0.52,
    },
  },
];

const aboutLineSpecs = [
  {
    ariaLabel:
      "I've always been obsessed with patterns noticing what others usually miss.",
    segments: [
      {
        type: "text",
        content:
          "I've always been obsessed with patterns noticing what others usually miss.",
      },
    ],
  },
  {
    ariaLabel:
      "And somewhere along the way, those patterns turned into something real... something with IMPACT.",
    segments: [
      {
        type: "text",
        content:
          "And somewhere along the way, those patterns turned into something real... something with ",
      },
      {
        type: "impact",
      },
      {
        type: "text",
        content: ".",
      },
    ],
  },
  {
    ariaLabel:
      "Now I build systems that don't just work they leave a mark.",
    segments: [
      {
        type: "text",
        content: "Now I build systems that don't just work they leave a mark.",
      },
    ],
  },
];

const aboutParagraphLines = [];
let aboutCharacterCount = 0;

for (const [lineIndex, line] of aboutLineSpecs.entries()) {
  const renderedSegments = line.segments.map((segment, segmentIndex) => {
    if (segment.type === "impact") {
      return {
        type: "impact",
        key: `impact-${lineIndex}-${segmentIndex}`,
      };
    }

    return {
      type: "text",
      key: `text-${lineIndex}-${segmentIndex}`,
      characters: [...segment.content].map((character) => ({
        character,
        index: aboutCharacterCount++,
      })),
    };
  });

  aboutParagraphLines.push({
    ariaLabel: line.ariaLabel,
    segments: renderedSegments,
  });
}

const neuralSparkItems = [
  { top: "18%", left: "18%", size: "10rem", delay: "-0.4s", duration: "1.9s", hue: "24deg" },
  { top: "24%", left: "72%", size: "8.25rem", delay: "-1.2s", duration: "1.4s", hue: "338deg" },
  { top: "36%", left: "52%", size: "12rem", delay: "-0.8s", duration: "2.3s", hue: "12deg" },
  { top: "42%", left: "16%", size: "7rem", delay: "-1.5s", duration: "1.2s", hue: "48deg" },
  { top: "48%", left: "80%", size: "9rem", delay: "-0.1s", duration: "1.6s", hue: "352deg" },
  { top: "58%", left: "28%", size: "11rem", delay: "-1.8s", duration: "2.1s", hue: "18deg" },
  { top: "62%", left: "64%", size: "7.5rem", delay: "-0.6s", duration: "1.3s", hue: "32deg" },
  { top: "70%", left: "46%", size: "13rem", delay: "-1s", duration: "2.4s", hue: "6deg" },
  { top: "78%", left: "74%", size: "8rem", delay: "-1.7s", duration: "1.1s", hue: "44deg" },
  { top: "82%", left: "22%", size: "9.5rem", delay: "-0.3s", duration: "1.8s", hue: "346deg" },
];

// These values are the main tuning points for the About-section cinematic handoff.
const impactTransitionSettings = {
  scrollDistanceViewportFactor: 1.45,
  processSequenceViewportFactor: 2.05,
  maxExtraContentScrollFactor: 0.35,
  sceneStartScale: 1.14,
  sceneStartY: 10,
  revealScale: 1.18,
  exitScale: 3.6,
  exitDepth: 2000,
  exitTilt: 4,
};

export default function App() {
  const pageShellRef = useRef(null);
  const smoothWrapperRef = useRef(null);
  const smoothContentRef = useRef(null);
  const heroSectionRef = useRef(null);
  const canvasRef = useRef(null);
  const brainMountRef = useRef(null);
  const impactSectionRef = useRef(null);
  const aboutFrameRef = useRef(null);
  const aboutFrameContentRef = useRef(null);
  const impactWordSlotRef = useRef(null);
  const impactMaskTextRef = useRef(null);
  const impactWordOutlineRef = useRef(null);
  const impactSceneRef = useRef(null);
  const impactSceneMediaRef = useRef(null);
  const processProgressRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const projectsPinRef = useRef(null);
  const projectsTrackRef = useRef(null);
  const projectsProgressRef = useRef(null);

  useLayoutEffect(() => {
    const pageShell = pageShellRef.current;
    const wrapper = smoothWrapperRef.current;
    const content = smoothContentRef.current;

    if (
      !(pageShell instanceof HTMLElement) ||
      !(wrapper instanceof HTMLElement) ||
      !(content instanceof HTMLElement)
    ) {
      return undefined;
    }

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (reducedMotionQuery.matches) {
      return undefined;
    }

    ScrollSmoother.get()?.kill();

    const smoother = ScrollSmoother.create({
      wrapper,
      content,
      smooth: 1.05,
      smoothTouch: 0,
      effects: false,
      normalizeScroll: true,
    });

    const internalLinks = [...pageShell.querySelectorAll('a[href^="#"]')];

    const handleAnchorClick = (event) => {
      const anchor = event.currentTarget;

      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      const href = anchor.getAttribute("href");

      if (!href || href === "#") {
        return;
      }

      const target = document.querySelector(href);

      if (!(target instanceof HTMLElement)) {
        return;
      }

      event.preventDefault();
      smoother.scrollTo(target, true, "top top");

      if (window.location.hash !== href) {
        window.history.pushState(null, "", href);
      }
    };

    internalLinks.forEach((link) => {
      link.addEventListener("click", handleAnchorClick);
    });

    if (window.location.hash) {
      const initialTarget = document.querySelector(window.location.hash);

      if (initialTarget instanceof HTMLElement) {
        window.requestAnimationFrame(() => {
          smoother.scrollTo(initialTarget, false, "top top");
        });
      }
    }

    return () => {
      internalLinks.forEach((link) => {
        link.removeEventListener("click", handleAnchorClick);
      });
      smoother.kill();
    };
  }, []);

  useEffect(() => {
    const heroSection = heroSectionRef.current;
    const canvas = canvasRef.current;
    const pageShell = pageShellRef.current;
    const heroPin = heroSection?.querySelector(".hero-pin");

    if (
      !heroSection ||
      !canvas ||
      !(pageShell instanceof HTMLElement) ||
      !(heroPin instanceof HTMLElement)
    ) {
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
    const brainReleaseStart = brainMotionStart;
    const brainReleaseEnd = 0.76;
    const brainFullscreenStart = brainMotionStart;
    const brainFullscreenEnd = 0.86;
    const brainImmersionStart = 0.82;
    const brainImmersionEnd = 0.9;
    const neuralBurstStart = brainImmersionEnd;
    const neuralBurstEnd = 0.96;
    const brainTravelStart = neuralBurstEnd;
    const brainTravelEnd = 1;
    const brainFadeStart = 0.992;
    const brainFadeEnd = 1;
    const brainDockStart = brainTravelStart;
    const brainDockEnd = 1;
    const screenDropStart = brainTravelStart;
    const screenDropEnd = 1;
    const brainSpinStart = brainMotionStart;
    const brainSpinEnd = brainImmersionEnd;

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

      const easing =
        reducedMotionQuery.matches || ScrollSmoother.get() ? 1 : 0.12;
      currentProgress += (targetProgress - currentProgress) * easing;

      if (Math.abs(targetProgress - currentProgress) <= 0.0004) {
        currentProgress = targetProgress;
      }

      heroSection.style.setProperty(
        "--scroll-progress",
        currentProgress.toFixed(4),
      );
      pageShell.style.setProperty(
        "--scroll-progress",
        currentProgress.toFixed(4),
      );
      pageShell.style.setProperty(
        "--hero-zoom",
        clamp((currentProgress - zoomStartProgress) / 0.16, 0, 1).toFixed(4),
      );
      pageShell.style.setProperty(
        "--brain-release",
        clamp(
          (currentProgress - brainReleaseStart) /
            (brainReleaseEnd - brainReleaseStart),
          0,
          1,
        ).toFixed(4),
      );
      pageShell.style.setProperty(
        "--brain-travel",
        clamp(
          (currentProgress - brainTravelStart) /
            (brainTravelEnd - brainTravelStart),
          0,
          1,
        ).toFixed(4),
      );
      pageShell.style.setProperty(
        "--brain-fade",
        clamp(
          (currentProgress - brainFadeStart) /
            (brainFadeEnd - brainFadeStart),
          0,
          1,
        ).toFixed(4),
      );
      pageShell.style.setProperty(
        "--brain-dock",
        clamp(
          (currentProgress - brainDockStart) / (brainDockEnd - brainDockStart),
          0,
          1,
        ).toFixed(4),
      );
      pageShell.style.setProperty(
        "--screen-drop",
        clamp(
          (currentProgress - screenDropStart) / (screenDropEnd - screenDropStart),
          0,
          1,
        ).toFixed(4),
      );
      pageShell.style.setProperty(
        "--brain-fullscreen",
        clamp(
          (currentProgress - brainFullscreenStart) /
            (brainFullscreenEnd - brainFullscreenStart),
          0,
          1,
        ).toFixed(4),
      );
      pageShell.style.setProperty(
        "--brain-spin",
        clamp(
          (currentProgress - brainSpinStart) / (brainSpinEnd - brainSpinStart),
          0,
          1,
        ).toFixed(4),
      );
      pageShell.style.setProperty(
        "--brain-immersion",
        clamp(
          (currentProgress - brainImmersionStart) /
            (brainImmersionEnd - brainImmersionStart),
          0,
          1,
        ).toFixed(4),
      );
      pageShell.style.setProperty(
        "--neural-burst",
        clamp(
          (currentProgress - neuralBurstStart) /
            (neuralBurstEnd - neuralBurstStart),
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

    const heroPinTrigger = ScrollTrigger.create({
      trigger: heroSection,
      start: "top top",
      end: "bottom bottom",
      pin: heroPin,
      pinSpacing: false,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    });

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

      heroPinTrigger.kill();

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
    const pageShell = pageShellRef.current;

    if (!mountNode || !(pageShell instanceof HTMLElement)) {
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
        let fittedCameraDistance = 5.6;
        let innerCameraDistance = 0.28;

        const pointMaterials = [];

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
          camera.position.z = fittedCameraDistance;

          if (brainModel) {
            const bounds = new THREE.Box3().setFromObject(brainModel);
            const sphere = bounds.getBoundingSphere(new THREE.Sphere());
            const radius = Math.max(sphere.radius, 0.1);
            const verticalFov = THREE.MathUtils.degToRad(camera.fov);
            const horizontalFov =
              2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);
            const fitFov = Math.min(verticalFov, horizontalFov);
            const distance = radius / Math.tan(fitFov / 2);

            fittedCameraDistance = distance * 1.12;
            innerCameraDistance = Math.max(radius * 0.18, 0.2);
            camera.position.z = fittedCameraDistance;
            camera.near = Math.max(fittedCameraDistance / 100, 0.01);
            camera.far = fittedCameraDistance * 10;
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

          const styles = window.getComputedStyle(pageShell);
          const brainSpin =
            Number.parseFloat(styles.getPropertyValue("--brain-spin")) || 0;
          const brainTravel =
            Number.parseFloat(styles.getPropertyValue("--brain-travel")) || 0;
          const brainAfterglowProgress =
            Number.parseFloat(
              styles.getPropertyValue("--brain-afterglow-progress"),
            ) || 0;
          const brainFullscreen =
            Number.parseFloat(styles.getPropertyValue("--brain-fullscreen")) || 0;
          const brainImmersion =
            Number.parseFloat(styles.getPropertyValue("--brain-immersion")) || 0;
          const neuralBurst =
            Number.parseFloat(styles.getPropertyValue("--neural-burst")) || 0;
          const basePivotX = THREE.MathUtils.lerp(0.22, 0.03, brainFullscreen);
          const heroExitRotationX = THREE.MathUtils.lerp(
            basePivotX,
            -1.08,
            brainTravel,
          );

          pivot.rotation.x = THREE.MathUtils.lerp(
            heroExitRotationX,
            -2.18,
            brainAfterglowProgress,
          );
          pivot.rotation.y = brainSpin * Math.PI * 1.18;
          pivot.rotation.z = THREE.MathUtils.lerp(-0.12, 0.06, neuralBurst);
          root.rotation.z = neuralBurst * 0.05;
          camera.position.z = THREE.MathUtils.lerp(
            fittedCameraDistance,
            innerCameraDistance,
            brainImmersion,
          );
          camera.near = THREE.MathUtils.lerp(
            Math.max(fittedCameraDistance / 100, 0.01),
            Math.max(innerCameraDistance / 18, 0.005),
            brainImmersion,
          );
          camera.far = THREE.MathUtils.lerp(
            fittedCameraDistance * 10,
            fittedCameraDistance * 4,
            brainImmersion,
          );
          camera.updateProjectionMatrix();
          renderer.toneMappingExposure = 1.08 + neuralBurst * 0.52;

          pointMaterials.forEach((material) => {
            material.size = THREE.MathUtils.lerp(0.018, 0.05, brainImmersion);
            material.opacity = THREE.MathUtils.lerp(0.94, 1, neuralBurst);
          });

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

              if (child.isPoints && child.material) {
                child.material.transparent = true;
                child.material.depthWrite = false;
                child.material.opacity = 0.94;

                if ("size" in child.material) {
                  child.material.size = 0.018;
                  child.material.sizeAttenuation = true;
                }

                pointMaterials.push(child.material);
              }
            });

            pivot.add(model);
            brainModel = model;

            resizeScene();
            requestScrollSync();
          },
          undefined,
          (error) => {
            console.error("Failed to load brain_hologram.glb.", error);
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
        styleObserver.observe(pageShell, {
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

  useLayoutEffect(() => {
    const pageShell = pageShellRef.current;
    const section = impactSectionRef.current;
    const aboutFrame = aboutFrameRef.current;
    const aboutFrameContent = aboutFrameContentRef.current;
    const wordSlot = impactWordSlotRef.current;
    const maskText = impactMaskTextRef.current;
    const wordOutline = impactWordOutlineRef.current;
    const scene = impactSceneRef.current;
    const sceneMedia = impactSceneMediaRef.current;
    const processProgressFill = processProgressRef.current;
    const projectsSection = projectsSectionRef.current;
    const projectsPin = projectsPinRef.current;
    const projectsTrack = projectsTrackRef.current;
    const projectsProgressFill = projectsProgressRef.current;

    if (
      !(pageShell instanceof HTMLElement) ||
      !(section instanceof HTMLElement) ||
      !(aboutFrame instanceof HTMLElement) ||
      !(aboutFrameContent instanceof HTMLElement) ||
      !(wordSlot instanceof HTMLElement) ||
      !(maskText instanceof SVGTextElement) ||
      !(wordOutline instanceof SVGTextElement) ||
      !(scene instanceof HTMLElement) ||
      !(sceneMedia instanceof HTMLElement) ||
      !(processProgressFill instanceof HTMLElement) ||
      !(projectsSection instanceof HTMLElement) ||
      !(projectsPin instanceof HTMLElement) ||
      !(projectsTrack instanceof HTMLElement) ||
      !(projectsProgressFill instanceof HTMLElement)
    ) {
      return undefined;
    }

    const processOverlay = section.querySelector(".process-overlay");
    const processStage = section.querySelector(".process-stage");
    const processShell = section.querySelector(".process-shell");
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const focusItems = aboutFrame.querySelectorAll(".about-focus-fade");
    const characterNodes = [
      ...aboutFrame.querySelectorAll("[data-about-char-index]"),
    ];
    const wordMeasure = aboutFrame.querySelector(".impact-word-measure");
    const processWordLines = [...section.querySelectorAll(".process-word-line")];
    const processWordCopies = [...section.querySelectorAll(".process-word-copy")];
    const processWordTrails = [...section.querySelectorAll(".process-word-trail")];
    const processWords = [...section.querySelectorAll(".process-word")];
    const projectPanels = [...projectsTrack.querySelectorAll(".project-panel")];
    const projectPanelOneCopy = projectsTrack.querySelector(
      ".project-panel-1 .project-panel-copy",
    );
    const projectPanelThreeCopy = projectsTrack.querySelector(
      ".project-panel-3 .project-panel-copy",
    );
    const projectPanelThreeGhost = projectsTrack.querySelector(
      ".project-panel-3 .project-panel-ghost",
    );
    const projectPanelFiveCopy = projectsTrack.querySelector(
      ".project-panel-5 .project-panel-copy",
    );
    const projectPanelFiveGhost = projectsTrack.querySelector(
      ".project-panel-5 .project-panel-ghost",
    );
    const projectPanelTwoMedia = projectsTrack.querySelector(
      ".project-panel-2 .project-panel-media-inner",
    );
    const projectPanelFourMedia = projectsTrack.querySelector(
      ".project-panel-4 .project-panel-media-inner",
    );
    const projectPanelTwoCaption = projectsTrack.querySelector(
      ".project-panel-2 .project-panel-caption",
    );
    const projectPanelFourCaption = projectsTrack.querySelector(
      ".project-panel-4 .project-panel-caption",
    );

    if (
      !(processOverlay instanceof HTMLElement) ||
      !(processStage instanceof HTMLElement) ||
      !(processShell instanceof HTMLElement) ||
      !processWords.length ||
      processWords.length !== processWordMotionSpecs.length ||
      processWords.length !== processWordLines.length ||
      processWords.length !== processWordCopies.length ||
      processWords.length !== processWordTrails.length ||
      !characterNodes.length ||
      !(wordMeasure instanceof HTMLElement) ||
      projectPanels.length !== projectSequencePanels.length ||
      !(projectPanelOneCopy instanceof HTMLElement) ||
      !(projectPanelThreeCopy instanceof HTMLElement) ||
      !(projectPanelThreeGhost instanceof HTMLElement) ||
      !(projectPanelFiveCopy instanceof HTMLElement) ||
      !(projectPanelFiveGhost instanceof HTMLElement) ||
      !(projectPanelTwoMedia instanceof HTMLElement) ||
      !(projectPanelFourMedia instanceof HTMLElement) ||
      !(projectPanelTwoCaption instanceof HTMLElement) ||
      !(projectPanelFourCaption instanceof HTMLElement)
    ) {
      return undefined;
    }

    const characterRevealStart = 0.04;
    const characterRevealEnd = 0.48;
    const sectionScrollStart = 0.46;
    const sectionScrollDuration = 0.1;
    const zoomStart = 0.6;
    const processIntroStart = 0.87;
    const processWordStart = 1;
    const processWordSpacing = 0.155;
    const processWordRevealDurations = [0.11, 0.125, 0.145, 0.18];
    const processWordSettleDelay = 0.04;
    const processWordSettleDuration = 0.14;
    const processFinalComposeOffset = 0.05;
    const processFinalHoldDuration = 0.18;
    const sceneRevealStartY = 0;
    const sceneParallaxStartY = 0;
    const sceneParallaxEndY = -5.2;
    const sceneParallaxStartScale = 1.06;
    const sceneParallaxEndScale = 1.01;
    const processShellEntryY = 12;
    const processShellParallaxEndY = -14;
    const processStageEntryY = 10;
    const processStageEntryScale = 0.94;
    const processStageParallaxEndY = -8;
    const processStageFinalScale = 1.025;
    const projectSequenceDuration = projectSequencePanels.length - 1;
    const brainAfterglowFadeEnd = 0.12;
    const brainEntryRotationProgressMax = 0.32;
    const finalProcessWordIndex = processWords.length - 1;
    const processParallaxDuration =
      processWordSpacing * processWords.length + processFinalHoldDuration + 0.26;
    let previousActiveCount = -1;
    let syncFrameId = 0;
    let sectionEntryProgress = 0;
    let sectionEnteringViewport = false;
    let sectionTimelineTrigger = null;

    const setBrainAfterglow = (opacity, progress = 0) => {
      pageShell.style.setProperty("--brain-afterglow", opacity.toFixed(4));
      pageShell.style.setProperty(
        "--brain-afterglow-progress",
        progress.toFixed(4),
      );
    };

    const syncBrainAfterglow = (trigger) => {
      const sectionStarted = trigger.isActive || trigger.progress > 0;

      if (!sectionStarted) {
        const entryRotationProgress = sectionEnteringViewport
          ? sectionEntryProgress * brainEntryRotationProgressMax
          : 0;
        setBrainAfterglow(
          sectionEnteringViewport ? 1 : 0,
          entryRotationProgress,
        );
        return;
      }

      const afterglowFadeProgress = gsap.utils.clamp(
        0,
        1,
        trigger.progress / brainAfterglowFadeEnd,
      );
      const afterglowOpacity = 1 - afterglowFadeProgress;
      const afterglowRotationProgress =
        brainEntryRotationProgressMax +
        afterglowFadeProgress * (1 - brainEntryRotationProgressMax);
      setBrainAfterglow(afterglowOpacity, afterglowRotationProgress);
    };

    const syncAfterglowState = () => {
      if (sectionTimelineTrigger) {
        syncBrainAfterglow(sectionTimelineTrigger);
        return;
      }

      const entryRotationProgress = sectionEnteringViewport
        ? sectionEntryProgress * brainEntryRotationProgressMax
        : 0;
      setBrainAfterglow(
        sectionEnteringViewport ? 1 : 0,
        entryRotationProgress,
      );
    };

    const paintCharacters = (timelineProgress) => {
      const revealProgress = gsap.utils.clamp(
        0,
        1,
        (timelineProgress - characterRevealStart) /
          (characterRevealEnd - characterRevealStart),
      );
      const activeCount = gsap.utils.clamp(
        0,
        characterNodes.length,
        Math.floor(revealProgress * characterNodes.length),
      );

      if (activeCount === previousActiveCount) {
        return;
      }

      if (previousActiveCount === -1) {
        characterNodes.forEach((node, index) => {
          node.classList.toggle("about-char-active", index < activeCount);
        });
      } else if (activeCount > previousActiveCount) {
        characterNodes
          .slice(previousActiveCount, activeCount)
          .forEach((node) => node.classList.add("about-char-active"));
      } else {
        characterNodes
          .slice(activeCount, previousActiveCount)
          .forEach((node) => node.classList.remove("about-char-active"));
      }

      previousActiveCount = activeCount;
    };

    const getFrameScrollMax = () =>
      Math.max(aboutFrameContent.scrollHeight - aboutFrameContent.clientHeight, 0);

    const getPinnedScrollDistance = () => {
      const viewportHeight = window.innerHeight || 1;
      const extraContentScroll = Math.min(
        getFrameScrollMax(),
        viewportHeight * impactTransitionSettings.maxExtraContentScrollFactor,
      );

      return Math.round(
        viewportHeight * impactTransitionSettings.scrollDistanceViewportFactor +
          viewportHeight * impactTransitionSettings.processSequenceViewportFactor +
          extraContentScroll,
      );
    };

    const getProjectsHorizontalDistance = () => {
      const viewportWidth = projectsPin.clientWidth || window.innerWidth || 1;
      const travelDistance = projectsTrack.scrollWidth - viewportWidth;

      return Math.max(
        Math.round(travelDistance),
        Math.round(viewportWidth * projectSequenceDuration),
      );
    };

    const syncMaskLayout = () => {
      const baseFrameWidth = aboutFrame.clientWidth;
      const baseFrameHeight = aboutFrame.clientHeight;
      const wordWidthPx = wordMeasure.offsetWidth || wordSlot.offsetWidth;
      const wordHeightPx = wordSlot.offsetHeight || wordMeasure.offsetHeight;
      const visibleWordOffsetTop =
        aboutFrameContent.offsetTop +
        wordSlot.offsetTop -
        aboutFrameContent.scrollTop;
      const visibleWordOffsetLeft =
        aboutFrameContent.offsetLeft + wordSlot.offsetLeft;

      if (
        !baseFrameWidth ||
        !baseFrameHeight ||
        !wordWidthPx ||
        !wordHeightPx
      ) {
        return;
      }

      // Use layout-space measurements so the cutout stays locked while the frame scales.
      const wordStyles = window.getComputedStyle(wordMeasure);
      const fontSizePx = Number.parseFloat(wordStyles.fontSize || "0");
      const verticalOffsetPx = fontSizePx * 0.1;
      const centerX =
        ((visibleWordOffsetLeft + wordWidthPx / 2) / baseFrameWidth) * 100;
      const centerY =
        ((visibleWordOffsetTop + wordHeightPx * 0.525 + verticalOffsetPx) /
          baseFrameHeight) *
        100;
      const zoomOriginX = gsap.utils.clamp(
        0,
        100,
        centerX - (wordWidthPx / baseFrameWidth) * 8,
      );
      const fontSize = (fontSizePx / baseFrameHeight) * 100;
      const textLength = (wordWidthPx / baseFrameWidth) * 100;
      const outlineStrokeWidthPx =
        Number.parseFloat(wordStyles.webkitTextStrokeWidth || "0") ||
        Number.parseFloat(
          wordStyles.getPropertyValue("-webkit-text-stroke-width") || "0",
        ) ||
        1;
      const outlineStrokeWidth =
        (outlineStrokeWidthPx / baseFrameHeight) * 100;

      const syncWordGeometry = (textNode) => {
        textNode.setAttribute("x", centerX.toFixed(4));
        textNode.setAttribute("y", centerY.toFixed(4));
        textNode.setAttribute("font-size", fontSize.toFixed(4));
        textNode.setAttribute("textLength", textLength.toFixed(4));
        textNode.setAttribute("lengthAdjust", "spacingAndGlyphs");
        textNode.setAttribute("font-family", wordStyles.fontFamily);
        textNode.setAttribute("font-weight", wordStyles.fontWeight);
        textNode.setAttribute("letter-spacing", wordStyles.letterSpacing);
        textNode.setAttribute("stroke-width", outlineStrokeWidth.toFixed(4));
        textNode.setAttribute("stroke-linejoin", "round");
      };

      syncWordGeometry(maskText);
      syncWordGeometry(wordOutline);
      maskText.setAttribute("stroke", "black");

      gsap.set(maskText, {
        svgOrigin: `${centerX} ${centerY}`,
      });
      gsap.set(aboutFrame, {
        transformOrigin: `${zoomOriginX}% ${centerY}%`,
      });
    };

    const requestMaskSync = () => {
      if (syncFrameId) {
        return;
      }

      syncFrameId = window.requestAnimationFrame(() => {
        syncFrameId = 0;
        syncMaskLayout();
      });
    };

    const normalizeProcessState = (state = {}) => ({
      x: state.x ?? 0,
      y: state.y ?? 0,
      rotation: state.rotation ?? 0,
      rotationX: state.rotationX ?? 0,
      rotationY: state.rotationY ?? 0,
      skewX: state.skewX ?? 0,
      scale: state.scale ?? 1,
      opacity: state.opacity ?? 1,
      blur: state.blur ?? 0,
      letterSpacing: state.letterSpacing ?? "0em",
      trailX: state.trailX ?? 0,
      trailY: state.trailY ?? 0,
      trailScale: state.trailScale ?? 1,
      trailOpacity: state.trailOpacity ?? 0,
      trailBlur: state.trailBlur ?? 0,
      trailRotation: state.trailRotation ?? 0,
    });

    const createProcessRevealState = (spec, index) => ({
      x: 0,
      y: 0,
      rotation: 0,
      rotationX: 0,
      rotationY: 0,
      skewX: 0,
      scale: index === finalProcessWordIndex ? 1.08 : 1,
      opacity: 1,
      blur: 0,
      letterSpacing: index === finalProcessWordIndex ? "-0.01em" : "0em",
      trailX: (spec.enter.trailX ?? 0) * 0.14,
      trailY: (spec.enter.trailY ?? 0) * 0.14,
      trailScale: index === finalProcessWordIndex ? 1.08 : 1.02,
      trailOpacity: index === finalProcessWordIndex ? 0.18 : 0.24,
      trailBlur: index === finalProcessWordIndex ? 18 : 10,
      trailRotation: (spec.enter.trailRotation ?? 0) * 0.15,
    });

    const setOverlayState = (state) => {
      processOverlay.style.setProperty(
        "--process-glow-strength",
        `${state.glow ?? 0}`,
      );
      processOverlay.style.setProperty(
        "--process-grid-strength",
        `${state.grid ?? 0}`,
      );
      processOverlay.style.setProperty(
        "--process-chaos-strength",
        `${state.chaos ?? 0}`,
      );
      processOverlay.style.setProperty(
        "--process-resolve-strength",
        `${state.resolve ?? 0}`,
      );
    };

    const setProcessLineState = (index, rawState) => {
      const state = normalizeProcessState(rawState);

      gsap.set(processWordLines[index], {
        autoAlpha: state.opacity <= 0 ? 0 : 1,
        x: state.x,
        y: state.y,
        rotation: state.rotation,
        rotationX: state.rotationX,
        rotationY: state.rotationY,
        skewX: state.skewX,
        scale: state.scale,
        opacity: state.opacity,
      });
      gsap.set(processWordCopies[index], {
        filter: `blur(${state.blur}px)`,
        letterSpacing: state.letterSpacing,
      });
      gsap.set(processWordTrails[index], {
        x: state.trailX,
        y: state.trailY,
        scale: state.trailScale,
        opacity: state.trailOpacity,
        rotation: state.trailRotation,
        filter: `blur(${state.trailBlur}px)`,
      });
    };

    const tweenProcessLineState = (
      timeline,
      index,
      rawState,
      position,
      options = {},
    ) => {
      const state = normalizeProcessState(rawState);
      const duration = options.duration ?? 0.12;
      const ease = options.ease ?? "power3.out";

      timeline.to(
        processWordLines[index],
        {
          autoAlpha: state.opacity <= 0 ? 0 : 1,
          x: state.x,
          y: state.y,
          rotation: state.rotation,
          rotationX: state.rotationX,
          rotationY: state.rotationY,
          skewX: state.skewX,
          scale: state.scale,
          opacity: state.opacity,
          duration,
          ease,
        },
        position,
      );

      timeline.to(
        processWordCopies[index],
        {
          filter: `blur(${state.blur}px)`,
          letterSpacing: state.letterSpacing,
          duration,
          ease,
        },
        position,
      );

      timeline.to(
        processWordTrails[index],
        {
          x: state.trailX,
          y: state.trailY,
          scale: state.trailScale,
          opacity: state.trailOpacity,
          rotation: state.trailRotation,
          filter: `blur(${state.trailBlur}px)`,
          duration,
          ease,
        },
        position + (options.trailDelay ?? 0.015),
      );
    };

    const teardown = [];

    syncMaskLayout();
    aboutFrameContent.scrollTop = 0;
    setBrainAfterglow(0, 0);

    if (reducedMotionQuery.matches) {
      gsap.set(scene, {
        opacity: 1,
        scale: 1,
        yPercent: 0,
      });
      gsap.set(sceneMedia, {
        yPercent: 0,
        scale: 1,
      });
      gsap.set(maskText, {
        scale: 1,
      });
      gsap.set(aboutFrame, {
        yPercent: 0,
        "--about-surface-darkness": 1,
      });
      gsap.set(wordSlot, {
        scale: 1,
      });
      gsap.set(wordOutline, {
        opacity: 1,
      });
      gsap.set(processOverlay, {
        autoAlpha: 0,
      });
      setOverlayState({
        glow: 0.12,
        grid: 0.08,
        chaos: 0.12,
        resolve: 0.24,
      });
      gsap.set(processShell, {
        yPercent: 0,
      });
      gsap.set(processStage, {
        yPercent: 0,
        scale: 1,
      });
      processWordMotionSpecs.forEach((spec, index) => {
        setProcessLineState(index, spec.compose);
      });
      gsap.set(processProgressFill, {
        scaleX: 1,
        transformOrigin: "left center",
      });
      gsap.set(projectsTrack, {
        clearProps: "transform",
      });
      gsap.set(
        [
          projectPanelOneCopy,
          projectPanelThreeCopy,
          projectPanelThreeGhost,
          projectPanelFiveCopy,
          projectPanelFiveGhost,
          projectPanelTwoMedia,
          projectPanelFourMedia,
          projectPanelTwoCaption,
          projectPanelFourCaption,
        ],
        {
          clearProps: "transform,opacity",
        },
      );
      gsap.set(projectsProgressFill, {
        scaleX: 1,
        transformOrigin: "left center",
      });
      gsap.set(focusItems, {
        opacity: 1,
      });
      aboutFrameContent.scrollTop = 0;
      paintCharacters(1);
      syncMaskLayout();
      setBrainAfterglow(0, 0);

      return undefined;
    }

    const ctx = gsap.context(() => {
      // The background scene is already mounted underneath; the timeline only
      // opens the word-shaped window and then removes the Section 2 frame from
      // that origin.
      gsap.set(scene, {
        opacity: 0.72,
        scale: impactTransitionSettings.sceneStartScale,
        yPercent: sceneRevealStartY,
        transformOrigin: "center center",
        force3D: true,
      });
      gsap.set(sceneMedia, {
        yPercent: sceneParallaxStartY,
        scale: sceneParallaxStartScale,
        transformOrigin: "center center",
        force3D: true,
      });
      gsap.set(wordSlot, {
        scale: 1,
        transformOrigin: "center center",
        force3D: true,
      });
      gsap.set(maskText, {
        scale: 1,
      });
      gsap.set(aboutFrame, {
        scale: 1,
        opacity: 1,
        yPercent: 0,
        z: 0,
        rotationX: 0,
        "--about-surface-darkness": 0,
        force3D: true,
        transformPerspective: 1600,
      });
      gsap.set(wordOutline, {
        opacity: 0.36,
      });
      gsap.set(processOverlay, {
        autoAlpha: 0,
      });
      setOverlayState({
        glow: 0.14,
        grid: 0.08,
        chaos: 0.12,
        resolve: 0,
      });
      gsap.set(processShell, {
        yPercent: processShellEntryY,
        force3D: true,
      });
      gsap.set(processStage, {
        yPercent: processStageEntryY,
        scale: processStageEntryScale,
        rotationX: 8,
        transformPerspective: 1800,
        transformOrigin: "center center",
        force3D: true,
      });
      gsap.set(processProgressFill, {
        scaleX: 0,
        transformOrigin: "left center",
      });
      gsap.set(processWordLines, {
        transformPerspective: 1400,
        transformOrigin: "center center",
        force3D: true,
      });
      gsap.set(processWordCopies, {
        force3D: true,
      });
      gsap.set(processWordTrails, {
        force3D: true,
      });
      processWordMotionSpecs.forEach((spec, index) => {
        setProcessLineState(index, spec.enter);
      });
      gsap.set(projectsTrack, {
        x: 0,
        force3D: true,
      });
      gsap.set(projectPanelOneCopy, {
        xPercent: 0,
        yPercent: 0,
        force3D: true,
      });
      gsap.set(projectPanelThreeCopy, {
        xPercent: 14,
        yPercent: 3,
        force3D: true,
      });
      gsap.set(projectPanelThreeGhost, {
        xPercent: 8,
        yPercent: 2,
        opacity: 0.18,
        force3D: true,
      });
      gsap.set(projectPanelFiveCopy, {
        xPercent: 14,
        yPercent: 3,
        force3D: true,
      });
      gsap.set(projectPanelFiveGhost, {
        xPercent: 8,
        yPercent: 2,
        opacity: 0.18,
        force3D: true,
      });
      gsap.set(projectPanelTwoMedia, {
        xPercent: -8,
        scale: 1.14,
        transformOrigin: "center center",
        force3D: true,
      });
      gsap.set(projectPanelFourMedia, {
        xPercent: -6,
        scale: 1.16,
        transformOrigin: "center center",
        force3D: true,
      });
      gsap.set([projectPanelTwoCaption, projectPanelFourCaption], {
        y: 32,
        opacity: 0.62,
        force3D: true,
      });
      gsap.set(projectsProgressFill, {
        scaleX: 0,
        transformOrigin: "left center",
      });
      projectsSection.style.setProperty("--projects-progress", "0");

      const timeline = gsap.timeline({
        defaults: {
          ease: "none",
        },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getPinnedScrollDistance()}`,
          scrub: 1.1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            sectionTimelineTrigger = self;
            paintCharacters(self.progress);
            syncAfterglowState();
            requestMaskSync();
          },
          onUpdate: (self) => {
            sectionTimelineTrigger = self;
            paintCharacters(self.progress);
            syncAfterglowState();
            requestMaskSync();
          },
        },
      });

      sectionTimelineTrigger = timeline.scrollTrigger;

      const entryTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "top top",
        onEnter: () => {
          sectionEnteringViewport = true;
          syncAfterglowState();
        },
        onEnterBack: () => {
          sectionEnteringViewport = true;
          syncAfterglowState();
        },
        onUpdate: (self) => {
          sectionEntryProgress = self.progress;
          sectionEnteringViewport = self.isActive || self.progress >= 1;
          syncAfterglowState();
        },
        onLeaveBack: () => {
          sectionEntryProgress = 0;
          sectionEnteringViewport = false;
          syncAfterglowState();
        },
        onRefresh: (self) => {
          sectionEntryProgress = self.progress;
          sectionEnteringViewport = self.isActive || self.progress >= 1;
          syncAfterglowState();
        },
      });

      teardown.push(() => entryTrigger.kill());

      paintCharacters(0);
      syncAfterglowState();

      timeline
        .to(
          focusItems,
          {
            opacity: 0.38,
            y: -24,
            stagger: 0.03,
            duration: 0.18,
          },
          0.02,
        )
        .to(
          scene,
          {
            opacity: 1,
            scale: 1,
            yPercent: 0,
            duration: 0.48,
          },
          0.12,
        )
        .to(
          aboutFrame,
          {
            "--about-surface-darkness": 1,
            duration: 1 - characterRevealStart,
          },
          characterRevealStart,
        )
        .to(
          wordOutline,
          {
            opacity: 1,
            duration: 0.18,
          },
          characterRevealEnd,
        )
        .to(
          aboutFrameContent,
          {
            scrollTop: () => getFrameScrollMax(),
            duration: sectionScrollDuration,
            onUpdate: requestMaskSync,
          },
          sectionScrollStart,
        )
        .to(
          aboutFrame,
          {
            scale: impactTransitionSettings.exitScale,
            z: impactTransitionSettings.exitDepth,
            rotationX: impactTransitionSettings.exitTilt,
            duration: 0.28,
            ease: "power2.in",
          },
          zoomStart,
        )
        .set(
          aboutFrame,
          {
            opacity: 0,
          },
          processIntroStart,
        )
        .to(
          processOverlay,
          {
            autoAlpha: 1,
            duration: 0.16,
            ease: "power2.out",
          },
          processIntroStart,
        )
        .to(
          processShell,
          {
            yPercent: 0,
            duration: 0.12,
            ease: "power3.out",
          },
          processIntroStart,
        )
        .to(
          processStage,
          {
            yPercent: 0,
            scale: 1,
            rotationX: 0,
            duration: 0.18,
            ease: "power3.out",
          },
          processIntroStart + 0.01,
        )
        .to(
          processShell,
          {
            yPercent: processShellParallaxEndY,
            duration: processParallaxDuration,
            ease: "none",
          },
          processIntroStart + 0.06,
        )
        .to(
          processStage,
          {
            yPercent: processStageParallaxEndY,
            duration: processParallaxDuration,
            ease: "none",
          },
          processIntroStart + 0.06,
        )
        .to(
          sceneMedia,
          {
            yPercent: sceneParallaxEndY,
            scale: sceneParallaxEndScale,
            duration: processParallaxDuration,
            ease: "none",
          },
          processIntroStart + 0.06,
        );

      processWords.forEach((_, index) => {
        const spec = processWordMotionSpecs[index];
        const revealPosition = processWordStart + index * processWordSpacing;
        const progressScale = (index + 1) / processWords.length;
        const revealState = createProcessRevealState(spec, index);

        tweenProcessLineState(timeline, index, revealState, revealPosition, {
          duration: processWordRevealDurations[index] ?? 0.12,
          ease: index === finalProcessWordIndex ? "power4.out" : "power3.out",
          trailDelay: index === finalProcessWordIndex ? 0.02 : 0.012,
        });

        timeline.to(
          processProgressFill,
          {
            scaleX: progressScale,
            duration: 0.1,
            ease: "power3.out",
          },
          revealPosition,
        );

        timeline.to(
          processOverlay,
          {
            "--process-glow-strength": spec.overlay.glow,
            "--process-grid-strength": spec.overlay.grid,
            "--process-chaos-strength": spec.overlay.chaos,
            "--process-resolve-strength": spec.overlay.resolve,
            duration: processWordRevealDurations[index] ?? 0.12,
            ease: "power2.out",
          },
          revealPosition,
        );

        if (index > 0) {
          processWordMotionSpecs.slice(0, index).forEach((previousSpec, previousIndex) => {
            tweenProcessLineState(
              timeline,
              previousIndex,
              previousSpec.settle,
              revealPosition + processWordSettleDelay + previousIndex * 0.01,
              {
                duration: processWordSettleDuration,
                ease: "power2.out",
              },
            );
          });
        }
      });

      const finalComposePosition =
        processWordStart +
        processWordSpacing * finalProcessWordIndex +
        processFinalComposeOffset;

      processWordMotionSpecs.forEach((spec, index) => {
        tweenProcessLineState(
          timeline,
          index,
          spec.compose,
          finalComposePosition + (index === finalProcessWordIndex ? 0 : index * 0.012),
          {
            duration: index === finalProcessWordIndex ? 0.16 : 0.14,
            ease: index === finalProcessWordIndex ? "power3.out" : "power2.out",
            trailDelay: 0.012,
          },
        );
      });

      timeline.to(
        processStage,
        {
          scale: processStageFinalScale,
          duration: 0.16,
          ease: "power2.out",
        },
        finalComposePosition,
      );

      timeline.to(
        processOverlay,
        {
          "--process-glow-strength": 0.98,
          "--process-grid-strength": 0.54,
          "--process-chaos-strength": 0.64,
          "--process-resolve-strength": 0.58,
          duration: 0.16,
          ease: "power2.out",
        },
        finalComposePosition,
      );

      timeline.to(
        {},
        {
          duration: processFinalHoldDuration,
        },
        finalComposePosition + 0.08,
      );

      gsap.timeline({
        defaults: {
          ease: "none",
        },
        scrollTrigger: {
          trigger: projectsSection,
          start: "top top",
          end: () => `+=${getProjectsHorizontalDistance()}`,
          scrub: 1.08,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            projectsSection.style.setProperty(
              "--projects-progress",
              self.progress.toFixed(4),
            );
          },
          onUpdate: (self) => {
            projectsSection.style.setProperty(
              "--projects-progress",
              self.progress.toFixed(4),
            );
          },
        },
      })
        .to(
          projectsTrack,
          {
            x: () => -getProjectsHorizontalDistance(),
            duration: projectSequenceDuration,
          },
          0,
        )
        .to(
          projectsProgressFill,
          {
            scaleX: 1,
            duration: projectSequenceDuration,
          },
          0,
        )
        .to(
          projectPanelOneCopy,
          {
            xPercent: -18,
            yPercent: -4,
            duration: 1,
          },
          0,
        )
        .to(
          projectPanelTwoMedia,
          {
            xPercent: 8,
            scale: 1.04,
            duration: 1,
          },
          0,
        )
        .to(
          projectPanelTwoCaption,
          {
            y: 0,
            opacity: 1,
            duration: 1,
          },
          0,
        )
        .to(
          projectPanelThreeCopy,
          {
            xPercent: -12,
            yPercent: -5,
            duration: 1,
          },
          2,
        )
        .to(
          projectPanelThreeGhost,
          {
            xPercent: -4,
            yPercent: -2,
            opacity: 0.34,
            duration: 1,
          },
          2,
        )
        .to(
          projectPanelFourMedia,
          {
            xPercent: 10,
            scale: 1.03,
            duration: 1,
          },
          2,
        )
        .to(
          projectPanelFourCaption,
          {
            y: 0,
            opacity: 1,
            duration: 1,
          },
          2,
        )
        .to(
          projectPanelFiveCopy,
          {
            xPercent: -12,
            yPercent: -5,
            duration: 1,
          },
          3,
        )
        .to(
          projectPanelFiveGhost,
          {
            xPercent: -4,
            yPercent: -2,
            opacity: 0.34,
            duration: 1,
          },
          3,
        );
    }, section);

    aboutFrameContent.addEventListener("scroll", requestMaskSync, {
      passive: true,
    });
    teardown.push(() =>
      aboutFrameContent.removeEventListener("scroll", requestMaskSync),
    );

    const handleResize = () => {
      syncMaskLayout();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    teardown.push(() => window.removeEventListener("resize", handleResize));

    if (typeof ResizeObserver === "function") {
      const resizeObserver = new ResizeObserver(syncMaskLayout);
      resizeObserver.observe(aboutFrame);
      resizeObserver.observe(aboutFrameContent);
      resizeObserver.observe(wordSlot);
      teardown.push(() => resizeObserver.disconnect());
    }

    if (document.fonts?.ready) {
      const fontsReady = () => {
        syncMaskLayout();
        ScrollTrigger.refresh();
      };

      document.fonts.ready.then(fontsReady).catch(() => {});
    }

    ScrollTrigger.addEventListener("refreshInit", syncMaskLayout);
    teardown.push(() => ScrollTrigger.removeEventListener("refreshInit", syncMaskLayout));
    teardown.push(() => window.cancelAnimationFrame(syncFrameId));

    return () => {
      setBrainAfterglow(0, 0);
      teardown.forEach((dispose) => dispose());
      ctx.revert();
    };
  }, []);

  return (
    <div className="page-shell" ref={pageShellRef}>
      <div className="brain-transfer" aria-hidden="true">
        <div className="brain-stage" ref={brainMountRef} />
      </div>
      <div className="neural-burst" aria-hidden="true">
        <span className="neural-burst-cloud neural-burst-cloud-a" />
        <span className="neural-burst-cloud neural-burst-cloud-b" />
        <span className="neural-burst-ring neural-burst-ring-a" />
        <span className="neural-burst-ring neural-burst-ring-b" />
        {neuralSparkItems.map((spark, index) => (
          <span
            className="neural-spark"
            key={`${spark.left}-${spark.top}-${index}`}
            style={{
              "--spark-top": spark.top,
              "--spark-left": spark.left,
              "--spark-size": spark.size,
              "--spark-delay": spark.delay,
              "--spark-duration": spark.duration,
              "--spark-hue": spark.hue,
            }}
          />
        ))}
      </div>

      <div className="smooth-wrapper" ref={smoothWrapperRef}>
        <main className="smooth-content" id="home" ref={smoothContentRef}>
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
                <h1>
                  I build things that pretend to be intelligent&hellip;
                  <br />
                  and sometimes they accidentally are.
                </h1>
                

                

                

                <div className="scrub-status" aria-hidden="true">
                  <span>Scroll to move through the scene</span>
                  <div className="progress-track">
                    <span className="progress-fill" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="impact-scroll" id="about" ref={impactSectionRef}>
            <div className="impact-stage">
              <div
                className="impact-scene"
                id="selected-work"
                aria-hidden="true"
                ref={impactSceneRef}
              >
                <picture className="impact-scene-media" ref={impactSceneMediaRef}>
                  <source media="(max-width: 900px)" srcSet={impactPortraitImage} />
                  <img alt="" src={impactWideImage} />
                </picture>
              </div>

              <div className="process-overlay" aria-label="Process words">
                <div className="process-shell">
                  <div className="process-stage">
                    <div className="process-word-column" aria-label="Process words">
                      {processWordItems.map((word, index) => (
                        <span
                          className={`process-word-line process-word-line-${index + 1}`}
                          key={word}
                        >
                          <span className="process-word-copy">
                            <span className="process-word-trail" aria-hidden="true">
                              {word}
                            </span>
                            <span className="process-word">{word}</span>
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="process-footer" aria-hidden="true">
                    <div className="process-progress">
                      <span
                        className="process-progress-fill"
                        ref={processProgressRef}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <section
                aria-labelledby="about-title"
                className="about-foreground"
              >
                <div className="about-foreground-frame" ref={aboutFrameRef}>
                  <div className="about-surface-mask" aria-hidden="true">
                    <svg
                      className="impact-mask-svg"
                      preserveAspectRatio="none"
                      viewBox="0 0 100 100"
                    >
                      <defs>
                        {/* The foreground panel is real geometry; the mask cuts IMPACT
                            out of it so the background scene is visible through the word. */}
                        <linearGradient id="about-surface-gradient" x1="10%" x2="90%" y1="0%" y2="100%">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.98" />
                        </linearGradient>
                        <linearGradient
                          id="about-surface-dark-gradient"
                          x1="8%"
                          x2="92%"
                          y1="0%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.98" />
                          <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.98" />
                        </linearGradient>
                        <radialGradient id="about-sheen" cx="50%" cy="0%" r="70%">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.42" />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </radialGradient>
                        <mask
                          height="100"
                          id="impact-window-mask"
                          maskContentUnits="userSpaceOnUse"
                          maskUnits="userSpaceOnUse"
                          width="100"
                          x="0"
                          y="0"
                        >
                          <rect fill="white" height="100" width="100" x="0" y="0" />
                          <text
                            className="impact-mask-text"
                            dominantBaseline="middle"
                            fill="black"
                            ref={impactMaskTextRef}
                            textAnchor="middle"
                            x="50"
                            y="50"
                          >
                            IMPACT
                          </text>
                        </mask>
                      </defs>

                      <rect
                        className="about-surface-fill"
                        fill="url(#about-surface-gradient)"
                        height="100"
                        mask="url(#impact-window-mask)"
                        rx="0"
                        ry="0"
                        width="100"
                        x="0"
                        y="0"
                      />
                      <rect
                        className="about-surface-fill-dark"
                        fill="url(#about-surface-dark-gradient)"
                        height="100"
                        mask="url(#impact-window-mask)"
                        rx="0"
                        ry="0"
                        width="100"
                        x="0"
                        y="0"
                      />
                      <rect
                        className="about-surface-sheen"
                        fill="url(#about-sheen)"
                        height="100"
                        mask="url(#impact-window-mask)"
                        rx="0"
                        ry="0"
                        width="100"
                        x="0"
                        y="0"
                      />
                      <rect
                        className="about-surface-border"
                        fill="none"
                        height="100"
                        mask="url(#impact-window-mask)"
                        rx="0"
                        ry="0"
                        width="100"
                        x="0"
                        y="0"
                      />
                    </svg>
                  </div>

                  <div className="impact-word-overlay" aria-hidden="true">
                    <svg
                      aria-hidden="true"
                      className="impact-word-svg"
                      preserveAspectRatio="none"
                      viewBox="0 0 100 100"
                    >
                      <text
                        className="impact-word-outline"
                        dominantBaseline="middle"
                        fill="transparent"
                        ref={impactWordOutlineRef}
                        textAnchor="middle"
                        x="50"
                        y="50"
                      >
                        IMPACT
                      </text>
                    </svg>
                  </div>

                  <div className="about-frame-content" ref={aboutFrameContentRef}>
                    <div className="about-frame-head about-focus-fade">
                      <p className="eyebrow">Section 02 / About</p>
                      <h2 className="sr-only" id="about-title">
                        About
                      </h2>
                    </div>

                    <div className="about-paragraph">
                      {aboutParagraphLines.map((line) => (
                        <p
                          aria-label={line.ariaLabel}
                          className="about-line"
                          key={line.ariaLabel}
                        >
                          {line.segments.map((segment) => {
                            if (segment.type === "impact") {
                              return (
                                <span className="about-impact-shell" key={segment.key}>
                                  <span
                                    className="impact-word-slot"
                                    ref={impactWordSlotRef}
                                    aria-hidden="true"
                                  >
                                    <span className="impact-word-measure">
                                      IMPACT
                                    </span>
                                  </span>
                                </span>
                              );
                            }

                            return (
                              <span className="about-line-segment" key={segment.key}>
                                {segment.characters.map(({ character, index }) => (
                                  <span
                                    aria-hidden="true"
                                    className="about-char"
                                    data-about-char-index={index}
                                    key={`${segment.key}-${index}-${character}`}
                                  >
                                    {character}
                                  </span>
                                ))}
                              </span>
                            );
                          })}
                        </p>
                      ))}
                    </div>

                    
                  </div>
                </div>
              </section>
            </div>
          </section>

          <section
            aria-labelledby="projects-title"
            className="projects-section"
            id="projects"
            ref={projectsSectionRef}
          >
            <div className="projects-pin" ref={projectsPinRef}>
              <div className="projects-track" ref={projectsTrackRef}>
                {projectSequencePanels.map((panel, index) => {
                  const panelClassName = `project-panel project-panel-${index + 1} project-panel-${panel.type}`;

                  if (panel.type === "text") {
                    return (
                      <article className={panelClassName} key={panel.number}>
                        <div
                          className={`project-panel-board project-panel-board-${panel.number}`}
                          aria-hidden="true"
                        >
                          {(projectNoticeBoards[panel.number] ?? []).map((image) => (
                            <figure
                              className="project-board-card"
                              key={`${panel.number}-${image.source}`}
                              style={{
                                "--board-top": image.top,
                                "--board-left": image.left,
                                "--board-width": image.width,
                                "--board-aspect-ratio": image.aspectRatio,
                                "--board-rotation": image.rotation,
                              }}
                            >
                              <img alt="" src={image.source} />
                            </figure>
                          ))}
                        </div>

                        <div className="project-panel-copy">
                          <div className="project-panel-meta">
                            <p className="eyebrow">{panel.eyebrow}</p>
                            <span className="project-panel-number">{panel.number}</span>
                          </div>

                          {panel.ghost ? (
                            <span className="project-panel-ghost" aria-hidden="true">
                              {panel.ghost}
                            </span>
                          ) : null}

                          <div className="project-panel-copy-stack">
                            <h2
                              className="project-panel-title"
                              id={index === 0 ? "projects-title" : undefined}
                            >
                              {panel.title.map((line) => (
                                <span key={line}>{line}</span>
                              ))}
                            </h2>
                            <p className="project-panel-summary">{panel.summary}</p>
                            <p className="project-panel-detail">{panel.detail}</p>
                          </div>
                        </div>
                      </article>
                    );
                  }

                  return (
                    <article className={panelClassName} key={panel.number}>
                      <div className="project-panel-media-inner" aria-hidden="true">
                        {panel.video ? (
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            poster={panel.poster ?? panel.image}
                            preload="metadata"
                          >
                            <source src={panel.video} type="video/mp4" />
                          </video>
                        ) : (
                          <picture>
                            {panel.mobileImage ? (
                              <source media="(max-width: 900px)" srcSet={panel.mobileImage} />
                            ) : null}
                            <img alt="" src={panel.image} />
                          </picture>
                        )}
                      </div>
                      <div className="project-panel-media-overlay" aria-hidden="true" />

                      <div
                        className={`project-panel-caption ${
                          index === projectSequencePanels.length - 1
                            ? "project-panel-caption-end"
                            : ""
                        }`}
                      >
                        <div className="project-panel-meta">
                          <p className="eyebrow">{panel.eyebrow}</p>
                          <span className="project-panel-number">{panel.number}</span>
                        </div>
                        <h3 className="project-panel-caption-title">{panel.title}</h3>
                        <p className="project-panel-summary">{panel.summary}</p>
                        <p className="project-panel-detail">{panel.detail}</p>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="projects-rail" aria-hidden="true">
                <span className="projects-rail-fill" ref={projectsProgressRef} />
              </div>
            </div>
          </section>

          <section
            aria-labelledby="closing-title"
            className="closing-section"
            id="closing"
          >
            <div className="closing-panel contact-panel intro-panel">
              <p className="eyebrow">Section 06 / Closing</p>
              <h2 id="closing-title">The motion stops. The intent stays.</h2>
              <p className="closing-copy">
                The horizontal sequence ends here and the page returns to a calmer
                rhythm. The same idea carries through: atmosphere matters most when
                the product still feels precise.
              </p>
              <a className="button button-primary" href="#home">
                Restart the sequence
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
