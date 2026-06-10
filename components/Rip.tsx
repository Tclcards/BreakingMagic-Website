/*
  The signature brand element: a jagged gold rip of light.
  Recreated from the brand guide (the prior landing-page SVG was not in the repo).
  Brand rule: the rip is always gold, glowing, and jagged — never a straight line.

  Geometry is generated once at module load with a seeded random generator so the
  server and browser always render the identical path (no hydration mismatch).
*/

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

const LENGTH = 1200;
const BREADTH = 120;
const SEGMENTS = 40;

const rand = mulberry32(2026);

type RipPoint = { along: number; center: number; width: number };

const points: RipPoint[] = [];
{
  let center = BREADTH / 2;
  for (let i = 0; i <= SEGMENTS; i++) {
    const along = (LENGTH / SEGMENTS) * i;
    center = clamp(center + (rand() - 0.5) * 30, 34, 86);
    const width = 16 + rand() * 18;
    points.push({ along, center, width });
  }
}

function buildPaths(horizontal: boolean) {
  const xy = (a: number, b: number) =>
    horizontal ? `${a.toFixed(1)} ${b.toFixed(1)}` : `${b.toFixed(1)} ${a.toFixed(1)}`;

  const edgeA = points.map((p) => xy(p.along, p.center - p.width / 2));
  const edgeB = [...points]
    .reverse()
    .map((p) => xy(p.along, p.center + p.width / 2));
  const polygon = `M ${edgeA[0]} L ${[...edgeA.slice(1), ...edgeB].join(" L ")} Z`;
  const crack = `M ${points.map((p) => xy(p.along, p.center)).join(" L ")}`;
  return { polygon, crack };
}

const vertical = buildPaths(false);
const horizontal = buildPaths(true);

type RipProps = {
  orientation?: "vertical" | "horizontal";
  className?: string;
};

export default function Rip({ orientation = "vertical", className }: RipProps) {
  const isH = orientation === "horizontal";
  const { polygon, crack } = isH ? horizontal : vertical;
  const gradientId = isH ? "rip-gold-h" : "rip-gold-v";
  const glowId = isH ? "rip-glow-h" : "rip-glow-v";

  return (
    <svg
      viewBox={isH ? `0 0 ${LENGTH} ${BREADTH}` : `0 0 ${BREADTH} ${LENGTH}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2={isH ? "0" : "1"}
          y2={isH ? "1" : "0"}
        >
          <stop offset="0" stopColor="#f4c252" />
          <stop offset="0.5" stopColor="#ffe0a0" />
          <stop offset="1" stopColor="#f4c252" />
        </linearGradient>
        <filter
          id={glowId}
          x={isH ? "-5%" : "-150%"}
          y={isH ? "-150%" : "-5%"}
          width={isH ? "110%" : "400%"}
          height={isH ? "400%" : "110%"}
        >
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      {/* soft gold glow behind the tear */}
      <path d={polygon} fill="#f4c252" opacity="0.5" filter={`url(#${glowId})`} />
      {/* the tear itself */}
      <path d={polygon} fill={`url(#${gradientId})`} />
      {/* hairline crack down the middle */}
      <path
        d={crack}
        fill="none"
        stroke="rgba(255, 252, 240, 0.65)"
        strokeWidth="1.4"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/*
  RipDivider: the rip reused as a quiet horizontal section divider.
*/
export function RipDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-8 w-full overflow-hidden md:h-10 ${className}`}>
      <Rip orientation="horizontal" className="h-full w-full" />
    </div>
  );
}
