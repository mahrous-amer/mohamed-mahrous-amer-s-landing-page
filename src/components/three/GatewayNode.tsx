import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export function GatewayNode() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshBasicMaterial
          color="#3B82F6"
          wireframe
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial
          color="#3B82F6"
          transparent
          opacity={0.1}
        />
      </mesh>
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.18}
        color="#3B82F6"
        anchorX="center"
        anchorY="middle"
      >
        API Gateway
      </Text>
    </group>
  );
}
