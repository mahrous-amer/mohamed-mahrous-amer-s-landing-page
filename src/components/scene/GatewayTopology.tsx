import { useMemo } from "react";
import * as THREE from "three";
import { ServiceNode, HubNode } from "./SceneNodes";
import { MessageFlow, type Flow } from "./MessageFlow";

// Clients hit a single API gateway that forwards to the right service
// (synchronous request/response — responses animate back).
const SERVICES = [
  { label: "auth",       tech: "Go",          color: "#60a5fa" },
  { label: "accounts",   tech: "Perl",        color: "#34d399" },
  { label: "payments",   tech: "C# .NET",     color: "#fbbf24" },
  { label: "reporting",  tech: "Python",      color: "#f87171" },
  { label: "compliance", tech: "SQL Server",  color: "#a78bfa" },
];

export function GatewayTopology() {
  // Client in front (+z), gateway at origin, services fanned behind (-z)
  const client = useMemo(() => new THREE.Vector3(0, 0.2, 3.2), []);
  const gateway = useMemo(() => new THREE.Vector3(0, 0, 0.5), []);

  // Services arrayed in a backward-facing arc at z<0, spread across a 180° fan
  const positions = useMemo(() => {
    const count = SERVICES.length;
    const radius = 3;
    return SERVICES.map((_, i) => {
      const t = count === 1 ? 0.5 : i / (count - 1);
      // Arc from 210° to 330° (behind the gateway, facing away from client)
      const angle = Math.PI * (1.17 + t * 0.66);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius - 0.5; // push back
      const y = Math.sin(t * Math.PI) * 0.4;     // slight up/down variation
      return new THREE.Vector3(x, y, z);
    });
  }, []);

  const flows = useMemo<Flow[]>(() => {
    const result: Flow[] = [];

    // Client → gateway (request) — constant heartbeat
    result.push({
      from: client,
      to: gateway,
      duration: 1.6,
      offset: 0,
      color: "#22d3ee",
      lift: 0.35,
    });
    // Gateway → client (response)
    result.push({
      from: gateway,
      to: client,
      duration: 1.6,
      offset: 0.5,
      color: "#22d3ee",
      lift: 0.35,
    });

    // Gateway ↔ each service (request then response)
    positions.forEach((p, i) => {
      result.push({
        from: gateway,
        to: p,
        duration: 2.2 + (i % 2) * 0.3,
        offset: i / positions.length,
        color: SERVICES[i].color,
        lift: 0.6,
      });
      result.push({
        from: p,
        to: gateway,
        duration: 2.2 + (i % 2) * 0.3,
        offset: i / positions.length + 0.5,
        color: SERVICES[i].color,
        lift: 0.6,
      });
    });

    return result;
  }, [positions, gateway, client]);

  return (
    <group>
      {/* Client in front */}
      <HubNode
        position={client.toArray() as [number, number, number]}
        label="Client"
        tech="Browser"
        color="#22d3ee"
        size={0.45}
        wireframe={false}
      />
      {/* Gateway */}
      <HubNode
        position={gateway.toArray() as [number, number, number]}
        label="API Gateway"
        tech="Kong"
        color="#f472b6"
        size={0.7}
      />
      {/* Services fanned behind */}
      {SERVICES.map((s, i) => (
        <ServiceNode key={s.label} position={positions[i]} {...s} />
      ))}
      <MessageFlow flows={flows} />
    </group>
  );
}
