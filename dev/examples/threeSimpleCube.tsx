import * as React from "react"
import * as THREE from "three"
import { useState, Suspense } from "react"
import { motion } from "../../src/render/three"
import { Canvas } from "react-three-fiber"
import { OrbitControls } from "drei"
import { useLoader } from "react-three-fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

function SimpleThree() {
    const gltf = useLoader(GLTFLoader, "/framerLogo.gltf")
    const [active, setActive] = useState(false)

    const variants = {
        hide: { scale: 0, rotate: -6, y: 0 },
        show: { scale: 5, rotate: 0, rotateY: 0, y: -2 },
        big: { scale: 10, rotate: 0, rotateY: 6, y: -6 },
    }

    return (
        <motion.group
            variants={variants}
            initial={"hide"}
            animate={active ? "big" : "show"}
            transition={transition}
            onClick={() => setActive(!active)}
        >
            <primitive object={gltf.scene} dispose={null} />
        </motion.group>
    )
}

/*

    <motion.group
        variants={variants}
        initial={"hide"}
        animate={active ? "big" : "show"}
        transition={transition}
        onClick={() => setActive(!active)}
    >


*/

export const App = () => {
    return (
        <Canvas
            colorManagement
            style={{
                width: "100vw",
                height: "100vh",
                background: "linear-gradient(180deg, #d0e, #91f)",
            }}
            gl={{
                logarithmicDepthBuffer: true,
                antialias: false,
            }}
            camera={{ fov: 75, position: [0, 0, 25], near: 1, far: 1000 }}
            onCreated={({ gl }) => {
                gl.toneMapping = THREE.ACESFilmicToneMapping
                gl.outputEncoding = THREE.sRGBEncoding
            }}
        >
            <Suspense fallback={null}>
                <SimpleThree />
            </Suspense>
            <ambientLight position={[1, 1, 1]} intensity={1} color="#eaf" />
            <pointLight position={[100, 100, 100]} intensity={2} />
            <OrbitControls />
        </Canvas>
    )
}

const transition = {
    type: "spring",
    stiffness: 60,
    damping: 20,
}
