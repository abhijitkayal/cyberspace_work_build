"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import Antigravity from './Antigravity';
import { useRouter } from "next/navigation";
/* ═══════════════════════════════════════════════════════
   ANTIGRAVITY BACKGROUND
═══════════════════════════════════════════════════════ */

function AntigravityBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let raf: number;

    const COUNT = 260;
    const MAGNET_R = 95;
    const RING_R = 70;

    const particles = Array.from(
      { length: COUNT },
      () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,

        ox: Math.random() * window.innerWidth,
        oy: Math.random() * window.innerHeight,

        t: Math.random() * 100,
        speed: 0.004 + Math.random() * 0.006,

        rOff: (Math.random() - 0.5) * 16,
        len: 3 + Math.random() * 5,

        alpha: 0.2 + Math.random() * 0.5,
      })
    );

    let vx = window.innerWidth / 2;
    let vy = window.innerHeight / 2;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();

    window.addEventListener("resize", resize);

    function tick(ts: number) {
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      const t = ts * 0.001;

      vx +=
        (W / 2 + Math.sin(t * 0.5) * W * 0.22 - vx) *
        0.05;

      vy +=
        (H / 2 + Math.cos(t * 0.9) * H * 0.17 - vy) *
        0.05;

      particles.forEach((p) => {
        p.t += p.speed;

        const dx = p.ox - vx;
        const dy = p.oy - vy;

        const dist = Math.sqrt(dx * dx + dy * dy);

        let tx = p.ox;
        let ty = p.oy;

        if (dist < MAGNET_R) {
          const a = Math.atan2(dy, dx);

          const r =
            RING_R +
            Math.sin(p.t * 0.8 + a) * 4 +
            p.rOff;

          tx = vx + r * Math.cos(a);
          ty = vy + r * Math.sin(a);
        }

        p.x += (tx - p.x) * 0.08;
        p.y += (ty - p.y) * 0.08;

        const scale = Math.max(
          0,
          1 -
            Math.abs(
              Math.sqrt(
                (p.x - vx) ** 2 + (p.y - vy) ** 2
              ) - RING_R
            ) /
              18
        );

        const alpha =
          p.alpha *
          (0.3 + scale * 0.7) *
          (0.75 + Math.sin(p.t * 2.5) * 0.25);

        const a2 = Math.atan2(
          ty - p.y + 0.001,
          tx - p.x + 0.001
        );

        ctx.save();

        ctx.translate(p.x, p.y);

        ctx.rotate(a2 + Math.PI / 2);

        ctx.globalAlpha = alpha;

        const grd = ctx.createLinearGradient(
          0,
          -p.len,
          0,
          p.len
        );

        grd.addColorStop(
          0,
          "rgba(6,182,212,0)"
        );

        grd.addColorStop(
          0.5,
          "rgba(6,182,212,1)"
        );

        grd.addColorStop(
          1,
          "rgba(6,182,212,0)"
        );

        ctx.fillStyle = grd;

        ctx.beginPath();

        ctx.ellipse(
          0,
          0,
          1.2 * (0.6 + scale * 0.4),
          p.len * (0.5 + scale * 0.5),
          0,
          0,
          Math.PI * 2
        );

        ctx.fill();

        ctx.restore();
      });

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);

      window.removeEventListener(
        "resize",
        resize
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

/* ═══════════════════════════════════════════════════════
   CUTOUT HELPERS
═══════════════════════════════════════════════════════ */

const CUT = 32;

function cutPath(cut = CUT) {
  return `polygon(
    ${cut}px 0%,
    100% 0%,
    100% calc(100% - ${cut}px),
    calc(100% - ${cut}px) 100%,
    0% 100%,
    0% ${cut}px
  )`;
}

function innerCutPath(
  cut: number,
  inset = 1.5
) {
  const c = cut - inset;

  return `polygon(
    ${c}px 0%,
    100% 0%,
    100% calc(100% - ${c}px),
    calc(100% - ${c}px) 100%,
    0% 100%,
    0% ${c}px
  )`;
}

/* ═══════════════════════════════════════════════════════
   CORNER MARK
═══════════════════════════════════════════════════════ */

function CornerMark({
  cut,
  accent,
}: {
  cut: number;
  accent: string;
}) {
  const len = cut * 0.85;

  return (
    <>
      <svg
        className="absolute top-0 left-0 z-10 pointer-events-none"
        width={cut + len}
        height={cut + len}
        fill="none"
      >
        <line
          x1={cut}
          y1={0}
          x2={0}
          y2={cut}
          stroke={accent}
          strokeWidth="1.2"
        />

        <line
          x1={cut}
          y1={0}
          x2={cut + len}
          y2={0}
          stroke={accent}
          strokeWidth="1.2"
        />

        <line
          x1={0}
          y1={cut}
          x2={0}
          y2={cut + len}
          stroke={accent}
          strokeWidth="1.2"
        />
      </svg>

      <svg
        className="absolute bottom-0 right-0 z-10 pointer-events-none"
        width={cut + len}
        height={cut + len}
        fill="none"
      >
        <line
          x1={len}
          y1={cut + len}
          x2={cut + len}
          y2={len}
          stroke={accent}
          strokeWidth="1.2"
        />

        <line
          x1={0}
          y1={cut + len}
          x2={len}
          y2={cut + len}
          stroke={accent}
          strokeWidth="1.2"
        />

        <line
          x1={cut + len}
          y1={0}
          x2={cut + len}
          y2={len}
          stroke={accent}
          strokeWidth="1.2"
        />
      </svg>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   CUTOUT CARD
═══════════════════════════════════════════════════════ */

interface CardProps {
  label: string;
  title: string;
  description: string;
  tag?: string;
  accent?: string;
  cut?: number;
  duration?: string;
}

function CutoutCard({
  label,
  title,
  description,
  tag,
  accent = "#e8ff47",
  cut = CUT,
  duration = "3s",
}: CardProps) {
  const cardRef =
    useRef<HTMLDivElement>(null);

  const [mouse, setMouse] = useState({
    x: 50,
    y: 50,
    inside: false,
  });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const r =
        cardRef.current?.getBoundingClientRect();

      if (!r) return;

      setMouse({
        x:
          ((e.clientX - r.left) / r.width) * 100,
        y:
          ((e.clientY - r.top) / r.height) *
          100,
        inside: true,
      });
    },
    []
  );

  const onLeave = useCallback(() => {
    setMouse((m) => ({
      ...m,
      inside: false,
    }));
  }, []);
 const router = useRouter();
  return (
    // <div style={{ width: '100%', height: '400px', position: 'relative' }}>
   
    
 
// </div>
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative h-full transition-all duration-300"
      style={{
        transform: mouse.inside
          ? "translateY(-5px) scale(1.015)"
          : "none",
      }}
    >

      <div
        className="relative h-full p-[1.5px]"
        style={{
          clipPath: cutPath(cut),
        }}
      >
        {/* Rotating Border */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: cutPath(cut),
          }}
        >
          <div
            className="absolute inset-[-100%]"
            style={{
              animation: `spin ${duration} linear infinite`,
              background: `conic-gradient(
                from 0deg,
                transparent 0deg,
                transparent 295deg,
                ${accent}00 308deg,
                ${accent}cc 338deg,
                ${accent}ff 352deg,
                #fff 358deg,
                transparent 360deg
              )`,
            }}
          />
        </div>

        {/* Inner Card */}
        <div
          className="relative z-10 h-full overflow-hidden bg-[#0a0a0a]"
          style={{
            clipPath: innerCutPath(cut, 1.5),
          }}
        >
          {/* Spotlight */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: mouse.inside ? 1 : 0,
              background: `radial-gradient(
                circle 180px at ${mouse.x}% ${mouse.y}%,
                ${accent}28 0%,
                transparent 70%
              )`,
            }}
          />

          <div className="relative z-20 flex h-full flex-col gap-4 p-7">
            <CornerMark
              cut={cut}
              accent={accent}
            />

            <div className="flex items-start justify-between">
              <span
                className="border px-2 py-1 text-[9px] uppercase tracking-[0.2em]"
                style={{
                  color: accent,
                  borderColor: `${accent}35`,
                  background: `${accent}18`,
                }}
              >
                {label}
              </span>

              {tag && (
                <span className="text-[9px] uppercase tracking-[0.15em] text-white/30">
                  {tag}
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col gap-3">
              <h3 className="text-xl font-semibold text-white">
                {title}
              </h3>

              <p className="text-sm leading-7 text-white/50">
                {description}
              </p>
            </div>

            <button
              className="mt-auto flex items-center justify-center gap-2 border px-4 py-3 text-[10px] uppercase tracking-[0.2em] transition-all duration-300"
              style={{
                borderColor: mouse.inside
                  ? accent
                  : "rgba(255,255,255,.12)",

                color: mouse.inside
                  ? accent
                  : "rgba(255,255,255,.4)",

                background: mouse.inside
                  ? `${accent}18`
                  : "transparent",
              }}
              onClick={() => router.push("/software-dashboard")}
            >
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */

export default function SoftwareShowcase() {
  const router = useRouter();
  return (
    <div id="products" className="relative min-h-screen overflow-hidden bg-black">
      {/* Background */}


      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 py-20">
        <div className="absolute inset-0 z-0">
  <Antigravity
    count={300}
    magnetRadius={2.5}
    ringRadius={3}
    waveSpeed={0.4}
    waveAmplitude={1}
    particleSize={1.5}
    lerpSpeed={0.05}
    color="#06B6D4"
    autoAnimate
    particleVariance={1}
    rotationSpeed={0}
    depthFactor={1}
    pulseSpeed={3}
    particleShape="capsule"
    fieldStrength={10}
  />
</div>
        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-cyan-400/60">
            Software Suite
          </p>

          <h2 className="text-3xl sm:text-5xl font-semibold text-cyan-400 tracking-tight"
            style={{ fontFamily: "'Syne','DM Sans',sans-serif" }}>
            Our Products
          </h2>

          <p className="mt-4 text-sm text-white/40">
            Powerful software solutions for every business
          </p>
        </div>

        {/* Grid */}
        <div className="grid w-full gap-6 md:grid-cols-2 xl:grid-cols-4 mb-5">
          {/* <CutoutCard
            label="RMS"
            title="CyberDine"
            description="Powerful double-entry accounting with GST filing and bank reconciliation."
            tag="v5.3"
            accent="#047857"
          /> */}

          <CutoutCard
            label="PMS"
            title="CyberProjects"
            description="Payroll, attendance, leave and employee management platform."
            tag="v2.4"
            accent="#0f766e"
          />

          <CutoutCard
            label="GST & Billing"
            title="CyberInvoice"
            description="Barcode billing, GST invoicing and inventory management."
            tag="v4.0"
            accent="#0e7490"
          />

          <CutoutCard
            label="Tally"
            title="CyberLedger"
            description="Hospital ERP with billing, EMR and pharmacy integration."
            tag="v2.0"
            accent="#0369a1"
          />
          <CutoutCard
            label="HRMS"
            title="CyberPayroll"
            description="Hospital ERP with billing, EMR and pharmacy integration."
            tag="v2.0"
            accent="#1d4ed8"
          />
        </div>
         <div className="grid w-full gap-6 md:grid-cols-2 xl:grid-cols-4 mb-5">
          {/* <CutoutCard
            label="RMS"
            title="CyberDine"
            description="Powerful double-entry accounting with GST filing and bank reconciliation."
            tag="v5.3"
            accent="#2dd4bf"
          /> */}

          <CutoutCard
            label="SMS"
            title="CyberRetail"
            description="Payroll, attendance, leave and employee management platform."
            tag="v2.4"
            accent="#4338ca"
          />

          <CutoutCard
            label="CMS"
            title="CyberClinic"
            description="Barcode billing, GST invoicing and inventory management."
            tag="v4.0"
            accent="#6d28d9"
          />

          <CutoutCard
            label="PMS"
            title="CyberPharma"
            description="Hospital ERP with billing, EMR and pharmacy integration."
            tag="v2.0"
            accent="#7e22ce"
          />
          <CutoutCard
            label="Resturant"
            title="CyberDine"
            description="Hospital ERP with billing, EMR and pharmacy integration."
            tag="v2.0"
            accent="#38bdf8"
          />
        </div>
        {/* <div className="grid w-full gap-6 md:grid-cols-2 xl:grid-cols-4">
          <CutoutCard
            label="RMS"
            title="CyberDine"
            description="Powerful double-entry accounting with GST filing and bank reconciliation."
            tag="v5.3"
            accent="#2dd4bf"
          />

          <CutoutCard
            label="HRMS"
            title="PeopleCore"
            description="Payroll, attendance, leave and employee management platform."
            tag="v2.4"
            accent="#34d8d8"
          />

          <CutoutCard
            label="Store Management"
            title="StoreSync"
            description="Barcode billing, GST invoicing and inventory management."
            tag="v4.0"
            accent="#ffb830"
          />

          <CutoutCard
            label="Hospital"
            title="CareAxis"
            description="Hospital ERP with billing, EMR and pharmacy integration."
            tag="v2.0"
            accent="#38bdf8"
          />
        </div> */}
      </div>

      {/* Animation */}
      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}