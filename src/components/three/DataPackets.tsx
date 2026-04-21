import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Packet {
  from: number; // service index (-1 = gateway)
  to: number;
  progress: number;
  speed: number;
}

interface DataPacketsProps {
  servicePositions: React.MutableRefObject<THREE.Vector3[]>;
  count?: number;
}

const GATEWAY_POS = new THREE.Vector3(0, 0, 0);
const tempMatrix = new THREE.Matrix4();
const tempVec = new THREE.Vector3();

export function DataPackets({ servicePositions, count = 200 }: DataPacketsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const packets = useMemo<Packet[]>(() => {
    return Array.from({ length: count }, () => {
      const serviceCount = 6;
      const goingToGateway = Math.random() > 0.5;
      return {
        from: goingToGateway ? Math.floor(Math.random() * serviceCount) : -1,
        to: goingToGateway ? -1 : Math.floor(Math.random() * serviceCount),
        progress: Math.random(),
        speed: 0.15 + Math.random() * 0.35,
      };
    });
  }, [count]);

  useFrame((_, delta) => {
    if (!meshRef.current || servicePositions.current.length === 0) return;

    for (let i = 0; i < packets.length; i++) {
      const p = packets[i];
      p.progress += delta * p.speed;

      if (p.progress >= 1) {
        p.progress = 0;
        // Reassign random route
        const serviceCount = servicePositions.current.length;
        const goingToGateway = Math.random() > 0.5;
        p.from = goingToGateway ? Math.floor(Math.random() * serviceCount) : -1;
        p.to = goingToGateway ? -1 : Math.floor(Math.random() * serviceCount);
        p.speed = 0.15 + Math.random() * 0.35;
      }

      const fromPos = p.from === -1 ? GATEWAY_POS : (servicePositions.current[p.from] || GATEWAY_POS);
      const toPos = p.to === -1 ? GATEWAY_POS : (servicePositions.current[p.to] || GATEWAY_POS);

      tempVec.lerpVectors(fromPos, toPos, p.progress);

      const scale = Math.sin(p.progress * Math.PI) * 0.6 + 0.4;
      tempMatrix.makeScale(scale, scale, scale);
      tempMatrix.setPosition(tempVec);
      meshRef.current.setMatrixAt(i, tempMatrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.03, 6, 6]} />
      <meshBasicMaterial color="#93C5FD" transparent opacity={0.85} />
    </instancedMesh>
  );
}
