# Microservices Orbital Visualization — Design Spec

## Core Purpose
Hybrid decorative-interactive 3D visualization of a microservices architecture in the hero section, with subtle bleed into About/Skills sections. Reinforces backend/systems engineer identity. Content remains focal point.

## Scene Description

### Orbital Cluster
- Central **API Gateway** node: larger wireframe icosahedron, primary blue
- **6 service nodes** orbiting at varying radii/speeds, each a wireframe polyhedron:
  - Go (×2) — cyan wireframe
  - Python — amber wireframe
  - Redis — red wireframe
  - PostgreSQL — silver wireframe
  - Kafka — orange wireframe
- **Dashed connection lines** between nodes
- **Data packets**: small bright dots (white + blue trail) traveling along connections via InstancedMesh

### Visual Style
- Wireframe/terminal aesthetic matching site's monospace theme
- Labels in JetBrains Mono via troika-three-text
- Colors derived from existing CSS variables

## Interaction Model

| Trigger | Response |
|---|---|
| Idle | Gentle orbit, ~1 packet/sec/connection |
| Mouse near node | Node glows, label appears, orbit slows |
| Mouse move | Subtle parallax shift |
| Scroll past hero | Fade to ~15% opacity, ambient particles only |
| Scroll to Projects | Canvas fully hidden |
| Mobile | Auto-animated, no mouse, 100 particles |
| Weak GPU | Static SVG fallback |

## Camera
- Fixed perspective, ~15° downward angle
- Cluster offset right, hero text left (Z-pattern reading)

## Performance Budget

| Metric | Target |
|---|---|
| FPS | 60 desktop / 30 mobile |
| 3D bundle gzipped | < 150KB |
| Draw calls | < 50 |
| Max particles | 300 desktop / 100 mobile |
| TTI impact | < 2s on 4G |
| Canvas DPR | 1x mobile, native desktop |

## File Structure
```
src/components/three/
  MicroservicesScene.tsx
  GatewayNode.tsx
  ServiceNode.tsx
  ConnectionLine.tsx
  DataPackets.tsx
  useScrollFade.ts
  useMouseParallax.ts
  useGPUDetect.ts
```

## Scope
- Hero section: full 3D scene
- About/Skills: faint particle bleed at 15% opacity
- Projects onward: no 3D
