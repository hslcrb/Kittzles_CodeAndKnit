"use client";

import React from 'react';
import * as THREE from 'three';
import { Torus, useTexture } from '@react-three/drei';

interface StitchModelProps {
  x: number;
  y: number;
  type: 'knit' | 'purl';
  color: string;
}

const StitchModel: React.FC<StitchModelProps> = ({ x, y, type, color }) => {
  // Load real open-source textures (Fabric048 from AmbientCG)
  const textures = useTexture({
    map: '/textures/yarn/Fabric048_1K-JPG_Color.jpg',
    normalMap: '/textures/yarn/Fabric048_1K-JPG_NormalGL.jpg',
    roughnessMap: '/textures/yarn/Fabric048_1K-JPG_Roughness.jpg',
    aoMap: '/textures/yarn/Fabric048_1K-JPG_AmbientOcclusion.jpg',
  });

  // Optimize texture repeating
  Object.values(textures).forEach((t) => {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(1, 1);
  });

  const position: [number, number, number] = [x * 0.8, -y * 1.0, 0];

  const materialProps = {
    color,
    ...textures,
    roughness: 1.0,
    metalness: 0.0,
    normalScale: new THREE.Vector2(0.8, 0.8),
  };

  return (
    <group position={position}>
      {type === 'knit' ? (
        <>
          <Torus args={[0.4, 0.12, 16, 32]} rotation={[0, 0, Math.PI / 4]}>
            <meshStandardMaterial {...materialProps} />
          </Torus>
          <Torus args={[0.4, 0.12, 16, 32]} rotation={[0, 0, -Math.PI / 4]}>
            <meshStandardMaterial {...materialProps} />
          </Torus>
        </>
      ) : (
        <Torus args={[0.4, 0.18, 16, 32]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial {...materialProps} />
        </Torus>
      )}
    </group>
  );
};

export default React.memo(StitchModel);
