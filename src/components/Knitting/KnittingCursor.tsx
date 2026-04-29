"use client";

import React from 'react';

interface KnittingCursorProps {
  x: number;
  y: number;
}

const KnittingCursor: React.FC<KnittingCursorProps> = ({ x, y }) => {
  const position: [number, number, number] = [x * 0.8, -y * 1.0, 0.2];

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color="#d946ef" 
          emissive="#d946ef" 
          emissiveIntensity={1} 
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.3, 0.02, 16, 32]} />
        <meshStandardMaterial color="#d946ef" opacity={0.5} transparent />
      </mesh>
      <pointLight color="#d946ef" intensity={0.8} distance={3} />
    </group>
  );
};

export default KnittingCursor;
