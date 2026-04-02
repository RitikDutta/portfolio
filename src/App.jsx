import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import heroImage from "../hero.webp";
import heroVideo from "../hero.mp4";
import heroPoster from "../hero-poster.webp";
import impactPortraitImage from "../portrait.webp";
import impactWideImage from "../wide.webp";
import interviewVideo from "../media/interview.mp4";
import cwemVideo from "../media/cwem.mp4";
import brainModelUrl from "../brain_hologram.glb?url";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const mobileHeroFrameUrls = Object.entries(
  import.meta.glob("../media/hero-mobile/*.webp", {
    eager: true,
    import: "default",
  }),
)
  .sort(([leftPath], [rightPath]) =>
    leftPath.localeCompare(rightPath, undefined, { numeric: true }),
  )
  .map(([, source]) => source);

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

const patternTraceItems = [
  { top: "22%", left: "12%", width: "24%", rotation: "14deg" },
  { top: "31%", left: "58%", width: "18%", rotation: "-11deg" },
  { top: "45%", left: "18%", width: "34%", rotation: "6deg" },
  { top: "52%", left: "54%", width: "28%", rotation: "-16deg" },
  { top: "66%", left: "14%", width: "22%", rotation: "11deg" },
  { top: "72%", left: "50%", width: "24%", rotation: "-7deg" },
];

const patternNodeItems = [
  { top: "24%", left: "24%", size: "0.7rem" },
  { top: "33%", left: "72%", size: "0.56rem" },
  { top: "47%", left: "42%", size: "0.82rem" },
  { top: "63%", left: "66%", size: "0.62rem" },
  { top: "74%", left: "26%", size: "0.5rem" },
];

const clamp01 = (value) => Math.min(1, Math.max(0, value));
const smoothStep = (value) => {
  const clamped = clamp01(value);
  return clamped * clamped * (3 - 2 * clamped);
};

const findTextAnchor = (text, phrase) => {
  const position = text.toLowerCase().indexOf(phrase.toLowerCase());

  if (position === -1) {
    return Math.floor(text.length / 2);
  }

  return position + Math.floor(phrase.length / 2);
};

const buildWaveOrder = (length, anchors, diagonalStep = 7) => {
  const order = [];
  const seen = new Set();
  const normalizedAnchors = [...new Set(anchors.filter((anchor) => anchor >= 0))];
  const addIndex = (index) => {
    if (index < 0 || index >= length || seen.has(index)) {
      return;
    }

    seen.add(index);
    order.push(index);
  };

  for (let radius = 0; order.length < length; radius += 1) {
    normalizedAnchors.forEach((anchor, anchorIndex) => {
      const offsets =
        radius === 0
          ? [0]
          : anchorIndex % 2 === 0
            ? [radius, -radius]
            : [-radius, radius];

      offsets.forEach((offset) => addIndex(anchor + offset));
    });

    addIndex((radius * diagonalStep + 3) % length);
  }

  return order;
};

const buildConvergingOrder = (length, gapIndex) => {
  const order = [];
  const seen = new Set();
  const addIndex = (index) => {
    if (index < 0 || index >= length || seen.has(index)) {
      return;
    }

    seen.add(index);
    order.push(index);
  };

  for (let radius = 0; order.length < length; radius += 1) {
    addIndex(gapIndex - 1 - radius);
    addIndex(gapIndex + radius);

    if (radius % 2 === 0) {
      addIndex(gapIndex - 6 - radius);
    }

    if (radius % 3 === 0) {
      addIndex(gapIndex - 14 - radius);
    }
  }

  for (let index = length - 1; index >= 0; index -= 1) {
    addIndex(index);
  }

  return order;
};

const buildWordCenteredOrder = (text) => {
  const order = [];
  const seen = new Set();
  const addIndex = (index) => {
    if (index < 0 || index >= text.length || seen.has(index)) {
      return;
    }

    seen.add(index);
    order.push(index);
  };
  const words = [...text.matchAll(/\S+/g)];

  words.forEach((match) => {
    const start = match.index ?? 0;
    const end = start + match[0].length - 1;
    const center = Math.floor((start + end) / 2);

    for (let radius = 0; radius <= match[0].length; radius += 1) {
      addIndex(center - radius);
      addIndex(center + radius);
    }

    if (text[end + 1] === " ") {
      addIndex(end + 1);
    }
  });

  for (let index = 0; index < text.length; index += 1) {
    addIndex(index);
  }

  return order;
};

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
      "And somewhere along the way, those patterns turned into something real... something with Impact.",
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

const buildAboutParagraphData = () => {
  const lines = [];
  const characters = [];
  let globalCharacterIndex = 0;

  for (const [lineIndex, line] of aboutLineSpecs.entries()) {
    const lineCharacters = [];
    let impactInsertIndex = null;
    const renderedSegments = line.segments.map((segment, segmentIndex) => {
      if (segment.type === "impact") {
        impactInsertIndex = lineCharacters.length;

        return {
          type: "impact",
          key: `impact-${lineIndex}-${segmentIndex}`,
        };
      }

      return {
        type: "text",
        key: `text-${lineIndex}-${segmentIndex}`,
        characters: [...segment.content].map((character) => {
          const metadata = {
            character,
            index: globalCharacterIndex++,
            isPunctuation: /[.,'’]/.test(character),
            isWhitespace: character === " ",
            lineIndex,
            lineLocalIndex: lineCharacters.length,
          };

          lineCharacters.push(metadata);
          characters.push(metadata);

          return metadata;
        }),
      };
    });

    const lineText = lineCharacters.map(({ character }) => character).join("");
    const revealOrder =
      lineIndex === 0
        ? buildWaveOrder(lineText.length, [
            findTextAnchor(lineText, "patterns"),
            findTextAnchor(lineText, "noticing"),
            findTextAnchor(lineText, "others"),
            findTextAnchor(lineText, "miss"),
          ])
        : lineIndex === 1
          ? buildConvergingOrder(
              lineText.length,
              impactInsertIndex ?? Math.floor(lineText.length * 0.86),
            )
          : buildWordCenteredOrder(lineText);
    const lineRevealBase = lineIndex * 1000;

    revealOrder.forEach((localIndex, orderIndex) => {
      const metadata = lineCharacters[localIndex];

      if (!metadata) {
        return;
      }

      metadata.lineLength = lineCharacters.length;
      metadata.revealOrder = lineRevealBase + orderIndex;
    });

    lines.push({
      ariaLabel: line.ariaLabel,
      lineIndex,
      segments: renderedSegments,
    });
  }

  const sortedCharacters = [...characters].sort(
    (left, right) => left.revealOrder - right.revealOrder,
  );

  sortedCharacters.forEach((character, orderIndex) => {
    character.revealOrder = orderIndex;
  });

  return {
    aboutCharacterMeta: characters,
    aboutParagraphLines: lines,
  };
};

const { aboutCharacterMeta, aboutParagraphLines } = buildAboutParagraphData();

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
  scrollDistanceViewportFactor: 1.32,
  patternSequenceViewportFactor: 1.72,
  maxExtraContentScrollFactor: 0.35,
  sceneStartScale: 1.18,
  exitScale: 4.8,
  exitDepth: 2450,
  exitTilt: 8,
};

const defaultRuntimeProfile = {
  disableHeavyRuntime: false,
  preferLiteMode: false,
  touchDevice: false,
  disableSmoother: false,
  disableHeroDecoder: false,
  disableBrainScene: false,
  preferImageSequenceHero: false,
  renderNeuralBurst: true,
  autoplayPanelVideos: true,
  heroCanvasDpr: 1.25,
  brainCanvasDpr: 1.1,
  brainPointSampleStep: 1,
  brainProgressStep: 0,
};

