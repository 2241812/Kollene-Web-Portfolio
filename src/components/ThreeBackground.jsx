import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";

function Shapes() {
  var ref = useRef();
  var mouse = useRef({ x: 0, y: 0 });
  var scrollY = useRef(0);
  var { viewport, pointer } = useThree();

  var shapes = useMemo(function() {
    var arr = [];
    var colors = ["#c86a45", "#7a9e6b", "#5c3a21", "#7a5238", "#d88868"];
    for (var i = 0; i < 14; i++) {
      arr.push({
        basePos: [(Math.random() - 0.5) * 11, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 5 - 2],
        rot: Math.random() * Math.PI * 2,
        scale: 0.15 + Math.random() * 0.3,
        color: colors[i % colors.length],
        speed: 0.3 + Math.random() * 0.6,
        type: i % 3,
        floatOffset: Math.random() * Math.PI * 2,
        driftX: (Math.random() - 0.5) * 0.004,
        driftY: (Math.random() - 0.5) * 0.004,
      });
    }
    return arr;
  }, []);

  useFrame(function(state) {
    if (!ref.current) return;
    var t = state.clock.elapsedTime;

    // gentle group rotation follows pointer
    ref.current.rotation.y = state.pointer.x * 0.2;
    ref.current.rotation.x = state.pointer.y * 0.1;

    ref.current.children.forEach(function(child, i) {
      if (i >= shapes.length) return;
      var s = shapes[i];
      var sp = s.basePos;

      // mouse repulsion
      var dx = state.pointer.x * viewport.width * 0.5 - sp[0];
      var dy = -(state.pointer.y * viewport.height * 0.5) - sp[1];
      var dist = Math.sqrt(dx * dx + dy * dy);
      var repel = Math.max(0, 1 - dist / 5);
      var pushX = dx * repel * 0.06;
      var pushY = dy * repel * 0.06;

      // floating oscillation
      var floatY = Math.sin(t * s.speed + s.floatOffset) * 0.2;
      var floatX = Math.cos(t * s.speed * 0.7 + s.floatOffset) * 0.1;
      // drift
      var driftX = Math.sin(t * 0.15 + i * 1.5) * s.driftX * 30;
      var driftY = Math.cos(t * 0.12 + i * 2.3) * s.driftY * 30;

      child.position.x = sp[0] + pushX + floatX + driftX;
      child.position.y = sp[1] + pushY + floatY + driftY;

      // spin faster near mouse
      var spinSpeed = s.speed * (1 + repel * 2);
      child.rotation.x += 0.003 * spinSpeed;
      child.rotation.y += 0.004 * spinSpeed;
      child.rotation.z += 0.002 * spinSpeed;
    });
  });

  return (
    <group ref={ref}>
      {shapes.map(function(s, i) {
        var Geo = s.type === 0 ? "box" : s.type === 1 ? "octahedron" : "icosahedron";
        return (
          <mesh key={i} position={s.basePos} scale={s.scale} rotation={[s.rot, s.rot, s.rot]}>
            {Geo === "box" ? <boxGeometry args={[1, 1, 1]} /> : Geo === "octahedron" ? <octahedronGeometry args={[1, 0]} /> : <icosahedronGeometry args={[1, 0]} />}
            <MeshDistortMaterial color={s.color} transparent opacity={0.12} wireframe distort={0.15} speed={1.5} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="three-bg">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#c86a45" />
        <pointLight position={[-5, -3, -5]} intensity={0.4} color="#7a9e6b" />
        <Shapes />
      </Canvas>
    </div>
  );
}
