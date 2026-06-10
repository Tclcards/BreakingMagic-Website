/*
  Code-built brand marks for the header and footer, matching the brand guide:
  BREAKING in silver, MAGIC in royal purple, split by a small jagged gold slash.
  Built in code (not an image) so they stay crisp at any size and add zero weight.
*/

function RipSlash({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 14 40"
      aria-hidden="true"
      className={className}
      style={{ filter: "drop-shadow(0 0 4px rgba(244, 194, 82, 0.8))" }}
    >
      <path
        d="M8.5 0 L5 7 L9 13 L4.5 20 L9.5 26 L5.5 33 L8 40 L6 33 L10.5 26 L5.5 20 L10 13 L6 7 L9.5 0 Z"
        fill="#f4c252"
      />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-display font-extrabold uppercase tracking-tight ${className}`}
    >
      <span className="text-silver">Breaking</span>
      <RipSlash className="h-[1.1em] w-auto" />
      <span className="text-purple">Magic</span>
    </span>
  );
}

export function MarkBM({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 font-display font-extrabold uppercase ${className}`}
      aria-hidden="true"
    >
      <span className="text-silver">B</span>
      <RipSlash className="h-[1.1em] w-auto" />
      <span className="text-purple">M</span>
    </span>
  );
}
