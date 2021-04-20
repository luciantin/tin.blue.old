import React, { Component, useRef, useState,useMemo, Suspense } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useLoader,useUpdate} from "react-three-fiber";
import { softShadows, MeshWobbleMaterial, OrbitControls } from "drei";
import { useSpring, a } from "react-spring/three";
import { Physics, usePlane, useBox, useConvexPolyhedron } from '@react-three/cannon'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry'

// import roboto from '../../common/Roboto_Regular.json'

import './home.page.style.scss'

softShadows();

function TextA(props){
  const font = useLoader(THREE.FontLoader, '/bold.blob')
  // const ref = useRef();
  const [ref] = useBox(() => {
    // const size = new THREE.Vector3()
    // self.geometry.computeBoundingBox()
    // self.geometry.boundingBox.getSize(size)
    // console.log(ref);
    // const size = new THREE.Vector3()
    // self.geometry.computeBoundingBox()
    // self.geometry.boundingBox.getSize(size)
    // self.position.x = hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
    // self.position.y = vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y
    return({ mass: 0.2, position: props.position, });
  })
      // const size = new THREE.Vector3()
      // self.geometry.computeBoundingBox()
      // self.geometry.boundingBox.getSize(size)
      console.log(ref);
      // const size = new THREE.Vector3()
      // self.geometry.computeBoundingBox()
      // self.geometry.boundingBox.getSize(size)
      // self.position.x = hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
      // self.position.y = vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y

  return(
    <group>
      <mesh ref={ref}>
      <lineSegments>
        <textBufferGeometry attach="geometry" args={["text", { font, size: 10, height: 10, curveSegments: 32, bevelEnabled: true, bevelThickness: 6, bevelSize: 2.5, bevelOffset: 0, bevelSegments: 8 }]} />
        <meshNormalMaterial attach="material" />
      </lineSegments>
      </mesh>
    </group>
  );
}

function Text({ children, vAlign = 'center', hAlign = 'center', size = 1, color = '#000000', ...props }) {
  // let children = "das", vAlign = 'center', hAlign = 'center', size = 1, color = '#000000'
  const font = useLoader(THREE.FontLoader, '/bold.blob')
  const config = useMemo(
    () => ({ font, size: 40, height: 30, curveSegments: 32, bevelEnabled: true, bevelThickness: 6, bevelSize: 2.5, bevelOffset: 0, bevelSegments: 8 }),
    [font]
  )
  const mesh = useUpdate(
    self => {
      const size = new THREE.Vector3()
      self.geometry.computeBoundingBox()
      self.geometry.boundingBox.getSize(size)
      self.position.x = hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
      self.position.y = vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y
    },
    [children]
  )

  // const ref = useRef();

  return (
    <group {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
      <mesh ref={mesh}
      receiveShadow
      castShadow>
        <textGeometry attach="geometry" args={[children, config]} />
        <meshNormalMaterial attach="material" />
      </mesh>
    </group>
  )
}


function Jumbo() {
  const ref = useRef();
  useFrame(({ clock }) => (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z = Math.sin(clock.getElapsedTime()) * 0.3))
  return (
    <group ref={ref}>
       <Text hAlign="left" position={[0, 4.2, 0]} children="REACT" />
      {/* // <Text hAlign="left" position={[0, 0, 0]} children="THREE" /> */}
      {/* // <Text hAlign="left" position={[0, -4.2, 0]} children="FIBER" /> */}
      {/* // <Text hAlign="left" position={[12, 0, 0]} children="4" size={3} /> */}
      {/* // <Text hAlign="left" position={[16.5, -4.2, 0]} children="X" /> */}
     </group>
  )
}



// function Text(children){
//     let vAlign = 'center' , hAlign = 'center', size = 1, color = '#000000';
//     const font = useLoader(THREE.FontLoader, '/Roboto_Regular.json');
//     // let font = roboto;
//     children = "asfnjmiofnasiofnmasiofnmasdkopfnadionfioano"
//     const config = useMemo(
//         () => ({
//           font,
//           size: 40,
//           height: 30,
//           curveSegments: 32,
//           bevelEnabled: true,
//           bevelThickness: 6,
//           bevelSize: 2.5,
//           bevelOffset: 0,
//           bevelSegments: 8,
//         }),
//         [font]
//     )

//     const mesh = useUpdate(
//         (self) => {
//           const size = new THREE.Vector3()
//         //   size.y = 3
//           self.geometry.computeBoundingBox()
//           self.geometry.boundingBox.getSize(size)
//           self.position.x = hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
//           self.position.y = vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y
//         },
//         [children]
//       )

//     return(
//         <mesh ref={mesh} receiveShadow castShadow>
//             <textGeometry attach="geometry" args={[children, config]}></textGeometry>
//             <meshNormalMaterial attach="material" />
//         </mesh>
//     )
// }

function Plane(props) {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0.4, 0], ...props }))
    return (
      <mesh ref={ref} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <shadowMaterial attach="material" color="#171717" />
        <meshLambertMaterial attach="material" color="hotpink" />
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
  

  function Diamond(props) {
    const { nodes } = useLoader(GLTFLoader, '/shape2TstModel.glb')
    const geo = useMemo(() => {
      const g = new THREE.Geometry().fromBufferGeometry(nodes.Cube.geometry)
      // Merge duplicate vertices resulting from glTF export.
      // Cannon assumes contiguous, closed meshes to work
      // g.mergeVertices()
      // Ensure loaded mesh is convex and create faces if necessary
      return new ConvexGeometry(g.vertices)
    }, [nodes])
  
    const [ref] = useConvexPolyhedron(() => ({ mass: 100, ...props, args: geo }))
    return (
      <mesh castShadow receiveShadow ref={ref} geometry={geo} {...props} dispose={null}>
        <meshStandardMaterial attach="material"  />
      </mesh>
    )
  }

  function Asset({ url }) {
    const { nodes } = useLoader(GLTFLoader, '/shape2TstModel.glb')
    console.log(nodes)
    const g = new THREE.Geometry().fromBufferGeometry(nodes.Cube.geometry)
    const ref = useRef();

    return(
      <mesh ref={ref} geometry={g} >
        <meshStandardMaterial attach="material"  />
      </mesh>
      )
    // return (<p>dasda</p>)
    // return <primitive object={gltf.scene} />
  }

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
                 <Suspense >
                    <Asset url="/shape2TstModel.glb"></Asset>
              </Suspense>
                    <color attach="background" args={['lightblue']} />
                    <hemisphereLight intensity={0.35} />
                    <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
                    {/* <Suspense fallback={<Cube />}> */}
                      {/* <Asset url="/tinTstModel.glb" /> */}
                    {/* </Suspense> */}
                    {/* <Physics>
                      <Plane />
                      <Diamond position={[1, 5, 0]} rotation={[0.4, 0.1, 0.1]} /> */}
                    {/* <Cube /> */}
                    {/* <Cube position={[0, 10, -2]} /> */}
                    {/* <Cube position={[0, 20, -2]} /> */}
                    {/* <Jumbo /> */}
                      {/* <TextA  position={[0, 20, -2]}> </TextA> */}
                    {/* </Physics> */}
                    <OrbitControls />
                </Canvas>
            </div>
        );
    }

};


export default HomePage;