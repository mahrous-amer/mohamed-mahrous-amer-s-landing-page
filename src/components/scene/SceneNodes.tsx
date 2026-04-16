import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface ServiceNodeProps {
  position: THREE.Vector3 | [number, number, number];
  label: string;
  tech: string;
  color: string;
}

/** A single microservice — rotating icosahedron with a role label + tech stack. */
export function ServiceNode({ position, label, tech, color }: ServiceNodeProps) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.6;
      mesh.current.rotation.x += delta * 0.15;
    }
  });

  const pos = Array.isArray(position) ? position : position.toArray();

  return (
    <group position={pos as [number, number, number]}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} roughness={0.3} metalness={0.5} />
      </mesh>
      {/* Soft halo */}
      <mesh>
        <sphereGeometry args={[0.55, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} />
      </mesh>
      <Html center distanceFactor={7} position={[0, -0.75, 0]} style={{ pointerEvents: "none" }}>
        <div className="flex flex-col items-center leading-tight select-none">
          <span className="font-mono text-[11px] text-foreground/90 whitespace-nowrap">
            {label}
          </span>
          <span
            className="font-mono text-[9px] whitespace-nowrap uppercase tracking-wider"
            style={{ color }}
          >
            {tech}
          </span>
        </div>
      </Html>
    </group>
  );
}

interface HubNodeProps {
  position?: [number, number, number];
  label: string;
  tech: string;
  color?: string;
  size?: number;
  wireframe?: boolean;
}

/** Central node (broker or gateway) — wireframe octahedron that pulses. */
export function HubNode({
  position = [0, 0, 0],
  label,
  tech,
  color = "#8b5cf6",
  size = 0.7,
  wireframe = true,
}: HubNodeProps) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.4;
      group.current.rotation.x += delta * 0.2;
    }
    if (inner.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.08;
      inner.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={position}>
      <group ref={group}>
        <mesh ref={inner}>
          <octahedronGeometry args={[size, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1.2}
            wireframe={wireframe}
          />
        </mesh>
        {/* Inner solid core */}
        <mesh>
          <octahedronGeometry args={[size * 0.4, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
        </mesh>
      </group>
      <Html center distanceFactor={7} position={[0, -size - 0.4, 0]} style={{ pointerEvents: "none" }}>
        <div className="flex flex-col items-center leading-tight select-none">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary whitespace-nowrap">
            {label}
          </span>
          <span
            className="font-mono text-[9px] whitespace-nowrap uppercase tracking-wider"
            style={{ color }}
          >
            {tech}
          </span>
        </div>
      </Html>
    </group>
  );
}
