import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface AntigravityProps {
  count?: number;
  magnetRadius?: number;
  ringRadius?: number;
  waveSpeed?: number;
  waveAmplitude?: number;
  particleSize?: number;
  lerpSpeed?: number;
  color?: string;
  glowColor?: string;
  autoAnimate?: boolean;
  particleVariance?: number;
  rotationSpeed?: number;
  depthFactor?: number;
  pulseSpeed?: number;
  particleShape?: 'capsule' | 'sphere' | 'box' | 'tetrahedron';
  fieldStrength?: number;
}

// ─── Utility ──────────────────────────────────────────────────────────────────
function easeOutQuad(t: number) {
  return 1 - (1 - t) * (1 - t);
}

// ─── Inner Scene ──────────────────────────────────────────────────────────────
const AntigravityInner: React.FC<AntigravityProps> = ({
  count        = 480,
  magnetRadius = 999,   // attract everything on screen
  ringRadius   = 24,    // world-unit ring radius
  waveSpeed    = 0.28,
  waveAmplitude = 1.6,
  particleSize = 3.2,
  lerpSpeed    = 0.048,
  color        = '#00bcd4',
  glowColor    = '#00bcd4',
  autoAnimate  = true,
  particleVariance = 1,
  rotationSpeed    = 0.14,
  depthFactor      = 0.55,
  pulseSpeed       = 2.2,
  particleShape    = 'capsule',
  fieldStrength    = 10,
}) => {
  const meshRef   = useRef<THREE.InstancedMesh>(null);
  const glowRef   = useRef<THREE.InstancedMesh>(null);   // second, larger, translucent pass
  const { viewport, gl, size } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const lastMouseMoveTime = useRef(0);
  const lastMousePos      = useRef({ x: 0, y: 0 });
  const virtualMouse      = useRef({ x: 0, y: 0 });
  const mouseRef          = useRef({ x: 0, y: 0, active: false });

  // ── Mouse tracking ─────────────────────────────────────────────────────────
  React.useEffect(() => {
    const canvas = gl?.domElement;
    const onMove = (e: MouseEvent) => {
      if (canvas) {
        const r = canvas.getBoundingClientRect();
        mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top, active: true };
      } else {
        mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
      }
    };
    const onLeave = () => { mouseRef.current.active = false; };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [gl]);

  // ── Particle init ──────────────────────────────────────────────────────────
 const particles = useMemo(() => {
  // Increase overall spread area
  const vw = (viewport.width || 30) * 2.4;
  const vh = (viewport.height || 20) * 2.4;

  const arr = [];

  for (let i = 0; i < count; i++) {
    // Wider initial distribution
    const x = (Math.random() - 0.5) * vw;
    const y = (Math.random() - 0.5) * vh;
    const z = (Math.random() - 0.5) * 20;

    // Better angular spacing
    const angleStep = (Math.PI * 2) / count;

    // Add controlled randomness while preserving spacing
    const homeAngle =
      i * angleStep +
      (Math.random() - 0.5) * 0.15;

    /**
     * Increase radius spread
     * Creates multiple orbit bands with spacing
     */
    const band = Math.floor(i % 6);

    const bandSpacing = 4.5;

    const homeRadius =
      ringRadius +
      band * bandSpacing +
      Math.random() * 2.5;

    // Individual motion offsets
    const phaseOffset = Math.random() * Math.PI * 2;

    const speed =
      0.0025 + Math.random() / 400;

    arr.push({
      t: Math.random() * 100,
      speed,
      homeAngle,
      homeRadius,
      phaseOffset,

      mx: x,
      my: y,
      mz: z,

      cx: x,
      cy: y,
      cz: z,
    });
  }

  return arr;
}, [count, viewport.width, viewport.height, ringRadius]);

  // ── Frame loop ─────────────────────────────────────────────────────────────
  useFrame(state => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const { viewport: v } = state;

    // NDC mouse
    const nx = mouseRef.current.active
      ? (mouseRef.current.x / size.width)  *  2 - 1
      : state.pointer.x;
    const ny = mouseRef.current.active
      ? -(mouseRef.current.y / size.height) * 2 + 1
      : state.pointer.y;

    const moved = Math.hypot(nx - lastMousePos.current.x, ny - lastMousePos.current.y);
    if (moved > 0.001) {
      lastMouseMoveTime.current = Date.now();
      lastMousePos.current      = { x: nx, y: ny };
    }

    let destX = (nx * v.width)  / 2;
    let destY = (ny * v.height) / 2;

    // Idle auto-animation: smooth figure-8
    if (autoAnimate && Date.now() - lastMouseMoveTime.current > 1800) {
      const et = state.clock.getElapsedTime();
      destX = Math.sin(et * 0.38) * (v.width  / 3.8);
      destY = Math.cos(et * 0.65) * (v.height / 3.8);
    }

    // Smoothly follow mouse
    virtualMouse.current.x += (destX - virtualMouse.current.x) * 0.05;
    virtualMouse.current.y += (destY - virtualMouse.current.y) * 0.05;

    const tx = virtualMouse.current.x;
    const ty = virtualMouse.current.y;

    const et = state.clock.getElapsedTime();
    const globalSpin = et * rotationSpeed;

    particles.forEach((p, i) => {
      p.t += p.speed / 2;
      const t = p.t;

      // Depth parallax
      const projFactor  = 1 - p.cz / 65;
      const ptx = tx * projFactor;
      const pty = ty * projFactor;

      // Spinning home angle (global rotation)
      const angle = p.homeAngle + globalSpin;

      // Wave ripple on radius — makes ring undulate
      const wave    = Math.sin(t * waveSpeed + angle * 2 + p.phaseOffset) * waveAmplitude * 0.6;
      const radJitter = Math.sin(t * 0.4 + p.phaseOffset * 2) * 1.2;   // slow breathing

      const r = p.homeRadius + wave + radJitter;

      // Target: orbit position around virtual cursor
      const tgtX = ptx + r * Math.cos(angle);
      const tgtY = pty + r * Math.sin(angle);
      const tgtZ = p.mz * depthFactor + Math.sin(t * 0.7 + p.phaseOffset) * waveAmplitude * depthFactor * 0.4;

      // Lerp with inertia
      p.cx += (tgtX - p.cx) * lerpSpeed;
      p.cy += (tgtY - p.cy) * lerpSpeed;
      p.cz += (tgtZ - p.cz) * lerpSpeed;

      dummy.position.set(p.cx, p.cy, p.cz);

      // Orient capsule radially: long axis points from cursor outward
      dummy.lookAt(ptx, pty, p.cz);
      dummy.rotateX(Math.PI / 2);

      // ── Scale: peaks at ringRadius, falls off sharply inside and gently outside ──
      const dist = Math.hypot(p.cx - ptx, p.cy - pty);
      const norm = dist / ringRadius;   // 1.0 = exactly on ring

      let scaleFactor: number;
      if (norm < 0.5) {
        // Very close to center: nearly invisible (void area)
        scaleFactor = norm * 0.3;
      } else if (norm < 1.0) {
        // Approaching ring: ramp up with ease
        scaleFactor = easeOutQuad((norm - 0.5) / 0.5) * 0.95 + 0.05;
      } else {
        // Beyond ring: taper off — use p.radialNorm so outer particles remain tiny
        const overshoot = (norm - 1.0) / 1.8;
        scaleFactor = Math.max(0.02, 1.0 - easeOutQuad(Math.min(1, overshoot)));
      }

      // Pulse alive
      const pulse = 0.78 + Math.sin(t * pulseSpeed + p.phaseOffset) * 0.22 * particleVariance;
      const finalS = scaleFactor * pulse * particleSize;

      // Capsule: narrow width, tall height — matches video proportions
      dummy.scale.set(finalS * 0.48, finalS, finalS * 0.48);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      // Glow pass (bigger, softer)
      if (glowRef.current) {
        const gs = finalS * 1.55;
        dummy.scale.set(gs * 0.48, gs, gs * 0.48);
        dummy.updateMatrix();
        glowRef.current.setMatrixAt(i, dummy.matrix);
      }
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (glowRef.current) glowRef.current.instanceMatrix.needsUpdate = true;
  });

  const geo = (
    <>
      {particleShape === 'capsule'     && <capsuleGeometry args={[0.1, 0.62, 4, 8]} />}
      {particleShape === 'sphere'      && <sphereGeometry args={[0.22, 16, 16]} />}
      {particleShape === 'box'         && <boxGeometry args={[0.28, 0.28, 0.28]} />}
      {particleShape === 'tetrahedron' && <tetrahedronGeometry args={[0.28]} />}
    </>
  );

  return (
    <>
      {/* ── Glow halo layer (rendered first, behind) ── */}
      <instancedMesh ref={glowRef} args={[undefined, undefined, count]} renderOrder={0}>
        {particleShape === 'capsule'     && <capsuleGeometry args={[0.1, 0.62, 4, 8]} />}
        {particleShape === 'sphere'      && <sphereGeometry args={[0.22, 16, 16]} />}
        {particleShape === 'box'         && <boxGeometry args={[0.28, 0.28, 0.28]} />}
        {particleShape === 'tetrahedron' && <tetrahedronGeometry args={[0.28]} />}
        <meshBasicMaterial color={glowColor} transparent opacity={0.18} depthWrite={false} />
      </instancedMesh>

      {/* ── Core particle layer ── */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]} renderOrder={1}>
        {geo}
        <meshBasicMaterial color={color} />
      </instancedMesh>
    </>
  );
};

// ─── Bloom post-processing wrapper (optional) ─────────────────────────────────
// We simulate bloom by rendering two passes: a glow layer (larger, translucent)
// and the sharp core layer. No extra packages needed.

// ─── Root ────────────────────────────────────────────────────────────────────
const Antigravity: React.FC<AntigravityProps> = (props) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 50], fov: 35 }}
      style={{ background: 'radial-gradient(ellipse at 50% 50%, #0f0a1e 0%, #07060f 60%, #030207 100%)' }}
      gl={{ antialias: true, alpha: false }}
    >
      <AntigravityInner {...props} />
    </Canvas>
  );
};

export default Antigravity;