const getRuntimeProfile = () => {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return defaultRuntimeProfile;
  }

  const params = new URLSearchParams(window.location.search);
  const motionOverride = params.get("motion");
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const coarsePointer = window.matchMedia(
    "(hover: none) and (pointer: coarse)",
  ).matches;
  const touchDevice =
    coarsePointer ||
    (typeof navigator.maxTouchPoints === "number" &&
      navigator.maxTouchPoints > 0);
  const narrowViewport = window.innerWidth <= 900;
  const mobileSmootherViewport = touchDevice && window.innerWidth <= 1024;
  const lowMemory =
    typeof navigator.deviceMemory === "number" && navigator.deviceMemory <= 4;
  const lowConcurrency =
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= 4;
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection ||
    null;
  const slowConnection = ["slow-2g", "2g", "3g"].includes(
    connection?.effectiveType ?? "",
  );
  const saveData = Boolean(connection?.saveData);
  const veryLowMemory =
    typeof navigator.deviceMemory === "number" && navigator.deviceMemory <= 2;
  const veryLowConcurrency =
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= 2;
  const constrainedDevice =
    saveData ||
    slowConnection ||
    veryLowMemory ||
    veryLowConcurrency ||
    (narrowViewport && lowMemory && lowConcurrency);
  const disableHeavyRuntime = reducedMotion || constrainedDevice;
  const touchOptimizedProfile = {
    touchDevice,
    renderNeuralBurst: !touchDevice,
    heroCanvasDpr: disableHeavyRuntime ? 1 : touchDevice ? 1 : 1.25,
    brainCanvasDpr: disableHeavyRuntime ? 1 : touchDevice ? 0.45 : 1.1,
    brainPointSampleStep: touchDevice ? 3 : 1,
    brainProgressStep: touchDevice ? 0.035 : 0,
  };

  if (motionOverride === "full") {
    return {
      disableHeavyRuntime: false,
      preferLiteMode: false,
      touchDevice,
      disableSmoother: mobileSmootherViewport,
      disableHeroDecoder: false,
      disableBrainScene: false,
      preferImageSequenceHero: false,
      renderNeuralBurst: !touchDevice,
      autoplayPanelVideos: true,
      heroCanvasDpr: touchDevice ? 1 : 1.25,
      brainCanvasDpr: touchDevice ? 0.45 : 1.1,
      brainPointSampleStep: touchDevice ? 3 : 1,
      brainProgressStep: touchDevice ? 0.035 : 0,
    };
  }

  if (motionOverride === "lite") {
    return {
      disableHeavyRuntime: true,
      preferLiteMode: true,
      touchDevice,
      disableSmoother: true,
      disableHeroDecoder: true,
      disableBrainScene: true,
      preferImageSequenceHero: false,
      renderNeuralBurst: false,
      autoplayPanelVideos: false,
      heroCanvasDpr: 1,
      brainCanvasDpr: 1,
      brainPointSampleStep: 4,
      brainProgressStep: 0.05,
    };
  }

  return {
    disableHeavyRuntime,
    preferLiteMode: disableHeavyRuntime,
    touchDevice,
    disableSmoother: reducedMotion || mobileSmootherViewport,
    disableHeroDecoder: disableHeavyRuntime,
    disableBrainScene: disableHeavyRuntime,
    preferImageSequenceHero: touchDevice && !disableHeavyRuntime,
    renderNeuralBurst: !touchDevice,
    autoplayPanelVideos: !disableHeavyRuntime,
    ...touchOptimizedProfile,
  };
};

