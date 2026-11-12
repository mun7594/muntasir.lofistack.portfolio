// Static CSS mini-mockups shown as card thumbnails — one vignette per component.
// Pure presentational markup, safe to render on the server.

const PIXELS = [
  // Google "G" ring approximation
  { x: 26, y: 10, c: "#EA4335", r: 0 },
  { x: 42, y: 6, c: "#EA4335", r: 15 },
  { x: 57, y: 12, c: "#EA4335", r: -10 },
  { x: 12, y: 24, c: "#FBBC05", r: 20 },
  { x: 8, y: 42, c: "#FBBC05", r: 0 },
  { x: 14, y: 58, c: "#34A853", r: -15 },
  { x: 30, y: 68, c: "#34A853", r: 10 },
  { x: 48, y: 66, c: "#34A853", r: 0 },
  { x: 62, y: 54, c: "#4285F4", r: 12 },
  { x: 46, y: 40, c: "#4285F4", r: 0 },
  { x: 60, y: 40, c: "#4285F4", r: 0 },
  // scattered pixels not yet assembled
  { x: 74, y: 6, c: "#EA4335", r: 45 },
  { x: 0, y: 70, c: "#FBBC05", r: 30 },
  { x: 76, y: 72, c: "#34A853", r: -30 },
];

export default function ComponentThumbnail({ slug }: { slug: string }) {
  switch (slug) {
    case "before-after-slider":
      return (
        <div className="relative w-full h-full bg-gradient-to-r from-stone-400 via-stone-300 to-sky-300 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-800/40" />
          <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white -translate-x-1/2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 text-xs font-bold">
            ‹ ›
          </div>
          <span className="absolute bottom-3 left-3 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">
            Before
          </span>
          <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">
            After
          </span>
        </div>
      );

    case "submit-form-button":
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <span className="px-6 py-3 bg-black text-white rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg">
            Submit Form <span aria-hidden="true">→</span>
          </span>
        </div>
      );

    case "star-rating":
      return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="flex gap-1 text-3xl leading-none">
            <span className="text-yellow-400">★</span>
            <span className="text-yellow-400">★</span>
            <span className="text-yellow-400">★</span>
            <span className="text-yellow-400 scale-110">★</span>
            <span className="text-gray-300">★</span>
          </div>
          <span className="text-xs text-gray-500 font-medium">4 · Very Good</span>
        </div>
      );

    case "progress-indicator":
      return (
        <div className="w-full h-full flex flex-col justify-center gap-3 px-10 bg-white">
          {[
            ["w-4/5", "from-blue-500 to-blue-600", "80%"],
            ["w-3/5", "from-green-500 to-green-600", "60%"],
            ["w-1/3", "from-red-500 to-red-600", "33%"],
          ].map(([w, g, pct]) => (
            <div key={pct}>
              <div className="flex justify-between text-[9px] text-gray-500 font-semibold mb-0.5">
                <span>Progress</span>
                <span>{pct}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full rounded-full bg-gradient-to-r ${g} ${w}`} />
              </div>
            </div>
          ))}
        </div>
      );

    case "prompt-bar":
      return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="w-full flex items-center gap-2 bg-white border border-gray-200 rounded-full pl-4 pr-1.5 py-1.5 shadow-sm">
            <span className="text-gray-400 text-xs flex-1 text-left">
              Ask anything…
            </span>
            <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px]">
              ➤
            </span>
          </div>
          <div className="flex gap-1.5">
            {["⚡ Write code", "⚡ Explain", "⚡ Plan"].map((s) => (
              <span
                key={s}
                className="text-[9px] text-gray-600 bg-white border border-gray-200 rounded-md px-2 py-1"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      );

    case "infinite-marquee":
      return (
        <div className="w-full h-full flex flex-col justify-center gap-2 bg-gray-100 overflow-hidden">
          <div className="bg-gray-900 text-white text-[11px] font-bold py-2 whitespace-nowrap -rotate-1">
            LOFISTACK • COMPONENTS • LOFISTACK • COMPONENTS • LOFISTACK •
          </div>
          <div className="bg-indigo-500 text-white text-[11px] font-bold py-2 whitespace-nowrap rotate-1 text-right">
            ← SCROLLING TEXT ← SCROLLING TEXT ← SCROLLING TEXT ← SCROLLING
          </div>
        </div>
      );

    case "image-reveal-card":
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <div className="relative w-28 h-36 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-600 to-gray-900">
            <span className="absolute top-2 left-2 bg-white/90 text-gray-900 text-[8px] font-semibold px-1.5 py-0.5 rounded-full">
              After
            </span>
            <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/90 to-transparent">
              <p className="text-white text-[10px] font-bold">Roof Project</p>
              <div className="flex gap-1 mt-1">
                <span className="bg-white text-gray-900 text-[7px] font-semibold px-1.5 py-0.5 rounded-full">
                  View
                </span>
                <span className="bg-white text-gray-900 text-[7px] font-semibold px-1.5 py-0.5 rounded-full">
                  Quote
                </span>
              </div>
            </div>
          </div>
        </div>
      );

    case "pixel-shatter-logo":
      return (
        <div className="w-full h-full flex items-center justify-center bg-white">
          <div className="relative w-20 h-20">
            {PIXELS.map((p, i) => (
              <span
                key={i}
                className="absolute w-2.5 h-2.5 rounded-[2px]"
                style={{
                  left: p.x,
                  top: p.y,
                  backgroundColor: p.c,
                  transform: `rotate(${p.r}deg)`,
                }}
              />
            ))}
          </div>
        </div>
      );

    case "text-scramble":
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-950">
          <span className="font-mono font-bold text-lg text-emerald-400">
            TEXT_5CR4M8L<span className="text-emerald-600">≠</span>
            <span className="animate-pulse text-emerald-300">▍</span>
          </span>
        </div>
      );

    case "liquid-morph":
      return (
        <div className="w-full h-full flex items-center justify-center bg-white">
          <div className="relative">
            <span className="absolute inset-0 text-4xl font-black text-gray-900 blur-[3px] opacity-40 -translate-x-2">
              MELT
            </span>
            <span className="relative text-4xl font-black text-gray-900">
              MORPH
            </span>
            <span className="absolute -right-5 -top-2 text-lg">💧</span>
          </div>
        </div>
      );

    case "spotlight-reveal":
      return (
        <div className="relative w-full h-full bg-gray-950 flex items-center justify-center overflow-hidden">
          <div
            className="absolute w-32 h-32 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,240,180,0.22), transparent 70%)",
            }}
          />
          <span className="relative text-white font-black tracking-[0.3em] text-sm">
            SECRET
          </span>
          <span className="absolute bottom-3 left-3 text-xs">🔦</span>
        </div>
      );

    case "magnetic-elements":
      return (
        <div className="relative w-full h-full flex items-center justify-center bg-gray-100">
          <span className="px-5 py-2.5 bg-gray-900 text-white rounded-full text-sm font-semibold -rotate-6 -translate-x-1 shadow-lg">
            🧲 Pull me
          </span>
          <svg
            className="absolute top-10 right-14 w-5 h-5 text-gray-800"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="white"
            strokeWidth="1.5"
          >
            <path d="M5 3l14 9-6 1 3 6-3 1.5-3-6L5 19V3z" />
          </svg>
        </div>
      );

    case "magnifying-lens":
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-sky-100 to-indigo-200 overflow-hidden">
          <div className="absolute inset-0 flex flex-col justify-center gap-1.5 px-8">
            {[48, 64, 40, 56, 44].map((w, i) => (
              <div
                key={i}
                className="h-1 bg-gray-400/60 rounded"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-[3px] border-white bg-white shadow-xl flex flex-col justify-center gap-1.5 px-2.5 overflow-hidden">
            <div className="h-1.5 bg-gray-500 rounded w-full" />
            <div className="h-1.5 bg-gray-500 rounded w-3/4" />
          </div>
          <span className="absolute bottom-2 right-3 text-base">🔍</span>
        </div>
      );

    case "crumpled-paper":
      return (
        <div className="relative w-full h-full flex items-center justify-center bg-amber-50">
          <div className="relative w-16 h-16">
            {[
              [18, 6, 20],
              [34, 14, -30],
              [8, 24, 45],
              [26, 28, -10],
              [40, 30, 25],
              [16, 42, -25],
              [32, 44, 15],
            ].map(([x, y, r], i) => (
              <span
                key={i}
                className={`absolute w-5 h-5 rounded-sm shadow-sm ${
                  i % 2 === 0 ? "bg-amber-100" : "bg-white"
                } border border-amber-200/80`}
                style={{ left: x, top: y, transform: `rotate(${r}deg)` }}
              />
            ))}
          </div>
          <div className="absolute bottom-10 w-14 h-2 bg-black/15 rounded-full blur-sm" />
          <span className="absolute bottom-3 right-3 text-base">📄</span>
        </div>
      );

    case "gooey-image-transition":
      return (
        <div className="relative w-full h-full flex items-center justify-center bg-pink-50 overflow-hidden">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500" />
            <div className="w-8 h-5 -mx-2 bg-gradient-to-r from-pink-500 to-blue-500 blur-[3px] rounded-full" />
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400" />
          </div>
          <span className="absolute bottom-2 right-3 text-base">🫠</span>
        </div>
      );

    case "horizontal-scroll-gallery":
      return (
        <div className="w-full h-full flex flex-col justify-center gap-2.5 bg-gray-50 overflow-hidden pl-5">
          <div className="flex gap-2 -mr-8">
            <div className="flex-shrink-0 w-16 h-20 rounded-lg bg-gradient-to-br from-orange-400 to-pink-500 shadow" />
            <div className="flex-shrink-0 w-16 h-20 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 shadow" />
            <div className="flex-shrink-0 w-16 h-20 rounded-lg bg-gradient-to-br from-purple-500 to-emerald-400 shadow" />
            <div className="flex-shrink-0 w-16 h-20 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 shadow" />
          </div>
          <div className="w-20 h-1 bg-gray-200 rounded-full overflow-hidden ml-6">
            <div className="w-1/2 h-full bg-gray-900 rounded-full" />
          </div>
          <span className="text-[9px] text-gray-400 ml-6">↓ scroll → moves</span>
        </div>
      );

    default:
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <svg
            className="w-12 h-12 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      );
  }
}
