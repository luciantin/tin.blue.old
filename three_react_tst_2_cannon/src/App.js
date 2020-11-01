import React, { Component, useRef, useState,useMemo, Suspense } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useLoader,useUpdate} from "react-three-fiber";
import { softShadows, MeshWobbleMaterial, OrbitControls } from "drei";
import { useSpring, a } from "react-spring/three";
import { Physics, usePlane, useBox, useConvexPolyhedron } from '@react-three/cannon'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ConvexBufferGeometry, ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry'

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

function Wall({position, color}){
  const [ref] = useBox(() => ({args:[3,30,30], mass: 500, material:{friction:100.0,restitution:1.01}, position: position}))
  // useFrame(()=> {console.log(ref.current)})
  // (ref.current.rotation.x = ref.current.rotation.y += 0.04)
  return (
    <mesh ref={ref}
    receiveShadow
    castShadow>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  );
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
  const [ref] = useBox(() => ({ mass: 500, material:{friction:1e20,restitution:0.01}, position: props.position, }))
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

// function ModelTst(props) {
//   const { nodes } = useLoader(GLTFLoader, '/shape2TstModel.glb')
//   const geo = useMemo(() => {
//     const g = new THREE.Geometry().fromBufferGeometry(nodes.Cube.geometry)
//     // Merge duplicate vertices resulting from glTF export.
//     // Cannon assumes contiguous, closed meshes to work
//     g.mergeVertices()
//     // Ensure loaded mesh is convex and create faces if necessary
//     return new ConvexGeometry(g.vertices)
//   }, [nodes])

//   const [ref] = useConvexPolyhedron(() => ({ mass: 1000,  ...props, args: geo }))
//   return (
//     <mesh castShadow receiveShadow ref={ref} geometry={nodes.Cube.geometry} {...props} dispose={null}>
//       {/* <bufferGeometry /> */}
//       <meshStandardMaterial attach="material"  />
//     </mesh>
//   )
// }


function ModelTst2(props) {
  const { nodes } = useLoader(GLTFLoader, './tinModelsTst1.glb')
  const geo = useMemo(() => {
    const g = new THREE.Geometry().fromBufferGeometry(nodes.[props.modelId].geometry)
    // Merge duplicate vertices resulting from glTF export.
    // Cannon assumes contiguous, closed meshes to work
    g.mergeVertices()
    // Ensure loaded mesh is convex and create faces if necessary
    return new ConvexGeometry(g.vertices)
  }, [nodes])

  const [ref] = useConvexPolyhedron(() => ({ mass: props.mass, material:{friction:1e10,restitution:0.01},  ...props, args: geo }))
  return (
    <mesh castShadow receiveShadow ref={ref} geometry={nodes.[props.modelId].geometry} {...props} dispose={null}>
      {/* <bufferGeometry /> */}
      <meshStandardMaterial attach="material"  />
    </mesh>
  )
}

function ModelTst3(props) {
  const { nodes } = useLoader(GLTFLoader, './tinModelsTst1.glb')
  const geo = useMemo(() => {
    const g = new THREE.Geometry().fromBufferGeometry(nodes.[props.modelId].geometry)
    // Merge duplicate vertices resulting from glTF export.
    // Cannon assumes contiguous, closed meshes to work
    g.mergeVertices()
    // Ensure loaded mesh is convex and create faces if necessary
    return new ConvexGeometry(g.vertices)
  }, [nodes])
  // console.log()
  const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props, args:[5,2,2], }))
    // const [ref] = useConvexPolyhedron(() => ({ mass: props.mass,material:{friction:1e10,restitution:0.01},   ...props, args: geo }))
  console.log(geo)
  return (
    <mesh ref={ref} geometry={nodes.[props.modelId].geometry} {...props} >
      {/* <boxBufferGeometry attach="geometry" args={[10,2,2]} /> */}
      {/* <ConvexGeometry  */}
      <meshStandardMaterial attach="material"  color="blue" />

      {/* <ConvexBufferGeometry */}
    </mesh>
  )

  // const [ref] = useConvexPolyhedron(() => ({ mass: props.mass, material:{friction:1e10,restitution:0.01},  ...props, args: geo }))
  // return (
  //   <mesh castShadow receiveShadow ref={ref} geometry={nodes.[props.modelId].geometry} {...props} dispose={null}>
  //     <bufferGeometry attach="geometry" />
  //     <meshStandardMaterial attach="material"  />
  //   </mesh>
  // )
}

function App() {
  return (
    <>
    <Canvas 
      // shadowMap 
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
      
      <Physics
        // gravity={[0, 0, 30]}
        step={1/60}
        iterations={4}
        allowSleep={false}
        // defaultContactMaterial={{
        //   contactEquationStiffness: 1e8,
        //   friction:1e8,
        //   restitution:1e8,
        //   contactEquationRelaxation:1e8,
        //   frictionEquationRelaxation:1e8,
        //   frictionEquationStiffness:1e8,
        // }}
      >
        <Plane />
        {/* <ModelTst position={[1, 5, 0]} rotation={[0.4, 0.1, 0.1]} /> */}
        {/* <Cube position={[0.2,7,-2]} />
        <Cube position={[0,9,-2]} />
        <Cube position={[0,12,-2]} />
        <Cube position={[0,5,-2]} />
        */}
        {/* <Cube position={[2,9,-2]} />
        <Cube position={[2,12,-2]} />
        <Cube position={[2,5,-2]} />
        <Cube position={[2,7,-2]} />  */}

         {/* <Wall position={[2.5,15,0]} /> */}
{/*
        <Cube position={[-2,9,-2]} />
        <Cube position={[-2,12,-2]} />
        <Cube position={[-2,5,-2]} />
        <Cube position={[-2,7,-2]} />
        
        <Cube position={[-2,91,-2]} />
        <Cube position={[-2,112,-2]} />
        <Cube position={[-2,51,-2]} />
        <Cube position={[-2,71,-2]} /> */}
        {/* <ModelTst3 modelId={"Projects"} position={[-5, 10, -1.5]} mass={100} /> */}
        {/* <ModelTst2 modelId={"Skills"} position={[5, 3, 0]} mass={100} /> */}
        {/* <ModelTst3 modelId={"Contact"} position={[5, 6, -2]} mass={100} /> */}
        <ModelTst3 modelId={"Contact"} position={[5, 10, -2]} mass={100} />
        <ModelTst3 modelId={"Contact"} position={[5, 6, -2]} mass={100} />
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
