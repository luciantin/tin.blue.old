import React, { useRef} from 'react'
import {Canvas, useFrame} from 'react-three-fiber'
import {OrbitControls, softShadows, MeshWobbleMaterial} from 'drei'

import './App.css';

softShadows();

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


function App() {
  return (
    <>
      <Canvas shadowMap colorManagement camera={{position:[-5,2,10], fov:60}}>
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

        <group>
          {/* {/* <mesh receiveShadow rotation={[-Math.PI /2, 0, 0 ]} position={[0,-1,0]}> */}
            {/* <planeBufferGeometry attach='geometry' args={[100,100]} /> */}
            {/* <meshStandardMaterial attach='material' color={'yellow'} /> */}
            {/* <shadowMaterial attach='material'  opacity={0.1} /> */}
          {/* </mesh>  */}
          
          <mesh receiveShadow rotation={[-Math.PI /2, 0, 0 ]} position={[0,-2,0]}>
            <planeBufferGeometry attach='geometry' args={[100,100]} />
            <meshStandardMaterial attach='material' color={'white'} />
            {/* <shadowMaterial attach='material' color={'green'} /> */}
          </mesh>
        </group>

        <SpinningMesh position={[0,1,0]}   speed={1} args={[3,2,1]} color='lightblue' />
        <SpinningMesh position={[-2,1,-5]} speed={6}  color='pink' />
        <SpinningMesh position={[5,1,-2]}  speed={6} color='pink' />
        <OrbitControls/>
      </Canvas>
    </>
  );
}

export default App;
