import { useMemo } from "react";
import * as THREE from "three";
import { ServiceNode, HubNode } from "./SceneNodes";
import { MessageFlow, type Flow } from "./MessageFlow";

// Clients hit a single API gateway that forwards to the right service
// (synchronous request/response — responses animate back).
const SERVICES = [
  { label: "users",    tech: "Go",         color: "#60a5fa" },
  { label: "catalog",  tech: "Node.js",    color: "#34d399" },
  { label: "checkout", tech: "Python",     color: "#fbbf24" },
  { label: "search",   tech: "Elastic",    color: "#f87171" },
  { label: "media",    tech: "Rust",       color: "#a78bfa" },
];

export function GatewayTopology() {
  const client = useMemo(() => new THREE.Vector3(-3.2, 0, 0), []);
  const gateway = useMemo(() => new THREE.Vector3(-0.8, 0, 0), []);

  // Services arrayed in a vertical fan to the right of the gateway
  const positions = useMemo(() => {
    const count = SERVICES.length;
    return SERVICES.map((_, i) => {
      const t = count === 1 ? 0 : i / (count - 1);
      // Spread services from +y to -y
      const y = (t - 0.5) * 3.2;
      // Slight forward/back depth for 3D feel
      const z = Math.sin(t * Math.PI) * 0.9;
      return new THREE.Vector3(2.3, y, z);
    });
  }, []);

  const flows = useMemo<Flow[]>(() => {
    const result: Flow[] = [];

    // Client → gateway (request) — constant heartbeat
    result.push({
      from: client,
      to: gateway,
      duration: 1.4,
      offset: 0,
      color: "#22d3ee",
      lift: 0.3,
    });
    // Gateway → client (response)
    result.push({
      from: gateway,
      to: client,
      duration: 1.4,
      offset: 0.5,
      color: "#22d3ee",
      lift: 0.3,
    });

    // Gateway ↔ each service (request then response)
    positions.forEach((p, i) => {
      result.push({
        from: gateway,
        to: p,
        duration: 2.0 + (i % 2) * 0.3,
        offset: i / positions.length,
        color: SERVICES[i].color,
        lift: 0.5,
      });
      result.push({
        from: p,
        to: gateway,
        duration: 2.0 + (i % 2) * 0.3,
        offset: i / positions.length + 0.5,
        color: SERVICES[i].color,
        lift: 0.5,
      });
    });

    return result;
  }, [positions, gateway, client]);

  return (
    <group>
      {/* Client on the far left */}
      <HubNode position={client.toArray()} label="Client" tech="Browser" color="#22d3ee" size={0.45} wireframe={false} />
      {/* Gateway */}
      <HubNode position={gateway.toArray()} label="API Gateway" tech="Kong" color="#f472b6" size={0.7} />
      {/* Services */}
      {SERVICES.map((s, i) => (
        <ServiceNode key={s.label} position={positions[i]} {...s} />
      ))}
      <MessageFlow flows={flows} />
    </group>
  );
}
