import React, { Component, useRef, useState,useMemo, Suspense, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useLoader,useUpdate} from "react-three-fiber";
import { softShadows, MeshWobbleMaterial, OrbitControls } from "drei";
import { useSpring, a } from "react-spring/three";
import { Physics, usePlane, useBox, useConvexPolyhedron } from '@react-three/cannon'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ConvexBufferGeometry, ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry'

import ModelBB from '../../components/model/model.component.jsx'

import './home.view.style.scss'

// softShadows();


function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 1], ...props}))
  return (
    <mesh ref={ref} receiveShadow >
      <planeBufferGeometry attach="geometry" args={[100, 50]} />
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


class Home extends Component {

  constructor(){
    super();

    this.state = {
      renderTin : false,
    };
  }

  componentDidMount() {
    setTimeout(function() { //Start the timer
        this.setState({renderTin: true}) //After 1 second, set render to true
    }.bind(this), 10000)
  }

  render() {
    return(
    <>
      <Canvas 
        shadowMap 
        sRGB 
        gl={{ alpha: false }} 
        camera={{ position: [25, 2, 4], fov: 60,rotation:[0,0,0]}} 
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
        
        <Physics step={1/40} iterations={2} allowSleep={false} >
          <Plane />
          
          <ModelBB debug={true} src={'./models/tinModelsTst2.glb'} modelId={"Skills"} position={[5, 30, -10]} mass={100}  rotation={[0,-0.8,0]}  scale={[2,1.5,1.5]} pmaterial={{friction:1000,restitution:0.01}} />
          <ModelBB src={'./models/tinModelsTst2.glb'} modelId={"Projects"} position={[3, 60, -7]} mass={100}  rotation={[0,-0.6,0]}  scale={[2,1.5,1.5]} pmaterial={{friction:1000,restitution:0.01}} />
          <ModelBB src={'./models/tinModelsTst2.glb'} modelId={"CONTACT"} position={[4, 70, -8]} mass={50}  rotation={[0,-1,0]}  scale={[1.5,1.5,1.5]} pmaterial={{friction:1000,restitution:0.01}} />
          <ModelBB src={'./models/tinModelsTst2.glb'} modelId={"Git"} position={[-0.6, 20, -2.6]} mass={100}  rotation={[0,-0.4,0]}  scale={[1.5,1.5,1.5]} pmaterial={{friction:1000,restitution:0.01}} />
          
          <ModelBB src={'./models/tinModelsTst2.glb'} modelId={"H"} position={[-20, 5, 35]} mass={100}  rotation={[0,0,0]}  scale={[1,1,1]} pmaterial={{friction:1000,restitution:0.01}} />
          <ModelBB src={'./models/tinModelsTst2.glb'} modelId={"E"} position={[-20, 5, 25]} mass={100}  rotation={[0,-Math.PI,0]}  scale={[1,1,1]} pmaterial={{friction:1000,restitution:0.01}} />
          <ModelBB src={'./models/tinModelsTst2.glb'} modelId={"L"} position={[-20, 5, 15]} mass={100}  rotation={[0,-Math.PI,0]}  scale={[1,1,1]} pmaterial={{friction:1000,restitution:0.01}} />
          <ModelBB src={'./models/tinModelsTst2.glb'} modelId={"L"} position={[-20, 5, 5]} mass={100}  rotation={[0,-Math.PI,0]}  scale={[1,1,1]} pmaterial={{friction:1000,restitution:0.01}} />
          <ModelBB src={'./models/tinModelsTst2.glb'} modelId={"O"} position={[-20, 5, -5]} mass={100}  rotation={[0,-Math.PI,0]}  scale={[1,1,1]} pmaterial={{friction:1000,restitution:0.01}} />
          
          <ModelBB src={'./models/tinModelsTst2.glb'} modelId={"I"} position={[0, 80, 15]} mass={100}  rotation={[0,-Math.PI,0]}  scale={[1,1,0.5]} pmaterial={{friction:1000,restitution:0.01}} />
          <ModelBB src={'./models/tinModelsTst2.glb'} modelId={"Apostrophe"} position={[0, 85, 13]} mass={100}  rotation={[0,-Math.PI,0]}  scale={[0.5,0.5,0.5]} pmaterial={{friction:1000,restitution:0.01}} />
          <ModelBB src={'./models/tinModelsTst2.glb'} modelId={"M"} position={[0, 80, 10]} mass={100}  rotation={[0,-Math.PI,0]}  scale={[1,0.5,0.5]} pmaterial={{friction:1000,restitution:0.01}} />
          
          
          { this.state.renderTin ? 
          <ModelBB src={'./models/tinModelsTst2.glb'} modelId={"T"} position={[10, 5, 15]} mass={100}  rotation={[0,-Math.PI,0]}  scale={[0.3,0.3,0.3]} pmaterial={{friction:1000,restitution:0.01}} />
          : null }
           { this.state.renderTin ? 
          <ModelBB src={'./models/tinModelsTst2.glb'} modelId={"I"} position={[10, 5, 10]} mass={100}  rotation={[0,-Math.PI,0]}  scale={[0.3,0.3,0.3]} pmaterial={{friction:1000,restitution:0.01}} />
          : null }
           { this.state.renderTin ? 
          <ModelBB src={'./models/tinModelsTst2.glb'} modelId={"N"} position={[10, 5, 5]} mass={100}  rotation={[0,-Math.PI,0]}  scale={[0.3,0.3,0.3]} pmaterial={{friction:1000,restitution:0.01}} />
          : null }

        </Physics>

        <OrbitControls />
      </Canvas>      
    </>
    );
  }
}

export default Home;
