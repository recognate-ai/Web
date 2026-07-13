"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Cylinder, Torus, OrbitControls, Float, Environment, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

function GlassBulb() {
  return (
    <group position={[0, 1, 0]}>
      {/* Bulb Top */}
      <Sphere args={[1.5, 32, 32]} position={[0, 0.5, 0]}>
        <meshPhysicalMaterial 
          roughness={0.1} 
          metalness={0.2}
          color="#cffafe"
          emissive="#06b6d4"
          emissiveIntensity={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent={true}
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </Sphere>
      {/* Bulb Neck (Tapered) */}
      <Cylinder args={[1.5, 0.8, 1.2, 32]} position={[0, -0.6, 0]}>
        <meshPhysicalMaterial 
          roughness={0.1} 
          metalness={0.2}
          color="#cffafe"
          emissive="#06b6d4"
          emissiveIntensity={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent={true}
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </Cylinder>
    </group>
  );
}

function ElectricitySparks() {
  const sparkRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const currentT = t % 10;

    sparkRefs.current.forEach((spark, i) => {
      if (spark) {
        if (currentT >= 2 && currentT < 4) {
          const progress = (currentT - 2) / 2; // 0 to 1
          spark.visible = true;
          // Shoot sparks up the neck
          // Different offsets and speeds based on index
          const speed = 1 + (i * 0.5);
          const yPos = -0.5 + ((progress * speed) % 1) * 2; // move from -0.5 to 1.5
          
          // Random jitter for X and Z to look like chaotic electricity
          const jitterX = Math.sin(t * 50 + i) * 0.1;
          const jitterZ = Math.cos(t * 60 + i) * 0.1;
          
          spark.position.set(jitterX, yPos, jitterZ);
          
          // Flicker
          const mat = spark.material as THREE.MeshStandardMaterial;
          mat.emissiveIntensity = Math.random() > 0.2 ? 5 : 0;
        } else {
          spark.visible = false;
        }
      }
    });
  });

  return (
    <group>
      {[...Array(5)].map((_, i) => (
        <Cylinder 
          key={i}
          ref={(el) => { sparkRefs.current[i] = el; }} 
          args={[0.01, 0.03, 0.4, 8]} 
        >
          <meshStandardMaterial color="#fef08a" emissive="#fde047" emissiveIntensity={5} />
        </Cylinder>
      ))}
    </group>
  );
}

function GlowingCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const glowOuterRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // 10-second animation cycle
    const cycleTime = 10;
    const currentT = t % cycleTime;
    
    let intenseGlow = 0;
    let rotationSpeed = 0;
    let pulseScale = 0;

    if (currentT < 2) {
      // OFF State
      intenseGlow = 0.1;
      rotationSpeed = 0.1;
      pulseScale = 0;
    } else if (currentT < 4) {
      // POWERING UP State (Electricity flowing)
      const progress = (currentT - 2) / 2;
      const flicker = (Math.sin(currentT * 40) + Math.sin(currentT * 15)) > 0 ? 1 : 0.2;
      intenseGlow = 0.1 + (progress * 4 * flicker);
      rotationSpeed = 0.1 + (progress * 0.4);
      pulseScale = progress * 0.1;
    } else {
      // LIT State (Yellow Glow)
      const pulse = Math.pow(Math.sin(t * 1.5), 2);
      intenseGlow = 3 + (pulse * 2.5); // Brighter yellow glow
      rotationSpeed = 0.5;
      pulseScale = 0.1 + (pulse * 0.15);
    }
    
    if (coreRef.current) {
      coreRef.current.rotation.y += rotationSpeed * 0.05;
      coreRef.current.rotation.x += rotationSpeed * 0.03;
      const scale = 1 + pulseScale;
      coreRef.current.scale.set(scale, scale, scale);
      
      const material = coreRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = intenseGlow;
    }

    if (innerCoreRef.current) {
      const material = innerCoreRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = intenseGlow * 0.8;
    }
    
    if (glowRef.current) {
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = Math.min(intenseGlow * 0.15, 0.6);
    }
    if (glowOuterRef.current) {
      (glowOuterRef.current.material as THREE.MeshBasicMaterial).opacity = Math.min(intenseGlow * 0.05, 0.2);
    }

    if (lightRef.current) {
      lightRef.current.intensity = intenseGlow * 2; // Boost yellow light
    }
  });

  return (
    <group position={[0, 1.5, 0]}>
      {/* Wireframe outer core */}
      <Icosahedron ref={coreRef} args={[0.6, 0]}>
        <meshStandardMaterial 
          color="#facc15" 
          emissive="#fde047" 
          emissiveIntensity={2} 
          wireframe={true} 
        />
      </Icosahedron>
      {/* Inner solid core */}
      <Sphere ref={innerCoreRef} args={[0.3, 32, 32]}>
        <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={1} />
      </Sphere>
      
      {/* Volumetric Neon Glow Layers */}
      <Sphere ref={glowRef} args={[0.45, 32, 32]}>
        <meshBasicMaterial color="#fde047" transparent={true} opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
      </Sphere>
      <Sphere ref={glowOuterRef} args={[0.7, 32, 32]}>
        <meshBasicMaterial color="#facc15" transparent={true} opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} />
      </Sphere>

      {/* Point light casting bright yellow light */}
      <pointLight ref={lightRef} color="#fef08a" intensity={2} distance={10} decay={1.5} />
    </group>
  );
}

function AtomRings() {
  const electron1Ref = useRef<THREE.Group>(null);
  const electron2Ref = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  
  const rot1 = useRef(0);
  const rot2 = useRef(0);
  const gyroRot1 = useRef(0);
  const gyroRot2 = useRef(0);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const currentT = t % 10;
    
    let speedMult = 0;
    let intenseGlow = 0;

    if (currentT < 2) {
      speedMult = 0.1;
      intenseGlow = 0.1;
    } else if (currentT < 4) {
      const progress = (currentT - 2) / 2;
      const flicker = (Math.sin(currentT * 40) + Math.sin(currentT * 15)) > 0 ? 1 : 0.2;
      speedMult = 0.1 + (progress * 1.4);
      intenseGlow = 0.1 + (progress * 1.4 * flicker);
    } else {
      speedMult = 1.5;
      intenseGlow = 2;
    }

    rot1.current += delta * speedMult;
    rot2.current -= delta * (speedMult * 0.8);
    
    // Slower gyroscopic rotation for the rings themselves
    gyroRot1.current += delta * (speedMult * 0.3);
    gyroRot2.current -= delta * (speedMult * 0.4);

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = gyroRot1.current;
      ring1Ref.current.rotation.y = gyroRot1.current * 0.5;
    }
    
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = gyroRot2.current;
      ring2Ref.current.rotation.z = gyroRot2.current * 0.5;
    }

    if (electron1Ref.current) {
      electron1Ref.current.rotation.y = rot1.current;
      const sphere = electron1Ref.current.children[0] as THREE.Mesh;
      const glow = electron1Ref.current.children[1] as THREE.Mesh;
      if (sphere) (sphere.material as THREE.MeshStandardMaterial).emissiveIntensity = intenseGlow;
      if (glow) (glow.material as THREE.MeshBasicMaterial).opacity = Math.min(intenseGlow * 0.15, 0.6);
    }
    
    if (electron2Ref.current) {
      electron2Ref.current.rotation.x = rot2.current;
      const sphere = electron2Ref.current.children[0] as THREE.Mesh;
      const glow = electron2Ref.current.children[1] as THREE.Mesh;
      if (sphere) (sphere.material as THREE.MeshStandardMaterial).emissiveIntensity = intenseGlow;
      if (glow) (glow.material as THREE.MeshBasicMaterial).opacity = Math.min(intenseGlow * 0.15, 0.6);
    }
  });

  return (
    <group position={[0, 1.5, 0]}>
      {/* Ring 1 */}
      <group ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <Torus args={[2, 0.05, 16, 100]}>
          <meshStandardMaterial color="#22d3ee" metalness={0.8} roughness={0.2} emissive="#06b6d4" emissiveIntensity={0.5} />
        </Torus>
        <group ref={electron1Ref}>
          <Sphere args={[0.15, 16, 16]} position={[2, 0, 0]}>
            <meshStandardMaterial color="#cffafe" emissive="#22d3ee" emissiveIntensity={0.1} />
          </Sphere>
          {/* Neon Glow */}
          <Sphere args={[0.3, 16, 16]} position={[2, 0, 0]}>
            <meshBasicMaterial color="#06b6d4" transparent={true} opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
          </Sphere>
        </group>
      </group>

      {/* Ring 2 */}
      <group ref={ring2Ref} rotation={[0, 0, Math.PI / 4]}>
        <Torus args={[2, 0.05, 16, 100]}>
          <meshStandardMaterial color="#c084fc" metalness={0.8} roughness={0.2} emissive="#a855f7" emissiveIntensity={0.5} />
        </Torus>
        <group ref={electron2Ref}>
          <Sphere args={[0.15, 16, 16]} position={[0, 2, 0]}>
            <meshStandardMaterial color="#f3e8ff" emissive="#c084fc" emissiveIntensity={0.1} />
          </Sphere>
          {/* Neon Glow */}
          <Sphere args={[0.3, 16, 16]} position={[0, 2, 0]}>
            <meshBasicMaterial color="#a855f7" transparent={true} opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
          </Sphere>
        </group>
      </group>
    </group>
  );
}

