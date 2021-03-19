import React from 'react'
import * as THREE from 'three'
import { useLoader} from "react-three-fiber";
import { useBox } from '@react-three/cannon'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'



// Model with bounding box physics
// src is model file glb <Models.glb>
// modelId is the name of the model in the scene
// material can be "inherit" || "standard" , mesh material           TODO
// pmaterial - physics material - {friction:1000,restitution:0.01}
// mass - physics mass
// scale - [x,y,z]
// position - [x,y,z]
// rotation - [rx,ry,rz] in radians
// debug - True/False
// @ts-ignore
function ModelBB({src,modelId,material,pmaterial,mass,scale,position,rotation,debug, onClickF, onPointerEnterF, onPointerLeaveF}) {
    const { nodes } = useLoader(GLTFLoader, src)

    if(onClickF === undefined)  onClickF = () => { };
    if(onPointerEnterF === undefined)  onPointerEnterF = () => { };
    if(onPointerLeaveF === undefined)  onPointerLeaveF = () => { };
    if(debug) console.log(nodes);

    const geo = new THREE.Geometry().fromBufferGeometry(nodes[modelId].geometry);
    geo.mergeVertices();
    geo.center();
    geo.scale(scale[0],scale[1],scale[2])
    geo.computeBoundingBox();
    const bb = geo.boundingBox;
    const boxSize = [
        (bb.max.x-bb.min.x),
        (bb.max.y-bb.min.y),
        (bb.max.z-bb.min.z)
    ];

    const [ref] = useBox(() => ({ mass: mass, material:pmaterial, args:boxSize, position:position, rotation:rotation }))

    return (
        <mesh 
            castShadow
            receiveShadow
            ref={ref}
            geometry={geo}
            material={nodes[modelId].material}
            onClick={onClickF}
            onPointerEnter={onPointerEnterF}
            onPointerLeave={onPointerLeaveF}
        >
        </mesh>
    );
}

export default ModelBB;
