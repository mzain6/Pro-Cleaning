import { useId } from "react";

/* A small flat illustration of a living room, drawn twice: once tidy and once
   grimy (the same drawing, then dulled and speckled). BeforeAfter stacks them. */

function rng(seed) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Fixed seed so the speckles are identical on every render.
const SPECKS = (() => {
  const r = rng(11);
  return Array.from({ length: 70 }, () => ({
    x: Math.round(r() * 400),
    y: Math.round(r() * 500),
    r: +(0.8 + r() * 2.4).toFixed(1),
    o: +(0.2 + r() * 0.3).toFixed(2),
  }));
})();

const STAR = "M32 8C33.5 22 42 30.5 56 32C42 33.5 33.5 42 32 56C30.5 42 22 33.5 8 32C22 30.5 30.5 22 32 8Z";
function Spark({ x, y, size, fill = "#fff" }) {
  const k = size / 48;
  return <path d={STAR} transform={`translate(${x - 32 * k} ${y - 32 * k}) scale(${k})`} fill={fill} />;
}

export default function RoomScene({ variant = "clean" }) {
  const uid = useId().replace(/:/g, "");
  const dirty = variant === "dirty";

  return (
    <svg
      className={`scene scene--${variant}`}
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`sky${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff8e2" />
          <stop offset="1" stopColor="#fbe3a0" />
        </linearGradient>
        <clipPath id={`glass${uid}`}>
          <path d="M120 284V160a80 80 0 0 1 160 0v124z" />
        </clipPath>
      </defs>

      {/* wall */}
      <rect width="400" height="500" fill="#f5ddd2" />

      {/* arched window */}
      <path d="M108 292V160a92 92 0 0 1 184 0v132z" fill="#3b1947" />
      <g clipPath={`url(#glass${uid})`}>
        <rect x="110" y="60" width="180" height="240" fill={`url(#sky${uid})`} />
        <circle cx="236" cy="138" r="26" fill="#f4b52f" />
        <ellipse cx="164" cy="198" rx="30" ry="9" fill="#fff" opacity=".85" />
        <ellipse cx="184" cy="191" rx="20" ry="9" fill="#fff" opacity=".85" />
      </g>
      <path d="M200 78V286M120 200H280" stroke="#3b1947" strokeWidth="5" />
      <rect x="98" y="288" width="204" height="12" rx="3" fill="#3b1947" />

      {/* floor */}
      <rect y="366" width="400" height="8" fill="#fffaf0" />
      <rect y="374" width="400" height="126" fill="#ecd9c0" />

      {/* area rug */}
      <path d="M80 408H320L354 478H46Z" fill="#3b1947" />
      <path d="M92 416H308L336 470H64Z" fill="#f5ddd2" />
      <path
        d="M84.7 430H315.3M77.5 444H322.5M70.2 458H329.8"
        stroke="#f4b52f"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* sofa */}
      <rect x="78" y="298" width="244" height="68" rx="24" fill="#4f2260" />
      <rect x="52" y="326" width="44" height="58" rx="18" fill="#5a2870" />
      <rect x="304" y="326" width="44" height="58" rx="18" fill="#5a2870" />
      <rect x="84" y="336" width="232" height="42" rx="14" fill="#672f7b" />
      <rect x="90" y="322" width="108" height="40" rx="12" fill="#7a3a8f" />
      <rect x="202" y="322" width="108" height="40" rx="12" fill="#7a3a8f" />
      <rect x="112" y="304" width="40" height="40" rx="10" fill="#f4b52f" transform="rotate(-8 132 324)" />
      <rect x="252" y="306" width="38" height="38" rx="10" fill="#f5ddd2" transform="rotate(7 271 325)" />
      <rect x="64" y="384" width="8" height="10" rx="2" fill="#2a1232" />
      <rect x="328" y="384" width="8" height="10" rx="2" fill="#2a1232" />

      {/* floor lamp */}
      <rect x="24" y="288" width="4" height="98" fill="#3b1947" />
      <path d="M10 288L46 288L38 258L18 258Z" fill="#f4b52f" />
      <ellipse cx="26" cy="388" rx="14" ry="4" fill="#2a1232" />

      {/* plant */}
      <ellipse cx="366" cy="334" rx="8" ry="30" fill="#4d7b5d" />
      <ellipse cx="354" cy="342" rx="7" ry="24" transform="rotate(-28 354 342)" fill="#5f8f6e" />
      <ellipse cx="380" cy="342" rx="7" ry="24" transform="rotate(28 380 342)" fill="#437050" />
      <path d="M354 362H382L378 392H358Z" fill="#3b1947" />

      {!dirty && (
        <g>
          <path d="M0 380L120 380L40 500L0 500Z" fill="#fff" opacity=".18" />
          <Spark x={146} y={128} size={15} />
          <Spark x={262} y={96} size={11} />
          <Spark x={300} y={316} size={16} />
          <Spark x={62} y={440} size={12} />
          <Spark x={338} y={452} size={10} fill="#f4b52f" />
        </g>
      )}

      {dirty && (
        <g>
          {/* dulls the colours in the drawing itself; a CSS filter on this layer would be repainted */}
          <rect width="400" height="500" fill="#8b7a68" opacity=".4" />
          <rect width="400" height="500" fill="#6e5a46" opacity=".3" />
          <path d="M120 284V160a80 80 0 0 1 160 0v124z" fill="#85735e" opacity=".55" />
          <path
            d="M138 110c10 36 4 80 12 150M176 100c6 30 2 70 8 120M226 200c4 22 0 46 8 74"
            stroke="#efe4d0"
            strokeWidth="3"
            strokeLinecap="round"
            opacity=".28"
            fill="none"
          />
          <ellipse cx="206" cy="446" rx="26" ry="7" fill="#4a2f1b" opacity=".5" />
          <ellipse cx="128" cy="452" rx="9" ry="3" fill="#4a2f1b" opacity=".35" />
          {SPECKS.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#4a3a2c" opacity={s.o} />
          ))}
        </g>
      )}
    </svg>
  );
}