export default function App() {
  const runtimeProfileRef = useRef(null);
  const brainMotionStateRef = useRef({
    brainTravel: 0,
    brainAfterglowProgress: 0,
    brainFullscreen: 0,
    brainSpin: 0,
    brainImmersion: 0,
    neuralBurst: 0,
  });
  const requestBrainSceneSyncRef = useRef(() => {});
  const pageShellRef = useRef(null);
  const smoothWrapperRef = useRef(null);
  const smoothContentRef = useRef(null);
  const heroSectionRef = useRef(null);
  const canvasRef = useRef(null);
  const heroVideoRef = useRef(null);
  const brainMountRef = useRef(null);
  const impactSectionRef = useRef(null);
  const aboutFrameRef = useRef(null);
  const aboutFrameContentRef = useRef(null);
  const impactWordSlotRef = useRef(null);
  const impactMaskTextRef = useRef(null);
  const impactWordOutlineRef = useRef(null);
  const impactSceneRef = useRef(null);
  const impactSceneMediaRef = useRef(null);
  const patternProgressRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const projectsPinRef = useRef(null);
  const projectsTrackRef = useRef(null);
  const projectsProgressRef = useRef(null);
  const runtimeProfile = runtimeProfileRef.current ?? getRuntimeProfile();

  runtimeProfileRef.current = runtimeProfile;

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

    ScrollSmoother.get()?.kill();

    if (reducedMotionQuery.matches || runtimeProfile.disableSmoother) {
      return undefined;
    }

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
    const heroVideo = heroVideoRef.current;
    const pageShell = pageShellRef.current;
    const heroPin = heroSection?.querySelector(".hero-pin");

    if (
      !heroSection ||
      !(pageShell instanceof HTMLElement) ||
      !(heroPin instanceof HTMLElement)
    ) {
      return undefined;
    }

    const context = canvas?.getContext("2d") ?? null;

    if (!context && !heroVideo) {
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
    let videoDuration = 0;
    let imageSequenceFrames = [];
    let activeSequenceMode = runtimeProfile.preferImageSequenceHero
      ? "image-sequence"
      : "poster";

    const frameCache = new Map();
    const pendingFrames = new Map();
    const maxCachedFrames = 10;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    const playbackEndProgress = runtimeProfile.touchDevice ? 0.5 : 0.68;
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

    const setSequenceMode = (mode) => {
      activeSequenceMode = mode;
      heroSection.dataset.sequenceMode = mode;
      heroSection.dataset.decoderReady = mode === "canvas" ? "true" : "false";
    };

    const drawFrame = (frame) => {
      if (!context || !canvas) {
        return;
      }

      const bounds = canvas.getBoundingClientRect();
      const devicePixelRatio = Math.min(
        window.devicePixelRatio || 1,
        runtimeProfile.heroCanvasDpr,
      );
      const width = Math.max(1, Math.round(bounds.width * devicePixelRatio));
      const height = Math.max(1, Math.round(bounds.height * devicePixelRatio));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      const sourceWidth =
        frame.naturalWidth ||
        frame.videoWidth ||
        frame.displayWidth ||
        frame.codedWidth ||
        frame.width ||
        1;
      const sourceHeight =
        frame.naturalHeight ||
        frame.videoHeight ||
        frame.displayHeight ||
        frame.codedHeight ||
        frame.height ||
        1;
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

    const renderVisibleImageSequenceFrame = () => {
      if (!imageSequenceFrames.length) {
        return;
      }

      const playbackProgress = clamp(
        currentProgress / playbackEndProgress,
        0,
        1,
      );
      const nextFrameIndex = clamp(
        Math.round(playbackProgress * (imageSequenceFrames.length - 1)),
        0,
        imageSequenceFrames.length - 1,
      );

      if (nextFrameIndex === activeFrameIndex) {
        return;
      }

      activeFrameIndex = nextFrameIndex;
      drawFrame(imageSequenceFrames[nextFrameIndex]);
    };

    const renderFrame = () => {
      frameId = 0;

      const easing =
        reducedMotionQuery.matches ||
        runtimeProfile.disableHeroDecoder ||
        ScrollSmoother.get()
          ? 1
          : runtimeProfile.touchDevice
            ? 0.24
            : 0.12;
      currentProgress += (targetProgress - currentProgress) * easing;

      if (Math.abs(targetProgress - currentProgress) <= 0.0004) {
        currentProgress = targetProgress;
      }

      heroSection.style.setProperty(
        "--scroll-progress",
        currentProgress.toFixed(4),
      );
      const heroZoom = clamp(
        (currentProgress - zoomStartProgress) / 0.16,
        0,
        1,
      );
      const brainRelease = clamp(
        (currentProgress - brainReleaseStart) /
          (brainReleaseEnd - brainReleaseStart),
        0,
        1,
      );
      const brainTravel = clamp(
        (currentProgress - brainTravelStart) /
          (brainTravelEnd - brainTravelStart),
        0,
        1,
      );
      const brainFade = clamp(
        (currentProgress - brainFadeStart) / (brainFadeEnd - brainFadeStart),
        0,
        1,
      );
      const brainDock = clamp(
        (currentProgress - brainDockStart) / (brainDockEnd - brainDockStart),
        0,
        1,
      );
      const screenDrop = clamp(
        (currentProgress - screenDropStart) / (screenDropEnd - screenDropStart),
        0,
        1,
      );
      const brainFullscreen = clamp(
        (currentProgress - brainFullscreenStart) /
          (brainFullscreenEnd - brainFullscreenStart),
        0,
        1,
      );
      const brainSpin = clamp(
        (currentProgress - brainSpinStart) / (brainSpinEnd - brainSpinStart),
        0,
        1,
      );
      const brainImmersion = clamp(
        (currentProgress - brainImmersionStart) /
          (brainImmersionEnd - brainImmersionStart),
        0,
        1,
      );
      const neuralBurst = clamp(
        (currentProgress - neuralBurstStart) /
          (neuralBurstEnd - neuralBurstStart),
        0,
        1,
      );

      pageShell.style.setProperty("--scroll-progress", currentProgress.toFixed(4));
      pageShell.style.setProperty("--hero-zoom", heroZoom.toFixed(4));
      pageShell.style.setProperty("--brain-release", brainRelease.toFixed(4));
      pageShell.style.setProperty("--brain-travel", brainTravel.toFixed(4));
      pageShell.style.setProperty("--brain-fade", brainFade.toFixed(4));
      pageShell.style.setProperty("--brain-dock", brainDock.toFixed(4));
      pageShell.style.setProperty("--screen-drop", screenDrop.toFixed(4));
      pageShell.style.setProperty(
        "--brain-fullscreen",
        brainFullscreen.toFixed(4),
      );
      pageShell.style.setProperty("--brain-spin", brainSpin.toFixed(4));
      pageShell.style.setProperty(
        "--brain-immersion",
        brainImmersion.toFixed(4),
      );
      pageShell.style.setProperty("--neural-burst", neuralBurst.toFixed(4));
      Object.assign(brainMotionStateRef.current, {
        brainTravel,
        brainFullscreen,
        brainSpin,
        brainImmersion,
        neuralBurst,
      });
      requestBrainSceneSyncRef.current();

      if (
        activeSequenceMode === "canvas" &&
        activeFrameIndex >= 0 &&
        frameCache.has(activeFrameIndex)
      ) {
        drawFrame(frameCache.get(activeFrameIndex));
      }

      if (activeSequenceMode === "canvas") {
        renderVisibleFrame();
      } else if (activeSequenceMode === "image-sequence") {
        renderVisibleImageSequenceFrame();
      } else if (
        activeSequenceMode === "video" &&
        heroVideo &&
        videoDuration > 0
      ) {
        const playbackProgress = clamp(
          currentProgress / playbackEndProgress,
          0,
          1,
        );
        const nextTime = playbackProgress * videoDuration;

        if (Math.abs(heroVideo.currentTime - nextTime) > 0.033) {
          try {
            heroVideo.currentTime = nextTime;
          } catch {
            // Ignore transient seek errors while the browser buffers.
          }
        }
      }

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

      if (activeSequenceMode === "canvas" &&
          activeFrameIndex >= 0 &&
          frameCache.has(activeFrameIndex)) {
        drawFrame(frameCache.get(activeFrameIndex));
      } else if (
        activeSequenceMode === "image-sequence" &&
        activeFrameIndex >= 0 &&
        imageSequenceFrames[activeFrameIndex]
      ) {
        drawFrame(imageSequenceFrames[activeFrameIndex]);
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

      setSequenceMode("poster");

      if (runtimeProfile.disableHeroDecoder || !ImageDecoderClass) {
        return false;
      }

      try {
        const supportsWebP =
          typeof ImageDecoderClass.isTypeSupported === "function"
            ? await ImageDecoderClass.isTypeSupported("image/webp")
            : true;

        if (!supportsWebP || !mounted) {
          return false;
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
          return false;
        }

        activeFrameIndex = 0;
        requestedFrameIndex = 0;
        setSequenceMode("canvas");
        drawFrame(firstFrame);
        warmNearbyFrames(0);
        syncToScroll();
        return true;
      } catch (error) {
        console.error("Failed to decode animated WebP frames.", error);
        return false;
      }
    };

    const initializeImageSequence = async () => {
      if (!context || !canvas || !mobileHeroFrameUrls.length) {
        return false;
      }

      setSequenceMode("poster");

      const loadFrame = (source) =>
        new Promise((resolve) => {
          const image = new Image();

          image.decoding = "async";
          image.src = source;

          if (image.complete) {
            resolve(image);
            return;
          }

          image.addEventListener("load", () => resolve(image), { once: true });
          image.addEventListener("error", () => resolve(null), { once: true });
        });

      try {
        const loadedFrames = await Promise.all(
          mobileHeroFrameUrls.map((source) => loadFrame(source)),
        );

        if (!mounted) {
          return false;
        }

        imageSequenceFrames = loadedFrames.filter(Boolean);

        if (!imageSequenceFrames.length) {
          return false;
        }

        activeFrameIndex = 0;
        setSequenceMode("image-sequence");
        drawFrame(imageSequenceFrames[0]);
        syncToScroll();
        return true;
      } catch (error) {
        console.error("Failed to initialize mobile hero image sequence.", error);
        return false;
      }
    };

    const initializeVideoFallback = () => {
      if (!heroVideo) {
        return;
      }

      const syncVideoMetadata = () => {
        if (!mounted) {
          return;
        }

        videoDuration = heroVideo.duration || 0;
        setSequenceMode(videoDuration > 0 ? "video" : "poster");
        syncToScroll();
      };

      heroVideo.preload = "auto";
      heroVideo.pause();

      if (heroVideo.readyState >= 1 && heroVideo.duration > 0) {
        syncVideoMetadata();
        return undefined;
      }

      heroVideo.addEventListener("loadedmetadata", syncVideoMetadata);
      heroVideo.load();

      return () => {
        heroVideo.removeEventListener("loadedmetadata", syncVideoMetadata);
      };
    };

    window.addEventListener("resize", updateBounds);
    window.addEventListener("scroll", syncToScroll, { passive: true });
    currentProgress = 0;
    targetProgress = 0;
    heroSection.dataset.sequenceMode = "poster";
    updateBounds();
    let disposeVideoFallback;

    const initializeHeroSequence = async () => {
      const sequenceReady = runtimeProfile.preferImageSequenceHero
        ? await initializeImageSequence()
        : await initializeDecoder();

      if (!sequenceReady) {
        disposeVideoFallback = initializeVideoFallback();
      }
    };

    void initializeHeroSequence();

    return () => {
      mounted = false;
      window.removeEventListener("resize", updateBounds);
      window.removeEventListener("scroll", syncToScroll);
      disposeVideoFallback?.();

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

    if (!mountNode) {
      return undefined;
    }

    requestBrainSceneSyncRef.current = () => {};

    if (runtimeProfile.disableBrainScene) {
      return undefined;
    }

    let disposeScene = () => {};
    let cancelled = false;
    let syncFrameId = 0;
    let lastRenderSignature = "";

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
          antialias: false,
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

        renderer.setPixelRatio(
          Math.min(window.devicePixelRatio || 1, runtimeProfile.brainCanvasDpr),
        );
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = runtimeProfile.touchDevice
          ? THREE.NoToneMapping
          : THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = runtimeProfile.touchDevice ? 1 : 1.08;
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

        scene.add(ambientLight, keyLight);

        if (!runtimeProfile.touchDevice) {
          scene.add(fillLight, rimLight);
        }

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

        const decimatePointsGeometry = (geometry) => {
          if (
            !geometry?.isBufferGeometry ||
            runtimeProfile.brainPointSampleStep <= 1
          ) {
            return geometry;
          }

          const positionAttribute = geometry.getAttribute("position");

          if (!positionAttribute || positionAttribute.count < 3) {
            return geometry;
          }

          const nextCount = Math.ceil(
            positionAttribute.count / runtimeProfile.brainPointSampleStep,
          );
          const reducedGeometry = new THREE.BufferGeometry();

          for (const [name, attribute] of Object.entries(geometry.attributes)) {
            if (!attribute || attribute.isInterleavedBufferAttribute) {
              return geometry;
            }

            const ArrayType = attribute.array.constructor;
            const reducedArray = new ArrayType(nextCount * attribute.itemSize);

            for (
              let sourceIndex = 0, targetIndex = 0;
              sourceIndex < attribute.count;
              sourceIndex += runtimeProfile.brainPointSampleStep, targetIndex += 1
            ) {
              const sourceOffset = sourceIndex * attribute.itemSize;
              const targetOffset = targetIndex * attribute.itemSize;

              reducedArray.set(
                attribute.array.subarray(
                  sourceOffset,
                  sourceOffset + attribute.itemSize,
                ),
                targetOffset,
              );
            }

            reducedGeometry.setAttribute(
              name,
              new THREE.BufferAttribute(
                reducedArray,
                attribute.itemSize,
                attribute.normalized,
              ),
            );
          }

          reducedGeometry.computeBoundingBox();
          reducedGeometry.computeBoundingSphere();
          return reducedGeometry;
        };

        const applyMobileBrainMaterialOverrides = (material) => {
          if (!runtimeProfile.touchDevice || !material) {
            return;
          }

          if ("vertexColors" in material) {
            material.vertexColors = false;
          }

          if ("color" in material && material.color?.set) {
            material.color.set(0xffffff);
          }

          if ("emissive" in material && material.emissive?.set) {
            material.emissive.set(0xffffff);
          }

          if ("emissiveIntensity" in material) {
            material.emissiveIntensity = 4.2;
          }
        };

        const syncSceneToScroll = () => {
          if (!brainModel) {
            return;
          }

          const {
            brainSpin,
            brainTravel,
            brainAfterglowProgress,
            brainFullscreen,
            brainImmersion,
            neuralBurst,
          } = brainMotionStateRef.current;
          const quantize = (value) =>
            runtimeProfile.brainProgressStep > 0
              ? Math.round(value / runtimeProfile.brainProgressStep) *
                runtimeProfile.brainProgressStep
              : value;
          const motion = {
            brainSpin: quantize(brainSpin),
            brainTravel: quantize(brainTravel),
            brainAfterglowProgress: quantize(brainAfterglowProgress),
            brainFullscreen: quantize(brainFullscreen),
            brainImmersion: quantize(brainImmersion),
            neuralBurst: quantize(neuralBurst),
          };
          const signature = Object.values(motion)
            .map((value) => value.toFixed(3))
            .join("|");

          if (signature === lastRenderSignature) {
            return;
          }

          lastRenderSignature = signature;
          const basePivotX = THREE.MathUtils.lerp(
            0.22,
            0.03,
            motion.brainFullscreen,
          );
          const heroExitRotationX = THREE.MathUtils.lerp(
            basePivotX,
            -1.08,
            motion.brainTravel,
          );

          pivot.rotation.x = THREE.MathUtils.lerp(
            heroExitRotationX,
            -2.18,
            motion.brainAfterglowProgress,
          );
          pivot.rotation.y = motion.brainSpin * Math.PI * 1.18;
          pivot.rotation.z = THREE.MathUtils.lerp(
            -0.12,
            0.06,
            motion.neuralBurst,
          );
          root.rotation.z = motion.neuralBurst * 0.05;
          camera.position.z = THREE.MathUtils.lerp(
            fittedCameraDistance,
            innerCameraDistance,
            motion.brainImmersion,
          );
          camera.near = THREE.MathUtils.lerp(
            Math.max(fittedCameraDistance / 100, 0.01),
            Math.max(innerCameraDistance / 18, 0.005),
            motion.brainImmersion,
          );
          camera.far = THREE.MathUtils.lerp(
            fittedCameraDistance * 10,
            fittedCameraDistance * 4,
            motion.brainImmersion,
          );
          camera.updateProjectionMatrix();
          renderer.toneMappingExposure = runtimeProfile.touchDevice
            ? 1
            : 1.08 + motion.neuralBurst * 0.52;

          pointMaterials.forEach((material) => {
            material.size = THREE.MathUtils.lerp(
              0.018,
              0.05,
              motion.brainImmersion,
            );
            material.opacity = THREE.MathUtils.lerp(
              0.94,
              1,
              motion.neuralBurst,
            );
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

        requestBrainSceneSyncRef.current = requestScrollSync;

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

              const childMaterials = Array.isArray(child.material)
                ? child.material
                : child.material
                  ? [child.material]
                  : [];

              childMaterials.forEach(applyMobileBrainMaterialOverrides);

              if (child.isPoints && child.material) {
                const originalGeometry = child.geometry;
                const reducedGeometry = decimatePointsGeometry(originalGeometry);

                if (reducedGeometry !== originalGeometry) {
                  child.geometry = reducedGeometry;
                  originalGeometry.dispose();
                }

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
      requestBrainSceneSyncRef.current = () => {};
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
    const patternProgressFill = patternProgressRef.current;
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
      !(patternProgressFill instanceof HTMLElement) ||
      !(projectsSection instanceof HTMLElement) ||
      !(projectsPin instanceof HTMLElement) ||
      !(projectsTrack instanceof HTMLElement) ||
      !(projectsProgressFill instanceof HTMLElement)
    ) {
      return undefined;
    }
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const focusItems = aboutFrame.querySelectorAll(".about-focus-fade");
    const characterNodes = [
      ...aboutFrame.querySelectorAll("[data-about-char-index]"),
    ];
    const aboutLines = [...aboutFrame.querySelectorAll(".about-line")];
    const wordMeasure = aboutFrame.querySelector(".impact-word-measure");
    const patternOverlay = section.querySelector(".pattern-overlay");
    const patternField = section.querySelector(".pattern-field");
    const patternTraces = [...section.querySelectorAll(".pattern-trace")];
    const patternNodes = [...section.querySelectorAll(".pattern-node")];
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
      aboutLines.length !== aboutParagraphLines.length ||
      !characterNodes.length ||
      !(wordMeasure instanceof HTMLElement) ||
      !(patternOverlay instanceof HTMLElement) ||
      !(patternField instanceof HTMLElement) ||
      !(patternProgressFill instanceof HTMLElement) ||
      patternTraces.length !== patternTraceItems.length ||
      patternNodes.length !== patternNodeItems.length ||
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
    const characterRevealEnd = 0.56;
    const sectionScrollStart = 0.46;
    const sectionScrollDuration = 0.12;
    const gravityStart = 0.38;
    const peakChaosStart = 0.56;
    const zoomStart = 0.68;
    const frameExitStart = 0.84;
    const sceneRevealStartY = 4;
    const sceneParallaxStartY = 6;
    const sceneParallaxEndY = -12;
    const sceneParallaxStartScale = 1.14;
    const sceneParallaxEndScale = 1.02;
    const sceneFinalScale = 1;
    const projectSequenceDuration = projectSequencePanels.length - 1;
    const brainAfterglowFadeEnd = 0.12;
    const brainEntryRotationProgressMax = 0.32;
    const useStickyProjectsScroll = runtimeProfile.touchDevice;
    const simplifyCharacterMotion =
      runtimeProfile.touchDevice || characterNodes.length > 96;
    const visualSampleCount = simplifyCharacterMotion ? 72 : 120;
    const lineProfiles = [
      { authority: 0.18, magnet: 0.34, twitch: 1.08 },
      { authority: 0.34, magnet: 1.12, twitch: 0.88 },
      { authority: 0.84, magnet: 0.52, twitch: 0.32 },
    ];
    const characterNodeByIndex = new Map(
      characterNodes.map((node) => [
        Number.parseInt(node.dataset.aboutCharIndex ?? "-1", 10),
        node,
      ]),
    );
    const orderedCharacterNodes = [...aboutCharacterMeta]
      .sort((left, right) => left.revealOrder - right.revealOrder)
      .map((meta) => characterNodeByIndex.get(meta.index))
      .filter(Boolean);
    let previousActiveCount = -1;
    let syncFrameId = 0;
    let sectionEntryProgress = 0;
    let sectionEnteringViewport = false;
    let sectionTimelineTrigger = null;
    let maskLayoutMetrics = null;
    let lastMaskSignature = "";
    let lastVisualSignature = "";
    let characterField = [];

    const setPatternState = ({
      awaken = 0,
      chaos = 0,
      gravity = 0,
      collapse = 0,
      vignette = 0,
      charge = 0,
    } = {}) => {
      section.style.setProperty("--pattern-awaken", awaken.toFixed(4));
      section.style.setProperty("--pattern-chaos", chaos.toFixed(4));
      section.style.setProperty("--pattern-gravity", gravity.toFixed(4));
      section.style.setProperty("--pattern-collapse", collapse.toFixed(4));
      section.style.setProperty("--pattern-vignette", vignette.toFixed(4));
      section.style.setProperty("--impact-charge", charge.toFixed(4));
    };

    const setLineState = (lineIndex, state = {}) => {
      const line = aboutLines[lineIndex];

      if (!(line instanceof HTMLElement)) {
        return;
      }

      line.style.setProperty(
        "--line-echo-opacity",
        `${(state.echoOpacity ?? 0).toFixed(4)}`,
      );
      line.style.setProperty("--line-echo-x", state.echoX ?? "0px");
      line.style.setProperty("--line-echo-y", state.echoY ?? "0px");
      line.style.setProperty("--line-trace-opacity", `${(state.traceOpacity ?? 0).toFixed(4)}`);
      line.style.setProperty("--line-skew", state.skew ?? "0deg");
      line.style.setProperty("--line-tension", `${(state.tension ?? 0).toFixed(4)}`);
      line.style.setProperty("--line-scan-shift", state.scanShift ?? "0px");
    };

    const resetCharacterNode = (node) => {
      node.classList.remove("about-char-active");
      node.style.removeProperty("color");
      node.style.removeProperty("filter");
      node.style.removeProperty("opacity");
      node.style.removeProperty("text-shadow");
      node.style.removeProperty("transform");
    };

    const getFrameScrollMax = () =>
      Math.max(aboutFrameContent.scrollHeight - aboutFrameContent.clientHeight, 0);

    const getImpactScrollTarget = () => {
      const scrollTarget =
        wordSlot.offsetTop +
        wordSlot.offsetHeight / 2 -
        aboutFrameContent.clientHeight / 2;

      return gsap.utils.clamp(0, getFrameScrollMax(), scrollTarget);
    };

    const setBrainAfterglow = (opacity, progress = 0) => {
      pageShell.style.setProperty("--brain-afterglow", opacity.toFixed(4));
      pageShell.style.setProperty(
        "--brain-afterglow-progress",
        progress.toFixed(4),
      );
      brainMotionStateRef.current.brainAfterglowProgress = progress;
      requestBrainSceneSyncRef.current();
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

    const measureCharacterField = () => {
      lastVisualSignature = "";
      const frameRect = aboutFrame.getBoundingClientRect();
      const slotRect = wordSlot.getBoundingClientRect();
      const portalCenterX = slotRect.left + slotRect.width / 2 - frameRect.left;
      const portalCenterY = slotRect.top + slotRect.height / 2 - frameRect.top;

      const field = aboutCharacterMeta
        .map((meta) => {
          if (meta.isWhitespace) {
            return null;
          }

          const node = characterNodeByIndex.get(meta.index);

          if (!(node instanceof HTMLElement)) {
            return null;
          }

          const rect = node.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2 - frameRect.left;
          const centerY = rect.top + rect.height / 2 - frameRect.top;
          const dx = portalCenterX - centerX;
          const dy = portalCenterY - centerY;
          const distance = Math.hypot(dx, dy) || 1;

          return {
            ...meta,
            distance,
            dx,
            dy,
            node,
            lineLocalRatio:
              meta.lineLength && meta.lineLength > 1
                ? meta.lineLocalIndex / (meta.lineLength - 1)
                : 0,
            orbitDirection: meta.index % 2 === 0 ? 1 : -1,
            phase: meta.lineIndex * 1.13 + meta.lineLocalIndex * 0.41,
            seedX: ((meta.index % 5) - 2) * 1.5,
            seedY: ((meta.index % 7) - 3) * 1.18,
          };
        })
        .filter(Boolean);

      const maxDistance = Math.max(
        ...field.map((item) => item.distance),
        1,
      );

      characterField = field.map((item) => ({
        ...item,
        distanceNorm: item.distance / maxDistance,
      }));
    };

    const updateCharacterSystem = (timelineProgress) => {
      const revealProgress = gsap.utils.clamp(
        0,
        1,
        (timelineProgress - characterRevealStart) /
          (characterRevealEnd - characterRevealStart),
      );
      const instabilityProgress = smoothStep(
        gsap.utils.clamp(0, 1, (timelineProgress - 0.14) / 0.46),
      );
      const gravityProgress = smoothStep(
        gsap.utils.clamp(0, 1, (timelineProgress - gravityStart) / 0.28),
      );
      const peakChaosProgress = smoothStep(
        gsap.utils.clamp(0, 1, (timelineProgress - peakChaosStart) / 0.14),
      );
      const portalProgress = smoothStep(
        gsap.utils.clamp(0, 1, (timelineProgress - zoomStart) / 0.22),
      );
      const depthProgress = smoothStep(
        gsap.utils.clamp(0, 1, (timelineProgress - 0.78) / 0.22),
      );
      const cursor = revealProgress * (orderedCharacterNodes.length + 1);
      const activeCount = gsap.utils.clamp(
        0,
        orderedCharacterNodes.length,
        revealProgress >= 1
          ? orderedCharacterNodes.length
          : Math.floor(cursor),
      );
      const sectionCharge = Math.max(
        gravityProgress,
        peakChaosProgress * 0.72 + portalProgress * 0.38,
      );
      const visualSignature = [
        activeCount,
        Math.round(revealProgress * visualSampleCount),
        Math.round(instabilityProgress * visualSampleCount),
        Math.round(gravityProgress * visualSampleCount),
        Math.round(peakChaosProgress * visualSampleCount),
        Math.round(portalProgress * visualSampleCount),
        Math.round(depthProgress * visualSampleCount),
      ].join("|");
      const activeCountChanged = activeCount !== previousActiveCount;

      if (previousActiveCount === -1) {
        orderedCharacterNodes.forEach((node, index) => {
          node.classList.toggle("about-char-active", index < activeCount);
        });
      } else if (activeCountChanged && activeCount > previousActiveCount) {
        orderedCharacterNodes
          .slice(previousActiveCount, activeCount)
          .forEach((node) => node.classList.add("about-char-active"));
      } else if (activeCountChanged) {
        orderedCharacterNodes
          .slice(activeCount, previousActiveCount)
          .forEach((node) => node.classList.remove("about-char-active"));
      }

      previousActiveCount = activeCount;

      if (!activeCountChanged && visualSignature === lastVisualSignature) {
        return;
      }

      lastVisualSignature = visualSignature;

      setPatternState({
        awaken: revealProgress,
        chaos: instabilityProgress * (1 - portalProgress * 0.18),
        gravity: gravityProgress,
        collapse: portalProgress,
        vignette: Math.min(1, instabilityProgress * 0.52 + portalProgress * 0.58),
        charge: sectionCharge,
      });
      setLineState(0, {
        echoOpacity: 0.06 + instabilityProgress * 0.2,
        echoX: `${(Math.sin(timelineProgress * 20) * instabilityProgress * 6).toFixed(2)}px`,
        echoY: `${(-2 - instabilityProgress * 4.5).toFixed(2)}px`,
        traceOpacity: 0.08 + instabilityProgress * 0.26,
        skew: `${(Math.cos(timelineProgress * 16) * instabilityProgress * 1.3).toFixed(2)}deg`,
        tension: 0.14 + instabilityProgress * 0.34,
        scanShift: `${(Math.sin(timelineProgress * 12) * 24 * instabilityProgress).toFixed(2)}px`,
      });
      setLineState(1, {
        echoOpacity: 0.08 + gravityProgress * 0.28,
        echoX: `${(Math.cos(timelineProgress * 17) * instabilityProgress * 4.2).toFixed(2)}px`,
        echoY: `${(-2 - gravityProgress * 6.2).toFixed(2)}px`,
        traceOpacity: 0.12 + gravityProgress * 0.34,
        skew: `${(gravityProgress * 1.7 - portalProgress * 1.1).toFixed(2)}deg`,
        tension: 0.18 + gravityProgress * 0.5,
        scanShift: `${(Math.cos(timelineProgress * 9) * 18 + gravityProgress * 16).toFixed(2)}px`,
      });
      setLineState(2, {
        echoOpacity: 0.04 + revealProgress * 0.1 + depthProgress * 0.08,
        echoX: `${(Math.sin(timelineProgress * 10 + 1.3) * instabilityProgress * 2.2).toFixed(2)}px`,
        echoY: `${(-1 - depthProgress * 2.2).toFixed(2)}px`,
        traceOpacity: 0.06 + depthProgress * 0.16,
        skew: `${(Math.sin(timelineProgress * 7 + 2.2) * instabilityProgress * 0.34).toFixed(2)}deg`,
        tension: 0.08 + depthProgress * 0.18,
        scanShift: `${(Math.sin(timelineProgress * 6) * 10).toFixed(2)}px`,
      });
      patternProgressFill.style.transform = `scaleX(${(0.1 + revealProgress * 0.9).toFixed(4)})`;
      patternProgressFill.style.opacity = `${(0.24 + revealProgress * 0.6 + portalProgress * 0.12).toFixed(3)}`;

      patternTraces.forEach((trace, index) => {
        const wake = clamp01(instabilityProgress * 1.18 - index * 0.07);
        const floatX =
          Math.sin(timelineProgress * 13 + index * 1.27) * 14 * wake +
          gravityProgress * (index % 2 === 0 ? 10 : -10);
        const floatY =
          Math.cos(timelineProgress * 11 + index * 0.92) * 7 * wake -
          portalProgress * 12;

        trace.style.opacity = `${(0.03 + wake * 0.22 + peakChaosProgress * 0.22 - portalProgress * 0.12).toFixed(3)}`;
        trace.style.setProperty("--trace-shift-x", `${floatX.toFixed(2)}px`);
        trace.style.setProperty("--trace-shift-y", `${floatY.toFixed(2)}px`);
        trace.style.setProperty(
          "--trace-scale",
          `${(0.82 + wake * 0.26 + peakChaosProgress * 0.18).toFixed(3)}`,
        );
      });

      patternNodes.forEach((node, index) => {
        const wake = clamp01(revealProgress * 1.1 - index * 0.08);
        const scale =
          0.82 +
          wake * 0.36 +
          peakChaosProgress * 0.18 +
          portalProgress * 0.12;

        node.style.opacity = `${(0.05 + wake * 0.3 + gravityProgress * 0.14 - portalProgress * 0.08).toFixed(3)}`;
        node.style.setProperty("--node-scale", `${scale.toFixed(3)}`);
        node.style.setProperty(
          "--node-shift-x",
          `${(Math.sin(timelineProgress * 12 + index * 0.8) * 8 * wake).toFixed(2)}px`,
        );
        node.style.setProperty(
          "--node-shift-y",
          `${(Math.cos(timelineProgress * 9 + index * 1.1) * 6 * wake - portalProgress * 8).toFixed(2)}px`,
        );
      });

      characterField.forEach((character) => {
        const {
          distanceNorm,
          dx,
          dy,
          isPunctuation,
          lineIndex,
          lineLocalRatio,
          node,
          orbitDirection,
          phase,
          revealOrder,
          seedX,
          seedY,
        } = character;

        const profile = lineProfiles[lineIndex] ?? lineProfiles[0];
        const revealDelta = cursor - revealOrder;
        const activation = clamp01(revealDelta);
        const spread = clamp01(1 - Math.abs(revealDelta - 0.22) / 2.45);
        const wake = Math.max(activation, spread * 0.72);
        const wakeEase = smoothStep(wake);
        const punctuationFactor = isPunctuation ? 0.58 : 1;
        const analyticalWave = Math.sin(
          phase +
            timelineProgress * (lineIndex === 0 ? 18 : lineIndex === 1 ? 14 : 9),
        );
        const patternWave = Math.cos(
          lineLocalRatio * Math.PI * (lineIndex === 0 ? 5.2 : lineIndex === 1 ? 2.8 : 1.6) +
            timelineProgress * 15 +
            phase,
        );
        const instability = instabilityProgress * (runtimeProfile.touchDevice ? 0.62 : 1);
        const authorityDamp =
          1 - profile.authority * smoothStep(gsap.utils.clamp(0, 1, (revealProgress - 0.62) / 0.28));
        const twitchX =
          analyticalWave *
          (simplifyCharacterMotion ? 2.2 : 3.4) *
          profile.twitch *
          wakeEase *
          punctuationFactor;
        const twitchY =
          (-(simplifyCharacterMotion ? 4.8 : 6.8) * profile.twitch * wakeEase +
            patternWave * instability * (simplifyCharacterMotion ? 1 : 1.6)) *
          punctuationFactor;
        const driftX =
          Math.sin(phase * 1.38 + timelineProgress * 24) *
          instability *
          seedX *
          profile.twitch *
          punctuationFactor;
        const driftY =
          Math.cos(phase * 1.15 + timelineProgress * 19) *
          instability *
          seedY *
          profile.twitch *
          punctuationFactor;
        const magnetStrength =
          gravityProgress * profile.magnet * (0.22 + (1 - distanceNorm) * 0.7);
        const magnetX = dx * magnetStrength * 0.11 * punctuationFactor;
        const magnetY = dy * magnetStrength * 0.11 * punctuationFactor;
        const orbitStrength =
          peakChaosProgress *
          (0.046 + (1 - distanceNorm) * 0.085) *
          punctuationFactor;
        const orbitX = -dy * orbitStrength * orbitDirection;
        const orbitY = dx * orbitStrength * orbitDirection;
        const collapseStrength =
          portalProgress * (0.18 + (1 - distanceNorm) * 0.22) * punctuationFactor;
        const collapseX = dx * collapseStrength;
        const collapseY = dy * collapseStrength;
        const x = twitchX + driftX * authorityDamp + magnetX + orbitX + collapseX;
        const y =
          twitchY + driftY * authorityDamp + magnetY * 0.94 + orbitY + collapseY;
        const scale =
          1 +
          wakeEase * (lineIndex === 1 ? 0.042 : 0.026) +
          portalProgress * (0.016 + (1 - distanceNorm) * 0.028);
        const skew = simplifyCharacterMotion
          ? 0
          : (patternWave *
              instability *
              (lineIndex === 0 ? 1.2 : 0.64) *
              punctuationFactor +
              gravityProgress *
                (lineIndex === 1 ? orbitDirection * 0.8 * (1 - distanceNorm) : 0)) *
            authorityDamp;
        const opacity = clamp01(
          0.34 + wakeEase * 0.66 - portalProgress * (0.08 + distanceNorm * 0.34),
        );

        node.style.opacity = opacity.toFixed(3);
        node.style.transform = simplifyCharacterMotion
          ? `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`
          : `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) skewX(${skew.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      });
    };

    const applySettledCharacterState = () => {
      setPatternState({
        awaken: 1,
        chaos: 0.12,
        gravity: 0.18,
        collapse: 0,
        vignette: 0.24,
        charge: 0.24,
      });
      setLineState(0, {
        echoOpacity: 0.08,
        echoX: "0px",
        echoY: "-2px",
        traceOpacity: 0.1,
        skew: "0deg",
        tension: 0.12,
        scanShift: "0px",
      });
      setLineState(1, {
        echoOpacity: 0.1,
        echoX: "0px",
        echoY: "-3px",
        traceOpacity: 0.12,
        skew: "0deg",
        tension: 0.16,
        scanShift: "0px",
      });
      setLineState(2, {
        echoOpacity: 0.05,
        echoX: "0px",
        echoY: "-1px",
        traceOpacity: 0.08,
        skew: "0deg",
        tension: 0.1,
        scanShift: "0px",
      });
      patternProgressFill.style.transform = "scaleX(1)";
      patternProgressFill.style.opacity = "0.86";

      patternTraces.forEach((trace) => {
        trace.style.opacity = "0.08";
        trace.style.setProperty("--trace-scale", "1");
        trace.style.setProperty("--trace-shift-x", "0px");
        trace.style.setProperty("--trace-shift-y", "0px");
      });

      patternNodes.forEach((node) => {
        node.style.opacity = "0.12";
        node.style.setProperty("--node-scale", "1");
        node.style.setProperty("--node-shift-x", "0px");
        node.style.setProperty("--node-shift-y", "0px");
      });

      orderedCharacterNodes.forEach((node) => node.classList.add("about-char-active"));
      characterField.forEach(({ node }) => {
        node.style.opacity = "1";
        node.style.transform = "translate3d(0px, 0px, 0) skewX(0deg) scale(1)";
      });
    };

    const getPinnedScrollDistance = () => {
      const viewportHeight = window.innerHeight || 1;
      const extraContentScroll = Math.min(
        getFrameScrollMax(),
        viewportHeight * impactTransitionSettings.maxExtraContentScrollFactor,
      );

      const distance = Math.round(
        viewportHeight * impactTransitionSettings.scrollDistanceViewportFactor +
          viewportHeight * impactTransitionSettings.patternSequenceViewportFactor +
          extraContentScroll,
      );

      return runtimeProfile.touchDevice
        ? Math.round(distance * 0.78)
        : distance;
    };

    const getProjectsHorizontalDistance = () => {
      const viewportWidth = projectsPin.clientWidth || window.innerWidth || 1;
      const travelDistance = projectsTrack.scrollWidth - viewportWidth;

      const distance = Math.max(
        Math.round(travelDistance),
        Math.round(viewportWidth * projectSequenceDuration),
      );

      return runtimeProfile.touchDevice
        ? Math.round(distance * 0.84)
        : distance;
    };

    const getProjectSequenceMotionSettings = () => {
      const viewportWidth = window.innerWidth || projectsPin.clientWidth || 1;
      const viewportHeight = window.innerHeight || 1;
      const isPhone = viewportWidth <= 640;
      const isTablet = viewportWidth <= 960;
      const isCompactHeight = viewportHeight <= 760;

      if (isPhone) {
        return {
          trackScrub: isCompactHeight ? 0.76 : 0.72,
          mediaTransformOrigin: "center top",
          panelOneDrift: {
            xPercent: -8,
            yPercent: isCompactHeight ? -1.5 : -2,
          },
          textEntry: {
            xPercent: 6,
            yPercent: isCompactHeight ? 0.8 : 1.2,
          },
          textDrift: {
            xPercent: -5,
            yPercent: isCompactHeight ? -1.3 : -1.8,
          },
          ghostEntry: {
            xPercent: 3,
            yPercent: 0.8,
            opacity: 0.12,
          },
          ghostDrift: {
            xPercent: -1.2,
            yPercent: -0.55,
            opacity: 0.22,
          },
          panelTwoMediaEntry: {
            xPercent: -2,
            scale: isCompactHeight ? 1.01 : 1.02,
          },
          panelTwoMediaDrift: {
            xPercent: 2.2,
            scale: 1,
          },
          panelFourMediaEntry: {
            xPercent: -1.8,
            scale: isCompactHeight ? 1.015 : 1.03,
          },
          panelFourMediaDrift: {
            xPercent: 2.8,
            scale: 1.005,
          },
          captionEntry: {
            y: isCompactHeight ? 10 : 14,
            opacity: 0.84,
          },
        };
      }

      if (isTablet) {
        return {
          trackScrub: isCompactHeight ? 0.88 : 0.84,
          mediaTransformOrigin: "center top",
          panelOneDrift: {
            xPercent: -13,
            yPercent: isCompactHeight ? -2.4 : -3,
          },
          textEntry: {
            xPercent: 10,
            yPercent: isCompactHeight ? 1.8 : 2.4,
          },
          textDrift: {
            xPercent: -8,
            yPercent: isCompactHeight ? -2.5 : -3.2,
          },
          ghostEntry: {
            xPercent: 5,
            yPercent: 1.4,
            opacity: 0.15,
          },
          ghostDrift: {
            xPercent: -2.4,
            yPercent: -1.1,
            opacity: 0.28,
          },
          panelTwoMediaEntry: {
            xPercent: -4,
            scale: isCompactHeight ? 1.05 : 1.07,
          },
          panelTwoMediaDrift: {
            xPercent: 4.4,
            scale: 1.015,
          },
          panelFourMediaEntry: {
            xPercent: -3.4,
            scale: isCompactHeight ? 1.06 : 1.09,
          },
          panelFourMediaDrift: {
            xPercent: 5.4,
            scale: 1.02,
          },
          captionEntry: {
            y: isCompactHeight ? 16 : 22,
            opacity: 0.76,
          },
        };
      }

      return {
        trackScrub: 1.08,
        mediaTransformOrigin: "center center",
        panelOneDrift: {
          xPercent: -18,
          yPercent: -4,
        },
        textEntry: {
          xPercent: 14,
          yPercent: 3,
        },
        textDrift: {
          xPercent: -12,
          yPercent: -5,
        },
        ghostEntry: {
          xPercent: 8,
          yPercent: 2,
          opacity: 0.18,
        },
        ghostDrift: {
          xPercent: -4,
          yPercent: -2,
          opacity: 0.34,
        },
        panelTwoMediaEntry: {
          xPercent: -8,
          scale: 1.14,
        },
        panelTwoMediaDrift: {
          xPercent: 8,
          scale: 1.04,
        },
        panelFourMediaEntry: {
          xPercent: -6,
          scale: 1.16,
        },
        panelFourMediaDrift: {
          xPercent: 10,
          scale: 1.03,
        },
        captionEntry: {
          y: 32,
          opacity: 0.62,
        },
      };
    };

    let projectMotion = getProjectSequenceMotionSettings();

    const refreshProjectMotionSettings = () => {
      projectMotion = getProjectSequenceMotionSettings();
      return projectMotion;
    };

    const applyProjectBaseState = () => {
      const settings = refreshProjectMotionSettings();

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
        xPercent: settings.textEntry.xPercent,
        yPercent: settings.textEntry.yPercent,
        force3D: true,
      });
      gsap.set(projectPanelThreeGhost, {
        xPercent: settings.ghostEntry.xPercent,
        yPercent: settings.ghostEntry.yPercent,
        opacity: settings.ghostEntry.opacity,
        force3D: true,
      });
      gsap.set(projectPanelFiveCopy, {
        xPercent: settings.textEntry.xPercent,
        yPercent: settings.textEntry.yPercent,
        force3D: true,
      });
      gsap.set(projectPanelFiveGhost, {
        xPercent: settings.ghostEntry.xPercent,
        yPercent: settings.ghostEntry.yPercent,
        opacity: settings.ghostEntry.opacity,
        force3D: true,
      });
      gsap.set(projectPanelTwoMedia, {
        xPercent: settings.panelTwoMediaEntry.xPercent,
        scale: settings.panelTwoMediaEntry.scale,
        transformOrigin: settings.mediaTransformOrigin,
        force3D: true,
      });
      gsap.set(projectPanelFourMedia, {
        xPercent: settings.panelFourMediaEntry.xPercent,
        scale: settings.panelFourMediaEntry.scale,
        transformOrigin: settings.mediaTransformOrigin,
        force3D: true,
      });
      gsap.set([projectPanelTwoCaption, projectPanelFourCaption], {
        y: settings.captionEntry.y,
        opacity: settings.captionEntry.opacity,
        force3D: true,
      });
      gsap.set(projectsProgressFill, {
        scaleX: 0,
        transformOrigin: "left center",
      });
      projectsSection.style.setProperty("--projects-progress", "0");
      return settings;
    };

    const syncProjectsScrollDistance = () => {
      if (!useStickyProjectsScroll) {
        projectsSection.style.removeProperty("--projects-scroll-distance");
        return;
      }

      projectsSection.style.setProperty(
        "--projects-scroll-distance",
        `${getProjectsHorizontalDistance()}px`,
      );
    };

    const measureMaskLayout = () => {
      const baseFrameWidth = aboutFrame.clientWidth;
      const baseFrameHeight = aboutFrame.clientHeight;
      const wordRect = wordSlot.getBoundingClientRect();
      const wordWidthPx = wordRect.width || wordMeasure.offsetWidth || wordSlot.offsetWidth;
      const wordHeightPx = wordRect.height || wordSlot.offsetHeight || wordMeasure.offsetHeight;

      if (
        !baseFrameWidth ||
        !baseFrameHeight ||
        !wordWidthPx ||
        !wordHeightPx
      ) {
        return null;
      }

      const wordStyles = window.getComputedStyle(wordMeasure);
      const fontSizePx = Number.parseFloat(wordStyles.fontSize || "0");
      const outlineStrokeWidthPx =
        Number.parseFloat(wordStyles.webkitTextStrokeWidth || "0") ||
        Number.parseFloat(
          wordStyles.getPropertyValue("-webkit-text-stroke-width") || "0",
        ) ||
        1;

      return {
        baseFrameHeight,
        baseFrameWidth,
        fontFamily: wordStyles.fontFamily,
        fontSizePx,
        fontWeight: wordStyles.fontWeight,
        letterSpacing: wordStyles.letterSpacing,
        outlineStrokeWidthPx,
        verticalOffsetPx: fontSizePx * 0.1,
      };
    };

    const syncMaskLayout = (forceMeasure = false) => {
      if (forceMeasure || !maskLayoutMetrics) {
        maskLayoutMetrics = measureMaskLayout();
        lastMaskSignature = "";
      }

      const metrics = maskLayoutMetrics;

      if (!metrics) {
        return;
      }

      const frameRect = aboutFrame.getBoundingClientRect();
      const wordRect = wordSlot.getBoundingClientRect();

      if (!frameRect.width || !frameRect.height || !wordRect.width || !wordRect.height) {
        return;
      }

      const visibleWordOffsetTop = wordRect.top - frameRect.top;
      const visibleWordOffsetLeft = wordRect.left - frameRect.left;
      const centerX =
        ((visibleWordOffsetLeft + wordRect.width / 2) / frameRect.width) *
        100;
      const centerY =
        ((visibleWordOffsetTop +
          wordRect.height * 0.525 +
          metrics.verticalOffsetPx) /
          frameRect.height) *
        100;
      const zoomOriginX = gsap.utils.clamp(0, 100, centerX);
      const fontSize = (metrics.fontSizePx / frameRect.height) * 100;
      const textLength = (wordRect.width / frameRect.width) * 100;
      const outlineStrokeWidth =
        (metrics.outlineStrokeWidthPx / frameRect.height) * 100;
      const signature = [
        centerX,
        centerY,
        fontSize,
        textLength,
        outlineStrokeWidth,
      ]
        .map((value) => value.toFixed(4))
        .join("|");

      if (signature === lastMaskSignature) {
        return;
      }

      lastMaskSignature = signature;

      const syncWordGeometry = (textNode) => {
        textNode.setAttribute("x", centerX.toFixed(4));
        textNode.setAttribute("y", centerY.toFixed(4));
        textNode.setAttribute("font-size", fontSize.toFixed(4));
        textNode.setAttribute("textLength", textLength.toFixed(4));
        textNode.setAttribute("lengthAdjust", "spacingAndGlyphs");
        textNode.setAttribute("font-family", metrics.fontFamily);
        textNode.setAttribute("font-weight", metrics.fontWeight);
        textNode.setAttribute("letter-spacing", metrics.letterSpacing);
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
        measureCharacterField();
      });
    };

    const teardown = [];

    aboutFrameContent.scrollTop = 0;
    syncMaskLayout(true);
    measureCharacterField();
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
      gsap.set(patternOverlay, {
        autoAlpha: 1,
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
      syncMaskLayout(true);
      measureCharacterField();
      applySettledCharacterState();
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
        opacity: 0.52,
      });
      gsap.set(patternOverlay, {
        autoAlpha: 1,
      });
      gsap.set(patternProgressFill, {
        transformOrigin: "left center",
      });
      setPatternState();
      orderedCharacterNodes.forEach((node) => resetCharacterNode(node));
      syncProjectsScrollDistance();
      applyProjectBaseState();

      const timeline = gsap.timeline({
        defaults: {
          ease: "none",
        },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getPinnedScrollDistance()}`,
          scrub: runtimeProfile.touchDevice ? 0.72 : 1.1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            sectionTimelineTrigger = self;
            syncMaskLayout(true);
            measureCharacterField();
            updateCharacterSystem(self.progress);
            syncAfterglowState();
          },
          onUpdate: (self) => {
            sectionTimelineTrigger = self;
            updateCharacterSystem(self.progress);
            syncAfterglowState();
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

      updateCharacterSystem(0);
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
            scale: 1.02,
            yPercent: -1,
            duration: 0.56,
          },
          0.12,
        )
        .to(
          sceneMedia,
          {
            yPercent: sceneParallaxEndY,
            scale: sceneParallaxEndScale,
            duration: 0.72,
          },
          0.16,
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
            scale: 1.03,
            duration: 0.22,
          },
          characterRevealEnd - 0.05,
        )
        .to(
          aboutFrameContent,
          {
            scrollTop: () => getImpactScrollTarget(),
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
            duration: 0.34,
            ease: "power2.inOut",
          },
          zoomStart,
        )
        .to(
          scene,
          {
            scale: sceneFinalScale,
            yPercent: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          zoomStart + 0.02,
        )
        .to(
          sceneMedia,
          {
            scale: sceneFinalScale,
            yPercent: 0,
            duration: 0.36,
            ease: "power2.out",
          },
          zoomStart + 0.02,
        )
        .to(
          patternOverlay,
          {
            autoAlpha: 0,
            duration: 0.12,
            ease: "power2.out",
          },
          frameExitStart,
        )
        .set(
          aboutFrame,
          {
            opacity: 0,
          },
          frameExitStart + 0.02,
        );

      if (!useStickyProjectsScroll) {
        gsap.timeline({
          defaults: {
            ease: "none",
          },
          scrollTrigger: {
            trigger: projectsSection,
            start: "top top",
            end: useStickyProjectsScroll
              ? "bottom bottom"
              : () => `+=${getProjectsHorizontalDistance()}`,
            scrub: projectMotion.trackScrub,
            pin: !useStickyProjectsScroll,
            anticipatePin: useStickyProjectsScroll ? 0 : 1,
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
              xPercent: () => projectMotion.panelOneDrift.xPercent,
              yPercent: () => projectMotion.panelOneDrift.yPercent,
              duration: 1,
            },
            0,
          )
          .to(
            projectPanelTwoMedia,
            {
              xPercent: () => projectMotion.panelTwoMediaDrift.xPercent,
              scale: () => projectMotion.panelTwoMediaDrift.scale,
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
              xPercent: () => projectMotion.textDrift.xPercent,
              yPercent: () => projectMotion.textDrift.yPercent,
              duration: 1,
            },
            2,
          )
          .to(
            projectPanelThreeGhost,
            {
              xPercent: () => projectMotion.ghostDrift.xPercent,
              yPercent: () => projectMotion.ghostDrift.yPercent,
              opacity: () => projectMotion.ghostDrift.opacity,
              duration: 1,
            },
            2,
          )
          .to(
            projectPanelFourMedia,
            {
              xPercent: () => projectMotion.panelFourMediaDrift.xPercent,
              scale: () => projectMotion.panelFourMediaDrift.scale,
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
              xPercent: () => projectMotion.textDrift.xPercent,
              yPercent: () => projectMotion.textDrift.yPercent,
              duration: 1,
            },
            3,
          )
          .to(
            projectPanelFiveGhost,
            {
              xPercent: () => projectMotion.ghostDrift.xPercent,
              yPercent: () => projectMotion.ghostDrift.yPercent,
              opacity: () => projectMotion.ghostDrift.opacity,
              duration: 1,
            },
            3,
          );
      } else {
        gsap.timeline({
          defaults: {
            ease: "none",
          },
          scrollTrigger: {
            trigger: projectsSection,
            start: "top top",
            end: "bottom bottom",
            scrub: projectMotion.trackScrub,
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
              xPercent: () => projectMotion.panelOneDrift.xPercent,
              yPercent: () => projectMotion.panelOneDrift.yPercent,
              duration: 1,
            },
            0,
          )
          .to(
            projectPanelTwoMedia,
            {
              xPercent: () => projectMotion.panelTwoMediaDrift.xPercent,
              scale: () => projectMotion.panelTwoMediaDrift.scale,
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
              xPercent: () => projectMotion.textDrift.xPercent,
              yPercent: () => projectMotion.textDrift.yPercent,
              duration: 1,
            },
            2,
          )
          .to(
            projectPanelThreeGhost,
            {
              xPercent: () => projectMotion.ghostDrift.xPercent,
              yPercent: () => projectMotion.ghostDrift.yPercent,
              opacity: () => projectMotion.ghostDrift.opacity,
              duration: 1,
            },
            2,
          )
          .to(
            projectPanelFourMedia,
            {
              xPercent: () => projectMotion.panelFourMediaDrift.xPercent,
              scale: () => projectMotion.panelFourMediaDrift.scale,
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
              xPercent: () => projectMotion.textDrift.xPercent,
              yPercent: () => projectMotion.textDrift.yPercent,
              duration: 1,
            },
            3,
          )
          .to(
            projectPanelFiveGhost,
            {
              xPercent: () => projectMotion.ghostDrift.xPercent,
              yPercent: () => projectMotion.ghostDrift.yPercent,
              opacity: () => projectMotion.ghostDrift.opacity,
              duration: 1,
            },
            3,
          );
      }
    }, section);

    aboutFrameContent.addEventListener("scroll", requestMaskSync, {
      passive: true,
    });
    teardown.push(() =>
      aboutFrameContent.removeEventListener("scroll", requestMaskSync),
    );

    const handleResize = () => {
      refreshProjectMotionSettings();
      syncProjectsScrollDistance();
      syncMaskLayout(true);
      measureCharacterField();
      updateCharacterSystem(sectionTimelineTrigger?.progress ?? 0);
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    teardown.push(() => window.removeEventListener("resize", handleResize));

    if (typeof ResizeObserver === "function") {
      const resizeObserver = new ResizeObserver(() => {
        syncMaskLayout(true);
        measureCharacterField();
        updateCharacterSystem(sectionTimelineTrigger?.progress ?? 0);
      });
      resizeObserver.observe(aboutFrame);
      resizeObserver.observe(aboutFrameContent);
      resizeObserver.observe(wordSlot);
      teardown.push(() => resizeObserver.disconnect());
    }

    if (document.fonts?.ready) {
      const fontsReady = () => {
        syncMaskLayout(true);
        measureCharacterField();
        updateCharacterSystem(sectionTimelineTrigger?.progress ?? 0);
        ScrollTrigger.refresh();
      };

      document.fonts.ready.then(fontsReady).catch(() => {});
    }

    const handleRefreshInit = () => {
      syncProjectsScrollDistance();
      applyProjectBaseState();
      syncMaskLayout(true);
      measureCharacterField();
    };

    ScrollTrigger.addEventListener("refreshInit", handleRefreshInit);
    teardown.push(() => ScrollTrigger.removeEventListener("refreshInit", handleRefreshInit));
    teardown.push(() => window.cancelAnimationFrame(syncFrameId));

    return () => {
      setBrainAfterglow(0, 0);
      teardown.forEach((dispose) => dispose());
      ctx.revert();
    };
  }, []);

  return (
    <div
      className="page-shell"
      data-runtime-device={runtimeProfile.touchDevice ? "touch" : "desktop"}
      data-motion-mode={runtimeProfile.preferLiteMode ? "lite" : "full"}
      ref={pageShellRef}
    >
      {!runtimeProfile.disableHeavyRuntime ? (
        <>
          <div className="brain-transfer" aria-hidden="true">
            <div className="brain-stage" ref={brainMountRef} />
          </div>
          {runtimeProfile.renderNeuralBurst ? (
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
          ) : null}
        </>
      ) : null}

      <div className="smooth-wrapper" ref={smoothWrapperRef}>
        <main className="smooth-content" id="home" ref={smoothContentRef}>
          <section
            className="hero-scroll"
            data-decoder-ready="false"
            data-sequence-mode="poster"
            ref={heroSectionRef}
          >
            <div className="hero-pin">
              {!runtimeProfile.disableHeavyRuntime ? (
                <>
                  <canvas
                    aria-hidden="true"
                    className="hero-media hero-canvas"
                    ref={canvasRef}
                  />
                  <video
                    aria-hidden="true"
                    className="hero-media hero-sequence-video"
                    muted
                    playsInline
                    poster={heroPoster}
                    preload="auto"
                    ref={heroVideoRef}
                  >
                    <source src={heroVideo} type="video/mp4" />
                  </video>
                </>
              ) : null}
              <img
                alt="Full-screen hero artwork"
                className="hero-media hero-fallback"
                decoding="async"
                fetchpriority="high"
                loading="eager"
                src={heroPoster}
              />

              <div className="hero-overlay">
                <h1>
                  I build things6 that pretend to be intelligent&hellip;
                  <br />
                  and sometimes they accidentally are.
                </h1>
                

                

                

                {!runtimeProfile.disableHeavyRuntime ? (
                  <div className="scrub-status" aria-hidden="true">
                    <span>Scroll to move through the scene</span>
                    <div className="progress-track">
                      <span className="progress-fill" />
                    </div>
                  </div>
                ) : null}
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
                  <img
                    alt=""
                    decoding="async"
                    fetchpriority="low"
                    loading="lazy"
                    src={impactWideImage}
                  />
                </picture>
              </div>

              <div className="pattern-overlay" aria-hidden="true">
                <div className="pattern-field">
                  <div className="pattern-trace-layer">
                    {patternTraceItems.map((trace, index) => (
                      <span
                        className="pattern-trace"
                        key={`${trace.top}-${trace.left}-${index}`}
                        style={{
                          "--trace-left": trace.left,
                          "--trace-rotation": trace.rotation,
                          "--trace-top": trace.top,
                          "--trace-width": trace.width,
                        }}
                      />
                    ))}
                  </div>

                  <div className="pattern-node-layer">
                    {patternNodeItems.map((node, index) => (
                      <span
                        className="pattern-node"
                        key={`${node.top}-${node.left}-${index}`}
                        style={{
                          "--node-left": node.left,
                          "--node-size": node.size,
                          "--node-top": node.top,
                        }}
                      />
                    ))}
                  </div>

                  <div className="pattern-energy">
                    <span
                      className="pattern-energy-fill"
                      ref={patternProgressRef}
                    />
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
                        {/* The foreground panel is real geometry; the mask cuts Impact
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
                            Impact
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
                        Impact
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
                          className={`about-line about-line-${line.lineIndex + 1}`}
                          data-echo-text={line.ariaLabel}
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
                                      Impact
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
                              <img
                                alt=""
                                decoding="async"
                                loading="lazy"
                                src={image.source}
                              />
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
                      <div
                        className={`project-panel-media-inner${panel.video ? " project-panel-media-inner-video" : ""}`}
                        aria-hidden="true"
                      >
                        {panel.video ? (
                          <video
                            autoPlay={runtimeProfile.autoplayPanelVideos}
                            loop={runtimeProfile.autoplayPanelVideos}
                            muted
                            playsInline
                            poster={panel.poster ?? panel.image}
                            preload={
                              runtimeProfile.autoplayPanelVideos
                                ? "metadata"
                                : "none"
                            }
                          >
                            <source src={panel.video} type="video/mp4" />
                          </video>
                        ) : (
                          <picture>
                            {panel.mobileImage ? (
                              <source media="(max-width: 900px)" srcSet={panel.mobileImage} />
                            ) : null}
                            <img
                              alt=""
                              decoding="async"
                              fetchpriority="low"
                              loading="lazy"
                              src={panel.image}
                            />
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
