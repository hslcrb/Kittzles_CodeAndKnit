"use client";

import React from 'react';
import { Torus } from '@react-three/drei';

interface StitchModelProps {
  x: number;
  y: number;
  type: 'knit' | 'purl';
  color: string;
}

const StitchModel: React.FC<StitchModelProps> = ({ x, y, type, color }) => {
  // A knit stitch looks like a "V", a purl looks like a "bar".
  // For now, we'll use a torus with different rotations.
  
  const position: [number, number, number] = [x * 0.8, -y * 1.0, 0];

  return (
    <group position={position}>
      {type === 'knit' ? (
        <>
          <Torus 
            args={[0.4, 0.1, 16, 32]} 
            rotation={[0, 0, Math.PI / 4]}
          >
            <meshStandardMaterial color={color} roughness={0.7} metalness={0.1} />
          </Torus>
          <Torus 
            args={[0.4, 0.1, 16, 32]} 
            rotation={[0, 0, -Math.PI / 4]}
          >
            <meshStandardMaterial color={color} roughness={0.7} metalness={0.1} />
          </Torus>
        </>
      ) : (
        <Torus 
          args={[0.4, 0.15, 16, 32]} 
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial color={color} roughness={0.7} metalness={0.1} />
        </Torus>
      )}
    </group>
  );
};

export default React.memo(StitchModel);
