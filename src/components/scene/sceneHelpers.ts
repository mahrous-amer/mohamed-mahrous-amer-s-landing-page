import * as THREE from "three";

export type Vec3 = [number, number, number];

export interface ServiceSpec {
  label: string;
  color: string;
}

export function circlePositions(count: number, radius: number, y = 0): THREE.Vector3[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
    return new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
  });
}

/** Quadratic bezier with a mid-control point lifted in Y for a gentle arc. */
export function arcCurve(from: THREE.Vector3, to: THREE.Vector3, lift = 0.8): THREE.QuadraticBezierCurve3 {
  const mid = from.clone().add(to).multiplyScalar(0.5);
  mid.y += lift;
  return new THREE.QuadraticBezierCurve3(from.clone(), mid, to.clone());
}

/** Sample a polyline along a curve for line rendering. */
export function curvePoints(curve: THREE.Curve<THREE.Vector3>, segments = 24): Float32Array {
  const pts = curve.getPoints(segments);
  const arr = new Float32Array(pts.length * 3);
  pts.forEach((p, i) => {
    arr[i * 3] = p.x;
    arr[i * 3 + 1] = p.y;
    arr[i * 3 + 2] = p.z;
  });
  return arr;
}
