'use client';

import React, { useRef, useCallback, useState, useEffect } from 'react';

// ─── Physics constants ────────────────────────────────────────────────────────
const SPRING_K = 0;
const DAMPING  = 0.9;
const GRAVITY  = 3000;
const MASS     = 1;

interface CardPhysicsState {
  angle: number;
  vel:   number;
}

// ─── SVG Thick Lanyard ────────────────────────────────────────────────────────
const Lanyard = ({ length, color }: { length: number; color: string }) => (
  <svg
    width="30"
    height={length}
    viewBox={`0 0 30 ${length}`}
    style={{ display: 'block', margin: '0 auto', overflow: 'visible' }}
  >
    {/* Anchor ring */}
    <circle cx="15" cy="0" r="5" fill={color} />
    {/* Left ribbon */}
    <path d={`M 13 0 L 10 ${length}`} stroke={color} strokeWidth="6" opacity="0.9" />
    {/* Right ribbon */}
    <path d={`M 17 0 L 20 ${length}`} stroke={color} strokeWidth="6" opacity="0.9" />
    {/* Metal clip */}
    <rect x="10" y={length - 6} width="10" height="8" rx="2" fill="#94a3b8" />
    <circle cx="15" cy={length + 2} r="3" fill="#e2e8f0" />
  </svg>
);

