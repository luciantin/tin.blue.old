import React, { Component, useRef, useState } from 'react'
import { Canvas, useFrame } from "react-three-fiber";
import { softShadows, MeshWobbleMaterial, OrbitControls } from "drei";
import { useSpring, a } from "react-spring/three";
import { Physics, usePlane, useBox } from '@react-three/cannon'

import './home.page.style.scss'

softShadows();

function Plane(props) {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0.4, 0], ...props }))
    return (
      <mesh ref={ref} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <shadowMaterial attach="material" color="#171717" />
      </mesh>
    )
  }
  
  function Cube(props) {
    const [ref] = useBox(() => ({ mass: 0.2, position: props.position, }))
    return (
      <mesh ref={ref}
      receiveShadow
      castShadow>
        <boxBufferGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color="hotpink" />

      </mesh>
    )
  }

const SpinningMesh = ({ position, color, speed, args }) => {
    const mesh = useRef();

    return (
      <a.mesh
        position={position}
        ref={mesh}
        // onClick={() => setExpand(!expand)}
        scale={[1, 1, 1]}
        castShadow>
        <boxBufferGeometry attach='geometry' args={args} />
        <MeshWobbleMaterial
          color={color}
          speed={0}
          attach='material'
          factor={0.6}
        />
      </a.mesh>
  
      //Using Drei box if you want
      // <Box {...props} ref={mesh} castShadow>
      //   <MeshWobbleMaterial
      //     {...props}
      //     attach='material'
      //     factor={0.6}
      //     Speed={1}
      //   />
      // </Box>
    );
  };
  


class HomePage extends Component {
    constructor(){
        super();

        this.state = {
            contact:{ email:'das',git:''},
        }
    }

    render(){
        return(
            <div className="HomePage">
                <Canvas shadowMap sRGB gl={{ alpha: false }} camera={{ position: [-1, 2, 5], fov: 50 }}>
                    <color attach="background" args={['lightblue']} />
                    <hemisphereLight intensity={0.35} />
                    <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
                    <Physics>
                    <Plane />
                    <Cube />
                    <Cube position={[0, 10, -2]} />
                    <Cube position={[0, 20, -2]} />
                    </Physics>
                </Canvas>,
            </div>
        );
    }

};


export default HomePage;