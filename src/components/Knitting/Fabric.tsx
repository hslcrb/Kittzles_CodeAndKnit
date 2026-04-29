"use client";

import React, { forwardRef } from 'react';
import * as THREE from 'three';
import StitchModel from './StitchModel';
import { Stitch } from '@/hooks/useKnitting';

interface FabricProps {
  stitches: Stitch[];
}

const Fabric = forwardRef<THREE.Group, FabricProps>(({ stitches }, ref) => {
  return (
    <group ref={ref}>
      {stitches.map((stitch) => (
        <StitchModel 
          key={stitch.id}
          x={stitch.x}
          y={stitch.y}
          type={stitch.type}
          color={stitch.color}
        />
      ))}
    </group>
  );
});

Fabric.displayName = 'Fabric';

export default Fabric;
