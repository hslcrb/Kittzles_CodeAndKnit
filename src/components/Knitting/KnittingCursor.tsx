"use client";

import React from 'react';
import { Sphere } from '@react-three/drei';

interface KnittingCursorProps {
  x: number;
  y: number;
}

const KnittingCursor: React.FC<KnittingCursorProps> = ({ x, y }) => {
  const position: [number, number, number] = [x * 0.8, -y * 1.0, 0.2];

  return (
    <group position={position}>
      <Sphere args={[0.2, 16, 16]}>
        <meshStandardMaterial 
          color="#f0abfc" 
          transparent 
          opacity={0.5} 
          emissive="#f0abfc" 
          emissiveIntensity={2} 
        />
      </Sphere>
      <pointLight color="#f0abfc" intensity={0.5} distance={2} />
    </group>
  );
};

export default KnittingCursor;
