import { useRef, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GatewayNode } from "./GatewayNode";
import { ServiceNode, ServiceConfig } from "./ServiceNode";
import { ConnectionLine } from "./ConnectionLine";
import { DataPackets } from "./DataPackets";
import { useScrollFade } from "./useScrollFade";
import { useMouseParallax } from "./useMouseParallax";

const services: ServiceConfig[] = [
  { name: "Go", color: "#06B6D4", orbitRadius: 2.8, orbitSpeed: 0.25, startAngle: 0, geometryType: "octahedron" },
  { name: "Go", color: "#06B6D4", orbitRadius: 3.2, orbitSpeed: 0.18, startAngle: Math.PI * 0.7, geometryType: "octahedron" },
  { name: "Python", color: "#F59E0B", orbitRadius: 2.5, orbitSpeed: 0.22, startAngle: Math.PI * 1.2, geometryType: "tetrahedron" },
  { name: "Redis", color: "#EF4444", orbitRadius: 3.0, orbitSpeed: 0.2, startAngle: Math.PI * 0.4, geometryType: "dodecahedron" },
  { name: "PostgreSQL", color: "#94A3B8", orbitRadius: 3.4, orbitSpeed: 0.15, startAngle: Math.PI * 1.6, geometryType: "dodecahedron" },
  { name: "Kafka", color: "#F97316", orbitRadius: 2.6, orbitSpeed: 0.28, startAngle: Math.PI * 1.0, geometryType: "tetrahedron" },
];

function SceneContent({ mouse }: { mouse: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const servicePositions = useRef<THREE.Vector3[]>(
    services.map(() => new THREE.Vector3())
  );
  const targetRotation = useRef({ x: 0, y: 0 });

  const handlePositionUpdate = useCallback(
    (index: number) => (pos: THREE.Vector3) => {
      servicePositions.current[index].copy(pos);
    },
    []
  );

  useFrame(() => {
    if (groupRef.current) {
      targetRotation.current.y = mouse.x * 0.15;
      targetRotation.current.x = mouse.y * 0.08;
      groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[5, 0.5, 0]}>
      <GatewayNode />
      {services.map((config, i) => (
        <ServiceNode
          key={`${config.name}-${i}`}
          config={config}
          onPositionUpdate={handlePositionUpdate(i)}
        />
      ))}
      {services.map((config, i) => (
        <ConnectionLine
          key={`conn-${i}`}
          start={new THREE.Vector3(0, 0, 0)}
          end={servicePositions.current[i]}
          color={config.color}
        />
      ))}
      <DataPackets servicePositions={servicePositions} count={200} />
    </group>
  );
}

export function MicroservicesScene() {
  const opacity = useScrollFade();
  const mouse = useMouseParallax();

  if (opacity <= 0) return null;

  return (
    <div
      className="fixed inset-0 z-0"
      style={{ opacity, pointerEvents: opacity < 0.5 ? "none" : "auto" }}
    >
      <Canvas
        camera={{ position: [3, 1, 9], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <SceneContent mouse={mouse} />
      </Canvas>
    </div>
  );
}
