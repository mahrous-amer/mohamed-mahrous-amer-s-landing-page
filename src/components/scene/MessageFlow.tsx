import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { arcCurve, curvePoints } from "./sceneHelpers";

export interface Flow {
  from: THREE.Vector3;
  to: THREE.Vector3;
  /** cycle duration in seconds */
  duration: number;
  /** phase offset 0..1 */
  offset: number;
  color: string;
  /** arc lift */
  lift?: number;
}

interface MessageFlowProps {
  flows: Flow[];
}

/** Renders the connection paths + animated message particles along them. */
export function MessageFlow({ flows }: MessageFlowProps) {
  const curves = useMemo(
    () => flows.map((f) => arcCurve(f.from, f.to, f.lift ?? 0.8)),
    [flows]
  );
  const particleMesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!particleMesh.current) return;
    const t = state.clock.elapsedTime;

    flows.forEach((f, i) => {
      const progress = (((t / f.duration) + f.offset) % 1 + 1) % 1;
      const pos = curves[i].getPoint(progress);
      dummy.position.copy(pos);
      // Scale in/out near endpoints for a pleasing spawn/despawn
      const edgeFade = Math.sin(progress * Math.PI);
      dummy.scale.setScalar(0.6 + edgeFade * 0.6);
      dummy.updateMatrix();
      particleMesh.current!.setMatrixAt(i, dummy.matrix);
      particleMesh.current!.setColorAt(i, tmpColor.set(f.color));
    });
    particleMesh.current.instanceMatrix.needsUpdate = true;
    if (particleMesh.current.instanceColor) {
      particleMesh.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <>
      {/* Connection lines */}
      {curves.map((curve, i) => (
        <ConnectionLine key={i} curve={curve} color={flows[i].color} />
      ))}

      {/* Animated message particles */}
      <instancedMesh
        ref={particleMesh}
        args={[undefined, undefined, flows.length]}
      >
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </>
  );
}

const tmpColor = new THREE.Color();

function ConnectionLine({ curve, color }: { curve: THREE.Curve<THREE.Vector3>; color: string }) {
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(curvePoints(curve, 32), 3));
    return g;
  }, [curve]);

  return (
    <primitive object={new THREE.Line(geom, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.25 }))} />
  );
}
