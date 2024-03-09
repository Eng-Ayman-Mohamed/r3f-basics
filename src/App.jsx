/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { useRef, useState } from "react";

const Cube = ({ position, size, color }) => {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta;
    ref.current.rotation.x += delta;
    ref.current.rotation.z += delta;

    ref.current.position.x = Math.cos(state.clock.elapsedTime) * 2;
  });
  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Sphere = ({ position, size, color }) => {
  const ref = useRef();

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  useFrame((state, delta) => {
    const speed = hovered ? 10 : 1;

    ref.current.rotation.y += delta * speed;
    /*   ref.current.rotation.x += delta;
    ref.current.rotation.z += delta; */
    /*   console.log(hovered); */

    /* ref.current.position.y = Math.cos(state.clock.elapsedTime * speed); */
  });
  return (
    <mesh
      position={position}
      ref={ref}
      onPointerEnter={(e) => {
        e.stopPropagation(), setHovered(true);
      }}
      scale={clicked ? 2 : 1}
      onClick={() => {
        setClicked(!clicked);
      }}
      onPointerLeave={() => {
        setHovered(!clicked);
      }}
    >
      <sphereGeometry args={size} />
      <meshStandardMaterial wireframe color={hovered ? "blue" : "hotpink"} />
    </mesh>
  );
};

const Torus = ({ position, color, size }) => {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta;
    ref.current.rotation.x += delta;
    ref.current.rotation.z += delta;

    //ref.current.position.x = Math.cos(state.clock.elapsedTime) * 2;
  });
  return (
    <mesh position={position} ref={ref}>
      <torusGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas>
      <directionalLight position={[0, 0, 2]} />
      {/* <ambientLight intensity={0.9} /> */}
      {/*   <group position={[0, -1, 0]}>
        <Cube position={[2, 0, 0]} color={"red"} size={[1, 1, 1]} />
        <Cube position={[-2, 0, 0]} color={"hotpink"} size={[1, 1, 1]} />
        <Cube position={[0, 0, -2]} color={"blue"} size={[1, 1, 1]} />
      </group> */}
      <Sphere position={[0, 0, -2]} color={"hotpink"} size={[1, 30, 30]} />
      {/*   <Torus position={[2, 0, -2]} color={"red"} size={[0.5, 0.1, 30, 30]} /> */}
    </Canvas>
  );
};

export default App;