function BulbBase() {
  return (
    <group position={[0, -0.2, 0]}>
      {/* Socket Threads */}
      <Cylinder args={[0.8, 0.8, 0.2, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#fbbf24" metalness={0.6} roughness={0.3} />
      </Cylinder>
      <Cylinder args={[0.75, 0.75, 0.2, 32]} position={[0, -0.25, 0]}>
        <meshStandardMaterial color="#f59e0b" metalness={0.6} roughness={0.3} />
      </Cylinder>
      <Cylinder args={[0.7, 0.7, 0.2, 32]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#d97706" metalness={0.6} roughness={0.3} />
      </Cylinder>
      <Cylinder args={[0.6, 0.6, 0.3, 32]} position={[0, -0.75, 0]}>
        <meshStandardMaterial color="#b45309" metalness={0.8} roughness={0.4} />
      </Cylinder>
      {/* Bottom Tip */}
      <Sphere args={[0.3, 32, 32]} position={[0, -0.9, 0]}>
        <meshStandardMaterial color="#2dd4bf" emissive="#14b8a6" emissiveIntensity={0.5} />
      </Sphere>
    </group>
  );
}

export default function IdeaBulbAnimation() {
  return (
    <div className="w-full h-full min-h-[500px] relative overflow-visible flex items-center justify-center">
      {/* Ambient background glow */}
      <div className="absolute w-80 h-80 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none -z-10" />
      
      <Canvas camera={{ position: [0, 1, 8], fov: 45 }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
        
        {/* Lighting */}
        <ambientLight intensity={0.8} color="#e0e7ff" />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#22d3ee" />
        <directionalLight position={[-5, 5, -5]} intensity={2.5} color="#c084fc" />
        <directionalLight position={[0, -5, 0]} intensity={1} color="#3b82f6" />
        
        {/* The entire bulb wrapped in a Float animation */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <group position={[0, -0.5, 0]}>
            <GlassBulb />
            <ElectricitySparks />
            <GlowingCore />
            <AtomRings />
            <BulbBase />
          </group>
        </Float>
        
        {/* User Interaction Controls */}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={1.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}
