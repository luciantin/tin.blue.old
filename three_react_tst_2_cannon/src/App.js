import React, { Component, useRef, useState,useMemo, Suspense } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useLoader,useUpdate} from "react-three-fiber";
import { softShadows, MeshWobbleMaterial, OrbitControls } from "drei";
import { useSpring, a } from "react-spring/three";
import { Physics, usePlane, useBox, useConvexPolyhedron } from '@react-three/cannon'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry'

import './App.css';


softShadows();


function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <shadowMaterial attach="material" color="#171717" />
      <meshLambertMaterial attach="material" color="white" />
    </mesh>
  )
}


function SpinningMesh({position, args, color, speed}){
  const mesh = useRef(null)
  useFrame(()=> (mesh.current.rotation.x = mesh.current.rotation.y += 0.04))
  return (
    <mesh castShadow position={position} ref={mesh}>
      <boxBufferGeometry attach="geometry" args={args} />
      {/* <meshStandardMaterial attach="material" color={color} /> */}
      <MeshWobbleMaterial attach="material" color={color} speed={speed} factor={0.4} />
    </mesh>
  );
}

function Cube(props) {
  const [ref] = useBox(() => ({ mass: 1, position: props.position, }))
  // useFrame(()=> {console.log(ref.current)})
  // (ref.current.rotation.x = ref.current.rotation.y += 0.04)
  return (
    <mesh ref={ref}
    receiveShadow
    castShadow>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />

    </mesh>
  )
}

function ModelTst(props) {
  const { nodes } = useLoader(GLTFLoader, '/shape2TstModel.glb')
  const geo = useMemo(() => {
    const g = new THREE.Geometry().fromBufferGeometry(nodes.Cube.geometry)
    // Merge duplicate vertices resulting from glTF export.
    // Cannon assumes contiguous, closed meshes to work
    g.mergeVertices()
    // Ensure loaded mesh is convex and create faces if necessary
    return new ConvexGeometry(g.vertices)
  }, [nodes])

  const [ref] = useConvexPolyhedron(() => ({ mass: 100, ...props, args: geo }))
  return (
    <mesh castShadow receiveShadow ref={ref} geometry={nodes.Cube.geometry} {...props} dispose={null}>
      {/* <bufferGeometry /> */}
      <meshStandardMaterial attach="material"  />
    </mesh>
  )
}

function App() {
  return (
    <>
    <Canvas 
      shadowMap 
      sRGB 
      gl={{ alpha: false }} 
      camera={{ position: [-1, 2, 5], fov: 50 }}
      colorManagement
      >                 
      <color attach="background" args={['lightblue']} />
      <ambientLight intensity={0.3}/>
        <pointLight position={[-10,0,-20]} intensity={.5} />
        <pointLight position={[0,-10,0]} intensity={1.5} />
        <directionalLight 
          castShadow
          position={[0,10,0]} 
          intensity={1.5} 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024} 
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          />
      
      <Physics>
        <Plane />
        <ModelTst position={[1, 5, 0]} rotation={[0.4, 0.1, 0.1]} />
        <Cube position={[0,7,-2]} />
        <Cube position={[0,9,-2]} />
        <Cube position={[0,12,-2]} />
        <Cube position={[0,5,-2]} />
        <Cube position={[2,9,-2]} />
        <Cube position={[2,12,-2]} />
        <Cube position={[2,5,-2]} />
        <Cube position={[2,7,-2]} />
        <Cube position={[-2,9,-2]} />
        <Cube position={[-2,12,-2]} />
        <Cube position={[-2,5,-2]} />
        <Cube position={[-2,7,-2]} />
      </Physics>
      {/* <Physics> */}
        {/* <Plane /> */}
      {/* </Physics> */}
        {/* <SpinningMesh position={[0,1,0]}   speed={0} args={[3,2,1]} color='lightblue' />
        <SpinningMesh position={[-2,1,-5]} speed={6}  color='pink' />
        <SpinningMesh position={[5,1,-2]}  speed={6} color='pink' /> */}
      <OrbitControls />
    </Canvas>      
    </>
  );
}

export default App;
