import { useMemo } from "react";
import * as THREE from "three";
import { circlePositions } from "./sceneHelpers";
import { ServiceNode, HubNode } from "./SceneNodes";
import { MessageFlow, type Flow } from "./MessageFlow";

// Microservices surrounding a central message broker (pub/sub).
// Every service publishes to the broker; the broker fans out to subscribers.
const SERVICES = [
  { label: "auth",          tech: "Go",            color: "#60a5fa" },
  { label: "orders",        tech: "Node.js",       color: "#34d399" },
  { label: "payments",      tech: "Python",        color: "#fbbf24" },
  { label: "inventory",     tech: "Rust",          color: "#f87171" },
  { label: "notifications", tech: "TypeScript",    color: "#a78bfa" },
  { label: "analytics",     tech: "Spark",         color: "#22d3ee" },
];

export function BrokerTopology() {
  const positions = useMemo(
    () => circlePositions(SERVICES.length, 2.6),
    []
  );
  const broker = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  const flows = useMemo<Flow[]>(() => {
    const result: Flow[] = [];
    // Each service publishes → broker (inbound)
    positions.forEach((p, i) => {
      result.push({
        from: p,
        to: broker,
        duration: 2.2 + (i % 3) * 0.4,
        offset: (i / positions.length),
        color: SERVICES[i].color,
        lift: 0.6,
      });
    });
    // Broker fans out → every service (outbound), staggered
    positions.forEach((p, i) => {
      result.push({
        from: broker,
        to: p,
        duration: 2.2 + ((i + 1) % 3) * 0.4,
        offset: (i / positions.length) + 0.5,
        color: "#a78bfa",
        lift: 0.9,
      });
    });
    return result;
  }, [positions, broker]);

  return (
    <group>
      <HubNode label="Message Broker" tech="Kafka" color="#8b5cf6" size={0.75} />
      {SERVICES.map((s, i) => (
        <ServiceNode key={s.label} position={positions[i]} {...s} />
      ))}
      <MessageFlow flows={flows} />
    </group>
  );
}
