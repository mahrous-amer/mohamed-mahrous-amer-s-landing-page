import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BrokerTopology } from "./scene/BrokerTopology";
import { GatewayTopology } from "./scene/GatewayTopology";

type Mode = "broker" | "gateway";

const COPY: Record<Mode, { title: string; description: string }> = {
  broker: {
    title: "Message Broker",
    description:
      "Services publish and subscribe to topics without knowing each other. The broker decouples producers from consumers — ideal for async, event-driven workflows.",
  },
  gateway: {
    title: "API Gateway",
    description:
      "A single entry point fans requests out to the right service. Handles auth, rate limiting, and routing — ideal for synchronous, client-facing traffic.",
  },
};

const ArchitectureScene = () => {
  const [mode, setMode] = useState<Mode>("broker");

  return (
    <section
      id="architecture"
      className="relative py-24 px-4 sm:px-8 bg-background overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className="font-mono text-sm text-primary mb-2">{"// system design"}</p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Microservices <span className="text-primary">in motion</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Two patterns I build with every day. Toggle between them to see how services collaborate.
          </p>
        </motion.div>

        {/* Mode toggle */}
        <div className="flex justify-center gap-2 mb-6">
          {(Object.keys(COPY) as Mode[]).map((m) => (
            <Button
              key={m}
              variant={mode === m ? "default" : "outline"}
              onClick={() => setMode(m)}
              className="font-mono text-xs uppercase tracking-wider"
            >
              {COPY[m].title}
            </Button>
          ))}
        </div>

        {/* Canvas */}
        <div className="relative w-full h-[520px] rounded-xl border border-border bg-card/30 overflow-hidden">
          <Canvas
            camera={{ position: [0, 2.5, 7], fov: 50 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
          >
            <color attach="background" args={["#0b0f1a"]} />
            <fog attach="fog" args={["#0b0f1a", 8, 18]} />

            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={0.7} />
            <pointLight position={[0, 0, 0]} intensity={1.2} color="#8b5cf6" distance={6} />

            <Suspense fallback={null}>
              {mode === "broker" ? <BrokerTopology /> : <GatewayTopology />}
            </Suspense>

            <OrbitControls
              enablePan={false}
              enableZoom={false}
              autoRotate
              autoRotateSpeed={0.6}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 2.1}
            />
          </Canvas>

          {/* Gradient overlay at edges for a "scene window" feel */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,hsl(var(--background))_100%)]" />
        </div>

        {/* Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mt-6 text-center max-w-2xl mx-auto"
          >
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-2">
              {COPY[mode].title}
            </p>
            <p className="text-muted-foreground">{COPY[mode].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ArchitectureScene;
