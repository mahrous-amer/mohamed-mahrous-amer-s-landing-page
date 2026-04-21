import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

interface ConnectionLineProps {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color?: string;
}

export function ConnectionLine({ start, end, color = "#3B82F6" }: ConnectionLineProps) {
  const lineRef = useRef<any>(null);

  useFrame(() => {
    if (lineRef.current) {
      const positions = lineRef.current.geometry.attributes.position;
      positions.setXYZ(0, start.x, start.y, start.z);
      positions.setXYZ(1, end.x, end.y, end.z);
      positions.needsUpdate = true;
    }
  });

  return (
    <Line
      ref={lineRef}
      points={[
        [start.x, start.y, start.z],
        [end.x, end.y, end.z],
      ]}
      color={color}
      transparent
      opacity={0.2}
      lineWidth={1}
      dashed
      dashSize={0.15}
      gapSize={0.1}
    />
  );
}
