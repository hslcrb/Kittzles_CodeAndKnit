import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Torus } from '@react-three/drei';
import { generateYarnTexture, generateYarnNormalMap } from '@/utils/textureGenerator';

interface StitchModelProps {
  x: number;
  y: number;
  type: 'knit' | 'purl';
  color: string;
}

const StitchModel: React.FC<StitchModelProps> = ({ x, y, type, color }) => {
  // Generate textures once
  const [map, normalMap] = useMemo(() => [
    generateYarnTexture(),
    generateYarnNormalMap()
  ], []);

  const position: [number, number, number] = [x * 0.8, -y * 1.0, 0];

  const materialProps = {
    color,
    map,
    normalMap,
    roughness: 0.9,
    metalness: 0.05,
    normalScale: new THREE.Vector2(0.5, 0.5),
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