// ─── Main Component ────────────────────────────────────────────────────────────
export const HangingIdCard = () => {
  const physRef      = useRef<CardPhysicsState>({ angle: 0, vel: 0 });
  const rafRef       = useRef<number | null>(null);
  const prevTimeRef  = useRef<number | null>(null);
  const prevAngleRef = useRef<number>(0);
  const isDraggingRef = useRef(false);

  const [angle, setAngle] = useState(0);
  const [, setIsDragState] = useState(false);
  const dragStartX  = useRef(0);
  const dragAngle0  = useRef(0);

  const ropeLength  = 110;
  const ropeColor   = '#4338ca'; // indigo rope matching cyberpunk theme
  const accentColor = '#4F46E5';

  // ── Physics loop ─────────────────────────────────────────────────────────────
  const tick = useCallback((now: number) => {
    if (prevTimeRef.current === null) prevTimeRef.current = now;
    const dt = Math.min((now - prevTimeRef.current) / 1000, 0.05);
    prevTimeRef.current = now;

    const s = physRef.current;
    if (!isDraggingRef.current) {
      const L = ropeLength + 100;
      const torque =
        -(GRAVITY / L) * Math.sin(s.angle) -
        (DAMPING / MASS) * s.vel -
        (SPRING_K / MASS) * s.angle;

      s.vel   += torque * dt;
      s.angle += s.vel  * dt;
      setAngle(s.angle);

      if (Math.abs(s.angle) > 0.001 || Math.abs(s.vel) > 0.001) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        s.angle = 0; s.vel = 0;
        setAngle(0);
      }
    } else {
      if (dt > 0) s.vel = (s.angle - prevAngleRef.current) / dt;
      prevAngleRef.current = s.angle;
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [ropeLength]);

  const startPhysics = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    prevTimeRef.current = null;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  // ── Pointer events ────────────────────────────────────────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    isDraggingRef.current = true;
    setIsDragState(true);
    dragStartX.current   = e.clientX;
    dragAngle0.current   = physRef.current.angle;
    prevAngleRef.current = physRef.current.angle;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    prevTimeRef.current = null;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartX.current;
    const L = ropeLength + 100;
    const newAngle = dragAngle0.current - dx / L;
    const clamped  = Math.max(-1.4, Math.min(1.4, newAngle));
    physRef.current.angle = clamped;
    setAngle(clamped);
  }, [ropeLength]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    isDraggingRef.current = false;
    setIsDragState(false);
    startPhysics();
  }, [startPhysics]);

  const onCardClick = useCallback(() => {
    if (Math.abs(physRef.current.vel) < 0.1 && Math.abs(physRef.current.angle) < 0.05) {
      physRef.current.vel = 4.0;
      startPhysics();
    }
  }, [startPhysics]);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  const cardRotateDeg = angle * (180 / Math.PI);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        userSelect: 'none',
        touchAction: 'none',
        paddingTop: '8px',
      }}
    >
      {/* Ceiling anchor with glow */}
      <div
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: accentColor,
          boxShadow: `0 0 12px ${accentColor}, 0 0 24px ${accentColor}80`,
          position: 'relative',
          zIndex: 10,
        }}
      />

      {/* Pendulum Assembly */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'grab',
          transform: `rotate(${cardRotateDeg}deg)`,
          transformOrigin: 'top center',
          willChange: 'transform',
          marginTop: '-6px',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={onCardClick}
      >
        {/* Lanyard */}
        <div style={{ pointerEvents: 'none' }}>
          <Lanyard length={ropeLength} color={ropeColor} />
        </div>

        {/* ── ID Card ── */}
        <div
          style={{
            position: 'relative',
            width: '208px',
            borderRadius: '16px',
            overflow: 'hidden',
            border: `1px solid rgba(79, 70, 229, 0.4)`,
            boxShadow: `0 0 30px rgba(79, 70, 229, 0.25), 0 0 60px rgba(99, 102, 241, 0.1), 0 25px 50px rgba(0,0,0,0.6)`,
            pointerEvents: 'none',
            marginTop: '-2px',
          }}
        >
          {/* ── Top blue section ── */}
          <div
            style={{
              padding: '16px 16px 18px',
              background: 'linear-gradient(135deg, #3730a3 0%, #4F46E5 50%, #7C3AED 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              position: 'relative',
            }}
          >
            {/* Scanline overlay for cyberpunk feel */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
                pointerEvents: 'none',
              }}
            />
            <p
              style={{
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.25em',
                color: 'rgba(255,255,255,0.75)',
                textTransform: 'uppercase',
                fontFamily: 'monospace',
                position: 'relative',
              }}
            >
              LICET
            </p>

            {/* Avatar */}
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '2px solid rgba(255,255,255,0.3)',
                boxShadow: '0 0 20px rgba(99,102,241,0.5), inset 0 0 10px rgba(0,0,0,0.3)',
                position: 'relative',
              }}
            >
              <img
                src="/profile2.png"
                alt="Joshua A"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
          </div>

          {/* ── Bottom dark section ── */}
          <div
            style={{
              background: '#09090f',
              padding: '16px 16px 18px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {/* Name */}
            <p
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#ffffff',
                textAlign: 'center',
                letterSpacing: '0.02em',
                fontFamily: 'Syne, sans-serif',
              }}
            >
              Joshua A
            </p>

            {/* Role */}
            <p
              style={{
                fontSize: '10px',
                color: '#a5b4fc',
                fontFamily: 'monospace',
                letterSpacing: '0.05em',
                textAlign: 'center',
              }}
            >
              Computer Science Engineering
            </p>

            {/* Divider with glow */}
            <div
              style={{
                width: '100%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(79,70,229,0.6), transparent)',
                margin: '2px 0',
              }}
            />

            {/* Stats */}
            <div
              style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
              }}
            >
              {/* CGPA */}
              <div
                style={{
                  background: 'rgba(79,70,229,0.1)',
                  border: '1px solid rgba(79,70,229,0.25)',
                  borderRadius: '8px',
                  padding: '8px 6px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '8px', color: '#6366f1', fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '3px' }}>
                  CGPA
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#c7d2fe', fontFamily: 'Syne, sans-serif' }}>
                  8.9
                </div>
              </div>
              {/* Location */}
              <div
                style={{
                  background: 'rgba(124,58,237,0.1)',
                  border: '1px solid rgba(124,58,237,0.25)',
                  borderRadius: '8px',
                  padding: '8px 6px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '8px', color: '#8b5cf6', fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '3px' }}>
                  LOCATION
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#ddd6fe', fontFamily: 'Syne, sans-serif' }}>
                  Chennai
                </div>
              </div>
            </div>

            {/* Barcode mock */}
            <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '24px', marginTop: '4px' }}>
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    background: i % 5 === 0 ? '#6366f1' : '#3730a3',
                    borderRadius: '1px',
                    width: i % 3 === 0 ? '3px' : '1.5px',
                    height: `${50 + Math.sin(i * 1.3) * 35}%`,
                    opacity: 0.8,
                  }}
                />
              ))}
            </div>

            {/* Active badge */}
            <div
              style={{
                marginTop: '2px',
                padding: '3px 14px',
                borderRadius: '999px',
                background: 'linear-gradient(90deg, #4338ca, #7c3aed)',
                fontSize: '9px',
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontFamily: 'monospace',
                boxShadow: '0 0 10px rgba(99,102,241,0.5)',
              }}
            >
              ACTIVE
            </div>
          </div>
        </div>
      </div>

      {/* Hint text */}
      <p
        style={{
          marginTop: '20px',
          fontSize: '10px',
          color: 'rgba(99,102,241,0.4)',
          fontFamily: 'monospace',
          letterSpacing: '0.1em',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        drag or click
      </p>
    </div>
  );
};

export default HangingIdCard;
