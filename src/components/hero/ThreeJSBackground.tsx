'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Color, Vector3, Group, Mesh } from 'three';
import { AdaptiveDpr, AdaptiveEvents, PerspectiveCamera, usePerformanceMonitor } from '@react-three/drei';
import React from 'react';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

interface ParticleData {
  position: Vector3;
  speed: number;
  scale: number;
}

// Pre-computed fixed positions to avoid hydration mismatch
const fixedPositions = [
  [-3, 2, -5], [5, -2, 1], [-1, -4, 3], [2, 4, -2], [4, 0, -4],
  [-4, -1, 2], [3, 3, 1], [-2, -3, -3], [1, 0, 4], [0, -5, -1],
  [-5, 1, 0], [2, -1, 5], [-3, -2, -4], [4, 2, 3], [0, 5, 2],
  [-2, 4, 0], [5, -3, -2], [-4, 0, 4], [1, -5, -3], [3, 1, 5],
  [-1, 3, -5], [2, -4, 0], [-5, -1, 3], [4, 5, -1], [0, -2, 4],
  [-3, 0, 1], [5, 2, -3], [-2, -5, 2], [3, -3, -4], [1, 4, 0]
];

const fixedScales = [
  0.2, 0.15, 0.25, 0.3, 0.18, 0.22, 0.35, 0.28, 0.17, 0.23,
  0.3, 0.19, 0.26, 0.21, 0.32, 0.24, 0.16, 0.27, 0.33, 0.2,
  0.29, 0.22, 0.31, 0.25, 0.18, 0.23, 0.34, 0.19, 0.27, 0.21
];

const fixedSpeeds = [
  0.007, 0.005, 0.009, 0.008, 0.006, 0.01, 0.004, 0.008, 0.006, 0.009,
  0.005, 0.007, 0.01, 0.006, 0.008, 0.004, 0.009, 0.007, 0.005, 0.008,
  0.006, 0.01, 0.007, 0.004, 0.009, 0.008, 0.005, 0.007, 0.01, 0.006
];

// Performance-optimized particle system with consistent positions
function SimplifiedParticles() {
  const groupRef = useRef<Group>(null);
  
  // Use pre-computed fixed positions to avoid hydration mismatch
  const particles = useMemo(() => {
    const temp: ParticleData[] = [];
    for (let i = 0; i < 30; i++) {
      const [x, y, z] = fixedPositions[i];
      const position = new Vector3(x, y, z);
      const speed = fixedSpeeds[i];
      const scale = fixedScales[i];
      temp.push({ position, speed, scale });
    }
    return temp;
  }, []);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const t = state.clock.getElapsedTime();
    
    groupRef.current.children.forEach((particle, i) => {
      if (i >= particles.length) return;
      
      // Simplified animation with less frequent calculations
      const { x, y, z } = particles[i].position;
      const speed = particles[i].speed;
      
      particle.position.x = x + Math.sin(t * speed * 5) * 2;
      particle.position.y = y + Math.sin(t * speed * 3) * 2;
      particle.position.z = z + Math.cos(t * speed * 4) * 2;
    });
  });
  
  return (
    <group ref={groupRef}>
      {particles.map((data, index) => (
        <mesh key={index} position={[data.position.x, data.position.y, data.position.z]} scale={data.scale}>
          <sphereGeometry args={[1, 8, 8]} /> {/* Reduced geometry segments */}
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

// Central sphere with optimized animation
function CentralSphere() {
  const meshRef = useRef<Mesh>(null);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    if (meshRef.current) {
      // Simplified animation with less frequent calculations
      meshRef.current.scale.set(
        1 + Math.sin(t * 0.5) * 0.1,
        1 + Math.sin(t * 0.5) * 0.1,
        1 + Math.sin(t * 0.5) * 0.1
      );
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 16, 16]} /> {/* Reduced geometry segments */}
      <meshPhongMaterial color="#3b82f6" emissive={new Color("#3b82f6").multiplyScalar(0.2)} />
    </mesh>
  );
}

// Performance monitor component to adapt quality based on performance
function PerformanceControl({ children }: { children: React.ReactNode }) {
  usePerformanceMonitor({
    onChange: ({ fps }) => {
      // Automatically reduce quality when FPS drops below thresholds
      if (fps < 40) {
        // You can modify scene parameters here for low performance
        console.log("Low performance detected, optimizing rendering");
      }
    }
  });
  
  return <>{children}</>;
}

export default function ThreeJSBackground() {
  // Use a simple state to track if we're rendering in the browser
  const [isMounted, setIsMounted] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  // Only run this effect in the browser
  React.useEffect(() => {
    try {
      setIsMounted(true);
    } catch (error) {
      console.error('Error initializing Three.js:', error);
      setHasError(true);
    }
  }, []);

  // If we have an error or we're on the server, render a simple placeholder
  if (!isMounted || hasError) {
    return (
      <div 
        style={{ 
          width: '100%', 
          height: '100%', 
          backgroundColor: '#0a0a0a',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.1) 70%, transparent 100%)',
            filter: 'blur(20px)',
          }}
        />
      </div>
    );
  }

  // Client-side rendering with full Three.js experience
  return (
    <React.Suspense fallback={
      <div style={{ width: '100%', height: '100%', backgroundColor: '#0a0a0a' }} />
    }>
      <ErrorBoundary>
        <Canvas 
          dpr={[1, 2]} // Limit DPR for performance
          gl={{ 
            antialias: false, // Disable antialiasing for performance
            powerPreference: 'high-performance',
            alpha: true,
            failIfMajorPerformanceCaveat: true, // Don't render if performance would be bad
          }}
          camera={{ position: [0, 0, 10], fov: 45 }}
          style={{ background: 'transparent' }}
          onCreated={({ gl }) => {
            // Check if WebGL is supported
            if (!gl.capabilities.isWebGL2) {
              console.warn('WebGL 2 not supported, falling back to WebGL 1');
            }
          }}
        >
          <PerformanceControl>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />
            <fog attach="fog" args={['#0a0a0a', 8, 15]} /> {/* Reduced fog density */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={0.5} />
            
            <SimplifiedParticles />
            <CentralSphere />
            
            {/* Performance optimization components */}
            <AdaptiveDpr pixelated />
            <AdaptiveEvents />
          </PerformanceControl>
        </Canvas>
      </ErrorBoundary>
    </React.Suspense>
  );
} 