// components/GltfViewer.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

type GltfModelProps = {
  url: string;
};

const GltfModel: React.FC<GltfModelProps> = ({ url }) => {
  const { scene, animations } = useGLTF(url);
  const mixer = useRef<THREE.AnimationMixer>();

  useEffect(() => {
    if (animations && animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene);
      animations.forEach((clip) => {
        mixer.current?.clipAction(clip).play();
      });
    }

    return () => {
      mixer.current?.stopAllAction();
    };
  }, [animations, scene]);

  useFrame((state, delta) => {
    mixer.current?.update(delta);
  });

  return <primitive object={scene} />;
};

const GltfViewer: React.FC<GltfModelProps> = ({ url }) => {
  return (
    <div className="w-full h-full mt-64">
      <Canvas camera={{ position: [2, 2, 2], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <React.Suspense fallback={null}>
          <GltfModel url={url} />
        </React.Suspense>
        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>
    </div>
  );
};

export default GltfViewer;
