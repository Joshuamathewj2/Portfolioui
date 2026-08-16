import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Html,
  Plane,
  Sphere,
} from "@react-three/drei";
import type { GalleryItem } from "./Systems";

/* =========================
   Types
   ========================= */

interface StellarCardGalleryProps {
  items: GalleryItem[];
  onProjectSelect: (item: GalleryItem) => void;
}

/* =========================
   Starfield Background (inlined)
   ========================= */

function StarfieldBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      2000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);
    container.appendChild(renderer.domElement);

    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 8000;
    const positions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    }
    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.7,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    camera.position.z = 10;

    let animationId = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      stars.rotation.y += 0.0001;
      stars.rotation.x += 0.00005;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute top-0 left-0 w-full h-full z-0"
      style={{ background: "#000" }}
    />
  );
}

/* =========================
   Floating Card (inlined)
   ========================= */

function FloatingCard({
  item,
  position,
  onSelect,
}: {
  item: GalleryItem;
  position: {
    x: number;
    y: number;
    z: number;
  };
  onSelect: (item: GalleryItem) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Billboard: always face the camera
  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position);
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    onSelect(item);
  };
  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  };
  const handlePointerOut = (e: any) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = "auto";
  };

  // Determine glow color from the item
  const glowColor = item.glow || "rgba(79, 70, 229, 0.5)";

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      <Plane
        args={[4.5, 6]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Plane>

      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.01]}
        style={{
          transition: "all 0.3s ease",
          transform: hovered ? "scale(1.15)" : "scale(1)",
          pointerEvents: "none",
        }}
      >
        <div
          className="w-44 rounded-lg overflow-hidden shadow-2xl select-none"
          style={{
            background: "#0D0D12",
            padding: "10px",
            boxShadow: hovered
              ? `0 25px 50px ${glowColor}, 0 0 30px ${glowColor}`
              : "0 15px 30px rgba(0, 0, 0, 0.6)",
            border: hovered
              ? `2px solid ${glowColor}`
              : "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          {/* Thumbnail */}
          <div
            className="w-full rounded-md overflow-hidden"
            style={{ aspectRatio: "16 / 10" }}
          >
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover"
              loading="lazy"
              draggable={false}
            />
          </div>

          {/* Category Tag */}
          <div className="mt-2 mb-1">
            <span
              className="text-[7px] font-mono tracking-widest uppercase font-bold"
              style={{ color: "#38BDF8" }}
            >
              {item.category}
            </span>
          </div>

          {/* Title */}
          <p className="text-white text-[10px] font-semibold leading-tight line-clamp-2 font-mono">
            {item.title}
          </p>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {item.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[6px] font-mono px-1.5 py-0.5 rounded"
                  style={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.6)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

/* =========================
   Card Galaxy (inlined)
   ========================= */

function CardGalaxy({
  items,
  onProjectSelect,
}: {
  items: GalleryItem[];
  onProjectSelect: (item: GalleryItem) => void;
}) {
  const cardPositions = useMemo(() => {
    const positions: {
      x: number;
      y: number;
      z: number;
    }[] = [];
    const numCards = items.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < numCards; i++) {
      const y = 1 - (i / (numCards - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = (2 * Math.PI * i) / goldenRatio;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      const layerRadius = 12 + (i % 3) * 4;

      positions.push({
        x: x * layerRadius,
        y: y * layerRadius,
        z: z * layerRadius,
      });
    }
    return positions;
  }, [items.length]);

  return (
    <>
      {/* Wireframe orbital guides */}
      <Sphere args={[2, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#1a1a2e"
          transparent
          opacity={0.15}
          wireframe
        />
      </Sphere>
      <Sphere args={[12, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#4F46E5"
          transparent
          opacity={0.05}
          wireframe
        />
      </Sphere>
      <Sphere args={[16, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#4F46E5"
          transparent
          opacity={0.03}
          wireframe
        />
      </Sphere>
      <Sphere args={[20, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#38BDF8"
          transparent
          opacity={0.02}
          wireframe
        />
      </Sphere>

      {/* Project cards floating in space */}
      {items.map((item, i) => (
        <FloatingCard
          key={item.title + i}
          item={item}
          position={cardPositions[i]}
          onSelect={onProjectSelect}
        />
      ))}
    </>
  );
}

/* =========================
   Main Exported Component
   ========================= */

export default function StellarCardGallery({
  items,
  onProjectSelect,
}: StellarCardGalleryProps) {
  return (
    <div
      className="w-full relative overflow-hidden rounded-2xl"
      style={{
        height: "700px",
        minHeight: "500px",
        background: "#000",
        border: "1px solid rgba(39, 39, 42, 0.5)",
      }}
    >
      {/* Deep-space starfield background */}
      <StarfieldBackground />

      {/* R3F Canvas with floating project cards */}
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        className="absolute inset-0 z-10"
        onCreated={({ gl }) => {
          gl.domElement.style.pointerEvents = "auto";
        }}
      >
        <Suspense fallback={null}>
          <Environment preset="night" />
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.6} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />
          <CardGalaxy items={items} onProjectSelect={onProjectSelect} />
          <OrbitControls
            enablePan
            enableZoom
            enableRotate
            minDistance={5}
            maxDistance={40}
            autoRotate
            autoRotateSpeed={0.4}
            rotateSpeed={0.5}
            zoomSpeed={1.2}
            panSpeed={0.8}
            target={[0, 0, 0]}
          />
        </Suspense>
      </Canvas>

      {/* Overlay instruction hint */}
      <div className="absolute bottom-4 left-0 right-0 z-20 text-center pointer-events-none">
        <span className="font-mono text-[9px] text-[#71717A]/60 tracking-[0.3em] uppercase">
          Drag to orbit · Scroll to zoom · Click cards to inspect telemetry
        </span>
      </div>
    </div>
  );
}
