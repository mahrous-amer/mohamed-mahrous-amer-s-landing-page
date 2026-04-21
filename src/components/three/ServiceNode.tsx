import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export interface ServiceConfig {
  name: string;
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
  startAngle: number;
  geometryType: "octahedron" | "tetrahedron" | "dodecahedron";
}

interface ServiceNodeProps {
  config: ServiceConfig;
  onPositionUpdate?: (pos: THREE.Vector3) => void;
}

const geometries: Record<ServiceConfig["geometryType"], JSX.Element> = {
  octahedron: <octahedronGeometry args={[0.35, 0]} />,
  tetrahedron: <tetrahedronGeometry args={[0.4, 0]} />,
  dodecahedron: <dodecahedronGeometry args={[0.3, 0]} />,
};

export function ServiceNode({ config, onPositionUpdate }: ServiceNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const angleRef = useRef(config.startAngle);

  useFrame((_, delta) => {
    angleRef.current += delta * config.orbitSpeed * (hovered ? 0.3 : 1);
    const x = Math.cos(angleRef.current) * config.orbitRadius;
    const z = Math.sin(angleRef.current) * config.orbitRadius;
    const y = Math.sin(angleRef.current * 0.5) * 0.3;

    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
      onPositionUpdate?.(groupRef.current.position);
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {geometries[config.geometryType]}
        <meshBasicMaterial
          color={config.color}
          wireframe
          transparent
          opacity={hovered ? 1 : 0.75}
        />
      </mesh>
      {/* Hover glow */}
      {hovered && (
        <mesh>
          <sphereGeometry args={[0.5, 8, 8]} />
          <meshBasicMaterial
            color={config.color}
            transparent
            opacity={0.08}
          />
        </mesh>
      )}
      <Text
        position={[0, -0.6, 0]}
        fontSize={0.14}
        color={config.color}
        anchorX="center"
        anchorY="middle"
        fillOpacity={hovered ? 1 : 0.6}
      >
        {config.name}
      </Text>
    </group>
  );
}
