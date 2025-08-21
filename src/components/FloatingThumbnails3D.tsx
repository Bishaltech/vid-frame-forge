import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Import thumbnail images
import mrbeastThumb from '@/assets/thumbnail-mrbeast.jpg';
import gamingThumb from '@/assets/thumbnail-gaming.jpg';
import fitnessThumb from '@/assets/thumbnail-fitness.jpg';
import techThumb from '@/assets/thumbnail-tech.jpg';

interface FloatingThumbnailProps {
  position: [number, number, number];
  rotation: [number, number, number];
  image: string;
  scale: number;
  speed: number;
}

const FloatingThumbnail = ({ position, rotation, image, scale, speed }: FloatingThumbnailProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => new THREE.TextureLoader().load(image), [image]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation[0] + Math.sin(state.clock.elapsedTime * speed) * 0.1;
      meshRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * speed * 0.7) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        scale={[scale * 2, scale * 1.125, scale * 0.1]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          map={texture} 
          transparent 
          opacity={0.3}
          roughness={0.1}
          metalness={0.3}
        />
        {/* Glowing border */}
        <mesh scale={[1.02, 1.02, 1.02]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color="#8B5CF6" 
            transparent 
            opacity={0.1}
            emissive="#8B5CF6"
            emissiveIntensity={0.2}
          />
        </mesh>
      </mesh>
    </Float>
  );
};

const Scene = () => {
  const thumbnails = useMemo(() => [
    {
      position: [-8, 2, -5] as [number, number, number],
      rotation: [0.2, 0.3, 0.1] as [number, number, number],
      image: mrbeastThumb,
      scale: 1.2,
      speed: 0.8,
    },
    {
      position: [8, -1, -8] as [number, number, number],
      rotation: [-0.1, -0.4, 0.2] as [number, number, number],
      image: gamingThumb,
      scale: 1.0,
      speed: 1.2,
    },
    {
      position: [-6, -3, -3] as [number, number, number],
      rotation: [0.3, 0.2, -0.1] as [number, number, number],
      image: fitnessThumb,
      scale: 0.9,
      speed: 0.9,
    },
    {
      position: [6, 3, -6] as [number, number, number],
      rotation: [-0.2, 0.5, 0.1] as [number, number, number],
      image: techThumb,
      scale: 1.1,
      speed: 1.0,
    },
    {
      position: [0, -4, -10] as [number, number, number],
      rotation: [0.1, 0, 0.3] as [number, number, number],
      image: mrbeastThumb,
      scale: 0.8,
      speed: 0.7,
    },
    {
      position: [-10, 0, -4] as [number, number, number],
      rotation: [0.4, -0.2, 0] as [number, number, number],
      image: gamingThumb,
      scale: 0.9,
      speed: 1.1,
    },
  ], []);

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#8B5CF6" />
      <pointLight position={[-10, -10, 5]} intensity={0.5} color="#EC4899" />
      
      {thumbnails.map((thumb, index) => (
        <FloatingThumbnail key={index} {...thumb} />
      ))}

      <Environment preset="night" />
    </>
  );
};

export const FloatingThumbnails3D = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-60">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};