import React from 'react';

import HomePage from './pages/homepage/home.page.jsx'

function App() {
  return(
    <div>
      <HomePage></HomePage>
    </div>
  )
}


export default App;

// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// import React, { useRef, useState } from 'react'
// import { Canvas, useFrame, useThree } from 'react-three-fiber'

// function Cube(props) {
//   const mesh = useRef()
//   const [hovered, setHover] = useState(false)
//   const [active, setActive] = useState(false)
//   const { viewport } = useThree()
//   const size = viewport.width / 5
//   useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))
//   return (
//     <mesh
//       {...props}
//       ref={mesh}
//       scale={active ? [size * 1.5, size * 1.5, size * 1.5] : [size, size, size]}
//       onClick={e => setActive(!active)}
//       onPointerOver={e => setHover(true)}
//       onPointerOut={e => setHover(false)}>
//       <boxBufferGeometry attach="geometry" />
//       <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
//     </mesh>
//   )
// }

// export default function App() {
//   return (
//     <Canvas>
//       <ambientLight />
//       <pointLight position={[10, 10, 10]} />
//       <Cube />
//     </Canvas>
//   )
// }
