"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import Fabric from '../Knitting/Fabric';
import KnittingCursor from '../Knitting/KnittingCursor';
import { Stitch } from '@/hooks/useKnitting';

interface SceneProps {
  stitches: Stitch[];
  cursor: { x: number; y: number };
  fabricRef: React.RefObject<THREE.Group | null>;
}

const Scene: React.FC<SceneProps> = ({ stitches, cursor, fabricRef }) => {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#f8fafc' }}>
      <Canvas shadows camera={{ position: [5, 5, 10], fov: 45 }}>
        <color attach="background" args={['#f8fafc']} />
        <fog attach="fog" args={['#f8fafc', 10, 30]} />
        
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.8} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />

        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <Fabric ref={fabricRef} stitches={stitches} />
          </Float>
          
          <KnittingCursor x={cursor.x} y={cursor.y} />
          
          <ContactShadows 
            position={[0, -5, 0]} 
            opacity={0.2} 
            scale={20} 
            blur={2.4} 
            far={4.5} 
          />
          
          <Environment preset="apartment" />
        </Suspense>

        <OrbitControls 
          makeDefault 
          enablePan={true} 
          enableZoom={true} 
          minDistance={2} 
          maxDistance={20} 
        />
      </Canvas>
    </div>
  );
};

export default Scene;
